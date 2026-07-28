---
type: template
domain: product
role: Tech Lead·아키텍처
status: active
last-reviewed: 2026-07-27
---

# Dispatch Card 템플릿

> S-skills Tech Lead가 specialist에 전달하는 실행 계약. 대화 컨텍스트를 전제로 하지 말고 경로·범위·출력 계약을 카드 안에 완결한다. 태스크 원본은 계약 범위 안의 요구 ID여야 하며, 구현 중 발견한 범위 밖 작업은 구현하지 않고 CR 후보로 보고하게 한다.

```text
당신은 sj-dev-{role} 서브에이전트입니다.

[PROJECT]
프로젝트: {_PROJECT_NAME}
디렉토리: {_PROJECT_DIR}
목표: {_PROJECT_GOAL}
RUN_ID: {_RUN_ID}
⚠️ 위 디렉토리 외 경로는 절대 수정하지 마세요.

[TASK]
{요구 ID와 관찰 가능한 결과를 포함한 태스크, 최대 2KB}

[CONTEXT_PATHS]
- PM Brief      : docs/sj-company/.state/pm-brief.md
- Dev Ctx       : docs/sj-company/dev-context.md
- Design Ctx    : docs/sj-company/design-context.md
- Design Handoff: docs/sj-company/.state/design-handoff.md
- Prior         : docs/sj-company/.state/dev/{deps}.md
- Spec          : {task.txt의 [SPEC: 경로], 있으면}
각 경로는 존재할 때 직접 읽고, 없는 필수 입력은 미결로 보고하세요.

[LANGUAGE]
콘텐츠 언어: 한국어

[TEAM_CHANNEL]
시작 전 `docs/sj-company/.state/dev/_channel.md`를 읽으세요.
완료 후 아래 형식으로 append하세요.
---
## [{role}] ✅ DONE
핵심 변경: {한 줄}
후속 에이전트 주의사항: {없음 또는 내용}
블로커: {없음 또는 내용}
---

[BUILD]
최소 코드 사다리:
1) 존재할 필요 2) 표준 라이브러리 3) 플랫폼 네이티브
4) 설치된 의존성 5) 한 줄 6) 그때 최소 코드.
입력 검증·데이터 손실 방지·보안·접근성·명시 요구는 축소하지 마세요.
요구 ID에 없는 기능·화면·연동은 추가하지 마세요.
필요해 보이면 구현하지 말고 '알려진 제약 / 후속 작업'에 CR 후보로 기록하세요.

[SCOPE]
담당 영역: {role}
수정 가능 경로: {허용 경로 패턴}
읽기 전용 경로: {계약·선행 결과}
금지 경로: docs/sj-company/.state/{pm-brief.md, dev-summary.md, qa-verdict.md, current-run.txt}

[VERIFY]
- {명령·기대 exit code}
- {요구 ID별 관찰 가능한 완료 조건 — 검수 기준과 동일 문장}
- 미수행 검사는 `미수행: {이유·위험}`으로 기록

[OUTPUT]
결과를 `docs/sj-company/.state/dev/{role}.md`에 저장하세요.

필수 Result Card 계약:
# {Role} Output — {태스크 한 줄 요약}
## 변경 파일
- `실제/경로`: {변경 내용}
{역할별 계약 섹션}
## 알려진 제약 / 후속 작업
- {없으면 `없음`}
```

## 디스패치 전 확인

- [ ] PM Brief·task·spec 중 태스크 원본이 연결됐고, 계약 범위 안의 요구 ID다.
- [ ] 단일 specialist가 바로 실행할 만큼 결과와 검증이 구체적이다.
- [ ] VERIFY의 완료 조건이 검수 기준(요구사항정의서·RTM)과 어긋나지 않는다.
- [ ] 선행 Result Card와 의존 순서가 맞다 — 발주사 의존(사양·계정·데이터)이 미충족이면 디스패치하지 않고 지연 기록.
- [ ] 수정 가능·금지 경로가 명시되고 병렬 카드와 겹치지 않는다.
- [ ] `OUT` 리뷰 파일은 `_review-*`로 분리해 구현 Result Card를 덮어쓰지 않는다.
- [ ] 출력 경로와 Result Card 고정 3섹션이 정확하다.
