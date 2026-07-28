---
tags: [AI-Agent, RAG, 아키텍처, 패턴]
---

# Agentic RAG

> 한 줄 정의
> 정적인 "검색 → 생성" 파이프라인을 넘어, 자율 에이전트가 추론 루프 안에서 **언제·무엇을·어떻게 검색할지** 스스로 판단하며 검색을 계획·반복·검증하는 RAG. (Survey, 2025)

## 기존 RAG와의 차이

| | Naive RAG | Agentic RAG |
|---|---|---|
| 검색 | 1회 고정 | 에이전트가 필요에 따라 반복 |
| 쿼리 | 원문 그대로 | 재작성·분해 |
| 소스 | 단일 인덱스 | 여러 소스를 도구로 선택 |
| 검증 | 없음 | 근거 충분성 자기평가 |

핵심 전환은 검색 결정을 파이프라인 규칙이 아니라 **모델의 추론 궤적(reasoning trajectory)** 안에 내장하는 것이다. [[Reflection]]·[[Planning]]·도구 사용([[Function Calling]])·멀티에이전트 협업 같은 에이전트 패턴을 RAG에 결합한다.

## 아키텍처 분류

### 단일 에이전트 (Router 중심)
하나의 에이전트가 여러 retriever·외부 도구를 보유하고, 질의에 맞춰 어떤 소스를 쓸지 라우팅한 뒤 필요하면 반복 검색한다. 구현이 단순하고 [[Adaptive RAG]]·[[Routing]]과 직접 맞닿는다.

### 멀티 에이전트
검색·추론·합성을 **전문화된 에이전트들이 분담**한다. 예: 검색 담당 / 평가 담당 / 종합 담당으로 나누고 결과를 취합. 복잡한 다중 소스·다중 단계 과제에 강하다 → [[Multi Agent Architecture]] · [[Agent Handoff]].

### 추론 패러다임별 변형
| 유형 | 동작 |
|------|------|
| **Route-based** | 컨텍스트·모델 불확실성에 따라 검색을 선택적으로 트리거 |
| **Loop-based** | 검색–추론–재검색을 충분한 근거가 모일 때까지 반복(multi-hop) |
| **Tree-based** | 정보를 계층적으로 조직해 탐색 |
| **Hybrid-Modular** | 특화 모듈을 조립한 유연하지만 규칙 기반의 워크플로우 → [[Modular RAG]] |

## 에이전트가 하는 판단

- **쿼리 라우팅**: 어떤 인덱스·도구를 쓸지 결정 → [[Routing]]
- **쿼리 변형**: 모호한 질의를 재작성·분해 → [[Query Transformation]]
- **반복 검색**: 결과가 부족하면 다시 검색(retrieve–reason–retrieve) → [[ReAct]]
- **자기검증**: 근거가 충분한지 평가 후 보강 → [[Reflection]] · [[Grounding]]

## 다른 RAG 아키텍처와의 관계

- [[Self-RAG]]·[[Corrective RAG]]: 검색 품질을 스스로 판단/교정 — Agentic RAG의 자기검증을 좁게 특화한 형태.
- [[Adaptive RAG]]: 질의 복잡도 라우팅 — 단일 에이전트 route-based와 같은 사고.
- [[Modular RAG]]: 교체 가능한 모듈을 에이전트가 루프로 엮으면 Agentic RAG가 된다.
- 다단계 연구로 확장하면 [[Deep Research]] 패턴이 된다.

## 관련 노트

- [[RAG Architecture]]
- [[Modular RAG]]
- [[Self-RAG]]
- [[Adaptive RAG]]
- [[ReAct]]
- [[Query Transformation]]
- [[Routing]]
- [[Deep Research]]
