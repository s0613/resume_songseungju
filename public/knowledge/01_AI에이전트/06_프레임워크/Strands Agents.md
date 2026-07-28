---
tags: [AI-Agent, 프레임워크, AWS]
---

# Strands Agents

> AWS가 2025년 5월 오픈소스로 공개한 **모델 주도(model-driven)** 에이전트 SDK. Python(GA) + TypeScript(2025-12 프리뷰). 워크플로를 코드로 정의하는 대신, 모델의 추론 능력에 계획·도구 선택·반성 루프를 맡긴다.

이름의 유래처럼 "모델 + 도구 두 가닥(strand)"을 꼬는 것이 전부다. [[LangGraph]]가 그래프로 제어 흐름을 명시한다면, Strands는 **에이전틱 루프 자체를 모델에 위임**하고 개발자는 시스템 프롬프트·도구·모델만 준다. Amazon Q Developer, AWS Glue 등 AWS 내부 프로덕션에서 실사용 중이며, [[Bedrock Agents]](관리형 서비스)와 달리 어디서든 실행 가능한 코드 SDK다 — 프로덕션 배포는 [[Bedrock AgentCore]] Runtime이 기본 조합.

## 특징

- **모델 주도 루프**: 계획→도구 호출→관찰→재추론을 SDK가 아닌 모델이 주도 (→ [[ReAct]])
- **`@tool` 데코레이터**: Python 함수 + docstring이 곧 도구 정의 (→ [[Tool Calling]])
- **모델 무관**: 기본 Bedrock, 그 외 Anthropic·OpenAI·Gemini·Ollama·LiteLLM 등 교체 가능
- **MCP 네이티브**: `MCPClient`로 MCP 서버의 도구를 그대로 장착 (→ [[MCP]])
- **A2A 지원**: 에이전트를 A2A 서버로 노출하거나 외부 A2A 에이전트 호출 (→ [[A2A]])
- **대화 관리**: 슬라이딩 윈도우·요약 기반 컨텍스트 관리 (→ [[Context Compaction]])
- **인터럽트**: 도구 실행 전 사람 승인 대기(휴먼 인 더 루프)
- **훅(hooks)·structured output·OTEL 트레이싱** 내장 (→ [[Tracing]])
- `strands-agents-tools` 패키지에 calculator·file_read·http_request 등 기성 도구

## 핵심 개념/구성요소

- **Agent**: 모델 + 시스템 프롬프트 + 도구 묶음. 호출 가능 객체
- **Tool**: `@tool` 함수, MCP 도구, 또는 다른 Agent(agents-as-tools)
- **Model Provider**: `BedrockModel`(기본)·`AnthropicModel`·`OpenAIModel`…
- **Conversation Manager**: 히스토리 유지·압축 전략
- **Hook**: 루프 각 단계(도구 호출 전후 등)에 개입하는 콜백

```python
# pip install strands-agents strands-agents-tools
from strands import Agent, tool
from strands_tools import calculator

@tool
def get_order_status(order_id: str) -> str:
    """주문번호로 주문 상태를 조회한다."""
    return "배송 중"

agent = Agent(
    model="us.anthropic.claude-sonnet-4-5-20250929-v1:0",  # 기본: Bedrock
    system_prompt="주문 상담 에이전트. 상태 질문은 반드시 도구로 조회한다.",
    tools=[calculator, get_order_status],
)
agent("A-1002 지금 어디쯤이야?")
```

TypeScript는 `npm install @strands-agents/sdk`.

## 멀티에이전트 지원

네 가지 패턴을 SDK 차원에서 제공한다:

| 패턴 | 방식 | 언제 |
|------|------|------|
| **Agents-as-Tools** | 오케스트레이터가 하위 에이전트를 도구로 호출 | 명확한 위임 구조 (→ [[Supervisor Pattern]]) |
| **Swarm** | 에이전트들이 핸드오프로 자율 협업 | 순서를 미리 못 정할 때 |
| **Graph** | 노드=에이전트, 엣지=결정적 순서 | 흐름을 통제하고 싶을 때 |
| **Workflow** | 태스크 단위 의존성 정의 | 병렬·순차 작업 조합 |

외부 에이전트와는 [[A2A]] 프로토콜로 통신한다. (→ [[Multi Agent Architecture]])

## 언제 쓰나

- AWS 스택에서 코드 기반 에이전트를 빠르게 만들 때 (Bedrock Agents Classic의 후속 표준 조합)
- 그래프·체인 정의 오버헤드 없이 모델 추론에 루프를 맡기고 싶을 때
- MCP 도구 생태계를 그대로 활용하고, 배포는 [[Bedrock AgentCore]]로 넘길 때

https://strandsagents.com/

## 관련 노트

- [[Bedrock AgentCore]]
- [[Bedrock Agents]]
- [[Bedrock Agents 개발 가이드]]
- [[ReAct]]
- [[Tool Calling]]
- [[MCP]]
- [[A2A]]
- [[Multi Agent Architecture]]
- [[OpenAI Agents SDK]]
