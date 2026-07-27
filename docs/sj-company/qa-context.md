# QA Context — resume_songseungju

## 테스트 프레임워크
없음 (playwright.config 부재, 유닛 테스트 없음) — 검증은 `npm run build` + 빌드 산출물(.next/server/app/*.html) grep 대조

## 테스트 실행 명령
`npm run build` (정적 프리렌더 30 라우트) → `.next/server/app/` HTML/사이트맵 검사

## 주요 검증 포인트
- 메타데이터 상속: 자식 라우트가 openGraph를 정의하면 루트 openGraph가 통째로 대체됨 — og:title/og:image 누락 회귀 주의
- title 템플릿(%s | 송승주) 이중 접미사 회귀
- sitemap.xml이 src/data/{blog,insights,portfolio}.ts와 일치하는지
- 메인 프리렌더에 포지셔닝 문구·블로그 링크 3개·JSON-LD 존재
- 가로 오버플로우 (320/768/1024/1440)

## 알려진 취약 영역
- OG 이미지 라우트: Google Fonts 외부 fetch 의존 (배포 환경 차단 시 영문 폴백)
- Header는 /portfolio/* 상세에서만 렌더 — 메인 섹션 앵커 변경 시 깨짐 이력 있음

## 히스토리
- 2026-07-27: 초기 생성 — 브랜딩 개편 QA 사이클
- 2026-07-27 [run:20260727-081336-49493]: blog.ts의 `slug:` grep 카운트는 카테고리 slug 5개가 섞여 posts 수와 다르다 — posts 검증은 배열 최상위 매치로 할 것.
- 2026-07-27 [run:20260727-081336-49493]: 이 프로젝트 메타 회귀는 Claude 리뷰 3종이 놓치고 Codex 교차 리뷰가 잡았다(og 상속·title 템플릿 중복) — 메타데이터 변경 사이클엔 빌드 산출물 og:*·<title> grep 대조를 QA 기본 케이스로 유지.
