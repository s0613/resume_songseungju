---
tags: [AI-Agent, 프레임워크]
---

# Bedrock Agents

> AWS Amazon Bedrock의 관리형(managed) 에이전트 서비스. 기반 모델(FM)을 사용해 사용자의 요청을 다단계 작업으로 분해하고, 기업 API·지식 베이스를 호출해 자동 수행한다.

직접 코드를 짜는 라이브러리가 아니라 **AWS가 운영·확장·보안을 맡는 클라우드 서비스**라는 점이 다른 프레임워크와의 근본 차이다. 에이전트의 추론 루프(요청 분해 → 도구/API 호출 → 결과 종합)를 Bedrock이 오케스트레이션한다.

> [!WARNING] "Classic"으로 개명 — 2026-07-30부터 신규 중단
> AWS가 이 서비스를 **Amazon Bedrock Agents Classic**으로 개명하고 2026-07-30부터 신규 고객을 받지 않는다(기존 고객은 계속 사용 가능). 공식 후속은 [[Bedrock AgentCore]] — 신규 개발은 [[Strands Agents]] + AgentCore 조합이 권장 경로. 기존 에이전트의 boto3 실무 절차는 [[Bedrock Agents 개발 가이드]].

## 특징

- **완전 관리형**: 추론 오케스트레이션, 프롬프트 구성, 세션 상태를 AWS가 처리
- **Action Groups**: 에이전트가 호출할 기업 API/Lambda 함수를 OpenAPI 스키마로 등록 (→ [[Tool Calling]])
- **Knowledge Bases 연동**: 관리형 RAG로 사내 문서 검색·근거 응답 (→ [[RAG Architecture]])
- **ReAct 스타일 추론**: 모델이 사고-행동-관찰을 반복 (→ [[ReAct]])
- **AWS 보안 통합**: IAM, KMS, 가드레일(Guardrails)로 권한·콘텐츠 안전 제어
- **trace** 기능으로 추론 단계 가시화 (→ [[Tracing]])

## 핵심 개념/구성요소

- **Agent**: FM + 지시(instruction) + 액션 그룹 + 지식 베이스의 묶음
- **Action Group**: API 스키마 + 백엔드(Lambda)로 정의되는 실행 가능한 행동
- **Knowledge Base**: 벡터 스토어 기반 검색 소스
- **Orchestration**: 요청을 단계로 쪼개 액션을 호출하는 Bedrock 내부 루프
- **Guardrails**: 유해 입출력 차단 정책

```text
사용자 요청
  → Agent(FM)가 단계 분해
  → Knowledge Base 검색 + Action Group(API/Lambda) 호출
  → 결과 종합 후 응답
(IAM·Guardrails로 권한·안전 통제, trace로 단계 기록)
```

## 멀티에이전트 지원

**Multi-agent collaboration** 기능으로 한 슈퍼바이저 에이전트가 여러 하위(collaborator) 에이전트에게 작업을 위임하는 [[Supervisor Pattern]]을 관리형으로 제공한다. 코드 기반 프레임워크(LangGraph·CrewAI)보다 유연성은 낮지만, 인프라·확장·보안을 AWS가 책임진다.

## 언제 쓰나

- 이미 AWS 위에서 운영 중이고 관리 부담 없이 에이전트를 배포하려 할 때
- 기업 API·사내 문서를 안전하게 연결한 자동화가 필요할 때
- 인프라·보안·확장을 직접 다루기보다 매니지드로 맡기고 싶을 때

https://aws.amazon.com/bedrock/agents/

## 관련 노트

- [[Bedrock AgentCore]]
- [[Strands Agents]]
- [[Bedrock Agents 개발 가이드]]
- [[Tool Calling]]
- [[RAG Architecture]]
- [[ReAct]]
- [[Supervisor Pattern]]
- [[Nova]]
- [[Multi Agent Architecture]]
