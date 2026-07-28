---
tags: [AI-Agent, RAG, 아키텍처]
---

# Modular RAG

> 한 줄 정의
> RAG를 "검색 → 생성" 단일 파이프라인이 아니라, **교체·재배열 가능한 모듈들의 조합**으로 보는 아키텍처. RAG 발전사의 3세대(Naive → Advanced → Modular)에 해당한다.

## RAG 3세대 진화

| 세대 | 구조 | 한계 |
|------|------|------|
| **Naive RAG** | 검색 1회 → 프롬프트 주입 → 생성 1회 | 검색 품질에 답변이 그대로 종속, 무관 문서·환각 |
| **Advanced RAG** | 검색 전후에 최적화 추가 (쿼리 재작성·[[Re-ranking]]·[[Chunking]] 개선) | 여전히 고정된 선형 흐름 |
| **Modular RAG** | 기능을 독립 모듈로 분해하고 흐름을 동적으로 조립 | 오케스트레이션 복잡도↑ |

## 핵심 아이디어

검색·생성 과정을 **표준 인터페이스를 가진 모듈**로 쪼갠다.

- **Query 모듈**: 라우팅·재작성·분해 → [[Query Transformation]] · [[Routing]]
- **Retrieve 모듈**: 벡터·키워드·그래프 등 교체 가능 → [[Hybrid Retrieval]] · [[GraphRAG]]
- **Rerank/Refine 모듈**: 후보 정제 → [[Re-ranking]]
- **Generate 모듈**: 답변 합성
- **Orchestrator**: 위 모듈을 조건·반복·분기로 엮음 → [[Orchestrator-Workers]]

모듈을 루프로 묶으면 자기교정형([[Self-RAG]] · [[Corrective RAG]])·에이전트형([[Agentic RAG]])으로 자연스럽게 확장된다.

## 왜 중요한가

- 컴포넌트를 **독립적으로 교체·튜닝·평가**할 수 있다.
- 질의 유형별로 다른 흐름을 조립 → [[Adaptive RAG]]의 토대.
- 2025~2026 프로덕션 RAG의 사실상 기본 골격.

## 관련 노트

- [[RAG Architecture]]
- [[Agentic RAG]]
- [[Adaptive RAG]]
- [[Self-RAG]]
- [[Corrective RAG]]
- [[Orchestrator-Workers]]
