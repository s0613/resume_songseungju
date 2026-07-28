---
type: checklist
domain: product
role: Backend
status: active
last-reviewed: 2026-07-27
---

# Backend 완료 체크리스트

## 계약·정확성

- [ ] URL, method, request, response, 상태코드가 구현과 일치한다(API 정의서 기준).
- [ ] Frontend가 계약을 별도 해석 없이 소비할 수 있다.
- [ ] 입력을 시스템 경계에서 schema로 검증한다.
- [ ] 도메인 로직과 HTTP transport가 분리됐다.
- [ ] 오류를 명시적으로 처리하고 내부 정보를 노출하지 않는다.
- [ ] 상태 변경에 transaction·idempotency·동시성을 검토했다.
- [ ] 기능사양서에 없는 endpoint·기능은 CR 승인 없이 포함하지 않았다.

## 의존성·성능

- [ ] 외부 호출에 timeout과 제한된 retry 정책이 있다.
- [ ] 목록 쿼리에 pagination 또는 LIMIT가 있다.
- [ ] N+1 쿼리와 불필요한 직렬 await가 없다.
- [ ] Database 변경과 배포 순서를 담당자와 합의했다.

## 보안·관측

- [ ] 보호 endpoint마다 인증·인가 guard가 있다.
- [ ] 쿼리가 parameterized이며 secret을 하드코딩하지 않았다.
- [ ] 오류와 로그에 token·비밀번호·PII가 없다.
- [ ] 핵심 경로의 구조화 로그·metric·추적 ID가 동작한다.

## 납품·검증·인계

- [ ] 소스코드가 이관 대상 저장소에 반영되고 형상관리 이력이 남았다.
- [ ] 빌드·배포 스크립트만으로 제3자가 빌드·기동을 재현할 수 있다.
- [ ] API 정의서(납품본)가 구현된 계약과 일치하게 갱신됐다.
- [ ] 정상·검증·권한·충돌·DB 실패·외부 timeout 테스트를 실행했다.
- [ ] 명령, 결과, 미수행 검사를 기록했다(테스트결과서·RTM 입력).
- [ ] [[99_Backend Result Card 템플릿]]으로 의존성과 제약을 인계했다.

**판정:** PASS / FAIL / CONDITIONAL / BLOCKED  
**BLOCKED 사유(발주사 제공 지연 등 외부 요인으로 검증 불가 시):**  
**판정자·날짜:**  
**미결·후속 작업:**
