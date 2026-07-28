---
type: knowledge
domain: aws
status: active
last-reviewed: 2026-07-12
tags:
  - aws
  - hands-on
  - cli
  - iac
related:
  - "[[03_IAM과 권한 설계]]"
  - "[[13_IaC와 CI-CD]]"
  - "[[17_실전 체크리스트와 런북]]"
---

# AWS 구현 레시피

> [!NOTE] 범위
> 개념 문서를 실제 작업으로 옮기는 최소 예제다. 계정 ID·리전·이름은 환경에 맞게 바꾸고, **sandbox 계정에서 plan/diff와 삭제 절차를 먼저 검증**한다. 그대로 복사해 프로덕션에 적용하는 완성 템플릿은 아니다.

## 1. CLI와 임시 자격 증명

사람의 로컬 개발 환경은 장기 액세스 키 대신 IAM Identity Center 프로필을 사용한다.

```bash
aws configure sso
aws sso login --profile dev

AWS_PROFILE=dev aws sts get-caller-identity
AWS_PROFILE=dev aws configure get region
AWS_PROFILE=dev aws ec2 describe-regions --query 'Regions[].RegionName'
```

실행 전 항상 `get-caller-identity`로 계정과 principal을 확인한다. 스크립트에는 `--profile` 또는 환경 변수로 대상을 명시하고, 기본 프로필에 프로덕션 관리자 권한을 두지 않는다.

## 2. 최소 권한 IAM 정책

특정 버킷을 조회하는 역할의 identity policy 예다. 목록 조회와 객체 조회는 ARN 범위가 다르다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListOneBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::example-data-bucket"
    },
    {
      "Sid": "ReadObjects",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": "arn:aws:s3:::example-data-bucket/*"
    }
  ]
}
```

검증:

```bash
aws accessanalyzer validate-policy \
  --policy-type IDENTITY_POLICY \
  --policy-document file://policy.json
```

- `Action: "*"`, `Resource: "*"`는 근거 없는 기본값으로 사용하지 않는다.
- 실제 호출 이력과 Access Analyzer 결과로 권한을 더 좁힌다.
- bucket policy, SCP, permissions boundary, KMS key policy의 영향을 함께 확인한다.

## 3. Terraform으로 private S3 기본선

조직에서 검증한 provider 버전을 lockfile에 고정한다.

```hcl
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "ap-northeast-2"
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Application = "example"
      Environment = "dev"
      ManagedBy   = "terraform"
      Owner       = "platform"
    }
  }
}

resource "aws_s3_bucket" "data" {
  bucket = "replace-with-globally-unique-name"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "data" {
  bucket = aws_s3_bucket.data.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "data" {
  bucket = aws_s3_bucket.data.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

```bash
terraform fmt -check
terraform init
terraform validate
terraform plan -out=tfplan
```

plan에서 계정·리전·생성·변경·삭제 항목을 검토한 뒤에만 apply한다. 중요 데이터에는 삭제 보호, lifecycle, backup 요구를 추가한다.

## 4. AWS CDK의 같은 기본선

```typescript
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class StorageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, "Data", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    });
  }
}
```

```bash
npm test
npx cdk synth
npx cdk diff
```

CDK construct가 안전해 보여도 생성된 CloudFormation과 IAM 변경을 `cdk diff`로 검토한다.

## 5. 배포 직후 확인

```bash
aws sts get-caller-identity
aws cloudformation describe-stacks --stack-name example
aws cloudformation list-stack-resources --stack-name example
```

- CloudWatch 대시보드에서 오류율, p95, 트래픽, 하류 용량을 확인한다.
- CloudTrail에서 배포 역할과 변경 API가 예상과 일치하는지 확인한다.
- 보안 그룹, S3 public access, IAM 외부 접근, Budget 알람을 점검한다.
- 실패 기준을 넘으면 원인 분석보다 먼저 승인된 롤백을 실행한다.

## 6. 비프로덕션 게임데이

> [!WARNING] 사람 승인
> AWS Fault Injection Service(FIS)나 장애 명령은 sandbox 전용 계정에서 사람 승인 후 실행한다. 프로덕션 리소스가 선택되지 않도록 account·tag·resource ARN 조건을 중복 확인한다.

1. “한 AZ의 앱 인스턴스가 사라져도 SLO를 지킨다”처럼 가설을 정한다.
2. 대상 태그, 최대 영향 수, 중단 조건 CloudWatch alarm을 설정한다.
3. 대시보드·알림·런북·담당자를 준비하고 정상 기준을 기록한다.
4. FIS experiment template을 `create-experiment-template` 단계에서 리뷰한다.
5. 승인 후 실행하고 탐지 시간, 사용자 영향, 자동 복구, 데이터 정합성을 측정한다.
6. 실험을 중지·복구하고 action item에 owner와 기한을 부여한다.

## 7. 작업 종료와 비용 확인

- 임시 리소스는 `ExpiryDate` 태그와 자동 정리 정책을 둔다.
- Terraform/CDK가 소유한 자원은 같은 도구로 제거하고 수동 삭제로 drift를 만들지 않는다.
- S3 version, EBS snapshot, ENI, EIP, NAT Gateway, Load Balancer처럼 남기 쉬운 자원을 확인한다.
- Cost Explorer 반영 지연을 고려해 다음 날 비용과 Cost Anomaly Detection을 재확인한다.

## 공식 문서

- [AWS CLI with IAM Identity Center](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)
- [IAM Access Analyzer policy validation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [AWS Fault Injection Service](https://docs.aws.amazon.com/fis/latest/userguide/what-is.html)
- [Amazon S3 security best practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

## 관련 문서

- [[03_IAM과 권한 설계]] · [[10_AWS 보안]] · [[13_IaC와 CI-CD]]
- [[16_참조 아키텍처]] · [[17_실전 체크리스트와 런북]]
