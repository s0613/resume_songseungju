---
tags: [AI-Agent, 프레임워크]
---

# Agno

> 멀티모달 에이전트를 빠르고 가볍게 구축하는 Python 프레임워크. 기존 Phidata에서 Agno로 리브랜딩되었으며, 경량성·성능을 강조한다.

에이전트를 "모델 + 도구 + 지식(knowledge) + 메모리"의 조합으로 단순하게 정의한다. 인스턴스화 속도와 메모리 사용량이 매우 작다는 점을 내세우며, 텍스트·이미지·오디오·비디오 등 멀티모달을 기본 지원한다.

## 특징

- **경량·고속**: 에이전트 생성 오버헤드와 메모리 풋프린트가 작도록 설계
- **모델 비종속(model-agnostic)**: OpenAI·Anthropic·Gemini 등 다양한 제공자를 통일된 인터페이스로
- **멀티모달 기본 지원**: 텍스트뿐 아니라 이미지·오디오·비디오 입출력
- **지식·메모리 내장**: 벡터DB 연동 RAG와 세션 메모리를 1급 기능으로 제공 (→ [[RAG Architecture]])
- **구조화된 출력**: Pydantic 모델로 응답 스키마 지정
- 모니터링/플레이그라운드 등 운영 도구 제공

## 핵심 개념/구성요소

- **Agent**: model·tools·knowledge·memory를 묶은 실행 단위
- **Model**: LLM 제공자 추상화
- **Tools**: 에이전트가 호출하는 함수 (→ [[Tool Calling]])
- **Knowledge**: 벡터DB 기반 검색 지식 베이스
- **Team**: 여러 에이전트를 묶어 협업시키는 단위

```python
agent = Agent(
    model=Claude(id="..."),
    tools=[search_tool],
    knowledge=vector_kb,
    markdown=True,
)
agent.print_response("질문...")
```

## 멀티에이전트 지원

여러 에이전트를 **Team**으로 묶어 협업시킨다. 팀 모드로 라우팅(요청을 적절한 멤버에게 위임)·협력 등을 구성해 [[Supervisor Pattern]]과 [[Agent Handoff]]를 표현한다. CrewAI의 역할 기반 크루, LangGraph의 그래프 대비 "경량 단일 에이전트를 빠르게, 필요 시 팀으로 확장"하는 결이다.

## 언제 쓰나

- 멀티모달 + RAG 에이전트를 가볍고 빠르게 구축
- 단일 에이전트로 시작해 필요 시 팀으로 확장하고 싶을 때
- 성능·리소스 효율이 중요한 환경

https://www.agno.com

## 관련 노트

- [[RAG Architecture]]
- [[Tool Calling]]
- [[Multi Agent Architecture]]
- [[CrewAI]]
- [[Agent]]
- [[Single Agent vs Multi Agent]]
