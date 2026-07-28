---
type: template
domain: product
role: PM·PO·BA
status: active
last-reviewed: 2026-07-27
---

# PM·PO·BA 브리핑 템플릿

> S-skills 실행 저장 경로: `docs/sj-company/.state/pm-brief.md`. 아래 런타임 필수 형식의 제목과 섹션명은 바꾸지 않는다. 내용은 SRS·WBS·RTM에서 온다 — 브리핑이 원본 문서를 대체하지 않는다.

## 런타임 필수 블록

```markdown
[HINT:single={frontend|backend|database|devops|security|data|si|빈 값}]
# PM Brief — {태스크명}
> 생성일: {YYYY-MM-DD}

## 요구사항 분석
{문제·현업 사용자·계약 범위·원본 SRS 요구 ID를 포함한 분석 요약}

## 태스크 목록
- [ ] {요구 ID}: {specialist가 바로 실행할 수 있는 태스크}
- [ ] {요구 ID}: {태스크}

## 리스크
- {RISK/DEP/EXT ID}: {신호·영향·대응·Owner — 발주사 제공 지연 포함}

## 완료 조건 (기계 검증 가능)
- {요구 ID}: `{명령}` 실행 결과 exit 0
- {요구 ID}: {Given-When-Then의 관찰 가능한 결과}
- {NFR ID}: {도구} 측정값이 {임계값} 충족

## Dev/QA에 전달할 핵심 지침
- 기준 문서·버전: {SRS·WBS·RTM 경로 · 발주사 확인 버전}
- 범위 밖: {OUT ID — 범위 밖 요청은 CR 회부, 임의 구현 금지}
- 미결·가정: {ID·Owner·기한}
- 미수행 시 처리: {PASS 금지 / CONDITIONAL 등}
```

## HINT 규칙

| 태스크 성격 | 값 |
|---|---|
| SI 문서 전용 | `si` |
| UI·컴포넌트·화면·스타일 전용 | `frontend` |
| API·서버·도메인 로직 전용 | `backend` |
| 스키마·마이그레이션·쿼리 전용 | `database` |
| CI/CD·배포·인프라 전용 | `devops` |
| 인증·권한·암호화 전용 | `security` |
| 데이터 파이프라인·ML 전용 | `data` |
| 여러 영역 | 빈 값 |

## 저장 전 확인

- [ ] `[HINT:single=...]`이 파일 첫 줄이다.
- [ ] 태스크가 변경 대상이 아니라 원하는 결과와 SRS 요구 ID까지 설명한다.
- [ ] 완료 조건은 테스트 명령 또는 관찰 가능한 행동이고, 발주사와 합의된 검수 기준과 어긋나지 않는다.
- [ ] 리스크가 단순 걱정이 아니라 영향·대응·Owner를 갖는다 — 발주사 제공 사항의 필요일이 임박하면 포함한다.
- [ ] 범위 밖(OUT) 항목이 명시돼 specialist의 선의의 범위 확장을 막는다.
- [ ] Tech Lead가 필요한 specialist와 입력 경로를 판단할 수 있다.
- [ ] QA가 각 완료 조건을 원본 요구(SRS·RTM)와 1:1 대조할 수 있다.

## 계약 메모

- 런타임 브리핑은 실행용 휘발성 체크포인트다. 영속 SRS·WBS·RTM을 대체하지 않는다 — 납품·검수 근거는 항상 원본 문서다.
- QA·Judge는 `dev-summary.md`를 판정 근거로 사용하지 않고 이 브리핑과 실제 변경물을 직접 확인한다.
- 브리핑 중 구현 도중 발견된 범위 밖 필요 사항은 그 자리에서 구현하지 않고 CR 후보로 PM에 회부한다.
