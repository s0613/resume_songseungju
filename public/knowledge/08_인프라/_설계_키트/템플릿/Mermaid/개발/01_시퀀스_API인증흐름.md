---
tags: [개발/설계, template/mermaid, sequence, auth]
---

# 시퀀스 — API 인증·요청 흐름

시간 순서로 흐르는 컴포넌트 간 호출을 그린다. 인증 플로우·외부 연동·에러 경로 설명에 쓴다.

```mermaid
sequenceDiagram
    autonumber
    actor U as 사용자
    participant FE as 프론트엔드
    participant API as API 서버
    participant AUTH as 인증 서버
    participant DB as DB

    U->>FE: 로그인 (id/pw)
    FE->>AUTH: POST /token
    AUTH->>DB: 자격 검증
    DB-->>AUTH: OK
    AUTH-->>FE: access + refresh 토큰
    Note over FE,AUTH: 토큰은 httpOnly 쿠키 / 만료 15m

    U->>FE: 보호 리소스 요청
    FE->>API: GET /orders (Bearer)
    API->>API: 토큰 검증 (서명·만료·권한)
    alt 토큰 유효
        API->>DB: SELECT orders WHERE tenant=?
        DB-->>API: rows
        API-->>FE: 200 + data
    else 만료
        API-->>FE: 401
        FE->>AUTH: POST /token/refresh
        AUTH-->>FE: 새 access 토큰
    else 권한 없음
        API-->>FE: 403
    end
```

반드시 표기할 것: 토큰 저장 위치·만료, 검증 지점(서명/만료/권한/테넌트 격리), 실패 분기(401 재발급 vs 403 차단), 타임아웃·재시도. → 비가역 행동은 승인 게이트 뒤 ([[AI-DEVELOPMENT-RULES]] B-8).
