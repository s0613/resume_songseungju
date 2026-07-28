---
tags: [AI-Agent, 도구, Monitoring]
---

# Arize / Phoenix

> Arize AI가 만든 ML·LLM 관측성 플랫폼. 상용 **Arize AX**와 오픈소스 **Phoenix**로 제공되며, LLM/에이전트 트레이싱과 평가에 강점이 있다.

## 특징
- **Phoenix(오픈소스)**: 로컬·셀프호스트로 실행하는 트레이싱·평가 도구. OpenTelemetry 기반 OpenInference 표준으로 LLM·에이전트 실행을 계측한다.
- **Arize AX(상용)**: 대규모 운영 모니터링, 드리프트 탐지, 대시보드, 알림 등 엔터프라이즈 기능을 제공한다.
- **평가**: LLM-as-judge, 환각·관련성·독성 등 사전 정의된 evaluator와 커스텀 평가를 지원한다.
- 임베딩 드리프트·검색 품질 분석 등 RAG에 특화된 분석 기능을 갖춘다.

## 에이전트에서의 활용
- OpenInference/OpenTelemetry 계측으로 에이전트의 도구 호출·리트리벌·LLM 단계를 trace로 수집해 분석한다.
- RAG 파이프라인의 리트리벌 품질, 환각, 응답 관련성을 평가·추적한다.
- 운영 환경에서 품질 드리프트와 이상을 모니터링하고 알림을 받는다.
- LangChain·LlamaIndex 등 주요 프레임워크 자동 계측을 지원한다.

## 장단점
- **장점**: 오픈소스(Phoenix) 선택지, 표준(OpenTelemetry/OpenInference) 기반, 강력한 평가·RAG 분석.
- **단점**: 엔터프라이즈 운영 기능 전반은 상용 Arize AX에 집중되어 있다.

## 언제 쓰나
- 표준 기반 LLM 트레이싱과 깊이 있는 평가·RAG 품질 분석이 필요할 때. 가볍게 시작하려면 Phoenix부터.

https://arize.com

## 관련 노트
- [[Tracing]]
- [[Agent Evaluation]]
- [[OpenTelemetry]]
- [[Performance Metrics]]
- [[LangFuse]]
- [[RAG Architecture]]
