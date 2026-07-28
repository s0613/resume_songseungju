---
type: checklist
domain: product
role: DevOps·SRE
status: active
last-reviewed: 2026-07-27
---

# DevOps·SRE 완료 체크리스트

## 재현성·CI

- [ ] 새 환경(발주사 환경 포함)에서 IaC plan과 build를 재현할 수 있다.
- [ ] runtime·dependency·artifact가 pin되고 lockfile을 사용한다.
- [ ] pipeline gate, cache 무효화, timeout, 로그 보존이 동작한다.
- [ ] 외부 fork PR에 secret과 privileged token이 노출되지 않는다.
- [ ] 검수본 버전이 artifact tag·digest로 특정된다.

## Secret·권한

- [ ] `.env.example`은 key만 제공하고 실제 값이 없다.
- [ ] source, workflow, Dockerfile, image, log에 평문 secret이 없다.
- [ ] 환경별 최소 권한, rotation, 폐기와 감사 경로가 있다.
- [ ] 수행사 개인 계정에 종속된 secret·서비스가 없고 계정·인증서·라이선스가 인수인계서에 반영됐다.

## 배포·복구

- [ ] Backend·Database 의존 순서와 호환성을 확인했다.
- [ ] healthcheck → 제한 traffic → 검증 → 확대 순서가 동작한다.
- [ ] rollback trigger, 결정자, 데이터 처리가 명시됐다.
- [ ] 검수·오픈 배포 창이 발주사와 합의됐고, 실제 배포·rollback 또는 안전한 복구 rehearsal을 실행했다.

## 관측·인계

- [ ] 핵심 사용자 흐름에 SLI·SLO·alert Owner가 있고 계약 SLA와 정합한다.
- [ ] 실패 알림과 장애 runbook, backup restore가 검증됐다.
- [ ] 배포 절차·runbook이 시스템(설치)·운영 매뉴얼에 반영됐다 ([[외주 개발 산출물]]).
- [ ] 발주사 대기 항목(방화벽·인증서·계정)과 지연 기록, 미수행 검사가 정리됐다.
- [ ] [[99_DevOps·SRE Result Card 템플릿]]으로 Release·운영에 인계했다.

**판정:** PASS / FAIL / CONDITIONAL / BLOCKED  
**BLOCKED 사유(발주사 제공 지연 등 외부 요인으로 검증 불가 시):**  
**판정자·날짜:**  
**미결·후속 작업:**
