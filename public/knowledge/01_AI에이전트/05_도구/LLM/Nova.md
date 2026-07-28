---
tags: [AI-Agent, 도구, LLM]
---

# Nova

> Amazon이 개발해 AWS Bedrock에서 제공하는 자체 파운데이션 모델 제품군. 비용 효율과 AWS 생태계 통합을 중시한다.

## 특징
- **모델군**: Micro(텍스트 전용 초경량), Lite(저비용 멀티모달), Pro(고성능 멀티모달)로 구성되며, 이미지 생성(Canvas)·동영상 생성(Reel) 모델도 별도로 제공된다.
- 텍스트·이미지·비디오 입력을 처리하는 멀티모달 능력을 갖춘다(모델 티어에 따라 상이).
- AWS Bedrock을 통해 서빙되어 IAM, VPC, 가드레일 등 AWS 보안·거버넌스 기능과 함께 사용된다.
- 도구 사용(tool use)과 에이전트 워크플로우를 지원한다.

## 에이전트에서의 활용
- **Bedrock 에이전트 백본**: Amazon Bedrock Agents의 추론 모델로 직접 사용된다. AWS 안에서 LLM·도구·메모리를 일괄 구성할 수 있다.
- **비용 최적화**: Micro/Lite로 라우팅·요약 등 경량 작업을, Pro로 복잡 추론을 맡겨 비용을 조절한다.
- DynamoDB·OpenSearch 등 AWS 데이터 서비스와 자연스럽게 결합된다.

## 강점
- 가격 대비 성능, AWS 네이티브 통합과 거버넌스, 멀티모달 라인업.

## 언제 쓰나
- AWS Bedrock 환경에서 비용 효율적인 자체 모델로 에이전트를 구축하고 싶을 때.

https://aws.amazon.com/ai/generative-ai/nova

## 관련 노트
- [[Bedrock Agents]]
- [[Claude]]
- [[GPT]]
- [[Gemini]]
- [[DynamoDB]]
- [[Cost Monitoring]]
