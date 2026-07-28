---
tags: [AI-Agent, 도구, LLM]
---

# Claude

> Anthropic이 개발한 대규모 언어 모델 제품군. 안전성(Constitutional AI)과 긴 컨텍스트, 도구 사용·코딩 능력에 강점이 있다.

## 특징
- **모델군**: Opus(최고 추론·복잡 작업), Sonnet(성능·비용 균형, 범용 주력), Haiku(빠르고 저렴, 경량 작업)로 구성된다. 용도에 따라 티어를 선택한다.
- 긴 컨텍스트 윈도를 제공해 대용량 문서·코드베이스를 한 번에 다루기 좋다.
- 도구 사용(tool use / function calling), 구조화 출력, 비전 입력을 지원한다.
- 확장 사고(extended thinking)로 복잡한 추론 단계를 명시적으로 수행할 수 있다.
- AWS Bedrock, Google Vertex AI 등에서도 제공된다.

## 에이전트에서의 활용
- **추론·계획 엔진**: 도구 호출 루프에서 다음 행동을 결정하는 reasoning 모델로 널리 쓰인다. 지시 준수도와 도구 사용 안정성이 높다.
- **역할 분리**: 무거운 계획·리뷰는 Opus, 일반 실행은 Sonnet, 라우팅·요약 등 경량 작업은 Haiku로 모델을 계층화하면 비용을 최적화할 수 있다.
- LangChain·LangGraph·CrewAI 등 주요 프레임워크와 호환된다.

## 강점
- 긴 컨텍스트 처리, 코딩, 도구 사용의 신뢰성, 안전성·정렬(alignment) 측면에서 강하다.

## 언제 쓰나
- 정확한 지시 준수와 안정적인 도구 호출, 코드 작업이 중요한 에이전트에 적합하다.

https://www.anthropic.com/claude

## 관련 노트
- [[GPT]]
- [[Gemini]]
- [[Nova]]
- [[Agent Architecture]]
- [[Agentic AI]]
- [[Cost Monitoring]]
