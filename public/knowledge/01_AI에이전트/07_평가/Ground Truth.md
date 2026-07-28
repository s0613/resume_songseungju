---
tags: [AI-Agent, 평가]
---

# Ground Truth

> 모델 출력의 정오를 판정하는 기준이 되는, 사람이 검증한 정답(reference) 데이터.

## 핵심 개념

Ground Truth(정답/기준 데이터)는 평가의 **기준점**이다. 모델 출력과 비교할 대상이 있어야 정확도·재현율 같은 reference 기반 지표를 계산할 수 있다. 품질이 낮은 Ground Truth는 평가 전체를 무의미하게 만들므로, "garbage in, garbage out"이 가장 직접적으로 적용되는 영역이다.

## 구성 형태

| 형태 | 설명 | 사용 예 |
|------|------|---------|
| 정답 라벨 | 질문에 대한 정답 텍스트 | QA 정확도, [[RAG Evaluation]]의 Context Recall |
| 관련 문서 집합 | 검색되어야 할 정답 문서 ID | 검색 precision/recall |
| 기대 도구 경로 | 에이전트가 밟아야 할 도구 호출 순서 | Trajectory 평가 |
| 루브릭/기준 | 정답이 갖춰야 할 속성 목록 | LLM-as-a-Judge 채점 기준 |

## 구축 방법

- **사람 라벨링** — 전문가/크라우드가 직접 정답 작성. 가장 신뢰도 높지만 비용·시간 큼.
- **LLM 합성(Synthetic)** — 강력한 모델로 질문·정답 쌍을 생성한 뒤 사람이 검수. 초기 데이터셋 부트스트랩에 유용.
- **프로덕션 로그 큐레이션** — 실제 트래픽에서 좋은 응답을 골라 골든셋으로 승격 ([[Logging]], [[Tracing]]).

## 운영 원칙

- **골든 데이터셋(Golden Set)** 으로 고정해 회귀 테스트에 사용 — 프롬프트·모델 변경 시 점수 변동을 추적.
- 도메인 변화에 맞춰 주기적으로 갱신(데이터 드리프트 대응).
- 라벨러 간 불일치(inter-annotator agreement)를 측정해 라벨 신뢰도를 관리.
- 모든 정답이 단일하지 않음에 유의 — 개방형 질문은 다중 정답·루브릭 평가가 적합.

## 한계

- 정답이 모호하거나 다수 존재하는 생성형 과제에서는 단일 Ground Truth가 부적절할 수 있다.
- 이 경우 reference-free 지표(예: Faithfulness)나 LLM-as-a-Judge로 보완한다.

## 관련 노트

- [[Agent Evaluation]]
- [[RAG Evaluation]]
- [[Hallucination Detection]]
- [[Confidence Score]]
- [[Logging]]
