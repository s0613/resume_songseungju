---
tags: [AI-Agent, 평가]
last-reviewed: 2026-07-27
---

# Trajectory Evaluation

> 한 줄 정의
> 최종 답뿐 아니라 에이전트의 **관측 가능한 단계**(결정·도구 호출·상태 전이)를 평가하는 방법. 에이전트 품질·디버깅의 핵심이다.

## 왜 필요한가

- 답이 맞아도 **비효율·위험한 경로**(불필요한 도구 호출, 과한 스텝)일 수 있다.
- 답이 틀렸을 때 **어느 스텝에서 어긋났는지** 봐야 원인을 고친다.
- 최종 정확도만으로는 에이전트의 행동 품질이 보이지 않는다.

## 측정 항목

- **도구 선택 정확도**: 올바른 도구를 골랐는가.
- **인자 정확도**: allowlist된 인자 schema·분류·범위가 맞는가 (원시 민감값 제외).
- **불필요/누락 스텝**: 군더더기·빠뜨린 단계.
- **순서 일치**: 기대 경로(reference trajectory) 대비 단계 순서.
- **효율**: 스텝 수·토큰·비용 → [[Performance Metrics]] · [[Cost Monitoring]]

## 방법

- **기준 경로 비교**: 정답 trajectory와 정확/순서 매칭.
- **LLM-as-a-Judge**: 경로 자체를 rubric으로 채점 → [[LLM-as-a-Judge]]
- 마스킹된 트레이스 메타데이터가 평가의 원천이다. raw chain-of-thought은 수집·평가하지 않는다 → [[Tracing]]

## 관련 노트

- [[Agent Evaluation]]
- [[LLM-as-a-Judge]]
- [[Tracing]]
- [[Performance Metrics]]
