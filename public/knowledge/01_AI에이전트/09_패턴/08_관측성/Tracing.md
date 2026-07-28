---
tags: [AI-Agent, 관측성]
last-reviewed: 2026-07-27
---

# Tracing

> 한 요청이 에이전트 내부의 여러 LLM 호출·도구 호출·하위 단계를 거치는 전체 실행 경로를 계층적으로 기록·시각화하는 기법.

## 핵심 개념

트레이싱은 분산 시스템의 요청 흐름 추적에서 비롯됐으며, LLM 에이전트의 **관측 가능한 실행 경로**를 가시화한다. 단일 로그는 점이지만, 트레이스는 그 점들을 부모-자식 관계로 엮은 트리/타임라인이다.

- **Trace** — 하나의 사용자 요청에 대한 전체 실행 단위.
- **Span** — LLM·검색·도구 호출 같은 개별 작업. 시작/종료 시각, 마스킹된 메타데이터, 상태, 부모 span 참조를 가진다.
- 중첩된 span들이 관측 가능한 결정·도구·상태 전이 경로(trajectory)를 구성한다. provider reasoning/raw chain-of-thought은 대상이 아니다.

## Span에 담는 정보

| 항목 | 예시 |
|------|------|
| 타입 | LLM / Retriever / Tool / Chain / Agent |
| 입출력 | prompt/message version·해시·길이·schema·source ID, allowlist된 도구 요약 |
| 타이밍 | 시작·종료 시각, 지연시간 |
| 메타 | 모델명, 토큰 수, 비용, temperature |
| 상태 | 성공/실패, 오류, 가드레일 결과 |

원문 prompt/response/tool payload는 기본 저장하지 않는다. 예외가 필요하면 명시적 허용·redaction·접근 통제·짧은 보존 기간을 함께 둔다.

## OpenTelemetry

- 트레이싱의 **벤더 중립 표준**. LLM 관측성도 OTel의 trace/span 모델 위에 GenAI semantic conventions로 표준화되는 추세 ([[OpenTelemetry]]).
- 한 번 계측하면 여러 백엔드(Arize, LangFuse 등)로 내보낼 수 있어 종속성을 낮춘다.

## 도구

- **LangSmith** — LangChain/LangGraph 실행을 자동 트레이싱, span 단위 디버깅·평가 ([[LangSmith]]).
- **LangFuse** — 오픈소스 트레이싱·평가 플랫폼, OTel 호환 ([[LangFuse]]).
- **Arize Phoenix** — OTel 기반 트레이싱 + 평가 ([[Arize]]).

## 활용

- **디버깅** — 어느 span에서 잘못된 도구를 골랐는지, 어디서 지연이 발생했는지 추적.
- **Trajectory 평가** — 도구 호출 경로의 적절성을 검사 ([[Agent Evaluation]]).
- **비용·성능 귀속** — span별 토큰/지연을 합산해 병목 식별 ([[Cost Monitoring]], [[Performance Metrics]]).

## 관련 노트

- [[Logging]]
- [[OpenTelemetry]]
- [[LangSmith]]
- [[LangFuse]]
- [[Cost Monitoring]]
- [[Agent Evaluation]]
