---
type: template
domain: product
role: DevOps·SRE
status: active
last-reviewed: 2026-07-27
---

# CI-CD 계획

> source 변경에서 검증된 artifact와 환경 배포까지의 gate를 명시한다. artifact tag가 곧 **검수본 식별자**다 — "어느 버전이 검수본인지" 답하지 못하면 검수·하자보수 경계가 흔들린다.

## 발주사 환경 제약 반영

| 항목 | 결정 |
|---|---|
| 폐쇄망 여부·외부 저장소 접근 | 가능 / mirror·사전 반입 필요 |
| CI 실행 위치(수행사/발주사) |  |
| dependency 반입 절차·소요 시간 |  |
| 검수·운영 배포 승인자(발주사 포함 여부) |  |

## Pipeline 흐름

| 단계 | trigger | 입력 | 명령·job | cache | timeout | 산출물·보존 |
|---|---|---|---|---|---|---|
| lint / test / build / scan / deploy |  |  |  |  |  |  |

## Gate·승인

| 환경·단계 | 필수 검사 | PASS 기준 | 승인자 | 실패 시 처리 | 우회 권한·기록 |
|---|---|---|---|---|---|
| PR |  |  |  |  |  |
| 검수(staging) |  |  |  |  |  |
| 운영(production) |  |  |  |  |  |

## Artifact·재현성

| 항목 | 결정 |
|---|---|
| runtime·dependency pin |  |
| lockfile 검증 |  |
| artifact tag·digest (검수본 식별 규칙) |  |
| SBOM·서명·provenance |  |
| promotion 방식 | 같은 artifact / rebuild |

## Trigger 신뢰 경계

| 이벤트 | source 신뢰 수준 | secret 접근 | 쓰기 권한 | 보호 조치 |
|---|---|---|---|---|
| internal branch |  |  |  |  |
| external fork PR | untrusted | 없음 | 없음 |  |
| manual release |  |  |  |  |

## 완료 질문

- [ ] 외부 fork PR에 secret과 privileged token이 노출되지 않는가?
- [ ] cache key가 lockfile·source 변경에 맞게 무효화되는가?
- [ ] 모든 장기 job에 timeout이 있고 실패 로그를 보존하는가?
- [ ] 검수 대상 버전을 tag·digest로 특정할 수 있고, 검수 환경과 운영 환경이 **같은 artifact**를 쓰는가?
- [ ] 폐쇄망이면 반입 대상 dependency 목록과 절차가 문서화됐는가?

## 미결·승인

- Pipeline Owner:
- 예외·우회 승인 절차:
- 미수행 gate:
- 빌드·배포 스크립트 납품 반영 여부 ([[외주 개발 산출물]]):
