---
tags: [AI-Agent, 도구, LLM]
---

# GPT

> OpenAI가 개발한 대규모 언어 모델(Generative Pre-trained Transformer) 제품군. 범용 생성 능력과 폭넓은 생태계·도구 연동이 강점이다.

## 특징
- **모델군**: GPT-4 계열(고성능 범용), GPT-4o 계열(멀티모달·저지연), 그리고 추론 특화 o 시리즈(o1/o3 등 단계적 추론), 경량 mini 변형 등으로 구성된다.
- 텍스트·이미지·음성을 아우르는 멀티모달 입출력을 지원한다.
- function calling/tools, 구조화 출력(JSON mode·structured outputs), 임베딩 모델 등 에이전트 구축에 필요한 API가 풍부하다.
- Azure OpenAI Service로도 제공되어 엔터프라이즈 환경에 통합하기 쉽다.

## 에이전트에서의 활용
- **추론·도구 호출 엔진**: 가장 널리 쓰이는 백본 중 하나로, 대부분의 프레임워크와 SDK가 1순위로 지원한다.
- **임베딩**: text-embedding 계열로 RAG의 벡터화 단계를 처리한다.
- **모델 계층화**: 복잡 작업엔 GPT-4/o 시리즈, 빠른 처리엔 mini 변형을 써 비용을 조절한다.

## 강점
- 방대한 생태계와 레퍼런스, 폭넓은 멀티모달 지원, 추론 특화 모델 라인업.

## 언제 쓰나
- 생태계·통합 자료가 풍부한 범용 LLM이 필요하거나 멀티모달·임베딩까지 한 벤더로 통합하고 싶을 때.

https://platform.openai.com

## 관련 노트
- [[Claude]]
- [[Gemini]]
- [[Nova]]
- [[Embedding]]
- [[Agent Architecture]]
- [[Agentic AI]]
