---
type: template
domain: product
role: Frontend
status: active
last-reviewed: 2026-07-27
---

# Frontend Result Card 템플릿

> 실행 저장 경로: `docs/sj-company/.state/dev/frontend.md`

```markdown
# Frontend Output — {태스크 요약}
> 작성: sj-dev-frontend · {날짜}
> 요구사항 ID / 기준 commit: {값}
> 화면정의서 기준 버전: {값}

## 변경 파일
- `src/components/X.tsx`: {변경 내용}

## 구현 요약
{화면·컴포넌트·상태 구현을 2~4줄로 설명}

## Backend 계약 의존성
- 사용하는 endpoint: `GET /api/...`
- 기대 payload: `{ ... }`
- API 정의서 버전·미결: {값}

## 실행한 검증
- 테스트: `{명령}` → PASS / FAIL
- 시각 검증: {URL, viewport, 스크린샷 경로, 화면정의서·목업 비교 결과}
- 접근성·콘솔: {확인 결과}
- 미수행 검사: {없음 또는 사유·위험}

## 범위·CR
- 화면정의서 밖 요청·처리: {없음 또는 CR 번호}

## 알려진 제약 / 후속 작업
- {없으면 `없음`}
```

## 작성 규칙

- 변경 파일은 실제 경로와 역할을 적는다(소스코드 이관 목록의 근거).
- 스크린샷을 열어 확인하지 않았다면 시각 검증을 PASS로 쓰지 않는다.
- 자기 보고는 통합용 전달물이며 최종 QA·검수 판정이 아니다. 이 카드의 검증 기록은 테스트결과서·RTM 갱신의 입력이 된다.
