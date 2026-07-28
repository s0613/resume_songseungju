---
type: checklist
domain: product
role: Database
status: active
last-reviewed: 2026-07-27
---

# Database 완료 체크리스트

## 스키마·무결성

- [ ] 컬럼 타입·길이·NULL·default가 데이터 도메인에 맞다.
- [ ] PK, FK, unique, CHECK와 ON DELETE / ON UPDATE가 명시됐다.
- [ ] transaction 경계와 동시성 race를 검토했다.
- [ ] 실제 사용자 정보나 secret을 seed에 넣지 않았다.
- [ ] ERD·테이블정의서(납품본)가 실제 schema와 일치하게 갱신됐다.

## 쿼리·인덱스

- [ ] index가 Backend의 WHERE / JOIN / ORDER BY와 연결된다.
- [ ] EXPLAIN 또는 동등 증거로 주요 쿼리를 확인했다.
- [ ] 쓰기 비용, 중복 index, 데이터 분포를 검토했다.
- [ ] 큰 테이블 index의 lock 완화 방식을 정했다.

## Migration·운영

- [ ] 구·신 애플리케이션 버전의 호환성이 확인됐다.
- [ ] NOT NULL과 데이터 변환에 backfill·검증 계획이 있다.
- [ ] 예상 lock·실행 시간·용량·replica 영향을 기록했다.
- [ ] migration이 재실행·중단·재개에 안전하다.
- [ ] 적용과 rollback 또는 forward-fix를 재현했다.
- [ ] 계약 범위 밖 데이터 이관·연동은 CR 승인 없이 수행하지 않았다.

## 납품·증거·인계

- [ ] migration 스크립트가 이관 대상 저장소에 반영되고 형상관리 이력이 남았다.
- [ ] 마이그레이션 절차서(적용·검증·rollback)를 발주사 운영자가 단독 실행 가능한 수준으로 작성했다.
- [ ] 실행 명령, schema version, 검증 query, 결과를 기록했다(테스트결과서 입력).
- [ ] 미수행 검사는 사유와 위험을 적었다.
- [ ] [[99_Database Result Card 템플릿]]으로 Backend·DevOps에 인계했다.

**판정:** PASS / FAIL / CONDITIONAL / BLOCKED  
**BLOCKED 사유(발주사 제공 지연 등 외부 요인으로 검증 불가 시):**  
**판정자·날짜:**  
**미결·후속 작업:**
