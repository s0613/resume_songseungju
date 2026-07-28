---
tags: [AI-Agent, 패턴]
---

# Evaluator-Optimizer

> 한 줄 정의
> 한 LLM이 출력을 생성하고 다른 LLM이 평가·피드백하는 루프를 돌려 결과를 반복 개선하는 패턴. Anthropic "Building Effective Agents"의 패턴 중 하나다.

## 흐름

```
Generator(생성) → Evaluator(기준 대비 채점·피드백) → 재생성 → 기준 충족 시 종료
```

## Reflection과의 차이

- [[Reflection]]: 같은 모델이 스스로 돌아본다.
- **Evaluator-Optimizer**: 평가자가 **명시적·분리된 역할**이고, **명확한 평가 기준(rubric)** 이 있다. 평가는 [[LLM-as-a-Judge]]로 구현되곤 한다.

## 언제 효과적인가

- 반복 비평으로 품질이 뚜렷이 오르고, 좋은 출력의 기준이 명확한 작업: 번역, 글쓰기, 코드 작성, 검색어 정제.
- 무한 루프를 막을 **종료 조건**(점수 임계치·최대 반복)이 필수 → [[가드레일]]

## 관련 노트

- [[Reflection]]
- [[Critic Agent]]
- [[Self Correction]]
- [[LLM-as-a-Judge]]
- [[가드레일]]
