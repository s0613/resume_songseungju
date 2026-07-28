---
date: 2026-07-08
project: AI 에이전트
type: moc
domain: architecture
status: active
last-reviewed: 2026-07-27
source: "Palantir Foundry/AIP 공개 문서 + Claude·GPT(codex) 교차 종합"
tags:
  - architecture
  - foundry
  - aip
  - palantir
  - ontology
  - data-platform
  - governance
  - MOC
related:
  - "[[context-provider]]"
---

# MOC — Foundry + AIP 플랫폼 설계

> [!NOTE] 이 폴더는 "AI 에이전트"가 아니라 **전체 운영 시스템 설계**다
> Foundry + AIP는 데이터·온톨로지·거버넌스·AI를 **하나의 운영 모델**로 묶는 방식이다.
> **AI 에이전트(AIP)는 이 스택의 여러 계층 중 맨 위 한 계층일 뿐**이고, 실행 로드맵에서는 **7단계 중 4~6단계**에 해당한다.
> 그 아래에 온톨로지·데이터 파이프라인·거버넌스가 먼저 서 있어야 AI가 "답변 생성기"를 넘어 실제 업무를 실행할 수 있다.

---

## 전체 그림 — 5계층 스택에서 AI가 있는 자리

```mermaid
flowchart TB
  L5["⑤ AIP — AI read/write workflow<br/>(에이전트·Logic·Chatbot) ← 'AI 에이전트'는 여기 한 층"]
  L4["④ Governance — 권한·marking·승인·감사·eval"]
  L3["③ Ontology — object·link·action·function (시맨틱 레이어)"]
  L2["② Data Integration — pipeline·transform·lineage"]
  L1["① Source — ERP·MES·CRM·문서·센서"]
  L1 --> L2 --> L3 --> L5
  L4 -. 모든 계층을 관통 .-> L2
  L4 -. .-> L3
  L4 -. .-> L5
  style L5 fill:#2d5a88,color:#fff
  style L3 fill:#3a6b3a,color:#fff
```

> [!IMPORTANT] 핵심 한 줄
> **AI를 먼저 만들지 말고 온톨로지(③)를 먼저 만들어라.** 업무 객체·권한·행동 모델 없이 vector DB와 LLM 오케스트레이션(⑤)부터 도입하면, 에이전트는 운영 시스템에 안전하게 연결될 수 없다.

---

## 전략이 먼저다 — 7단계 로드맵 (요약)

> 상세는 [[07_전략 — 7단계 실행 로드맵]] · 게이트/지표/조직은 [[08_전략 — 게이트·KPI·RACI]]

```mermaid
graph LR
  S1["1.파일럿 선정<br/>2~4주"] --> S2["2.최소 온톨로지<br/>3~6주"]
  S2 --> S3["3.데이터 파이프라인<br/>6~10주"]
  S3 --> S4["4.AI Read<br/>4~6주"]
  S4 --> S5["5.Action Proposal<br/>4~8주"]
  S5 --> S6["6.제한적 자동실행<br/>6~12주"]
  S6 --> S7["7.플랫폼화<br/>3~6개월"]
  style S4 fill:#2d5a88,color:#fff
  style S5 fill:#2d5a88,color:#fff
  style S6 fill:#2d5a88,color:#fff
```

- 1차 운영 전환까지 현실적으로 **6~9개월**.
- 파란 칸(4~6단계)이 "AI 에이전트"가 실제로 등장하는 구간. **그 앞의 1~3단계가 전체 성패를 좌우한다.**

| 단계 | 이 스택의 계층 | 한 줄 목표 |
|------|---------------|-----------|
| 1 파일럿 선정 | — | "닫힌 업무 문제" 하나 고르기 |
| 2 최소 온톨로지 | ③ | object 5~10개로 **운영 모델** 확정 |
| 3 데이터 파이프라인 | ② | 신뢰 가능한 ontology-ready 데이터 |
| 4 AI Read | ⑤ | 권한 내 조회·설명·추천 (실행 없음) |
| 5 Action Proposal | ⑤+④ | AI가 실행안 초안 → **인간 승인** |
| 6 제한적 자동실행 | ⑤+④ | 저위험 action만 조건부 자동화 |
| 7 플랫폼화 | 전체 | 다른 도메인으로 반복 가능하게 |

---

## 문서 지도

> [!NOTE] 번호 읽는 법
> 문서 제목의 원문자(①~⑩)는 **문서 순번**이다. 5계층 스택의 계층 번호(①Source~⑤AIP)와 다르다 — 예: 문서 ①Ontology는 계층 ③, 문서 ④AIP는 계층 ⑤.

### 개념 (무엇을 만드나)
- [[01_Ontology — 시맨틱 레이어]] — 이 구조의 심장. object·link·action·function
- [[02_Data Integration — 파이프라인과 Lineage]] — 데이터를 온톨로지-ready로
- [[03_보안·거버넌스 모델]] — 권한·marking·승인·감사·eval
- [[04_AIP — 온톨로지 위의 AI 계층]] — Logic·Chatbot Studio·grounding·tools (= AI 에이전트 계층)

### 선택 (무엇으로 만드나)
- [[05_대체 스택 — 계층별 조합]] — Foundry 없이 오픈소스/상용으로 각 계층 대체

### 함정 (무엇을 피하나)
- [[06_안티패턴 — 흔한 실패 모드]] — 데이터/설계/조직 안티패턴

### 전략 (어떻게 진행하나) ⭐
- [[07_전략 — 7단계 실행 로드맵]] — 단계별 기간·팀·Done 기준·산출물
- [[08_전략 — 게이트·KPI·RACI]] — go/no-go 게이트·측정 지표·조직 역할분담·온톨로지 소유권 이관

### 배경 (원본 회사와 국내 지형)
- [[09_Palantir — 회사·제품·행보]] — 팔란티어 그 자체: 역사·Gotham/Foundry/Apollo/AIP·AI를 다루는 방식·에이전트 조립법·실적·SaaS 라인업·비즈니스 모델
- [[10_한국형 팔란티어 — 기업 지도]] — 정부 육성책(2026.06)·마키나락스·S2W 등 국내 주자·무엇을 따라했고 무엇이 격차인가

---

## 결론 — 네 가지를 하나로

> [!SUCCESS] 본질
> Foundry+AIP형 구조의 본질은 lakehouse·catalog·vector DB·agent framework의 **조합이 아니다.** 다음 넷을 **함께** 설계하는 것이다.
> 1. 신뢰 가능한 데이터 파이프라인과 lineage — [[02_Data Integration — 파이프라인과 Lineage]]
> 2. 현실 업무를 표현하는 **Ontology** — [[01_Ontology — 시맨틱 레이어]]
> 3. 권한·marking·승인·감사 **거버넌스** — [[03_보안·거버넌스 모델]]
> 4. Ontology에 grounded된 **AI read/write** — [[04_AIP — 온톨로지 위의 AI 계층]]

---

## 출처
- Palantir Foundry/AIP 공개 문서(`palantir.com/docs`).
- 명칭 변경(GPT 웹검색, 2026-07): `AIP Agent Studio → AIP Chatbot Studio`, `AIP Agents → AIP Chatbots`.
- Claude·GPT(codex) 교차 종합. 실행 플레이북의 기간·기준·KPI는 codex 심화 라운드 + 일반 데이터/플랫폼 엔지니어링 관례.
