---
tags: [AI-Agent, 패턴]
---

# Function Calling

> LLM이 정해진 스키마에 맞춰 호출할 함수와 인자를 구조화된 형식으로 출력하는 API 수준의 메커니즘.

## 핵심 개념

Function Calling은 OpenAI, Anthropic, Google 등 LLM 제공자가 제공하는 기능으로, 모델이 자유 텍스트 대신 **구조화된 함수 호출(JSON)**을 생성하도록 한다. 개발자가 함수 이름·설명·파라미터 스키마(주로 JSON Schema)를 제공하면, 모델은 사용자 의도에 맞는 함수와 인자를 채워 반환한다.

- 모델은 함수를 **실행하지 않는다.** 호출할 함수와 인자만 결정한다. 실제 실행은 애플리케이션 코드가 맡는다.
- 출력이 구조화되어 있어 파싱이 안정적이고, 도구 연동의 신뢰성이 높다.

> Function Calling은 [[Tool Calling]] 패턴을 구현하는 **LLM API 메커니즘**이다. Tool Calling이 "도구를 쓴다"는 넓은 설계 개념이라면, Function Calling은 그 의도를 실제로 전달하는 구조화 출력 규약이다. 제공자에 따라 "tool use"라고도 부른다.

## 동작 방식

1. **스키마 정의** — 함수명, 설명, 파라미터 타입을 LLM 요청에 함께 전달한다.
2. **모델 응답** — 모델이 호출할 함수와 인자를 JSON으로 반환한다.
3. **실행** — 애플리케이션이 해당 함수를 실제로 호출한다.
4. **결과 반환** — 함수 결과를 모델에 다시 전달해 최종 응답을 생성한다.

## 예시

```json
{
  "name": "get_weather",
  "arguments": { "location": "Seoul", "unit": "celsius" }
}
```

## 관련 노트

- [[Tool Calling]]
- [[Tool]]
- [[Claude]]
- [[GPT]]
- [[Gemini]]
