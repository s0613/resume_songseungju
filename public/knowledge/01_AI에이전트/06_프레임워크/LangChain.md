---
tags: [AI-Agent, 프레임워크]
---

# LangChain

> LLM 애플리케이션을 위한 컴포넌트·체인 추상화 프레임워크. Harrison Chase가 2022년 시작했으며 Python·JavaScript 양쪽을 지원한다.

LLM 호출, 프롬프트, 도구, 메모리, 검색(RAG) 등을 표준 인터페이스로 묶어 "체인(chain)"으로 조합하는 것이 핵심이다. 가장 오래되고 생태계가 넓은 프레임워크로, 수많은 모델·벡터DB·도구 통합(integration)을 제공한다.

## 특징

- **광범위한 통합(integration)**: 거의 모든 LLM, 임베딩, 벡터DB, 외부 API에 대한 래퍼 제공
- **LCEL (LangChain Expression Language)**: `|` 파이프 연산자로 컴포넌트를 선언적으로 합성
- **모듈형 구조**: `langchain-core`(추상화), `langchain`(체인·에이전트), 파트너 패키지(`langchain-openai` 등)로 분리
- **에이전트보다 체인이 출발점**: 정해진 흐름(체인) + 필요 시 LLM이 흐름을 결정(에이전트)
- 복잡한 상태/순환 제어는 상위 라이브러리인 [[LangGraph]]에 위임하는 방향으로 진화

## 핵심 개념/구성요소

- **LLM / ChatModel**: 모델 호출 인터페이스
- **PromptTemplate**: 변수 치환 가능한 프롬프트
- **Tool**: 에이전트가 호출하는 함수 (→ [[Tool Calling]])
- **Retriever / VectorStore**: RAG용 검색기 (→ [[RAG Architecture]])
- **Memory**: 대화 이력 보존
- **Chain / Runnable**: 합성 가능한 실행 단위

```python
# LCEL: 프롬프트 → 모델 → 파서를 파이프로 합성
chain = prompt | model | output_parser
chain.invoke({"question": "..."})
```

## 멀티에이전트 지원

LangChain 자체는 단일 에이전트(또는 단순 체인) 중심이다. 본격적인 멀티에이전트 오케스트레이션(상태 공유, 순환, 분기, [[Supervisor Pattern]])은 같은 진영의 [[LangGraph]]를 사용하는 것이 권장된다. 즉 LangChain은 "부품 라이브러리", LangGraph는 "조립·제어 엔진" 역할로 분업한다.

## 장단점

- 장점: 방대한 통합, 풍부한 자료, 빠른 프로토타이핑, RAG 구성 용이
- 단점: 추상화 레이어가 많아 디버깅이 까다롭고, 버전 변화가 잦아 API가 자주 바뀜. 복잡한 제어 흐름엔 부적합 → LangGraph로 보완

https://www.langchain.com

## 관련 노트

- [[LangGraph]]
- [[RAG Architecture]]
- [[Tool Calling]]
- [[ReAct]]
- [[Single Agent vs Multi Agent]]
- [[Agent Architecture]]
