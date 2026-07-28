---
tags: [개발/설계, template/mermaid, git, workflow]
---

# gitGraph — 브랜치 전략

브랜치·머지·릴리즈 흐름을 그린다. 협업 규칙·릴리즈 프로세스 설명에 쓴다.

```mermaid
gitGraph
    commit id: "init"
    branch develop
    checkout develop
    commit id: "setup"
    branch feature/login
    checkout feature/login
    commit id: "auth API"
    commit id: "테스트"
    checkout develop
    merge feature/login tag: "PR #12"
    branch feature/orders
    checkout feature/orders
    commit id: "주문 CRUD"
    checkout develop
    merge feature/orders tag: "PR #15"
    checkout main
    merge develop tag: "v1.0.0"
    branch hotfix/pay
    checkout hotfix/pay
    commit id: "결제 버그"
    checkout main
    merge hotfix/pay tag: "v1.0.1"
    checkout develop
    merge main
```

패턴: `main`=배포 가능 상태, `develop`=통합, `feature/*`=기능 단위, `hotfix/*`=긴급. 반드시 표기할 것: PR 번호·리뷰 게이트, 릴리즈 태그(SemVer), hotfix가 main과 develop 양쪽에 반영되는지. → PR 머지는 사람 게이트 [[AI-DEVELOPMENT-RULES]] B-8.
