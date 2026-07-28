---
tags: [AI-Agent, 프레임워크]
---

# AutoGen

> Microsoft Research가 만든 멀티에이전트 대화(conversation) 프레임워크. 여러 에이전트가 메시지를 주고받으며 협업해 작업을 푸는 데 초점을 둔다.

핵심 비유는 "에이전트들의 대화"다. 사람·LLM·도구를 모두 "대화에 참여하는 에이전트"로 추상화하고, 이들이 메시지를 교환하면서 문제를 해결한다. 코드 실행 에이전트를 포함해 자동 코딩·디버깅 루프에 특히 강하다.

## 특징

- **대화 중심(conversation-driven)** 오케스트레이션: 흐름을 명시적 그래프 대신 에이전트 간 메시지 교환으로 정의
- **코드 실행 내장**: `UserProxyAgent`가 LLM이 작성한 코드를 실행하고 결과를 되돌려주는 루프
- **human-in-the-loop**: 사람을 대화 참여자로 끼워 넣어 승인·개입 가능
- **v0.4 재설계**: 비동기·이벤트 기반 액터 모델 아키텍처로 전환, 확장성·관측성 강화
- **AutoGen Studio**: 코드 없이 에이전트 팀을 구성하는 GUI 도구

## 핵심 개념/구성요소

- **AssistantAgent**: LLM 기반으로 답·코드를 생성하는 에이전트
- **UserProxyAgent**: 사용자 대리인. 코드 실행, 사람 입력 대리
- **GroupChat / GroupChatManager**: 여러 에이전트의 대화를 조율 (발언 순서 결정)
- **메시지**: 에이전트 간 통신 단위

```python
# 두 에이전트가 대화하며 문제 해결
assistant = AssistantAgent("assistant", llm_config=...)
user = UserProxyAgent("user", code_execution_config=...)
user.initiate_chat(assistant, message="데이터를 분석해줘")
```

## 멀티에이전트 지원

AutoGen은 멀티에이전트를 1급 시민으로 설계한 프레임워크다. `GroupChat`으로 여러 전문 에이전트를 모아 매니저가 발언권을 배분하는 [[Supervisor Pattern]]과 [[Agent Handoff]]를 자연스럽게 표현한다. LangGraph가 그래프로 제어 흐름을 고정한다면, AutoGen은 LLM 매니저가 동적으로 대화 흐름을 결정한다.

## 언제 쓰나

- 자동 코드 생성·실행·디버깅 루프
- 여러 역할의 에이전트가 토론·협상하며 답을 좁혀가는 작업
- Microsoft/Azure 생태계와 연계

https://microsoft.github.io/autogen/

## 관련 노트

- [[Multi Agent Architecture]]
- [[Supervisor Pattern]]
- [[Agent Handoff]]
- [[CrewAI]]
- [[Agno]]
- [[LangGraph]]
- [[Single Agent vs Multi Agent]]
