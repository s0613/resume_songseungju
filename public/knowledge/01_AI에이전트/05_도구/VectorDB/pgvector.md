---
tags: [AI-Agent, 도구, VectorDB]
---

# pgvector

> 한 줄 정의
> PostgreSQL을 벡터 데이터베이스로 확장하는 오픈소스 익스텐션. 별도 벡터 DB 없이 기존 RDB 안에서 임베딩 저장·유사도 검색을 한다.

## 특징

- **벡터 컬럼 + 유사도 연산자**: `<->`(L2), `<=>`(코사인), `<#>`(내적)로 최근접 검색.
- **인덱스**: IVFFlat, HNSW 지원.
- **관계형 + 벡터 통합**: 임베딩과 메타데이터를 한 테이블에서 조인·필터. 메타데이터 필터링 RAG에 유리 → [[Hybrid Retrieval]]

## 장점

- 이미 PostgreSQL을 쓰는 팀은 **운영 스택을 늘리지 않고** RAG를 도입.
- 트랜잭션·백업·권한 등 RDB 생태계를 그대로 활용.

## 한계

- 초대규모·초고 QPS 환경에서는 전용 벡터 DB([[Pinecone]], [[Milvus]], [[Qdrant]]) 대비 성능·확장성에 한계.

## 관련 노트

- [[Vector Database]]
- [[PostgreSQL]]
- [[Embedding]]
- [[Hybrid Retrieval]]
