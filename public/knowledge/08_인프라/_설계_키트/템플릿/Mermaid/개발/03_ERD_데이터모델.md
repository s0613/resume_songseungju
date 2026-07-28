---
tags: [개발/설계, template/mermaid, erd, database]
---

# ERD — 엔티티 관계 (데이터 모델)

테이블·관계·카디널리티를 그린다. 스키마 리뷰·마이그레이션 설명에 쓴다.

```mermaid
erDiagram
    TENANT ||--o{ USER : "소속"
    TENANT ||--o{ ORDER : "소유"
    USER ||--o{ ORDER : "생성"
    ORDER ||--|{ ORDER_ITEM : "포함"
    PRODUCT ||--o{ ORDER_ITEM : "참조"

    TENANT {
        uuid id PK
        string name
        string plan "free|pro|enterprise"
        timestamptz created_at
    }
    USER {
        uuid id PK
        uuid tenant_id FK
        string email UK
        string role "admin|member"
    }
    ORDER {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        string status "draft|paid|shipped|canceled"
        numeric total
        timestamptz created_at
    }
    ORDER_ITEM {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int qty
        numeric unit_price "주문 시점 스냅샷"
    }
    PRODUCT {
        uuid id PK
        string sku UK
        string name
        numeric price
    }
```

카디널리티: `||`=정확히 1, `o{`=0 이상, `|{`=1 이상. 반드시 표기할 것: PK/FK/UK, 테넌트 격리 컬럼(tenant_id), 스냅샷 값(주문 시점 가격), 상태 enum, 인덱스 대상. → SQL/NoSQL 선택 [[TECHNOLOGY-DECISION-GUIDE]] 7축.
