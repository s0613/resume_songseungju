---
tags: [AI-Agent, 프레임워크]
---

# Pydantic AI

> 한 줄 정의
> Pydantic 팀이 만든 타입 안전(type-safe) 에이전트 프레임워크. FastAPI식 개발 경험을 LLM 앱에 그대로 가져온 것을 목표로 한다.

## 특징

- **구조화 출력 강제**: 응답을 Pydantic 모델로 검증하고, 실패하면 자동 재시도. → [[Function Calling]]
- **타입 안전 도구**: 함수를 데코레이터로 등록하면 타입 힌트에서 스키마를 자동 생성.
- **의존성 주입**: 런타임 컨텍스트(DB 세션, 사용자 정보)를 도구·프롬프트에 주입.
- **모델 비종속**: OpenAI·Anthropic·Gemini 등 교체 가능.
- **관측 통합**: Logfire(OpenTelemetry 기반)로 추적 → [[Tracing]] · [[OpenTelemetry]]

## 언제 쓰나

- 출력 스키마의 신뢰성과 타입 검증이 중요한 프로덕션 백엔드.
- 파이썬 타입 시스템·IDE 지원을 적극 활용하려는 팀.

## 관련 노트

- [[Function Calling]]
- [[가드레일]]
- [[Tracing]]
- [[OpenTelemetry]]
- [[LangChain]]
