# Dev Summary — 챗봇 UI/UX 리뷰 이슈 수정
> Tech Lead 통합 · 2026-07-27 · run:20260727-132925-87329

## 참여 역할
- frontend (구현), security (review-only), design (리뷰 모드)

## 모델 사용 내역
- frontend: sonnet (기본값)
- security: opus (기본값, 리뷰 모드)

## 통합 요약
챗봇 리뷰 FAIL(HIGH 5 확정)을 전건 해소: LLM 답변 마크다운(굵게·링크)을 XSS-safe 토큰 파서로 렌더해 /blog 링크 클릭 동선 복구, ESC·포커스 복귀·재오픈 포커스·aria-live 접근성 완성, 대비 4곳 상향(텍스트 6.82:1, 테두리 3.39:1), 429 구분·isError 히스토리 오염 차단·근접 스크롤, GLB 544.8KB→21.8KB(draco)+idle 로드+load/error 크로스페이드, dvh 모바일 키보드 대응.

## 변경 파일 (역할별)
### Frontend (`.state/dev/frontend.md`)
- `src/components/agent/AgentChat.tsx` — 마크다운 렌더러·접근성·에러 UX
- `src/components/agent/AgentWidget.tsx` — idle 로드·포커스 복귀·크로스페이드
- `src/components/agent/agent.module.css` — 대비·크로스페이드·dvh
- `public/ai-chat-1c.glb` — draco 압축 (96% 감소)
### Tech Lead 직접 수정 (리뷰 지적 즉시 교정, 각 1줄)
- `agent.module.css` .input 테두리 gold-faint→gold-dim (1.57:1→3.39:1, Design HIGH)
- `AgentChat.tsx` isInternalHref에 백슬래시·공백 거부 (오픈 리다이렉트, Security MEDIUM) — 페이로드 7종 단위 검증

## API 계약
- POST /api/agent/chat 변경 없음. 클라이언트는 isError 메시지를 히스토리에서 제외하고 {role, content}만 전송.

## 배포·운영 영향
- 환경 변수 변경 없음 / 마이그레이션 없음
- draco 디코더가 model-viewer 기본 CDN(gstatic)에서 로드됨 — 신규 외부 페치 1건 (수용, LOW)
- 롤백: 이 커밋 revert만으로 완전 복원

## 리뷰 결과
- Tech Lead 기술 리뷰: PASS (계약 정합·스코프·요구사항 누락 0)
- Security cross-review: PASS — XSS 42종 페이로드 방어 확인, MEDIUM 1(오픈 리다이렉트) 즉시 수정, LOW 4 수용
- 다관점 적대 검증: N/A (인증·결제·PII 비해당)
- Design 시각 리뷰: PASS — HIGH 1(입력 테두리 대비) 즉시 수정 후 재실측 통과, 새 색상 리터럴 0

## 재디스패치 이력
- 없음 (리뷰 지적 2건은 각 1줄이라 Tech Lead 직접 교정)

## 미해결 / 후속 작업
- LOW: 전역 CSP·보안 헤더 부재(기존 이슈), 레이트리밋 인스턴스 로컬, 스트리밍 중 aria-live 이원화(낭독 품질 개선), gltf simplify 무손실 옵션 검토
