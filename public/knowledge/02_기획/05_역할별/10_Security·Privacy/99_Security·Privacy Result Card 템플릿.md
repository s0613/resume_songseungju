---
type: template
domain: product
role: Security·Privacy
status: active
last-reviewed: 2026-07-27
---

# Security·Privacy Result Card 템플릿

> 구현 저장 경로: `docs/sj-company/.state/dev/security.md`  
> 리뷰 저장 경로: `docs/sj-company/.state/dev/_review-security[-{LENS}].md`

```markdown
# Security Output — {태스크 요약}
> 작성: sj-dev-security · {날짜}
> 모드: implement | review
> 요구사항 ID / 기준 commit: {값}
> 관련 발주사 심사 항목: {ID 또는 `없음`}

## 변경 파일 (implement 모드만)
- `{파일}`: {변경 내용}

## 발견 (CRITICAL / HIGH / MEDIUM / LOW)

### CRITICAL — 머지·오픈 차단
- [{role}] {파일}:{line} — {문제·재현 근거} → {권장 조치}

### HIGH — 머지 전 수정 권장
- {발견 또는 `없음`}

### MEDIUM / LOW — 후속 작업
- {발견 또는 `없음`}

## 실행한 검증
- 보안 테스트: `{명령·절차}` → PASS / FAIL
- 검토한 실제 파일: {목록}
- 미검토·미수행 영역: {없음 또는 사유·위험}

## 판정: PASS | FAIL

## 알려진 제약 / 후속 작업
- {요구사항·심사 대응을 막는 미해결 항목 — 없으면 `없음`}
```

## 저장·독립성 규칙

- `MODE=implement`는 기본 `security.md`에 현재 cycle Result Card를 쓴다.
- `MODE=review`는 지정된 `_review-security[-{LENS}].md`에 쓰며 `security.md`를 덮어쓰지 않는다.
- `_` prefix 파일은 구현 Result Card가 아니라 독립 리뷰 산출물이다.
- 리뷰 중 다른 `_review-*` 결론을 먼저 읽지 않고 실제 변경물로 판정한다.
- 발주사 보안성 검토 제출용 증적은 Result Card에서 추출 가능해야 한다 — 심사 직전에 새로 만들지 않는다.
