---
tags: [AI-Agent, 관측성]
last-reviewed: 2026-07-27
---

# Logging

> 에이전트 실행 중 발생하는 입력·출력·이벤트·오류를 기록해 디버깅·감사·평가의 근거로 삼는 활동.

## 핵심 개념

로깅은 관측성(Observability)의 3대 축(로그·트레이스·메트릭) 중 **이산 이벤트 기록**을 담당한다. LLM 에이전트에서는 비결정성이 크므로 실행을 재현할 최소 메타데이터를 남기되, 원문 payload와 비공개 추론은 기본 기록 대상이 아니다.

## 무엇을 남기는가

| 범주 | 기본 기록 항목 |
|------|-----------|
| 프롬프트 | template/prompt version, 입력·컨텍스트의 해시·길이·schema·source ID |
| 응답 | message ID, 출력 schema·길이, 종료 사유, 토큰 수 |
| 도구 호출 | 도구명, 마스킹된 인자/결과 요약, 상태·지연·실패 코드 |
| 메타데이터 | 모델명·버전, 파라미터(temperature 등), 비용, 지연시간 |
| 컨텍스트 | request/run/conversation/trace ID, 가명화된 principal ID |
| 오류 | 예외, 가드레일 차단, 재시도, 타임아웃 |

## 모범 사례

- **구조화 로깅(Structured logging)** — 텍스트가 아닌 JSON 등 구조화 포맷으로 남겨 검색·집계 가능하게.
- **상관관계 ID** — request/session/trace ID로 한 요청의 전체 흐름을 연결 ([[Tracing]]).
- **로그 레벨** — DEBUG/INFO/WARN/ERROR를 일관되게 적용.
- **Payload 최소화** — system/user 원문, 주입 컨텍스트, 도구 인자·반환값은 기본 비저장. 디버깅상 필요하면 명시적 허용, redaction, 접근 통제, 짧은 보존 기간을 함께 둔다.
- **PII 처리** — 개인정보·비밀키를 기록 직전에 마스킹/필터링하고 보존 기간 정책을 둔다.
- **추론 보호** — raw chain-of-thought 대신 결정 요약·근거 ID·행동 trajectory·종료 사유를 기록한다.
- **샘플링** — 대규모 트래픽에서는 비용을 위해 표본 추출, 단 오류는 전수 기록.

## 평가·운영과의 연결

- 로그는 골든 데이터셋의 원천이 된다 — 좋은 응답을 큐레이션해 [[Ground Truth]]로 승격.
- 실패 로그는 회귀 테스트 케이스로 재활용 ([[Agent Evaluation]]).
- 토큰·비용 필드는 [[Cost Monitoring]], 지연시간 필드는 [[Performance Metrics]]의 입력이 된다.

## 도구

- **LangSmith / LangFuse** — LLM 호출·도구 호출을 구조화해 기록 ([[LangSmith]], [[LangFuse]]).
- **OpenTelemetry Logs** — 표준 텔레메트리 파이프라인으로 수집 ([[OpenTelemetry]]).

## 관련 노트

- [[Tracing]]
- [[Cost Monitoring]]
- [[Performance Metrics]]
- [[Ground Truth]]
- [[OpenTelemetry]]
