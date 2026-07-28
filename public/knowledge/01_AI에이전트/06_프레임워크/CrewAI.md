---
tags: [AI-Agent, 프레임워크]
---

# CrewAI

> 역할 기반 멀티에이전트 협업을 직관적으로 구성하는 Python 프레임워크. João Moura가 만들었으며, 다른 프레임워크에 의존하지 않는 독립(lean) 구현이다.

"크루(crew)"라는 비유가 핵심이다. 각 에이전트에 **역할(role)·목표(goal)·배경(backstory)**을 부여하고, 이들에게 **태스크(task)**를 할당해 한 팀처럼 협업시킨다. 직관적인 추상화로 멀티에이전트를 빠르게 세우는 데 강점이 있다.

## 특징

- **역할 기반 설계**: 에이전트를 "리서처", "작가" 같은 페르소나로 정의 → 프롬프트 엔지니어링을 구조화
- **두 가지 모드**: 자율 협업 중심의 **Crews** + 정밀한 제어 흐름을 위한 이벤트 기반 **Flows**
- **프로세스 모델**: `sequential`(순차) / `hierarchical`(매니저가 위임) 실행 방식 선택
- **독립 구현**: LangChain 등에 종속되지 않아 가볍고 일관적
- 도구(Tool), 메모리, 산출물 검증 등 협업에 필요한 기능 내장

## 핵심 개념/구성요소

- **Agent**: role·goal·backstory를 가진 작업자 (→ [[Agent]])
- **Task**: 에이전트에게 맡길 작업 단위 (설명 + 기대 산출물)
- **Crew**: 에이전트 + 태스크 + 프로세스의 묶음
- **Process**: 실행 방식(sequential / hierarchical)
- **Tool**: 에이전트가 사용할 도구 (→ [[Tool Calling]])

```python
researcher = Agent(role="리서처", goal="주제 조사", tools=[...])
writer = Agent(role="작가", goal="보고서 작성")
crew = Crew(agents=[researcher, writer],
            tasks=[research_task, write_task],
            process=Process.sequential)
crew.kickoff()
```

## 멀티에이전트 지원

멀티에이전트가 본질이다. `hierarchical` 프로세스에서 매니저 에이전트가 태스크를 위임하는 [[Supervisor Pattern]]을, `sequential`에서는 산출물 전달형 [[Sequential WorkFlow]]를 구현한다. AutoGen이 자유로운 "대화"라면 CrewAI는 역할·태스크라는 구조화된 추상화가 특징이다.

## 언제 쓰나

- 역할이 분명한 협업 작업(리서치 → 작성 → 검토 등)을 빠르게 프로토타이핑
- 직관적 추상화로 멀티에이전트를 가볍게 시작하고 싶을 때
- 정밀 제어가 필요하면 Flows 모드, 또는 [[LangGraph]] 고려

https://www.crewai.com

## 관련 노트

- [[Multi Agent Architecture]]
- [[Supervisor Pattern]]
- [[Sequential WorkFlow]]
- [[AutoGen]]
- [[Agno]]
- [[LangGraph]]
- [[Agent]]
