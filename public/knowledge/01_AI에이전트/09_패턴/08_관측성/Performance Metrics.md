---
tags: [AI-Agent, 관측성]
---

# Performance Metrics

> 에이전트 시스템의 운영 건강성을 나타내는 지연시간·처리량·토큰·성공률 등 정량 지표.

> [!note]
> 여기서는 **운영 성능 지표**를 다룬다. 응답의 정확성·근거성 같은 **품질 평가**는 [[Agent Evaluation]]·[[RAG Evaluation]]을 참고.

## 핵심 지표

| 지표 | 정의 | 비고 |
|------|------|------|
| Latency | 요청→응답 소요 시간 | 평균보다 **p50/p95/p99** 백분위가 중요 |
| TTFT | Time To First Token, 첫 토큰까지의 시간 | 스트리밍 체감 응답성 |
| Throughput | 단위 시간당 처리량 | RPS(요청/초), TPS(토큰/초) |
| Token Usage | 입력·출력 토큰 수 | 비용·지연과 직결 ([[Cost Monitoring]]) |
| Success Rate | 정상 완료 요청 비율 | 실패율/오류율의 역 |
| Error Rate | 오류·예외·타임아웃 비율 | 가드레일 차단 포함 |
| Tool Call Latency | 외부 도구 호출 지연 | 에이전트 병목의 주요 원인 |

## 측정·진단

- **백분위 사용** — 평균은 꼬리 지연을 가린다. p95/p99로 최악 사용자 경험을 본다.
- **span 단위 귀속** — 트레이스로 어느 단계(LLM·검색·도구)가 지연·실패를 유발하는지 분해 ([[Tracing]]).
- **다단계 합산** — 에이전트의 총 지연은 연쇄 호출의 합 + 도구 대기 시간.

## 성능-비용-품질 트레이드오프

- 큰 모델/긴 컨텍스트는 품질을 올리지만 지연·비용을 증가시킨다.
- 스트리밍·캐싱·모델 라우팅으로 체감 지연과 비용을 동시에 개선 ([[Cost Monitoring]]).
- 운영 지표가 좋아도 품질이 나쁠 수 있으므로 평가 지표와 **함께** 모니터링.

## 도구

- **LangSmith / LangFuse** — 지연·토큰·성공률 대시보드 ([[LangSmith]], [[LangFuse]]).
- **OpenTelemetry Metrics** — 표준 메트릭 수집·내보내기 ([[OpenTelemetry]]).
- **Arize** — 프로덕션 성능·드리프트 모니터링 ([[Arize]]).

## 관련 노트

- [[Cost Monitoring]]
- [[Tracing]]
- [[Logging]]
- [[Agent Evaluation]]
- [[OpenTelemetry]]
