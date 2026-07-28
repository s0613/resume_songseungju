---
tags: [AI-Agent, 프레임워크]
---

# OpenAI Agents SDK

> 한 줄 정의
> OpenAI가 2025년 공개한 경량 멀티에이전트 프레임워크. 실험 프로젝트였던 Swarm을 프로덕션용으로 정식화한 후속작으로, 최소한의 추상화를 지향한다.

## 핵심 원시 개념 (Primitives)

- **Agents**: instructions + tools + model을 묶은 LLM 단위.
- **Handoffs**: 한 에이전트가 다른 에이전트에 제어를 위임 → [[Agent Handoff]]
- **Guardrails**: 입력·출력 검증을 병렬로 실행 → [[가드레일]]
- **Sessions**: 대화 이력을 자동으로 관리.
- **Runner**: 에이전트 루프를 실행하고 추적을 남긴다 → [[Tracing]]

## 특징

- **최소 추상화**: 학습 곡선이 낮고, 파이썬 코드로 흐름을 직접 제어.
- **프로바이더 비종속**: OpenAI 외 모델과도 호환(Chat Completions 호환 엔드포인트).
- **Tracing 내장**: 에이전트 실행을 시각화·디버깅.

## 언제 쓰나

- 가벼운 멀티에이전트 핸드오프 구조를 빠르게 구성할 때.
- [[LangGraph]]처럼 명시적 그래프·상태 머신이 필요할 만큼 복잡하지 않은 경우.

## 관련 노트

- [[Agent Handoff]]
- [[Multi Agent Architecture]]
- [[가드레일]]
- [[Function Calling]]
- [[LangGraph]]
