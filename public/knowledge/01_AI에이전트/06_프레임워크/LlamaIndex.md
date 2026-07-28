---
tags: [AI-Agent, 프레임워크, RAG]
---

# LlamaIndex

> 한 줄 정의
> 데이터 연결과 RAG에 특화된 프레임워크. 인덱싱·검색 파이프라인이 강점이며, 점차 에이전트·워크플로우 기능으로 확장됐다.

## 핵심 파이프라인

```
Data Connector(LlamaHub) → Index → Retriever → Query Engine
```

- **Data Connector**: 다양한 소스(PDF, Notion, DB, API)를 문서로 적재.
- **Index**: Vector / Knowledge Graph / Summary 등 용도별 인덱스 → [[Vector Database]] · [[Chunking]]
- **Query Engine**: 검색 + 합성을 묶은 질의 인터페이스.

## 에이전트 기능

- **FunctionAgent / ReActAgent**: 도구를 쓰는 에이전트 → [[ReAct]]
- **AgentWorkflow**: 이벤트 기반 멀티에이전트 오케스트레이션.
- **QueryEngine를 도구로** 노출해 [[Agentic RAG]]를 구성.

## LangChain과의 비교

| | 초점 |
|---|---|
| [[LangChain]] | 범용 LLM 오케스트레이션 |
| **LlamaIndex** | 데이터 적재·인덱싱·RAG 중심 |

## 관련 노트

- [[RAG Architecture]]
- [[Vector Database]]
- [[Chunking]]
- [[Agentic RAG]]
- [[LangChain]]
