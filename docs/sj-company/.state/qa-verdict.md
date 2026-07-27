# QA Verdict — AI 에이전트 빌더 퍼스널 브랜딩 전 사이트 페이지 정리
> 생성일: 2026-07-27 · run:20260727-081336-49493 · Judge 독립성: pm-brief + 실변경 파일 + 빌드 산출물 직접 대조 (dev-summary 미참조)

## 테스트 케이스 (pm-brief 완료 조건 1:1 대조)
- [x] `npm run build` exit 0 — QA가 독립 재실행, 30 라우트 생성
- [x] 메인 프리렌더 HTML "AI 에이전트" 29건 포함 / "온양고" 0건
- [x] 메인에 /blog/ 링크 3개 (harness-obsidian-long-term-memory · making-my-own-harness · starting-london-system-agent)
- [x] /portfolio/* 12개 전부 고유 title (빌드 산출 12종 확인)
- [x] opengraph-image 라우트 산출물 존재 + content-type image/png (블로그 동적 OG 포함)
- [x] sitemap.xml에 blog.ts posts 6개 slug 전부 포함 (소스 11건 매치는 카테고리 slug 5개 포함 — posts는 6, 일치 확인)
- [x] src/main/ 디렉토리 부재 상태로 빌드 통과
- [x] Header 구버전 앵커(#skill 등) 0건, 새 앵커 4종(#builds/#writing/#archive/#about)이 메인 프리렌더의 실제 id와 1:1 대응
- [x] (추가) JSON-LD Person + WebSite 렌더 확인
- [x] (추가) blog title 이중 접미사 해소, /blog og:image 존재, 포트폴리오 자체 og:title/canonical (Codex 지적 수정분 재검증)

## 엣지 케이스
- OG 이미지 폰트 fetch 실패(배포 환경 외부 차단) → 영문 폴백 코드 경로 존재하나 실환경 미검증 — 배포 후 스모크 테스트 필요
- 존재하지 않는 blog slug의 opengraph-image가 generic 이미지로 200 응답 (LOW, 실사용 영향 미미)
- Header 앵커는 /portfolio/* → /#builds 크로스 페이지 내비게이션 — 메인 id 실재 확인으로 정적 검증 완료 (실브라우저 스크롤 동작은 pw 부재로 미검증)

## 판정: PASS
pm-brief `## 완료 조건` 8개 항목 전부 실행·관찰로 충족 확인. Codex 교차 리뷰 지적 10건의 수정도 빌드 산출물에서 재검증 완료. Playwright 미설정 프로젝트라 빌드+산출물 대조로 검증 (pw-loop 대체 조건 충족).

## 발견된 이슈
- LOW: 도메인 이메일 미전환 (farchicken00@naver.com 4곳) — 코드 밖 인프라 후속 과제
- LOW: 보안 헤더(CSP/HSTS) 부재 — 기존 이슈, 별도 태스크 권장
- LOW: OG 폴백·미존재 slug 200 — 상기 엣지 케이스 참조
