---
type: template
domain: product
role: Frontend
status: active
last-reviewed: 2026-07-27
---

# API 의존성 계약

> Frontend가 사용하는 실제 Backend 계약과 화면 반응을 1:1로 연결한다. 기준은 납품 문서인 API 정의서(인터페이스 정의서) — 여기서 임의 가정하면 연동 검수에서 터진다.

## 계약 기준

| 항목 | 작성 |
|---|---|
| API 정의서·Backend Result Card |  |
| 계약 버전·기준 commit |  |
| 인증 방식 |  |
| 공통 오류 형식 |  |
| 미확정 endpoint |  |

## Endpoint 매핑

| 화면·행동 | Method·URL | Request | 성공 Response | 오류·상태코드 | timeout·취소 | 캐시·무효화 |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 화면 반응 계약

| API 결과 | 사용자에게 보일 상태·문구 | 재시도 | 입력 보존 | 로깅·추적 ID |
|---|---|---|---|---|
| 200 |  |  |  |  |
| 400 |  |  |  |  |
| 401 / 403 |  |  |  |  |
| 404 / 409 |  |  |  |  |
| 429 / 5xx / timeout |  |  |  |  |

## 합의·미결

> 발주사·외부 시스템 담당의 회신 지연도 여기 기록하고 일정 영향을 즉시 공지한다.

| ID | 질문·불일치 | 임시 가정 금지 여부 | Owner | 기한 | 상태 |
|---|---|---|---|---|---|
| FE-API-001 |  | 차단 / 비차단 |  |  | Open |

## 완료 질문

- [ ] URL, method, request, response, status code가 모두 명시됐는가?
- [ ] payload의 optional·nullable·날짜·단위가 합의됐는가?
- [ ] 인증 만료, 중복 요청, timeout의 UX가 정의됐는가?
- [ ] 가상의 endpoint나 예시 payload를 확정 계약처럼 쓰지 않았는가?
- [ ] 이 매핑이 납품될 API 정의서의 최신 버전과 일치하는가?

## 인계

- Backend 확인자·확인일:
- 다음 문서: [[04_접근성·반응형·성능 계획]]
