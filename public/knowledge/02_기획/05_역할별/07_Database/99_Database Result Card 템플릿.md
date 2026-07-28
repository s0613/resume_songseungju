---
type: template
domain: product
role: Database
status: active
last-reviewed: 2026-07-27
---

# Database Result Card 템플릿

> 실행 저장 경로: `docs/sj-company/.state/dev/database.md`

```markdown
# Database Output — {태스크 요약}
> 작성: sj-dev-database · {날짜}
> 요구사항 ID / 기준 commit: {값}

## 변경 파일
- `migrations/2026XXXX_xxx.sql`: {내용}

## 스키마 변경
- 신규 테이블·컬럼·index: {값}
- 변경된 제약: {값}
- ERD·테이블정의서(납품본) 반영 여부: {반영 완료 / 갱신 필요}

## Backend 영향
- 신규 query 경로: {값}
- 변경된 컬럼·호환 범위: {값}

## 운영 적용 절차 (마이그레이션 절차서 반영)
1. {절차}

## 롤백 절차
1. {절차 또는 forward-fix}

## 실행한 검증
- 적용·무결성: `{명령·query}` → PASS / FAIL
- rollback·복구: {결과와 증거}
- lock·성능: {확인 결과}
- 미수행 검사: {없음 또는 사유·위험}

## 범위·CR
- 계약 범위 밖 이관·변경 요청·처리: {없음 또는 CR 번호}

## 알려진 제약 / 후속 작업
- {요구사항을 막는 항목 — 없으면 `없음`}
```

## 작성 규칙

- 실제 실행하지 않은 적용·rollback을 재현 완료로 쓰지 않는다.
- 데이터 규모, lock 시간, 호환성의 확인값과 추정값을 구분한다(운영 데이터 미제공 등 발주사 사유는 기록).
- Result Card는 통합용 전달물이며 최종 QA·검수 판정이 아니다. 검증 기록은 테스트결과서와 마이그레이션 절차서 갱신의 입력이 된다.
