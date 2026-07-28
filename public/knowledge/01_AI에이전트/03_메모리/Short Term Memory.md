---
tags: [AI-Agent, 메모리]
last-reviewed: 2026-07-27
---

# Short Term Memory

> 현재 진행 중인 대화·작업에 주입되는 활성 기억. 원문은 영속 DB에 보관할 수 있지만 모델 컨텍스트에는 세션 범위의 대화 이력·요약으로 제한한다.

## 핵심 개념

단기 기억(working memory라고도 부른다)은 에이전트가 "지금 하고 있는 일"의 맥락을 담는 계층이다. LLM은 무상태이므로, 직전 대화 내용을 기억하는 것처럼 보이는 동작은 사실 매 호출마다 이전 메시지들을 다시 프롬프트에 포함시켜 주기 때문이다. 즉 단기 기억의 본질은 **컨텍스트 윈도우에 담기는 대화 히스토리**다.

특징:

- **세션 범위**: 현재 대화에 필요한 활성 맥락이다. 운영 서비스는 복원을 위해 원문을 영속 DB에 보관할 수 있지만, 물리적으로 저장됐다는 이유만으로 장기 기억이 되지는 않는다.
- **용량 제한**: 컨텍스트 윈도우 토큰 한도에 묶인다. 대화가 길어지면 오래된 메시지가 잘려 나간다.
- **직접 주입**: DB/캐시에서 활성 window를 복원한 뒤에는 별도 의미 검색 없이 프롬프트에 넣는다.

## 저장 방식

가장 단순한 형태는 메시지 객체의 리스트(역할·내용)를 인메모리에 들고 있다가 매 호출 시 전달하는 것이다. 운영 대화형 서비스에서는 DB의 대화 원장을 기준으로 필요한 구간을 복원하고 Redis·인메모리는 선택적 window/cache로 쓴다. 어떤 물리 저장소를 사용하더라도 모델에 전달하는 단기 기억은 다음 전략으로 제한한다.

- **Buffer**: 전체 대화를 그대로 보관 (짧은 세션용).
- **Window (sliding)**: 최근 N개 메시지만 유지.
- **Summary**: 오래된 메시지를 LLM으로 요약해 압축 보관.
- **Token-limited**: 토큰 예산을 넘기지 않는 범위에서 최신 메시지 유지.

## 구현 예시

```python
# LangChain 스타일 대화 버퍼
from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=10)  # 최근 10턴 유지
memory.save_context({"input": "내 이름은 지수야"},
                    {"output": "반가워요, 지수님!"})

# 다음 호출 시 history를 프롬프트에 주입
history = memory.load_memory_variables({})
```

[[02_오케스트레이션/LangGraph|LangGraph (오케스트레이션)]]에서는 그래프 상태(State) 객체에 메시지 리스트를 누적해 단기 기억을 표현하며, 이는 [[State Management]]와 직접 연결된다.

## 활용

- 멀티턴 대화에서 직전 발화·지시 사항 참조.
- 진행 중인 [[ReAct]]의 도구 trajectory·중간 관찰·명시적 작업 상태 보존.
- 도구 호출 결과를 다음 단계 입력으로 연결.

긴 작업에서는 요약 전략으로 토큰을 절약하면서도 핵심 맥락을 잃지 않는 [[Context Engineering]]이 중요하다. 세션을 넘겨 기억해야 할 정보는 단기 기억에 두지 말고 장기 기억으로 옮긴다.

대화 원장·캐시·장기 기억의 책임과 user 턴 선저장 순서는 [[프로덕션 대화형 에이전트 요청 생명주기]]를 따른다.

## 관련 노트

- [[Memory Architecture]]
- [[Long Term Memory]]
- [[State Management]]
- [[Context Engineering]]
- [[02_오케스트레이션/LangGraph|LangGraph (오케스트레이션)]]
- [[프로덕션 대화형 에이전트 요청 생명주기]]
