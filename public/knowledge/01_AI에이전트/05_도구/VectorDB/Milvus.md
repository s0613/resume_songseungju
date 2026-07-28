---
tags: [AI-Agent, 도구, VectorDB]
---

# Milvus

> Zilliz가 주도하는 오픈소스 벡터 데이터베이스. 대규모·고성능 벡터 검색에 초점을 둔 클라우드 네이티브 분산 아키텍처가 특징이다.

https://milvus.io/

## 특징

- **호스팅**: 오픈소스(Apache 2.0) 자체 호스팅과 Zilliz Cloud 매니지드 서비스를 제공한다. 경량 임베디드 버전(Milvus Lite)도 있다.
- **인덱스 방식**: 다양한 인덱스를 폭넓게 지원 — HNSW, IVF(IVF_FLAT/IVF_PQ 등), DiskANN, GPU 인덱스 등. 워크로드에 맞춰 선택·튜닝할 수 있다.
- **하이브리드 검색**: 밀집 + 희소 벡터를 결합한 하이브리드 검색과 스칼라 필드 필터링을 지원한다.
- **아키텍처**: 스토리지-컴퓨트 분리의 분산 설계로 수십억 규모 벡터까지 수평 확장된다.
- 다중 언어 SDK와 LangChain·LlamaIndex 통합 제공.

## 에이전트/RAG에서의 활용

- 대규모 [[Embedding]] 컬렉션을 저장·검색하는 [[RAG Architecture]] 백엔드.
- 인덱스 종류를 골라 정확도-속도-비용 균형을 세밀하게 맞출 수 있다.
- 희소+밀집 하이브리드로 [[Hybrid Retrieval]]을 구성하고 [[Re-ranking]]과 결합.

## 장단점

- **장점**: 초대규모 확장성, 인덱스 선택지 풍부, GPU 가속, 오픈소스+클라우드.
- **단점**: 분산 운영 복잡도가 높음(소규모엔 과함), 자체 호스팅 시 인프라 부담.

## 관련 노트

- [[Vector Database]]
- [[Pinecone]]
- [[Qdrant]]
- [[Weaviate]]
- [[Hybrid Retrieval]]
- [[RAG Architecture]]
