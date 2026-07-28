---
tags: [AI-Agent, RAG]
---

# Vector Database

> 고차원 임베딩 벡터를 저장하고 유사도 기반 근접 검색(ANN)을 수행하는 데이터베이스.

## 핵심 개념

전통적 DB가 정확한 값 일치(`WHERE id = 1`)로 조회한다면, 벡터 DB는 **벡터 간 유사도**로 검색한다. 질의 벡터가 주어지면 저장된 수백만 개의 벡터 중 가장 가까운 상위 K개를 반환한다(Top-K 검색). RAG 파이프라인에서 [[Embedding]]된 청크를 저장하는 핵심 저장소다.

## 동작 원리

### ANN (근사 최근접 이웃)
모든 벡터와 거리를 일일이 비교하는 정확한 탐색(brute-force)은 데이터가 커지면 비현실적이다. 그래서 정확도를 약간 희생하고 속도를 크게 얻는 **근사(approximate)** 알고리즘을 쓴다.

- **HNSW (Hierarchical Navigable Small World)**: 다층 그래프를 탐색. 정확도·속도 균형이 좋아 가장 널리 쓰임.
- **IVF (Inverted File Index)**: 벡터 공간을 클러스터로 나눠 일부 클러스터만 탐색.
- **PQ (Product Quantization)**: 벡터를 압축해 메모리를 절감.

### 메타데이터 필터링
벡터 검색과 함께 메타데이터 조건(`category = "법률"`, 날짜 범위 등)을 결합해 검색 범위를 좁힌다. [[Hybrid Retrieval]]과 정밀 검색에 중요하다.

## 주요 구성 요소

- **인덱스**: 빠른 검색을 위한 자료구조(HNSW 등).
- **거리 측정**: 코사인 / 내적 / L2 중 선택.
- **컬렉션/네임스페이스**: 벡터 논리적 그룹.
- **페이로드(메타데이터)**: 원문, 출처, 태그 등 부가 정보.

## 대표 제품

- **[[Pinecone]]**: 완전 관리형 SaaS, 운영 부담 최소.
- **[[Qdrant]]**: Rust 기반 오픈소스, 풍부한 필터링.
- **[[Weaviate]]**: 하이브리드 검색·모듈 내장.
- **[[Milvus]]**: 대규모 분산 처리에 강점.
- **[[OpenSearch]]**: 기존 검색엔진에 벡터 기능 추가, BM25 결합 용이.
- 그 외 pgvector(PostgreSQL 확장), Chroma 등.

## 선택 기준

데이터 규모, 관리형 vs 셀프호스팅, 필터링 요구, 하이브리드 검색 지원, 비용을 종합해 결정한다.

## 관련 노트

- [[Embedding]]
- [[Chunking]]
- [[Hybrid Retrieval]]
- [[Re-ranking]]
- [[RAG Architecture]]
- [[Vector Search]] (용어사전)
