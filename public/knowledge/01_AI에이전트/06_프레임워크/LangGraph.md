---
tags: [AI-Agent, 프레임워크]
---

# LangGraph

> LangChain 진영(LangChain Inc.)이 만든 그래프 기반 에이전트 오케스트레이션 프레임워크. 에이전트 흐름을 노드와 엣지로 이루어진 상태 그래프(state graph)로 표현한다.

LangChain이 "부품 라이브러리"라면 LangGraph는 그 위에서 **순환(loop)·분기(branch)·상태 공유**가 필요한 복잡한 에이전트 흐름을 제어하는 엔진이다. 체인의 선형성을 넘어, 명시적 그래프로 제어 흐름을 다룬다.

> 그래프 메커니즘(노드/엣지/상태 갱신/체크포인트 등) 상세는 [[02_오케스트레이션/LangGraph|LangGraph (오케스트레이션)]] 노트를 참조. 여기서는 프레임워크 포지셔닝에 집중한다.

## 특징

- **그래프 = 제어 흐름**: 노드(작업), 엣지(전이), 조건부 엣지(분기)로 흐름을 명시적으로 정의
- **상태 중심**: 공유 State 객체를 노드들이 읽고 갱신 (→ [[State Management]])
- **순환 지원**: 체인과 달리 사이클 허용 → [[ReAct]], [[Reflection]] 루프를 자연스럽게 구현
- **체크포인트/지속성**: 상태 저장으로 중단·재개, human-in-the-loop 가능
- LangChain 컴포넌트(모델·도구·리트리버)를 그대로 노드 안에서 사용

## 핵심 개념/구성요소

- **StateGraph**: 그래프 정의 진입점
- **Node**: 상태를 입력받아 갱신분을 반환하는 함수/에이전트
- **Edge / Conditional Edge**: 다음 노드 결정 (→ [[Conditional Workflow]])
- **State (TypedDict)**: 그래프를 흐르는 공유 상태
- **Checkpointer**: 상태 영속화

```python
graph = StateGraph(State)
graph.add_node("agent", agent_fn)
graph.add_node("tools", tool_fn)
graph.add_conditional_edges("agent", route)  # 도구 호출 여부로 분기
graph.add_edge("tools", "agent")             # 순환
app = graph.compile()
```

## 멀티에이전트 지원

멀티에이전트의 1순위 선택지다. 각 에이전트를 노드로 두고 엣지로 연결해 [[Supervisor Pattern]], [[Agent Handoff]], [[Parallel Workflow]]를 구현한다. CrewAI/AutoGen이 고수준 추상화로 빠른 구성에 강하다면, LangGraph는 흐름을 **저수준에서 정밀 제어**하는 데 강하다.

## 언제 쓰나

- 순환·조건 분기·상태 공유가 필요한 복잡한 에이전트
- 정밀한 제어와 디버깅, 중단/재개·승인 단계가 중요할 때
- 이미 LangChain 생태계를 쓰고 있을 때

https://langchain-ai.github.io/langgraph/

## 관련 노트

- [[02_오케스트레이션/LangGraph|LangGraph (오케스트레이션)]]
- [[LangChain]]
- [[State Management]]
- [[Supervisor Pattern]]
- [[Conditional Workflow]]
- [[Multi Agent Architecture]]
- [[ReAct]]
