---
tags: [AI-Agent, 도구, Database]
---

# MariaDB

> MySQL에서 포크된 오픈소스 관계형 데이터베이스(RDBMS). MySQL 창립자 Monty Widenius가 2009년 시작했고 MariaDB Foundation이 개발을 주도한다.

## 특징
- MySQL과 높은 호환성을 유지하면서 GPL 기반의 완전한 오픈소스로 관리된다.
- InnoDB를 비롯해 Aria, ColumnStore 등 다양한 스토리지 엔진을 선택할 수 있다.
- ACID 트랜잭션, 복제, Galera 기반 동기 클러스터링을 지원한다.
- 최신 버전은 `VECTOR` 데이터 타입과 벡터 인덱스(근사 최근접 이웃 검색)를 도입해 벡터 검색을 네이티브로 지원한다.

## 에이전트에서의 활용
- **상태·로그 저장**: 대화 이력, 사용자 데이터, 에이전트 실행 로그 등 구조화된 관계형 데이터를 다루는 백엔드로 적합하다.
- **벡터 검색**: 벡터 타입을 지원하는 버전에서는 임베딩을 저장하고 유사도 검색을 수행해 가벼운 RAG 저장소로 쓸 수 있다.
- **기존 MySQL 자산 재활용**: MySQL 기반 시스템에 에이전트를 얹을 때 드롭인에 가까운 대안으로 활용한다.

## 장단점
- **장점**: 완전 오픈소스, MySQL 호환, 친숙한 운영 경험, 다양한 스토리지 엔진.
- **단점**: 벡터·전문 검색 기능의 성숙도와 생태계는 PostgreSQL(pgvector)이나 전용 벡터 DB에 비해 상대적으로 얕다. 일부 고급 기능은 MySQL과 호환되지 않을 수 있다.

## 언제 쓰나
- MySQL 호환 환경에서 라이선스 부담 없이 오픈소스 RDBMS가 필요할 때.
- 관계형 데이터 중심 시스템에 가벼운 벡터 검색을 곁들이고 싶을 때.

https://mariadb.org

## 관련 노트
- [[PostgreSQL]]
- [[DynamoDB]]
- [[Vector Database]]
- [[RAG Architecture]]
- [[Embedding]]
