---
tags: [AI-Agent, 관측성]
---

# Cost Monitoring

> LLM 에이전트가 소비하는 토큰과 그에 따른 비용을 추적·귀속·최적화하는 관측성 활동.

## 핵심 개념

LLM 비용은 대부분 **토큰 사용량 × 단가**로 결정된다. 입력(프롬프트)과 출력(생성) 토큰의 단가가 다르며, 출력 토큰이 보통 더 비싸다. 에이전트는 한 요청에서 다수의 LLM 호출을 연쇄하므로 비용이 빠르게 누적된다. 따라서 호출·span 단위로 비용을 귀속(attribution)하는 것이 핵심이다.

## 추적 지표

| 지표 | 설명 |
|------|------|
| Input/Output Tokens | 호출별 프롬프트·생성 토큰 수 |
| Cost per Request | 한 사용자 요청의 총 비용(연쇄 호출 합산) |
| Cost per Session / User | 세션·사용자 단위 누적 비용 |
| Cache Hit Rate | 프롬프트 캐시 적중률(캐시 토큰은 저단가) |
| Cost by Model / Feature | 모델·기능별 비용 분해 |

## 비용 절감 전략

- **모델 라우팅** — 쉬운 작업은 저비용 모델로, 어려운 작업만 고성능 모델로 ([[Claude]], [[GPT]], [[Gemini]], [[Nova]]).
- **프롬프트 캐싱** — 반복되는 system/컨텍스트를 캐시해 입력 토큰 단가 절감.
- **컨텍스트 다이어트** — 불필요한 검색 청크·히스토리 제거, [[Re-ranking]]으로 컨텍스트 압축.
- **출력 제한** — max_tokens·간결 프롬프트로 비싼 출력 토큰 절약.
- **불필요 호출 제거** — Trajectory 분석으로 중복/루프 호출 차단 ([[Tracing]]).

## 운영

- 트레이스의 span별 토큰·비용 필드를 합산해 **요청 단위 귀속** ([[Tracing]], [[Logging]]).
- 예산 임계값·이상치 알림으로 비용 폭주 조기 감지.
- 비용을 품질(정확도)과 함께 보고 **비용 대비 성능** 관점에서 최적화.

## 도구

- **LangSmith / LangFuse** — 호출별 토큰·비용 자동 집계 대시보드 ([[LangSmith]], [[LangFuse]]).
- **Arize** — 비용·성능 통합 모니터링 ([[Arize]]).

## 관련 노트

- [[Performance Metrics]]
- [[Tracing]]
- [[Logging]]
- [[LangSmith]]
- [[LangFuse]]
