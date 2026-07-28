---
tags: [AI-Agent, 패턴]
---

# Self Correction

> 에이전트가 자신의 오류·실패를 감지해 스스로 수정하는 패턴.

## 핵심 개념

Self Correction은 에이전트가 도구 실행 오류, 검증 실패, 잘못된 출력 등을 인식하고 다음 시도에서 이를 바로잡는 패턴이다. [[Reflection]]이 품질 향상을 위한 일반적 자기 평가라면, Self Correction은 특히 **명시적 오류 신호(에러 메시지, 테스트 실패, 검증기 거부 등)**에 반응해 교정한다는 점이 강조된다.

- 외부 검증기(테스트, 컴파일러, 스키마 검사, 평가 함수)가 신뢰할 만한 피드백을 줄 때 가장 효과적이다.
- 같은 실수를 반복하지 않도록 오류 내용을 컨텍스트에 명시적으로 남긴다.
- 무한 루프를 막기 위해 최대 재시도 횟수를 둔다.

## 동작 방식

1. **Act** — 행동을 수행한다 (코드 실행, API 호출 등).
2. **Detect** — 결과에서 오류·실패 신호를 감지한다.
3. **Diagnose** — 오류 메시지를 해석해 원인을 추론한다.
4. **Retry** — 수정한 입력/행동으로 재시도한다. 성공하거나 한도 초과 시 종료.

## 예시

```
Action: run_code(snippet)
Observation: TypeError: unsupported operand 'str' + 'int'
Diagnose: 문자열과 정수를 더했다. int 변환 필요.
Retry: int(x) + y 로 수정 후 재실행 → 성공
```

## 관련 노트

- [[Reflection]]
- [[Critic Agent]]
- [[Agent Evaluation]]
- [[Hallucination Detection]]
- [[ReAct]]
