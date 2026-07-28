---
tags: [AI-Agent, 패턴]
---

# Deep Research

> 한 줄 정의
> 하나의 질의를 여러 하위 질문으로 분해해 다수 출처를 병렬 검색·교차검증하고, 인용이 달린 종합 보고서로 합성하는 에이전트 패턴. OpenAI/Gemini/Perplexity Deep Research, Claude Research가 대표적이다.

## 동작 루프

```
계획(쿼리 분해) → 병렬 검색·수집 → 교차검증·적대적 확인 → 반성·갭 보강 → 합성(인용 포함)
```

1. **계획**: 질문을 답 가능한 하위 질문들로 분해 → [[Planning]]
2. **수집**: 하위 질문별로 검색·페이지 fetch를 **병렬** 실행 → [[Parallel Workflow]]
3. **검증**: 출처 간 사실을 교차 확인하고 모순·약한 근거를 거른다.
4. **반성**: 빠진 부분을 찾아 추가 검색 라운드를 돈다 → [[Reflection]]
5. **합성**: 근거를 인용해 구조화된 보고서로 정리.

## 아키텍처 구성

전형적으로 **Orchestrator-Workers + Reflection**의 결합이다.

- **Planner / Orchestrator**: 분해와 라운드 제어 → [[Supervisor Pattern]]
- **병렬 Worker**: 검색·수집 담당 (여러 출처를 동시에)
- **Synthesizer**: 검증된 근거를 보고서로 합성

## 핵심 과제

- **근거·인용**: 모든 주장에 출처를 매달아 환각을 억제한다 → [[Grounding]] · [[Hallucination Detection]]
- **토큰 폭증 관리**: 수집 자료가 많아 컨텍스트가 빠르게 찬다. 압축·요약·선별이 필수 → [[Context Engineering]] · [[Re-ranking]]
- **종료 조건**: 무한 검색 방지를 위한 라운드·예산 한도 → [[가드레일]]

## 관련 노트

- [[Planning]]
- [[Reflection]]
- [[Parallel Workflow]]
- [[Supervisor Pattern]]
- [[RAG Architecture]]
- [[Grounding]]
- [[Reasoning Model]]
