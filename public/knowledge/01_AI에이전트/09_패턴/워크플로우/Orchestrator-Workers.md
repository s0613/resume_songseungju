---
tags: [AI-Agent, 패턴, 오케스트레이션]
---

# Orchestrator-Workers

> 한 줄 정의
> 중앙 오케스트레이터 LLM이 작업을 **동적으로** 하위 작업으로 쪼개 워커들에게 위임하고, 결과를 종합하는 패턴. Anthropic "Building Effective Agents"의 핵심 패턴 중 하나다.

## Parallelization과의 차이

- [[Parallel Workflow]]: 하위 작업이 **사전에 고정**되어 있다.
- **Orchestrator-Workers**: 하위 작업이 **입력에 따라 런타임에 결정**된다. 몇 개로 쪼갤지, 무엇을 시킬지 오케스트레이터가 판단.

## 흐름

```
Orchestrator: 작업 분해 → Workers(병렬 수행) → Orchestrator: 결과 종합
```

## 적용 예

- 코드 변경을 여러 파일에 분산 수정.
- [[Deep Research]]: 하위 질문별 검색을 워커에 분배.
- 복잡한 문서를 섹션별로 생성 후 통합.

## Supervisor와의 관계

[[Supervisor Pattern]]과 유사하지만, 오케스트레이터가 **분해와 최종 합성까지** 책임진다는 점이 강조된다. 워커를 외부 에이전트로 두면 [[A2A]]로 확장된다.

## 관련 노트

- [[Supervisor Pattern]]
- [[Parallel Workflow]]
- [[Deep Research]]
- [[Multi Agent Architecture]]
- [[A2A]]
