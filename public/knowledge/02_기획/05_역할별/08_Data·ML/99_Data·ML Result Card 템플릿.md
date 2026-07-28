---
type: template
domain: product
role: Data·ML
status: active
last-reviewed: 2026-07-27
---

# Data·ML Result Card 템플릿

> 실행 저장 경로: `docs/sj-company/.state/dev/data.md`

```markdown
# Data/ML Output — {태스크 요약}
> 작성: sj-dev-data · {날짜}
> 요구사항 ID / 기준 commit: {값}

## 변경 파일
- `pipelines/X.py`: {내용}

## 데이터 가정
- 입력 schema: {값} (데이터 명세 반영 여부: {반영 완료 / 갱신 필요})
- 결측 처리: {값}
- 학습·검증·평가 분할: {값}

## 모델
- 알고리즘·artifact version: {값}
- baseline 대비 지표: {값}
- 합의된 검수 threshold 대비: {충족 / 미달 — 미달 시 협의 기록}

## 추론 인터페이스
- Input: `{ ... }`
- Output: `{ ... }`
- 지연 한계: P95 < {값} ms (NFR 합의값)

## 운영 절차
- 학습 trigger: {값}
- rollback: {값}

## 실행한 검증
- 재현·평가: `{명령}` → PASS / FAIL (평가 리포트 경로: {값})
- 누수·편향·slice: {결과와 리포트}
- 지연·memory·fallback: {결과}
- 미수행 검사: {없음 또는 사유·위험}

## 범위·CR
- 합의 범위 밖 요구(기준 상향·추가 데이터 등)·처리: {없음 또는 CR 번호}

## 알려진 제약 / 후속 작업
- {요구사항을 막는 항목 — 없으면 `없음`}
```

## 작성 규칙

- 평가셋, baseline, metric과 version이 없는 성능 표현을 쓰지 않는다 — 합의된 검수 threshold 대비로만 말한다.
- 실제 사용자 PII를 예시·로그·artifact 경로에 노출하지 않는다.
- Result Card는 통합용 전달물이며 최종 QA·검수 판정이 아니다. 평가 기록은 평가 리포트·테스트결과서·RTM 갱신의 입력이 된다.
