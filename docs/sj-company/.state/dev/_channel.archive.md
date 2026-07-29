# Team Channel — 챗봇 UI/UX 리뷰 이슈 수정 (마크다운·접근성·대비·에셋)
> 프로젝트: resume_songseungju  |  경로: <REPO_ROOT>
> 시작: 2026-07-27

---
## [frontend] ✅ DONE
핵심 변경: AgentChat/AgentWidget에 최소 마크다운 렌더러·포커스/ESC/aria-live 접근성·대비 상향·429/isError 에러 UX·근접 스크롤·즉시 로딩 인디케이터·model-viewer idle 로드+load/error 크로스페이드를 구현하고, GLB를 draco로 544.8KB→21.8KB 압축. tsc/build/Playwright(9건) 전부 pass.
후속 에이전트 주의사항: GLB 압축에 `gltf-transform optimize` 기본 `simplify` 단계가 포함됨(육안 확인 결과 이상 없음) — 형상 손실이 우려되면 `--simplify` 비활성화 옵션 검토. `aria-live`는 PM 브리프 최소 사양대로 상시 polite(스트리밍 중 이원화 미구현).
블로커: 없음
---


## [sj-dev-security · review] 챗봇 UX 수정 보안 리뷰 — PASS
- 산출: `docs/sj-company/.state/dev/_review-security.md` (기본 security.md 미변경)
- 판정: **PASS** — CRITICAL 0 / HIGH 0 / MEDIUM 1 / LOW 4
- 마크다운 렌더러(`renderInlineTokens`) 42종 페이로드 적대 검증 → **XSS 재현 실패(안전)**. javascript:/data:/vbscript:, 대소문자·공백·개행·엔티티·퍼센트 인코딩, 중첩 마크다운 전부 차단. dangerouslySetInnerHTML 미사용 확인. ReDoS 없음(32k 반복 0.62ms).
- MEDIUM: `AgentChat.tsx:36-38` `isInternalHref`가 `//`만 막아 `/\evil.com`, `/<TAB>/evil.com`, `/<LF>/evil.com`이 통과 → `<Link>`로 렌더 후 `https://evil.com/`으로 리졸브(오픈 리다이렉트). 스크립트 실행 아님. 탭/개행 제거 + `\` 차단으로 수정 권장.
- LOW: draco 전환으로 model-viewer가 `https://www.gstatic.com/draco/versioned/decoders/1.5.6/`에서 WASM 디코더를 신규 페치(공급망·CSP 영향, 차단 아님) / 사이트 전역 CSP·보안헤더 부재 / 레이트리밋 인스턴스 로컬 / assistant 답변 1000자 초과 시 다음 턴 400 되는 기존 계약 불일치.
- `route.ts` 이번 사이클 변경 없음 확인(검증·레이트리밋 회귀 없음). 신규 파일 전체 하드코딩 시크릿 **0건**, `.env*` gitignore 처리 확인.
