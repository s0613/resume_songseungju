---
type: knowledge
domain: aws
status: active
last-reviewed: 2026-07-12
tags:
  - aws
  - architecture
  - well-architected
---

# 글로벌 인프라와 Well-Architected

> 한 줄 정의
> Region·AZ·Edge·제어 영역의 격리 경계를 이해하고, 여섯 기둥의 균형으로 설계를 리뷰한다.

## 격리 단위

| 단위 | 의미 | 설계 판단 |
|---|---|---|
| Partition | 상용 `aws`, 중국 `aws-cn`, GovCloud `aws-us-gov` 등 독립 경계 | ARN·엔드포인트·계정 체계가 다르다 |
| Region | 독립된 지리 영역 | 데이터 위치, 지연, 서비스 가용성, 비용 기준 |
| Availability Zone | 리전 안의 독립 장애 도메인 | 상태 없는 계층과 데이터 계층을 2개 이상 AZ에 배치 |
| Local Zone | 사용자와 가까운 대도시 확장 | 극저지연이 실제 요구일 때만 |
| Wavelength Zone | 통신사 5G 네트워크 엣지 | 5G 단말 초저지연 |
| Outposts | 온프레미스에 설치하는 AWS 인프라 | 데이터 위치·로컬 지연·하이브리드 요구 |
| Point of Presence | CloudFront·Route 53 등 엣지 거점 | 캐시, DNS, 엣지 보안 |

리전은 자동 복제 경계가 아니다. 리전을 추가하면 데이터 복제, DNS 전환, 배포, 키, 시크릿, 관측, 운영 절차도 함께 복제해야 한다. AZ 문자(`ap-northeast-2a`)는 계정마다 같은 물리 AZ를 뜻하지 않을 수 있으므로 교차 계정 정렬에는 AZ ID를 쓴다.

## 리전 선택 기준

1. 법률·데이터 레지던시와 고객 계약
2. 사용자의 네트워크 지연
3. 필요한 서비스와 기능의 리전 지원
4. 기존 시스템·온프레미스와 연결성
5. 가격과 탄소 영향
6. DR 후보 리전과 운영 인력

한국 중심 서비스의 흔한 시작점은 서울 `ap-northeast-2`지만, 이것은 규칙이 아니다. 요구사항으로 결정한다.

## Well-Architected 여섯 기둥

| 기둥 | 핵심 질문 |
|---|---|
| 운영 우수성 | 변경하고 관측하고 학습하는 과정이 자동화됐는가? |
| 보안 | 신원·데이터·인프라를 보호하고 사건에 대응할 수 있는가? |
| 신뢰성 | 실패를 견디고 정해진 시간·데이터 손실 안에서 복구하는가? |
| 성능 효율성 | 부하에 맞는 자원 유형과 크기를 지속적으로 고르는가? |
| 비용 최적화 | 비즈니스 결과에 불필요한 지출을 찾아 없애는가? |
| 지속 가능성 | 필요한 자원과 에너지를 최소화하는가? |

한 기둥만 최대화하면 다른 기둥을 해칠 수 있다. 예: 무조건 멀티리전은 신뢰성을 높일 수 있지만 비용·복잡성·운영 위험도 키운다. ADR에 요구 수준과 트레이드오프를 남긴다.

## 책임 공유 모델

- AWS는 데이터센터, 물리 네트워크, 하드웨어, 가상화 등 **클라우드 자체의 보안**을 책임진다.
- 고객은 데이터 분류, IAM, 네트워크 노출, 암호화 설정, 애플리케이션, 로깅 등 **클라우드 안의 보안**을 책임진다.
- EC2처럼 제어가 큰 서비스는 게스트 OS 패치까지 고객 책임이다.
- S3·DynamoDB 같은 추상화된 서비스도 데이터, 권한, 공개 설정은 고객 책임이다.

> [!TIP] 설계 리뷰 최소 질문
> 단일 실패점은 어디인가? 제어 영역 장애 때 데이터 영역은 계속 동작하는가? 할당량과 스로틀링을 처리하는가? 배포를 되돌릴 수 있는가? 비용 주인이 명확한가?

## 공식 문서

- [AWS Regions](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html)
- [Availability Zones와 장애 격리](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html)
- [Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [Shared responsibility](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/shared-responsibility.html)

## 관련 문서

- [[12_신뢰성과 재해 복구]] · [[14_비용과 FinOps]] · [[00_AWS 지식 허브]]

