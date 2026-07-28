---
type: knowledge
domain: aws
status: active
last-reviewed: 2026-07-12
tags:
  - aws
  - iam
  - security
---

# IAM과 권한 설계

> 한 줄 정의
> 사람과 워크로드 모두 장기 키 대신 임시 자격 증명을 사용하고, 정책 평가 구조를 이해해 최소 권한을 만든다.

## 신원 선택

| 주체 | 기본 선택 | 피할 것 |
|---|---|---|
| 직원·관리자 | 외부 IdP 또는 IAM Identity Center → 역할 | 개인별 장기 IAM 액세스 키 |
| AWS 워크로드 | EC2 인스턴스 프로파일, ECS Task Role, EKS IRSA/Pod Identity, Lambda 실행 역할 | 코드·환경파일에 키 저장 |
| 외부 CI/CD | OIDC 연동 후 역할 AssumeRole | 저장소 Secret에 영구 키 |
| 외부 서버 | IAM Roles Anywhere 또는 제한된 연동 역할 | 공유 IAM 사용자 |
| 긴급 접근 | 강한 MFA·짧은 세션·감사되는 break-glass 역할 | 상시 AdministratorAccess |

## 정책 평가의 정신 모델

1. 모든 요청은 기본 거부다.
2. 적용되는 identity policy와 resource policy의 Allow를 계산한다.
3. SCP, RCP, permissions boundary, session policy가 상한을 만든다.
4. 어느 곳이든 명시적 Deny면 최종 Deny다.

정책 구성요소는 `Effect`, `Action`, `Resource`, `Condition`, 선택적 `Principal`이다. `NotAction`과 `NotResource`는 영향 범위가 커서 리뷰 없이 쓰지 않는다.

## 최소 권한 만들기

- 처음에는 AWS 관리형 정책으로 실험할 수 있으나 사용 이력을 보고 고객 관리형 정책으로 좁힌다.
- 리소스 ARN을 특정하고, 리전·계정·태그·VPC endpoint·MFA 같은 Condition을 활용한다.
- IAM Access Analyzer로 외부 접근, 사용되지 않은 접근, 정책 검증과 정책 생성을 수행한다.
- 권한 경계는 위임받은 팀이 만들 수 있는 역할의 최대치를 제한할 때 쓴다.
- 서비스 역할과 애플리케이션 역할을 분리하고 서비스마다 역할을 공유하지 않는다.

## 안전한 역할 신뢰 정책

- 신뢰 대상 계정 전체보다 구체적인 역할 ARN을 지정한다.
- 외부 SaaS에는 `sts:ExternalId`를 검토한다.
- GitHub Actions 등 OIDC에는 repository, branch 또는 environment claim 조건을 건다.
- 역할 세션 시간과 권한을 작업에 필요한 만큼만 준다.
- 교차 계정 접근은 대상 계정 역할을 AssumeRole하는 구조로 통일한다.

## 루트 사용자

- 일상 사용 금지, 액세스 키 생성 금지, 피싱 방지 MFA 적용.
- 연락 이메일과 복구 수단을 회사가 통제한다.
- 사용 이벤트를 CloudTrail·EventBridge로 경보한다.
- Organizations 멤버 계정은 중앙 루트 자격 증명 관리 기능 적용 가능성을 검토한다.

> [!TIP] 권한 디버깅 순서
> CloudTrail의 실패 이벤트 → 실제 principal ARN → 요청 Action/Resource → 명시적 Deny → SCP/RCP → permissions boundary → session policy → identity/resource policy → KMS key policy 순으로 본다.

## 공식 문서

- [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)
- [Root user best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html)

## 관련 문서

- [[02_멀티계정과 거버넌스]] · [[10_AWS 보안]] · [[13_IaC와 CI-CD]]

