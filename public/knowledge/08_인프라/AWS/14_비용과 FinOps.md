---
type: knowledge
domain: aws
status: active
last-reviewed: 2026-07-12
tags:
  - aws
  - cost
  - finops
---

# 비용과 FinOps

> 한 줄 정의
> 비용을 월말 청구서가 아니라 설계·배포·운영의 지속적인 품질 지표로 다룬다.

## 비용 관리 도구

| 도구 | 목적 |
|---|---|
| AWS Budgets | 금액·사용량·RI/Savings Plans 기준 경보와 제한적 액션 |
| Cost Explorer | 비용·사용량 분석과 예측 |
| Cost and Usage Report / Data Exports | 상세 청구 데이터 분석 |
| Cost Anomaly Detection | 예상 밖 비용 변화 탐지 |
| Cost Optimization Hub | 계정 전반 최적화 권고 집계 |
| Compute Optimizer | EC2·EBS·Lambda 등 권리 크기 권고 |
| Pricing Calculator | 신규 아키텍처 사전 견적 |
| Cost Categories·Tags | 팀·제품·환경별 비용 배부 |

## 최적화 순서

1. **가시화**: 조직·계정·제품·환경·소유자 태그와 비용 배부.
2. **삭제**: 미사용 EBS/EIP/NAT/LB/스냅샷/로그/개발 자원 제거.
3. **권리 크기**: 실제 p95와 피크, 메모리, 네트워크, IOPS 기준 조정.
4. **탄력성**: 비프로덕션 예약 종료, autoscaling, serverless, storage lifecycle.
5. **아키텍처**: 데이터 전송, NAT, 요청 수, 캐시, 관리형 서비스 비용 개선.
6. **구매 약정**: 안정된 베이스로드에만 Savings Plans/RI 적용.

할인을 먼저 사면 낭비를 장기 약정하는 결과가 될 수 있다.

## 주요 가격 모델

| 모델 | 맞는 경우 | 위험 |
|---|---|---|
| On-Demand | 신규·변동·단기 부하 | 지속 부하에 비쌈 |
| Savings Plans | 예측 가능한 컴퓨팅 지출 | 시간당 지출 약정 |
| Reserved Instances | 지원 서비스의 안정 사용 | 범위·유연성 차이 확인 |
| Spot | 중단 가능·체크포인트 가능한 작업 | 회수 대응 필수 |
| Graviton | 호환 앱의 가격 대비 성능 개선 | 빌드·의존성 호환 시험 |

## 자주 놓치는 비용

- NAT Gateway 시간+처리량, AZ 간 트래픽, 리전 간 복제, 인터넷 egress
- CloudWatch Logs 수집·저장·쿼리, 고해상도 메트릭, 커스텀 메트릭
- 작은 S3 객체의 요청·최소 저장 기간·Glacier 검색
- KMS API 요청, Secrets Manager secret 수
- 공회전 ALB/NLB, provisioned IOPS, EKS control plane와 노드
- Lambda 자체보다 하류 DB, 로그, API Gateway, NAT 비용
- 지원 플랜, Marketplace, 데이터 이전·마이그레이션 이중 운영

## 운영 리듬

- 일: 비용 이상 경보와 큰 변화 확인
- 주: 팀별 상위 증가 항목, 미사용 자원, unit economics
- 월: 예산·예측·약정 coverage/utilization, 최적화 backlog
- 분기: 아키텍처 비용 리뷰, 태그 품질, 가격 모델 재평가

단위 비용 예: 월 인프라 비용/활성 고객, 주문당 비용, 1천 API 요청당 비용, 처리 데이터 GB당 비용. 총액보다 제품 성장과 연결된다.

> [!WARNING] 예산 알림
> AWS Budgets는 기본적으로 사전 결제 한도가 아니다. 경보 수신자와 즉시 실행할 런북·자동 액션을 연결한다.

## 공식 문서

- [AWS Billing and Cost Management](https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html)
- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- [AWS Pricing Calculator](https://calculator.aws/)

## 관련 문서

- [[02_멀티계정과 거버넌스]] · [[04_VPC 네트워킹과 엣지]] · [[11_관측성과 운영]]

