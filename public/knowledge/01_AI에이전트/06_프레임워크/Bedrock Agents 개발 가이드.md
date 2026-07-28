---
tags: [AI-Agent, 프레임워크, 가이드, AWS]
---

# Bedrock Agents 개발 가이드

> [[Bedrock Agents]](관리형 에이전트)를 boto3로 실제 생성·호출하는 실무 절차. 에이전트 생성 → Action Group(Lambda) 등록 → Knowledge Base 연결 → 빌드/별칭 → 호출까지.

> [!WARNING] Bedrock Agents는 "Classic"이 됐다 (2026-07-30 신규 중단)
> AWS가 이 서비스를 **Amazon Bedrock Agents Classic**으로 개명하고, **2026-07-30부터 신규 고객을 받지 않는다**. 기존 고객은 계속 사용 가능(유지보수 모드). 신규 개발은 [[Strands Agents]](코드 SDK) + [[Bedrock AgentCore]](운영 플랫폼) 조합이 AWS 공식 권장 경로다. 이 가이드는 **기존 에이전트 운영·유지보수** 목적으로 유효하다.

## 개발 흐름

```text
IAM 역할 준비
  → create_agent (에이전트 정의)
  → create_agent_action_group (도구 = Lambda + 함수 스키마)
  → associate_agent_knowledge_base (선택: RAG)
  → prepare_agent (DRAFT 빌드)
  → create_agent_alias (배포 지점)
  → invoke_agent (bedrock-agent-runtime, 스트리밍)
```

빌드타임 API는 `bedrock-agent`, 런타임 호출은 `bedrock-agent-runtime` — **클라이언트가 둘로 나뉜다.**

## 0. 사전 준비 — IAM 역할

에이전트용 서비스 역할이 필요하다. 신뢰 정책의 principal은 `bedrock.amazonaws.com`, 권한은 최소 `bedrock:InvokeModel`(사용할 FM/인퍼런스 프로파일 대상). 콘솔로 만들면 `AmazonBedrockExecutionRoleForAgents_*` 이름으로 자동 생성된다.

## 1. 에이전트 생성

```python
import boto3

bedrock_agent = boto3.client("bedrock-agent", region_name="us-east-1")

resp = bedrock_agent.create_agent(
    agentName="order-assistant",
    # 교차 리전 인퍼런스 프로파일 ID 사용 (온디맨드 ID는 최신 모델에서 불가한 경우 많음)
    foundationModel="us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    instruction="너는 주문 조회를 돕는 상담원이다. 주문 상태 질문에는 반드시 도구로 조회해 답한다.",
    agentResourceRoleArn="arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForAgents_demo",
    idleSessionTTLInSeconds=600,
)
agent_id = resp["agent"]["agentId"]
```

사용 가능한 프로파일 ID는 `aws bedrock list-inference-profiles`로 확인.

## 2. Action Group — 도구 등록

도구 정의 방식은 둘: **OpenAPI 스키마**(S3/인라인) 또는 더 간단한 **함수 스키마**(functionSchema). 실행 백엔드는 Lambda. (→ [[Tool Calling]])

```python
bedrock_agent.create_agent_action_group(
    agentId=agent_id,
    agentVersion="DRAFT",              # 빌드타임 수정은 항상 DRAFT 대상
    actionGroupName="order-api",
    actionGroupExecutor={"lambda": "arn:aws:lambda:us-east-1:123456789012:function:order-handler"},
    functionSchema={"functions": [{
        "name": "get_order_status",
        "description": "주문번호로 주문 상태를 조회한다",
        "parameters": {
            "order_id": {"type": "string", "description": "주문번호 (예: A-1002)", "required": True},
        },
    }]},
)
```

- Lambda 대신 `{"customControl": "RETURN_CONTROL"}`을 주면 실행을 호출 측(내 코드)으로 되돌려 받는다 — Lambda 없이 로컬에서 도구 실행 가능.
- Lambda 리소스 정책에 `bedrock.amazonaws.com`이 해당 에이전트 ARN에서 invoke할 수 있도록 `add_permission` 필요.

### Lambda 핸들러 계약 (함수 스키마 기준)

```python
def handler(event, context):
    fn = event["function"]
    params = {p["name"]: p["value"] for p in event.get("parameters", [])}

    if fn == "get_order_status":
        body = f"주문 {params['order_id']}: 배송 중"

    return {
        "messageVersion": "1.0",
        "response": {
            "actionGroup": event["actionGroup"],
            "function": fn,
            "functionResponse": {"responseBody": {"TEXT": {"body": body}}},
        },
    }
```

응답 형식이 이 계약과 다르면 에이전트가 도구 결과를 못 읽는다 — 디버깅 1순위 체크 포인트.

## 3. Knowledge Base 연결 (선택)

사전에 만든 Knowledge Base(벡터 스토어 + S3 데이터 소스 + `start_ingestion_job` 완료)를 연결한다. (→ [[RAG Architecture]])

```python
bedrock_agent.associate_agent_knowledge_base(
    agentId=agent_id, agentVersion="DRAFT",
    knowledgeBaseId="KB12345678",
    description="주문·환불 정책 문서. 정책 질문 시 검색한다.",  # 이 설명으로 에이전트가 검색 여부를 판단
)
```

## 4. 빌드와 별칭

```python
bedrock_agent.prepare_agent(agentId=agent_id)          # DRAFT를 실행 가능 상태로 빌드
alias = bedrock_agent.create_agent_alias(
    agentId=agent_id, agentAliasName="prod",
)
alias_id = alias["agentAlias"]["agentAliasId"]
```

**prepare를 잊으면** 변경 사항이 반영되지 않은 채 호출된다 — 스키마를 고쳤는데 동작이 그대로면 이것부터 의심. 테스트만 할 땐 별칭 없이 `agentAliasId="TSTALIASID"`(DRAFT 테스트 별칭)로 호출할 수 있다.

## 5. 호출

```python
runtime = boto3.client("bedrock-agent-runtime", region_name="us-east-1")

resp = runtime.invoke_agent(
    agentId=agent_id,
    agentAliasId=alias_id,
    sessionId="user-123",        # 같은 값이면 세션 상태(대화 맥락) 유지
    inputText="주문 A-1002 지금 어디쯤이야?",
    enableTrace=True,            # 추론 단계 가시화 (→ [[Tracing]])
)

for event in resp["completion"]:   # 이벤트 스트림
    if "chunk" in event:
        print(event["chunk"]["bytes"].decode(), end="")
    elif "trace" in event:
        pass  # 오케스트레이션 추론·도구 호출 단계 로그
```

## 디버깅 체크리스트

- [ ] 도구가 안 불림 → instruction·도구 description이 "언제 쓰는지"를 말하는가
- [ ] 변경이 반영 안 됨 → `prepare_agent` 실행했는가, 별칭이 새 버전을 가리키는가
- [ ] 도구 결과를 못 읽음 → Lambda 응답이 `messageVersion/response/functionResponse` 계약대로인가
- [ ] AccessDenied → 에이전트 역할의 `bedrock:InvokeModel`, Lambda 리소스 정책
- [ ] 원인 불명 → `enableTrace=True`로 trace 이벤트를 읽는 게 가장 빠르다

https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html

## 관련 노트

- [[Bedrock Agents]]
- [[Bedrock AgentCore]]
- [[Strands Agents]]
- [[Tool Calling]]
- [[RAG Architecture]]
- [[Tracing]]
- [[ReAct]]
