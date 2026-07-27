# Design Review — 블로그 댓글·조회수 UI + 인사이트 이관
> 2026-07-27 · sj-design (리뷰 모드) · TARGET: docs/sj-company/.state/dev/frontend.md

## 판정: PASS

## 레퍼런스 일치도 (사용자 첨부 이미지가 레퍼런스)
- 이름·비밀번호 가로 2열: ✅ .commentFields grid 1fr 1fr (모바일 세로 스택 미디어쿼리 확인)
- 대형 textarea + placeholder "댓글을 입력해주세요.": ✅ rows=6, 이미지와 동일 placeholder
- 라이트 보더 미니멀 박스 톤: ✅ 블로그 기존 보더·서피스 토큰 재사용

## 절대 금지 패턴 / AI 티 체크
- 원색·보라 액센트·장식 그라데이션: ✅ 없음
- 호버·포커스: ✅ :focus 스타일 정의됨
- 접근성: ✅ label 연결, srOnly, error role="alert", honeypot aria-hidden + tabIndex −1
- CTA 1종: ✅ "댓글 남기기" 단일 버튼, submitting 상태 처리

## 취향 프로필 게이트
- 신규 색 리터럴: ⚠️ 1건 — `.commentError`의 #c0392b (오류 시맨틱 컬러). 기존 블로그 팔레트에 레드 계열 부재로 신설이 불가피한 **구조화된 예외**로 승인 (rule: C08 / reason: 오류 피드백 시맨틱 컬러 필요 / scope: .commentError 1곳). 나머지 신규 클래스는 기존 토큰 재사용 확인 (#2b2f36·#ffffff 기존값).
- route 전용 토큰 재정의: ✅ 없음

## 발견 이슈
- LOW: 오류 컬러 예외 위 기록 — 후속 태스크에서 오류 컬러가 2곳 이상 생기면 변수로 승격할 것.

## Frontend 재디스패치 지시
없음
