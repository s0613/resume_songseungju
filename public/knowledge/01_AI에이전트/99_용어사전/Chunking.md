---
tags: [AI-Agent, 용어사전]
---

# Chunking

> 긴 문서를 검색·임베딩하기 좋은 작은 조각(chunk)으로 나누는 전처리 과정.

## 정의

청킹은 RAG 파이프라인에서 원문을 일정 크기의 단위로 분할하는 작업이다. 청크가 너무 크면 노이즈가 섞이고 임베딩 정밀도가 떨어지며, 너무 작으면 맥락이 끊긴다. 고정 크기, 문장/문단 경계, 의미 기반(semantic) 분할 등이 있고, 맥락 유지를 위해 청크 간 **오버랩(overlap)**을 두기도 한다.

## 관련 노트

- [[Chunking]]
- [[Embedding]]
- [[Vector Database]]
- [[RAG Architecture]]
- [[Context Engineering]]
