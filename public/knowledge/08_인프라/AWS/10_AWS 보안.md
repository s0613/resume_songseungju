---
type: knowledge
domain: aws
status: active
last-reviewed: 2026-07-12
tags:
  - aws
  - security
  - compliance
---

# AWS 보안

> 한 줄 정의
> 신원, 탐지, 네트워크, 데이터, 애플리케이션, 사고 대응을 예방·탐지·대응 계층으로 자동화한다.

## 보안 서비스 지도

| 목적 | 주요 서비스 |
|---|---|
| 신원·권한 | IAM, IAM Identity Center, Organizations, Cognito, Verified Permissions |
| 암호화·시크릿 | KMS, CloudHSM, Secrets Manager, Systems Manager Parameter Store, ACM |
| 감사·구성 | CloudTrail, AWS Config, Audit Manager, Artifact |
| 위협·취약점 | GuardDuty, Inspector, Detective, Security Hub, Macie |
| 네트워크·엣지 | Security Group, NACL, Network Firewall, WAF, Shield |
| 데이터 보호 | S3 Block Public Access/Object Lock, Backup Vault Lock |
| 중앙 운영 | Security Lake, Firewall Manager, Organizations delegated administrator |

## 기본 보안선

### 신원

- [[03_IAM과 권한 설계]]에 따라 임시 자격 증명·MFA·최소 권한을 적용한다.
- 루트·관리자·break-glass 사용을 경보하고 정기적으로 시험한다.
- 서비스별 역할을 분리하고 Access Analyzer로 외부·미사용 접근을 검토한다.

### 탐지와 감사

- 조직 전체, 모든 리전의 CloudTrail을 중앙 로그 계정과 보호된 S3에 저장한다.
- Config 기록기와 필요한 관리형 규칙·conformance pack을 설정한다.
- GuardDuty, Security Hub, Inspector, Macie는 데이터 등급과 위험에 맞춰 조직 단위 활성화한다.
- 보안 결과를 심각도·자산 중요도·노출·악용 가능성으로 우선순위화한다.

### 데이터

- 전송 TLS, 저장 암호화를 기본값으로 하고 키 소유·회전·삭제·복구 정책을 정한다.
- KMS key policy, IAM policy, grant가 함께 권한을 결정함을 이해한다.
- Secrets Manager는 회전이 필요한 DB/API 비밀, Parameter Store는 구성과 단순 비밀에 적합하다.
- 로그에 토큰, 자격 증명, 민감 개인정보를 남기지 않는다.

### 인프라와 앱

- DB·내부 API는 private, 필요한 AWS API는 VPC endpoint를 검토한다.
- WAF와 Shield는 애플리케이션 인증·인가·입력 검증을 대체하지 않는다.
- ECR·Inspector로 이미지와 인스턴스 취약점을 관리하고 패치 SLA를 둔다.
- SSM Session Manager를 공개 SSH/bastion의 기본 대안으로 사용한다.

## KMS 정신 모델

- envelope encryption: 데이터는 data key로, data key는 KMS key로 보호한다.
- AWS owned, AWS managed, customer managed key의 제어·비용·운영 차이를 이해한다.
- 키 삭제는 데이터 영구 손실로 이어질 수 있어 대기 기간과 승인 절차가 필요하다.
- 멀티리전 키가 데이터를 자동 복제하는 것은 아니다.
- 고요청 서비스에서 KMS 요청 할당량과 비용을 관측한다.

## 사고 대응

1. 사건 전 역할·연락망·격리 권한·증거 보존 절차를 준비한다.
2. 의심 자격 증명 폐기, 네트워크 격리, 스냅샷·로그 보존을 자동화한다.
3. 관리 계정과 보안 계정의 독립 접근 경로를 확보한다.
4. CloudTrail, VPC Flow Logs, 애플리케이션 로그, GuardDuty 결과의 시간을 정렬한다.
5. 복구 후 정책·탐지·런북·아키텍처를 개선하고 게임데이로 검증한다.

> [!WARNING] 암호화의 한계
> KMS 암호화는 과도한 IAM 권한과 애플리케이션 계층의 데이터 노출을 자동으로 막지 않는다. 접근 통제·분류·감사와 함께 써야 한다.

## 공식 문서

- [AWS Security Documentation](https://docs.aws.amazon.com/security/)
- [Security Pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)
- [AWS KMS](https://docs.aws.amazon.com/kms/)
- [AWS Security Hub](https://docs.aws.amazon.com/securityhub/)
- [AWS incident response guide](https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html)

## 관련 문서

- [[보안 원리]] · [[03_IAM과 권한 설계]] · [[17_실전 체크리스트와 런북]]

