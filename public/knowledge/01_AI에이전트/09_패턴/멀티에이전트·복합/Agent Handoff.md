---
tags: [AI-Agent, 패턴]
---

# Agent Handoff

> 한 에이전트가 작업과 제어권을 다른 전문 에이전트에게 넘기는 패턴.

## 핵심 개념

Agent Handoff는 멀티에이전트 시스템에서 현재 에이전트가 자신보다 더 적합한 다른 에이전트에게 대화·작업을 **이양(handoff)**하는 패턴이다. 고객 상담에서 "전문 상담사로 연결"하는 것과 같으며, 각 에이전트가 좁은 도메인에 집중하도록 만든다.

- 핸드오프는 보통 도구 호출의 한 형태로 구현된다 (예: `transfer_to_billing_agent`).
- 제어권과 함께 관련 컨텍스트(대화 이력, 상태)를 전달해야 연속성이 유지된다.
- 중앙 조정자가 위임하는 [[Supervisor Pattern]]과 달리, 핸드오프는 에이전트 간 **수평적 이양**에 가깝다 (다만 두 방식은 함께 쓰이기도 한다).

## 동작 방식

1. **판단** — 현재 에이전트가 요청이 자신의 범위를 벗어남을 인식한다.
2. **Handoff** — 적절한 대상 에이전트를 선택하고 제어권을 넘긴다.
3. **컨텍스트 전달** — 필요한 상태·이력을 대상 에이전트에 전달한다.
4. **이어받기** — 대상 에이전트가 작업을 이어 수행하고, 필요 시 다시 핸드오프한다.

## 예시

```
Triage Agent: "환불 문의로군요" → handoff → Refund Agent
Refund Agent: 환불 정책 확인 후 처리, 결제 분쟁이면 → handoff → Billing Agent
```

OpenAI Swarm/Agents SDK, CrewAI 등에서 핵심 협업 메커니즘으로 쓰인다.

## 관련 노트

- [[Supervisor Pattern]]
- [[Multi Agent Architecture]]
- [[Workflow Design]]
- [[State Management]]
- [[CrewAI]]
