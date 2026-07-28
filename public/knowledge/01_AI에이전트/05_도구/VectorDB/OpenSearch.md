---
tags: [AI-Agent, 도구, VectorDB]
---

# OpenSearch

> Elasticsearch에서 포크되어 시작된 오픈소스 검색·분석 엔진. 전통적 텍스트 검색에 k-NN 벡터 검색을 더해 RAG에 활용되는 하이브리드 플랫폼이다.

https://opensearch.org/

## 특징

- **호스팅**: 오픈소스(Apache 2.0) 자체 호스팅과 Amazon OpenSearch Service 매니지드 서비스를 모두 제공한다.
- **인덱스 방식**: k-NN 플러그인으로 HNSW, IVF 등 ANN 인덱싱을 지원한다(엔진: nmslib, Faiss, Lucene). 양자화로 메모리도 절감.
- **하이브리드 검색**: 본래 강력한 BM25 키워드 검색에 벡터 검색을 결합한 하이브리드 검색을 1급 기능으로 제공한다. 정교한 필터·집계·쿼리 DSL이 강점.
- **부가 기능**: 풀텍스트 검색, 로그/관측성 분석, 대시보드, ML 커넥터·뉴럴 검색 파이프라인.

## 에이전트/RAG에서의 활용

- 기존 검색 인프라를 그대로 쓰면서 [[Embedding]] 기반 벡터 검색을 추가해 RAG로 확장한다.
- BM25 + 벡터 하이브리드로 [[Hybrid Retrieval]]을 자연스럽게 구현한다.
- 풍부한 쿼리 DSL로 메타데이터 필터링·집계가 필요한 [[RAG Architecture]]에 적합.

## 장단점

- **장점**: 키워드+벡터 하이브리드 강점, 검색·로그 분석 통합 플랫폼, 오픈소스+AWS 매니지드.
- **단점**: 순수 벡터 전용 DB 대비 벡터 검색 성능·운영 단순성이 떨어질 수 있고, 클러스터 운영 복잡도가 높다.

## 관련 노트

- [[Vector Database]]
- [[Pinecone]]
- [[Qdrant]]
- [[Weaviate]]
- [[Milvus]]
- [[Hybrid Retrieval]]
