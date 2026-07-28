---
type: checklist
domain: product
role: Data·ML
status: active
last-reviewed: 2026-07-27
---

# Data·ML 완료 체크리스트

## 데이터·재현성

- [ ] 입력 schema, 분포, 결측·이상치·불균형 규칙이 명시됐다(데이터 명세 납품본 갱신).
- [ ] 데이터 source, snapshot, 사용 승인과 보존 기간이 기록됐다.
- [ ] 발주사 데이터 제공 지연·품질 미달이 있었다면 기록·공지됐다.
- [ ] 시간·사용자·그룹·target proxy 누수를 점검했다.
- [ ] seed, 코드, 의존성, 데이터 version으로 결과를 재현할 수 있다.
- [ ] PII를 최소화·익명화하고 코드·로그에 평문으로 남기지 않았다.

## 모델·평가

- [ ] 단순 baseline과 동일한 고정 평가셋·산식으로 비교했다.
- [ ] 착수 전 합의된 검수 threshold와 slice별 최저 허용치가 충족됐다(미달이면 기록·협의, 기준 완화 금지).
- [ ] 표본 수, 편향, 실패 사례와 불확실성을 기록했다.
- [ ] 학습·추론 feature 변환이 일치한다.

## 운영

- [ ] Backend가 input·output·오류 schema를 확인했다(API 정의서 반영).
- [ ] 추론 P95 latency와 memory 한계(NFR 합의값)를 검증했다.
- [ ] artifact·모델 version과 rollback 절차가 있다.
- [ ] drift·error·latency 관측과 알림 Owner가 있다.
- [ ] 낮은 신뢰도와 서비스 장애의 fallback이 동작한다.
- [ ] 재학습·모델 교체의 하자보수/유지보수 경계가 합의됐다.

## 납품·증거·인계

- [ ] 파이프라인·학습 코드가 이관 대상 저장소에 반영되고 형상관리 이력이 남았다.
- [ ] 빌드·배포 스크립트만으로 학습·추론 환경을 재구축할 수 있다.
- [ ] 평가 리포트(평가셋·산식·결과·재현 정보)를 검수 근거 형태로 기록했다.
- [ ] 미수행 검사를 사유·위험과 함께 적었다.
- [ ] [[99_Data·ML Result Card 템플릿]]으로 Backend·QA·운영에 인계했다.

**판정:** PASS / FAIL / CONDITIONAL / BLOCKED  
**BLOCKED 사유(발주사 제공 지연 등 외부 요인으로 검증 불가 시):**  
**판정자·날짜:**  
**미결·후속 작업:**
