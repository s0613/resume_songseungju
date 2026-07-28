---
tags: [AI-Agent, 프레임워크, 플랫폼, AWS]
---

# Bedrock AgentCore

> **어떤 프레임워크·어떤 모델로 만든 에이전트든** 프로덕션에서 배포·운영하게 해주는 AWS의 에이전트 플랫폼. 2025-07 프리뷰 → 2025-10 GA. 에이전트를 "만드는" 도구가 아니라 "돌리고 운영하는" 인프라 계층이다.

[[Bedrock Agents]](Classic)의 사실상 후속. Classic이 오케스트레이션까지 AWS 방식으로 강제했다면, AgentCore는 에이전트 로직을 [[Strands Agents]]·[[LangGraph]]·[[CrewAI]]·[[LlamaIndex]]·Google ADK·[[OpenAI Agents SDK]] 등 아무 프레임워크로 짜고, 모델도 Bedrock 밖(OpenAI·Gemini 포함)을 허용한 채 **실행·보안·메모리·도구 연결·관찰성만 관리형으로** 제공한다. 서비스들은 조합 자유 — 전부 쓸 필요 없이 필요한 것만 골라 쓴다.

## 구성 서비스 (2026-06 기준 13개)

| 서비스 | 하는 일 |
|--------|---------|
| **Runtime** | 서버리스 에이전트 호스팅. 세션마다 격리 microVM, 긴 비동기 실행, MCP·A2A 프로토콜 지원 |
| **Harness** | 관리형 에이전트 루프(2026 신규). 모델+프롬프트+도구를 단일 API 호출로 — 루프 구현 자체를 위임 |
| **Memory** | 단기(멀티턴) + 장기(세션 간 영속) 메모리, 에이전트 간 스토어 공유 (→ [[Long Term Memory]]) |
| **Gateway** | 기존 API·Lambda를 [[MCP]] 도구로 자동 변환, 기존 MCP 서버 연결 |
| **Identity** | 에이전트 신원·인증. Cognito·Okta·Entra ID·Auth0 등 기존 IdP 호환 |
| **Code Interpreter** | 격리 샌드박스 코드 실행 (Python·JS·TS) |
| **Browser** | 관리형 클라우드 브라우저. Playwright·BrowserUse로 조작 |
| **Observability** | OTEL 호환 트레이싱·디버깅, CloudWatch 통합 (→ [[Tracing]]) |
| **Evaluations** | 세션·트레이스 단위 자동 평가(2026 신규) (→ [[Agent Evaluation]]) |
| **Policy** | Cedar/자연어 규칙으로 도구 호출을 실행 전 결정적으로 통제(2026 신규) (→ [[가드레일]]) |
| **Optimization** | 트레이스 기반 프롬프트·도구 설명 개선 + A/B 테스트(2026 신규) |
| **Payments** | x402 프로토콜 기반 에이전트 마이크로결제(2026 신규) |
| **Registry** | 조직 내 에이전트·MCP 서버·도구 카탈로그(2026 신규) |

## 최소 배포 예시 (Strands + Runtime)

```python
# pip install bedrock-agentcore strands-agents
from strands import Agent
from bedrock_agentcore.runtime import BedrockAgentCoreApp

app = BedrockAgentCoreApp()
agent = Agent(system_prompt="사내 QA 봇.")

@app.entrypoint
def invoke(payload):
    return {"result": agent(payload.get("prompt", "")).message}

if __name__ == "__main__":
    app.run()   # 로컬 테스트: POST http://localhost:8080/invocations
```

```bash
npm install -g @aws/agentcore     # AgentCore CLI (2026 권장 도구)
agentcore configure -e my_agent.py
agentcore launch                  # 컨테이너 빌드 → Runtime 배포
agentcore invoke '{"prompt": "재고 조회 절차 알려줘"}'
```

## 멀티에이전트 지원

Runtime이 A2A 프로토콜을 지원해 에이전트 간 통신을 표준화하고, Gateway로 도구를 조직 단위 공유, Registry로 에이전트를 발견한다. 멀티에이전트 오케스트레이션 자체(supervisor·swarm 등)는 프레임워크(Strands 등) 몫이고 AgentCore는 그 실행 기반. (→ [[Multi Agent Architecture]], [[A2A]])

## 언제 쓰나

- 프로토타입 에이전트를 **프로덕션으로** — 세션 격리·스케일·인증·관찰성을 직접 안 만들 때
- 사내 API·Lambda를 코드 수정 없이 MCP 도구화할 때 (Gateway)
- Bedrock Agents Classic 대체 — **Classic은 2026-07-30부터 신규 중단**, 신규는 여기로

## 알아둘 것

- 과금은 소비 기반(선결제·최소 요금 없음)
- 리전(2026-05): 버지니아·오하이오·오레곤·아일랜드·프랑크푸르트·뭄바이·싱가포르·시드니·도쿄·상파울루 — **서울 미지원**, 한국 워크로드는 도쿄가 최근접
- Gateway는 2026-06부터 MCP 상태 유지 세션 지원(기본 1시간, 최대 8시간)

https://aws.amazon.com/bedrock/agentcore/

## 관련 노트

- [[Strands Agents]]
- [[Bedrock Agents]]
- [[Bedrock Agents 개발 가이드]]
- [[MCP]]
- [[A2A]]
- [[가드레일]]
- [[Agent Evaluation]]
- [[Long Term Memory]]
- [[Tracing]]
- [[Multi Agent Architecture]]
