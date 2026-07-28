---
tags: [AI-Agent, 패턴]
---

# Critic Agent

> 생성 결과를 비판·검증하는 역할만 전담하는 별도 에이전트.

## 핵심 개념

Critic Agent는 결과를 만드는 생성자(Generator/Actor)와 그것을 평가하는 비판자(Critic)를 **역할로 분리**하는 패턴이다. [[Reflection]]을 멀티에이전트 구조로 구현한 형태로, 비판 전용 프롬프트·기준·관점을 가진 에이전트가 독립적으로 결과를 심사한다.

- 생성자와 비판자가 분리되면 자기 합리화가 줄고 더 객관적인 평가가 가능하다.
- 비판자는 평가 기준(요구사항 충족, 정확성, 보안, 스타일 등)을 명시적으로 들고 점검한다.
- Actor-Critic 루프로 결과를 반복 개선한다.

## 동작 방식

1. **Generator** — 결과(코드, 글, 계획 등)를 생성한다.
2. **Critic** — 결과를 기준에 비추어 평가하고 구체적 개선 지적을 반환한다 (PASS/FAIL + 사유).
3. **Revise** — Generator가 지적을 반영해 다시 생성한다.
4. Critic이 통과 판정을 내리거나 반복 한도에 도달할 때까지 반복한다.

## 예시

```
Generator: API 핸들러 코드 작성
Critic: "입력 검증 누락(CRITICAL), 에러 응답 형식 불일치(HIGH)"
Generator: 검증·에러 포맷 수정 후 재제출
Critic: PASS
```

여러 비판자(보안 전문, 일관성 검토 등)를 병렬로 두는 다관점 리뷰로 확장할 수 있다.

## 관련 노트

- [[Reflection]]
- [[Self Correction]]
- [[Multi Agent Architecture]]
- [[Supervisor Pattern]]
- [[Agent Evaluation]]
