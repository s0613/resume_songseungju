---
tags: [AI-Agent, 평가]
---

# Confidence Score

> 모델이 자신의 출력이 옳을 가능성을 수치화한 값. 신뢰도가 낮을 때 에스컬레이션·재검색 같은 후속 동작을 결정하는 신호로 쓰인다.

## 핵심 개념

Confidence Score는 출력의 **불확실성**을 측정한다. 잘 보정(calibrated)된 신뢰도는 "0.8이라고 말한 답들 중 약 80%가 실제로 맞는" 상태를 의미한다. 다만 LLM은 종종 **과신(overconfident)** 경향이 있어, 신뢰도를 그대로 믿기보다 보정·검증과 함께 사용해야 한다.

## 산출 방법

| 방법 | 원리 | 비고 |
|------|------|------|
| 토큰 로그확률 | 토큰별 logprob의 평균/곱, 시퀀스 확률 | API가 logprob을 제공할 때 |
| 엔트로피 | 출력 분포의 불확실성 | 높을수록 저신뢰 |
| Self-Consistency | 다중 샘플의 일치도 | 분산이 작으면 고신뢰 |
| Verbalized Confidence | 모델에게 "확신도 0~100"을 직접 묻기 | 간편하나 보정 약함 |
| LLM-as-a-Judge | 심판 모델이 신뢰도 평가 | 외부 채점 |

## 보정(Calibration)

- 신뢰도와 실제 정확도의 정렬 정도를 **ECE(Expected Calibration Error)**, reliability diagram으로 측정.
- Temperature scaling 등 사후 보정으로 과신을 완화.
- 보정이 잘 될수록 임계값 기반 의사결정이 안정적이다.

## 활용

- **임계값 라우팅** — 신뢰도가 낮으면 사람 검토로 에스컬레이션하거나 재검색/재시도.
- **환각 게이트** — 저신뢰 구간을 환각 후보로 플래그 ([[Hallucination Detection]]).
- **선택적 응답** — 임계 미만이면 "확실하지 않음"을 반환(abstention).
- **관측성 연계** — 신뢰도 분포를 모니터링해 품질 저하를 조기 감지 ([[Performance Metrics]]).

## 주의점

- 신뢰도는 **정확성의 보장이 아니라 추정**이다.
- 단독 지표로 신뢰하지 말고 Ground Truth 평가·groundedness 검증과 함께 사용한다.

## 관련 노트

- [[Hallucination Detection]]
- [[Agent Evaluation]]
- [[Ground Truth]]
- [[RAG Evaluation]]
- [[Performance Metrics]]
