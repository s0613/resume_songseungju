---
tags: [AI-Agent, 도구, VectorDB]
---

# Weaviate

> Weaviate가 Go로 개발한 오픈소스 벡터 데이터베이스. 내장 모듈로 임베딩 생성·하이브리드 검색·생성형 검색까지 통합한 것이 특징이다.

https://weaviate.io/

## 특징

- **호스팅**: 오픈소스(BSD-3) 자체 호스팅과 Weaviate Cloud 매니지드 서비스를 모두 제공한다.
- **인덱스 방식**: HNSW 기반 ANN. 압축(PQ/BQ/SQ)으로 메모리를 절감하며, flat 인덱스 등도 지원한다.
- **하이브리드 검색**: 벡터(밀집)와 키워드(BM25) 검색을 결합한 하이브리드 검색을 1급 기능으로 제공한다.
- **모듈식 통합**: text2vec, generative 등 벡터화·RAG 모듈을 내장해 임베딩 생성과 생성형 답변을 DB 안에서 처리할 수 있다.
- **스키마/객체**: 클래스·속성 기반 데이터 모델과 GraphQL/REST/gRPC API를 제공한다.

## 에이전트/RAG에서의 활용

- 내장 벡터화 모듈로 [[Embedding]] 파이프라인을 단순화한다.
- BM25 + 벡터 하이브리드로 [[Hybrid Retrieval]]을 손쉽게 구현한다.
- generative 모듈로 검색-생성을 묶어 [[RAG Architecture]]를 DB 레벨에서 구성 가능.

## 장단점

- **장점**: 하이브리드 검색·모듈식 통합이 강력, 오픈소스+클라우드 선택지, GraphQL 친화적.
- **단점**: 모듈·스키마 설정 학습 곡선, 자체 호스팅 시 운영 관리 필요.

## 관련 노트

- [[Vector Database]]
- [[Pinecone]]
- [[Qdrant]]
- [[Milvus]]
- [[Hybrid Retrieval]]
- [[RAG Architecture]]
