---
tags: [AI-Agent, RAG]
---

# Contextual Retrieval

> 한 줄 정의
> 청크를 임베딩·색인하기 전에, LLM으로 "문서 전체에서 이 청크가 갖는 맥락" 설명을 청크 앞에 덧붙여 검색 정확도를 높이는 기법. Anthropic이 2024년 제시했다.

## 해결하려는 문제

청킹을 하면 개별 청크가 맥락을 잃는다.

> 원본 청크: "그 회사의 매출은 전분기 대비 3% 증가했다."
> → 어느 회사? 어느 시점? 청크만으로는 알 수 없어 검색이 빗나간다.

## 방법

각 청크마다 LLM이 문서 전체를 참고해 맥락 한두 문장을 생성하고, 이를 청크 앞에 붙인다.

```
"[ACME사 2023 3분기 실적 문서 중] 그 회사의 매출은 전분기 대비 3% 증가했다."
```

- **Contextual Embedding**: 맥락이 붙은 청크를 임베딩 → [[Embedding]]
- **Contextual BM25**: 맥락이 붙은 청크로 키워드 색인 → [[BM25]]
- 둘을 결합(하이브리드)하고 [[Re-ranking]]까지 더하면 검색 실패율이 크게 준다 → [[Hybrid Retrieval]]

## 비용

청크마다 LLM 호출이 필요하지만, **프롬프트 캐싱**으로 문서 본문을 재사용해 비용을 낮춘다.

## 관련 노트

- [[Chunking]]
- [[Embedding]]
- [[BM25]]
- [[Hybrid Retrieval]]
- [[Re-ranking]]
- [[Context Engineering]]
