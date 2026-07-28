---
tags: [AI-Agent, 도구, VectorDB]
---

# Qdrant

> Qdrant가 Rust로 개발한 오픈소스 벡터 데이터베이스 및 검색 엔진. 자체 호스팅과 매니지드 클라우드를 모두 제공한다.

https://qdrant.tech/

## 특징

- **호스팅**: 오픈소스(Apache 2.0)로 자체 호스팅 가능하며, Qdrant Cloud 매니지드 서비스도 제공한다.
- **인덱스 방식**: HNSW 기반 ANN 인덱싱. 스칼라/프로덕트 양자화(quantization)로 메모리 사용량과 속도를 조절할 수 있다.
- **하이브리드 검색**: 밀집 + 희소 벡터, 멀티벡터를 결합한 하이브리드 검색과 강력한 페이로드(메타데이터) 필터링을 지원한다.
- **성능**: Rust 구현으로 빠르고 메모리 효율적이며, 분산 클러스터링으로 수평 확장된다.
- gRPC/REST API, 주요 언어 클라이언트와 LangChain·LlamaIndex 통합 제공.

## 에이전트/RAG에서의 활용

- [[Embedding]]과 풍부한 메타데이터를 함께 저장해 필터링 기반 검색을 구성한다.
- 희소+밀집 하이브리드로 [[Hybrid Retrieval]]을 구현하고 [[Re-ranking]]과 결합한다.
- 에이전트의 장기 기억(메모리) 저장소나 [[RAG Architecture]] 백엔드로 활용.

## 장단점

- **장점**: 오픈소스 + 클라우드 양자택일, 빠른 성능, 강력한 메타데이터 필터, 양자화로 비용 절감.
- **단점**: 자체 호스팅 시 운영·확장 관리 필요, 매니지드형 대비 초기 설정 부담.

## 관련 노트

- [[Vector Database]]
- [[Pinecone]]
- [[Weaviate]]
- [[Milvus]]
- [[Hybrid Retrieval]]
- [[RAG Architecture]]
