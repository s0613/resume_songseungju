---
tags: [AI-Agent, RAG]
---

# Query Transformation

> 한 줄 정의
> 사용자의 원 질의를 검색에 유리한 형태로 변형하는 기법들의 묶음. 질의와 문서 사이의 표현 격차를 줄여 검색 재현율·정확도를 높인다.

## 주요 기법

- **Query Rewriting**: 모호하거나 구어체인 질의를 명확하게 다시 쓴다.
- **Query Decomposition**: 복합 질문을 답 가능한 하위 질문들로 분해한다 → [[Deep Research]]
- **Multi-query**: 한 질의를 여러 변형으로 만들어 각각 검색하고 결과를 통합(재현율↑).
- **HyDE (Hypothetical Document Embeddings)**: LLM이 가상의 정답 문서를 먼저 생성하고, 그 임베딩으로 검색한다. 질의-문서 의미 격차를 완화 → [[Embedding]]
- **Step-back Prompting**: 더 일반적인 상위 질문으로 추상화해 배경 지식을 먼저 검색한다.

## 에이전트와의 관계

[[Agentic RAG]]에서 에이전트가 검색 전에 자동으로 수행하는 핵심 단계다. 결과는 [[Re-ranking]]으로 다시 선별한다.

## 관련 노트

- [[RAG Architecture]]
- [[Embedding]]
- [[Agentic RAG]]
- [[Re-ranking]]
- [[Deep Research]]
