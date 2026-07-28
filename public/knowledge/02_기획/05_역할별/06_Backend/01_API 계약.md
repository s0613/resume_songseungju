---
type: template
domain: product
role: Backend
status: active
last-reviewed: 2026-07-27
---

# API 계약

> Frontend와 외부 소비자가 구현을 추측하지 않도록 요청·응답·실패를 완결한다. 이 표가 납품 산출물인 **API 정의서(인터페이스 정의서)**의 구현 단계 원본이다 — 연동 개발 지연과 외부팀 협업 붕괴를 막는 문서. 설계 단계 정본은 [[02_API·데이터 계약]](Tech Lead)이며, 구현이 그와 달라지면 CR 또는 설계 문서 갱신으로 처리한다.

## 기본 정보

| 항목 | 작성 |
|---|---|
| 기능·요구사항 ID (RTM 연결) |  |
| Owner / Reviewer |  |
| API 버전·기준 commit |  |
| 인증·인가 방식 |  |
| 소비자 (Frontend·외부 시스템) |  |
| 범위 밖 (Out of Scope) |  |

## Endpoint 명세

| Method·URL | 목적 | Auth·권한 | Request schema | 성공 Response | 상태코드·오류 | 멱등성 |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 필드 사전

| 필드 | 위치 | 타입·형식 | required / nullable | 제약·단위 | 예시 | 민감도 |
|---|---|---|---|---|---|---|
|  | path / query / body / response |  |  |  |  |  |

## 공통 동작

| 항목 | 결정 |
|---|---|
| 오류 envelope·추적 ID |  |
| pagination·정렬·filter |  |
| rate limit·429 응답 |  |
| timeout·취소 |  |
| 호환성·deprecation |  |

## 소비자 확인

- [ ] Frontend가 endpoint와 payload를 검토했다.
- [ ] 외부 연동(발주사 타 시스템 등) 담당의 확인을 받았고, 회신 지연은 기록·공지했다.
- [ ] 날짜·시간대·통화·단위와 optional·nullable 의미가 명확하다.
- [ ] 400 / 401 / 403 / 404 / 409 / 429 / 5xx 중 적용 대상을 정의했다.
- [ ] 계약 변경 시 호환성과 migration 기간을 정했다 — 발주사 합의 후 API 정의서 버전에 반영.
- [ ] 계약에 없는 연동·endpoint 요청은 CR로 회부했다.

## 합의·미결

| ID | 결정·질문 | Owner | 기한 | 상태 | 근거·링크 |
|---|---|---|---|---|---|
| BE-API-001 |  |  |  | Draft |  |
