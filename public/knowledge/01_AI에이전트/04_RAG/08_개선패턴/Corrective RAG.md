---
tags: [AI-Agent, RAG, 아키텍처]
---

# Corrective RAG

> 한 줄 정의
> 검색 결과를 **평가기(retrieval evaluator)** 로 채점하고, 품질이 낮으면 교정 행동(웹 검색 대체·지식 정제)을 취하는 RAG. (CRAG, 2024)

## 문제의식

벡터 검색은 항상 무언가를 반환하지만, 그게 **틀리거나 무관할 때도** 그대로 생성에 들어가 환각을 유발한다. CRAG는 "검색이 빗나갔을 때 어떻게 복구하는가"에 답한다.

## 동작 방식

1. **검색** 후, 경량 평가기가 각 문서의 관련성을 점수화한다.
2. 점수를 3등급으로 분류해 행동을 분기한다.

| 판정 | 행동 |
|------|------|
| **Correct** | 문서에서 핵심 지식만 추출·정제(decompose-then-recompose)해 사용 |
| **Incorrect** | 내부 문서를 버리고 **웹 검색 등 외부 소스로 대체** |
| **Ambiguous** | 내부 + 외부를 결합 |

3. 정제된 지식으로 답변을 생성한다.

## 지식 정제 (Decompose–Recompose)

검색 문서를 그대로 넣지 않고, 작은 strip 단위로 쪼개 무관한 부분을 걸러낸 뒤 핵심만 재조립한다 → 노이즈 감소. [[Context Engineering]]과 같은 맥락.

## Self-RAG와의 차이

- **[[Self-RAG]]**: 모델 자체를 reflection token으로 학습시켜 내재적으로 판단.
- **Corrective RAG**: 별도의 외부 평가기 + **웹 검색 폴백**으로 검색 실패를 능동 교정. 기존 RAG에 끼워넣기 쉽다.

## 관련 노트

- [[RAG Architecture]]
- [[Self-RAG]]
- [[Adaptive RAG]]
- [[Agentic RAG]]
- [[Grounding]]
- [[RAG Evaluation]]
