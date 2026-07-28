---
tags: [AI-Agent, 평가]
---

# LLM-as-a-Judge

> 한 줄 정의
> LLM에게 다른 LLM의 출력을 평가·채점하게 하는 방법. 정답이 정해지지 않은 생성 작업의 자동 평가에 핵심이다.

## 채점 방식

- **단일 채점 (Pointwise)**: 출력 하나에 점수 + 근거를 매긴다.
- **쌍 비교 (Pairwise)**: A vs B 중 어느 쪽이 나은지 고른다.
- **Rubric 기반**: 정확성·완결성·톤 등 기준별로 채점.

## 장점

- 인간 평가에 근사하면서 **자동·대규모·저비용**.
- 오프라인 평가셋, 온라인 [[가드레일]], [[Evaluator-Optimizer]] 루프에 두루 쓰인다.

## 알려진 편향과 완화

- **위치 편향**: 앞에 제시된 답을 선호 → 순서 무작위화·양방향 평가.
- **장황함 편향**: 긴 답을 선호 → rubric에 간결성 명시.
- **자기선호 편향**: 자기 계열 모델 출력을 선호 → 평가자 모델 분리.

## 관련 노트

- [[Agent Evaluation]]
- [[RAG Evaluation]]
- [[Evaluator-Optimizer]]
- [[Critic Agent]]
- [[Trajectory Evaluation]]
- [[가드레일]]
