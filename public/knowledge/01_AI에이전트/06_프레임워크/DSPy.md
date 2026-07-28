---
tags: [AI-Agent, 프레임워크, 평가]
---

# DSPy

> 한 줄 정의
> 프롬프트를 손으로 튜닝하는 대신 "프로그래밍하고 컴파일"하는 프레임워크. 스탠포드 발이며, 프롬프트를 최적화 가능한 파라미터처럼 다룬다.

## 핵심 개념

- **Signature**: 모듈의 입출력 명세 (예: `question -> answer`). "무엇을" 하는지 선언.
- **Module**: 동작 방식. `Predict`, `ChainOfThought`, `ReAct` 등으로 추론 전략을 조합 → [[ReAct]]
- **Optimizer (Teleprompter)**: 예시와 평가 메트릭을 받아 프롬프트·few-shot 예시를 **자동 최적화**.

## 왜 중요한가

- **프롬프트와 로직 분리**: "어떻게 말할까"를 사람이 아니라 컴파일러가 정한다.
- **모델 이식성**: 모델을 바꿔도 재컴파일만으로 새 모델에 맞는 프롬프트를 다시 찾는다.
- 평가 메트릭이 최적화의 중심이므로 [[Agent Evaluation]]와 자연스럽게 결합.

## 관련 노트

- [[ReAct]]
- [[Agent Evaluation]]
- [[Context Engineering]]
- [[LLM-as-a-Judge]]
