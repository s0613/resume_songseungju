---
tags: [AI-Agent, 도구, LLM]
---

# Gemini

> Google(DeepMind)이 개발한 멀티모달 대규모 언어 모델 제품군. 처음부터 멀티모달로 설계되었고 초장문 컨텍스트가 강점이다.

## 특징
- **모델군**: Pro(고성능 범용 추론)와 Flash(저지연·저비용 경량) 라인을 중심으로 구성된다. 더 가벼운 Flash-Lite 등 변형도 있다.
- 텍스트·이미지·오디오·비디오를 함께 처리하는 네이티브 멀티모달 모델이다.
- 매우 긴 컨텍스트 윈도(수십만~수백만 토큰급)를 제공해 대용량 문서·영상 분석에 유리하다.
- function calling, 구조화 출력, 코드 실행 등 도구 기능을 지원한다.
- Google AI Studio(Gemini API)와 엔터프라이즈용 Vertex AI에서 제공된다.

## 에이전트에서의 활용
- **장문·멀티모달 처리**: 방대한 컨텍스트나 영상·이미지 입력이 필요한 에이전트 작업에 강하다.
- **추론·도구 호출 엔진**: Pro로 계획·추론을, Flash로 빠른 경량 처리를 맡겨 모델을 계층화한다.
- Google Cloud(Vertex AI) 생태계와 통합하기 쉽다.

## 강점
- 초장문 컨텍스트, 네이티브 멀티모달, Google 클라우드 통합.

## 언제 쓰나
- 매우 긴 입력이나 영상·이미지 등 멀티모달 데이터를 다루거나 GCP 환경에 통합하고 싶을 때.

https://ai.google.dev

## 관련 노트
- [[Claude]]
- [[GPT]]
- [[Nova]]
- [[Agent Architecture]]
- [[Agentic AI]]
- [[RAG Architecture]]
