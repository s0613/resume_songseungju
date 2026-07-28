---
tags: [AI-Agent, 평가]
last-reviewed: 2026-07-27
---

# Agent Evaluation

> AI 에이전트가 주어진 목표를 실제로 달성하는지를 정량·정성적으로 측정하는 평가 체계.

## 핵심 개념

단일 LLM 호출과 달리 에이전트는 **다단계 결정 + 도구 호출 + 상태 변화**를 거치므로, 최종 응답 품질만으로는 평가가 부족하다. 평가는 크게 두 층위로 나뉜다.

- **결과 평가(End-to-end / Outcome)** — 최종 산출물이 목표를 충족했는가.
- **과정 평가(Trajectory / Step-wise)** — 관측 가능한 도구 선택·호출 순서·상태 전이가 적절했는가.

## 평가 차원

| 차원 | 측정 대상 | 예시 지표 |
|------|-----------|-----------|
| Task Success | 목표 달성 여부 | Task Completion Rate, Pass@k |
| Trajectory | 도구 호출 경로의 정확성 | Tool Selection Accuracy, 불필요 호출 수 |
| Efficiency | 자원 사용 효율 | 스텝 수, 토큰 수, 지연시간 |
| Quality | 응답의 정확성·근거성 | Faithfulness, 정답 일치율 |
| Robustness | 예외·악성 입력 대응 | 실패율, 가드레일 통과율 |

## 평가 방법

- **Ground Truth 기반 채점** — 정답 라벨이 있는 데이터셋과 비교 ([[Ground Truth]]).
- **LLM-as-a-Judge** — 강력한 모델이 응답을 루브릭에 따라 채점. 빠르고 확장적이나 편향·일관성 한계가 있어 사람 검증과 병행한다.
- **Human Evaluation** — 사람이 직접 평가. 비용은 높지만 미묘한 품질 판단에 필수.
- **Trajectory 평가** — 실행 trace를 분석해 도구 호출 적절성·루프·중복 작업을 검사 ([[Tracing]]).

평가는 마스킹된 observable trajectory를 사용하며 provider reasoning/raw chain-of-thought을 수집하거나 점수화하지 않는다.

## 도구

- **LangSmith / LangFuse** — 데이터셋·평가 실행·LLM-as-Judge 내장 ([[LangSmith]], [[LangFuse]]).
- **Arize Phoenix** — 평가와 관측성 통합 ([[Arize]]).
- **RAGAS / DeepEval** — 검색 기반 응답 평가 ([[RAG Evaluation]]).

## 예시 (LLM-as-a-Judge 루브릭)

```
점수(1~5)로 다음을 평가하라:
- 목표 달성: 사용자의 요청을 완수했는가
- 근거성: 응답이 검색 컨텍스트에 근거하는가
- 효율성: 불필요한 도구 호출이 없는가
```

## 관련 노트

- [[RAG Evaluation]]
- [[Ground Truth]]
- [[Hallucination Detection]]
- [[Confidence Score]]
- [[Tracing]]
- [[Agent Architecture]]
