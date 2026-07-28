---
type: template
domain: product
role: Backend
status: active
last-reviewed: 2026-07-27
---

# Backend Result Card 템플릿

> 실행 저장 경로: `docs/sj-company/.state/dev/backend.md`

```markdown
# Backend Output — {태스크 요약}
> 작성: sj-dev-backend · {날짜}
> 요구사항 ID / 기준 commit: {값}

## 변경 파일
- `src/routes/X.ts`: {변경 내용}

## API 계약
### POST /api/...
- Request: `{ ... }`
- Response 200: `{ ... }`
- Errors: 400 / 401 / 404 / 409 / 500
- API 정의서(납품본) 반영 여부: {반영 완료 / 갱신 필요}

## Database 의존성
- 사용 테이블: {값}
- 신규·변경 컬럼: {값}
- 쿼리·migration 의존성: {값}

## 실행한 검증
- 테스트: `{명령}` → PASS / FAIL
- 권한·실패·timeout: {결과와 증거}
- 로그·metric: {확인 결과}
- 미수행 검사: {없음 또는 사유·위험}

## 범위·CR
- 기능사양서 밖 요청·처리: {없음 또는 CR 번호}

## 알려진 제약 / 후속 작업
- {없으면 `없음`}
```

## 작성 규칙

- API 계약은 구현된 값만 적고 예시와 확정값을 구분한다 — 이 내용이 납품 API 정의서 갱신의 원본이다.
- Database 의존성을 숨기거나 migration 완료를 추정하지 않는다.
- Result Card는 통합용 자기 보고이며 최종 QA·검수 판정이 아니다. 검증 기록은 테스트결과서·RTM 갱신의 입력이 된다.
