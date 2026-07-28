---
tags: [AI-Agent, 메모리]
last-reviewed: 2026-07-27
---

# Episodic Memory

> 특정 시점에 일어난 사건·경험을 시간 맥락과 함께 기록하는 장기 기억의 한 종류.

## 핵심 개념

일화 기억은 "언제, 어떤 상황에서, 무슨 일이 있었고, 어떻게 처리했는가"를 담는다. 인간이 자전적 사건을 떠올리듯, 에이전트는 과거의 구체적 상호작용·작업 실행 기록을 회상한다. [[Semantic Memory]]가 시점과 무관한 일반 사실("사용자는 한국어를 선호한다")이라면, 일화 기억은 시간에 묶인 구체적 사건("3월 2일 결제 오류를 환불 처리로 해결했다")이다.

특징:

- **시간성**: 타임스탬프·순서 정보를 갖는다.
- **맥락 보존**: 승인된 요약·출처 포인터·행동·결과를 묶되 원시 입력과 도구 payload는 복제하지 않는다.
- **사례 기반 추론**: 유사 상황에서 과거 경험을 끌어와 의사결정에 참고.

## 저장 방식

각 에피소드는 선별된 파생 기억이며 보통 다음을 포함한다.

- owner scope: `tenant_id`, `principal_type/id`, `agent_namespace`
- 발생 시각, 마스킹된 상황 요약, 정본 source message/run ID
- 허용된 행동 요약·정책 ID와 구조화된 outcome (원시 tool args/result 제외)
- 선택적 결정 요약·교훈 (raw chain-of-thought 제외)
- 저장 목적·동의 근거, confidence, TTL·삭제 상태

정본은 관계형 DB/이벤트 레코드에 두고, 의미 검색이 평가로 입증된 경우에만 [[Vector Database]] 인덱스를 파생한다. 회수 시 owner/agent ACL과 삭제·만료 필터를 먼저 적용한다.

## 구현 예시

```python
episode = {
    "id": "mem_...",
    "tenant_id": "tenant_...",
    "principal_type": "user",
    "principal_id": "usr_...",
    "agent_namespace": "support",
    "timestamp": "2026-03-02T10:15:00Z",
    "summary": "중복 결제 문의를 승인된 환불 절차로 해결",
    "source_run_ids": ["run_..."],
    "outcome_code": "refund_approved",
    "policy_id": "refund_policy_v3",
    "expires_at": "2026-09-02T00:00:00Z",
}
memory_repo.insert(episode)  # owner-scoped 정본
if semantic_retrieval_enabled:
    vector_index.upsert(episode["id"], embed(episode["summary"]),
                        metadata=allowlisted_scope_and_source_ids(episode))
```

서버 write 계층이 owner scope·허용 schema·동의/목적·PII를 검증한다. 정본의 TTL·삭제·owner 변경은 vector index에도 전파한다.

## 활용

- **소수샷 사례 제공**: 과거 성공 에피소드를 프롬프트에 넣어 few-shot 가이드로 사용.
- **자기 개선**: 실패 에피소드를 회상해 [[Reflection]]·[[Self Correction]]으로 같은 실수 반복 방지.
- **연속성**: 멀티세션 작업에서 "지난번 어디까지 했는지" 복원.
- **계획 수립**: 유사 과제의 과거 실행 경로를 참고해 [[Planning]] 보강.

일화 기억이 누적되면서 반복 패턴이 일반화되면 [[Semantic Memory]] 후보로 만들 수 있다. 동의·목적·PII·중복·충돌·삭제 전파 계약은 [[프로덕션 대화형 에이전트 요청 생명주기]]를 따른다.

## 관련 노트

- [[Memory Architecture]]
- [[Long Term Memory]]
- [[Semantic Memory]]
- [[Reflection]]
- [[Self Correction]]
- [[Vector Database]]
- [[프로덕션 대화형 에이전트 요청 생명주기]]
