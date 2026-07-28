---
type: template
domain: product
role: DevOps·SRE
status: active
last-reviewed: 2026-07-27
---

# DevOps·SRE Result Card 템플릿

> 실행 저장 경로: `docs/sj-company/.state/dev/devops.md`

```markdown
# DevOps Output — {태스크 요약}
> 작성: sj-dev-devops · {날짜}
> 요구사항 ID / 기준 commit: {값}
> 검수본 여부 / artifact tag: {값}

## 변경 파일
- `.github/workflows/X.yml`: {변경 내용}

## 신규 / 변경 환경 변수
- `VAR_NAME`: {용도, 대상 환경, secret 여부}

## 배포 절차
1. {절차 — 시스템(설치)·운영 매뉴얼 반영 여부 표기}

## 롤백 절차
1. {절차}

## 실행한 검증
- build·CI: `{명령·run}` → PASS / FAIL
- deploy·healthcheck: {결과와 증거}
- rollback·복구: {결과와 증거}
- secret 노출 검사: {결과}
- 미수행 검사: {없음 또는 사유·위험 — 발주사 환경 제약으로 미수행한 항목 포함}

## 발주사 대기·지연 항목
- {방화벽·인증서·계정 등 — 신청일·상태, 없으면 `없음`}

## 알려진 제약 / 후속 작업
- {없으면 `없음`}
```

## 작성 규칙

- 환경 변수에는 실제 secret value를 쓰지 않는다.
- 실행하지 않은 배포·rollback을 완료로 보고하지 않는다.
- 배포·복구 절차는 시스템(설치)·운영 매뉴얼에 반영해야 인계가 완료된다.
- Result Card는 통합용 전달물이며 최종 Release·QA·검수 판정이 아니다.
