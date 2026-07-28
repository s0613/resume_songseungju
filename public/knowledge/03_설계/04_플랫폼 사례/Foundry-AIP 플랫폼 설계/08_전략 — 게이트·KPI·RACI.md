---
date: 2026-07-08
project: AI 에이전트
type: reference
domain: architecture
status: active
last-reviewed: 2026-07-27
tags:
  - strategy
  - kpi
  - governance
  - raci
  - decision-gate
  - metrics
related:
  - "[[00_MOC — Foundry+AIP 플랫폼 설계]]"
  - "[[07_전략 — 7단계 실행 로드맵]]"
---

# ⑧ 전략 — 게이트 · KPI · RACI · 소유권 이관

> [!NOTE] 이 문서는 [[07_전략 — 7단계 실행 로드맵]]의 "의사결정·측정·조직" 짝
> 각 단계를 **언제 넘어가고, 무엇으로 측정하고, 누가 책임지는가.**
> 수치 정본: 단계별 기간·Done 기준은 07, 전환 게이트·KPI 목표는 이 문서. 두 문서가 어긋나면 이 규칙으로 판정한다.

---

## 1. 전환 게이트 (go / no-go)

| 전환 | ✅ 진행 신호 | ⛔ 멈춤 신호 |
|------|------------|------------|
| 파일럿 → 온톨로지 | 업무 owner·KPI·데이터 source·action 후보 명확 | 범위가 전사적/추상적 |
| 온톨로지 → 파이프라인 | object/link/action freeze, key·owner 확정 | ERP 테이블 복제 모델 |
| 파이프라인 → AI Read | freshness/quality/lineage/권한 기준 충족 | 데이터 의미를 SME가 불신 |
| AI Read → Proposal | 답변 수용률 70%+, 권한 위반 0건 | citation/hallucination 문제 지속 |
| Proposal → 자동실행 | proposal 2~4주 shadow review 완료, unsafe 0건, acceptance 40~70% 밴드 안정(70%+ 는 형식적 승인 여부 검증 후). 자동실행 30일 shadow mode는 6단계 **내부** 완료 조건([[07_전략 — 7단계 실행 로드맵]] 6단계) | rollback/책임/감사 불명확 |
| 자동실행 → 플랫폼화 | 운영 안정, 다른 도메인 재사용 수요 존재 | 첫 도메인도 수동 지원 없이는 불안정 |

---

## 2. KPI — 단계별 측정 지표

### AI Read 단계
| 지표 | 목표 |
|------|-----:|
| 주간 활성 사용자 | 대상자의 50%+ |
| 답변 수용률 | 70%+ |
| citation 포함률 | 95%+ |
| hallucination/unsupported | 5% 미만 |
| 권한 위반 | 0건 |
| p95 latency | 10초 이하 |
| 검색/분석 시간 단축 | 30%+ |
| "모름/추가확인" 적절 처리율 | 90%+ |

### AI Action Proposal 단계
| 지표 | 목표 |
|------|-----:|
| proposal acceptance rate | 40~70% (성숙 후 70%+) |
| invalid proposal rate | 5% 미만 |
| critical unsafe proposal | 0건 |
| action 초안 작성 시간 단축 | 50%+ |
| 승인 소요시간 단축 | 30%+ |
| 거절 사유 중 형식 오류 비중 | 20% 미만 |
| audit completeness | 100% |

### 자동화 단계
| 지표 | 목표 |
|------|-----:|
| 자동실행 성공률 | 95~99% |
| rollback/compensation 필요율 | 1% 미만 |
| P0/P1 incident | 0건 |
| circuit breaker 작동 테스트 | 100% 통과 |
| 사용자 override rate | 10% 미만 |
| 자동 action당 비용 | 수작업 대비 명확히 낮음 |

> [!TIP] acceptance rate는 양방향으로 읽는다
> 너무 낮으면 proposal 품질 문제, 너무 높으면(검토 없이 다 승인) 승인이 형식적일 수 있다. 40~70% 밴드를 벗어나면 원인을 캔다.

---

## 3. RACI — 중앙 플랫폼팀 vs 도메인팀

`A=Accountable · R=Responsible · C=Consulted` — I(Informed)는 생략(결과는 전 역할 공지가 기본), **각 행의 A는 하나만 둔다** ([[00_역할별 설계 지도]]의 Owner 하나 규칙과 동일).

| 업무 | 중앙 플랫폼팀 | 도메인팀 | 보안/거버넌스 | AI CoE |
|------|:---:|:---:|:---:|:---:|
| 파일럿 선정 | C | A/R | C | C |
| KPI 정의 | C | A/R | C | C |
| Object 정의 | C | A/R | C | C |
| Link 정의 | C | A/R | C | C |
| Action 정의 | C | A/R | C | C |
| Data pipeline 구현 | A/R | C | C | C |
| Data quality 기준 | C | A/R | C | C |
| 권한/marking 정책 | C | C | A/R | C |
| AI prompt/retrieval | C | C | C | A/R |
| Eval suite | C | R | C | A/R |
| Action approval workflow | R | A/R | C | C |
| 자동실행 정책 | R | A | C | C |
| 공통 템플릿/플랫폼 | A/R | C | C | C |
| 운영 모니터링 | R | A/R | C | C |

> [!IMPORTANT] 읽는 법
> object·link·action·KPI의 **Accountable은 언제나 도메인팀** — 승인 워크플로·자동실행 정책도 업무 리스크의 책임자인 도메인팀이 A이고, 보안/거버넌스는 C이되 권한·marking 정책(자기 A 행)으로 거부권을 행사한다. 중앙팀은 파이프라인·플랫폼·템플릿의 A/R. AI prompt/eval은 AI CoE A. → 안티패턴 "플랫폼팀이 모든 온톨로지 변경 처리"를 구조적으로 방지. [[06_안티패턴 — 흔한 실패 모드]]

---

## 4. 온톨로지 소유권 이관 (단계적)

처음부터 도메인팀이 business owner여야 하지만, 초기 실무 작성·도구 운영은 플랫폼팀이 많이 돕는다. 이관은 단계적으로:

| 시점 | 소유권 상태 |
|------|-------------|
| 파일럿~최소 온톨로지 | 플랫폼팀 설계 촉진, 도메인팀 의미 승인 |
| 파이프라인~AI Read | 공동 소유. 변경은 플랫폼팀 리뷰 필요 |
| **Action Proposal 진입** | action·object 업무 소유권 → **도메인팀 이관** |
| 제한적 자동실행 전 | 도메인팀이 change approval authority 보유 |
| 플랫폼화 이후 | 중앙팀은 표준·검증·도구, 도메인팀은 ontology backlog·release 직접 운영 |

> [!SUCCESS] 이관 완료 기계적 기준 (아래를 충족하면 도메인팀이 온톨로지를 실제로 소유한 것)
> - 도메인 owner가 object/action 변경 요청을 **우선순위화**한다
> - 도메인 SME가 신규 property **정의서를 작성**할 수 있다
> - 도메인팀이 **월 1회 ontology review**를 운영한다
> - 플랫폼팀 없이 minor property/action 변경을 제안할 수 있다
> - 보안/거버넌스 checklist를 **도메인팀이 먼저 작성**한다
> - 최근 2번의 ontology release에서 **rollback이 없다**

---

## 5. 이 프로젝트가 산으로 가는가 — 조기 리트머스
빠른 자가진단은 [[06_안티패턴 — 흔한 실패 모드]]의 "조직 안티패턴 리트머스" 12개 신호. **2개 이상이면 멈추고 재점검.**
