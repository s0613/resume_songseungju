---
tags: [AI-Agent, 패턴]
---

# Plan-and-Execute

> 한 줄 정의
> 매 스텝마다 LLM을 호출하는 [[ReAct]]과 달리, 먼저 전체 계획을 세운 뒤(Planner) 단계들을 실행(Executor)하는 패턴.

## 구조

```
Planner(전체 계획 수립) → Executor(단계별 실행) → [재계획] → 종료
```

- **Planner**: 목표를 하위 단계 목록으로 분해.
- **Executor**: 각 단계를 도구로 수행.
- **Re-planning**: 실행 결과를 보고 남은 계획을 수정.

## 장점

- **호출 수·비용 절감**: 매 행동마다 전체 추론을 반복하지 않는다.
- **긴 호라이즌 일관성**: 계획이 명시적이라 중간에 길을 잃지 않는다.
- **모델 분리**: 계획에 큰 [[Reasoning Model]], 실행에 작은 모델을 쓸 수 있다.

## 변형

- **ReWOO**: 추론(계획)을 관측과 분리하고, 변수 치환으로 도구 호출을 한 번에 묶는다.
- **LLMCompiler**: 작업을 DAG로 만들어 의존성 없는 단계를 병렬 실행 → [[Parallel Workflow]]

## 관련 노트

- [[Planning]]
- [[ReAct]]
- [[Parallel Workflow]]
- [[Reasoning Model]]
- [[Orchestrator-Workers]]
