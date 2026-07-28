---
tags: [개발/설계, template/mermaid, gantt, wbs, schedule]
---

# Gantt — WBS · 일정

작업 분해와 일정·의존을 그린다. 계획 발표·진척 보고에 쓴다.

```mermaid
gantt
    title 프로젝트 일정 (WBS)
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 기획·설계
    요구사항 정의       :done,    req, 2026-07-01, 5d
    아키텍처 설계       :done,    arch, after req, 4d
    스펙 확정          :active,  spec, after arch, 3d

    section 개발
    DB·API 스캐폴딩     :         be1, after spec, 5d
    핵심 기능 구현      :         be2, after be1, 8d
    프론트엔드         :         fe1, after be1, 10d
    외부 연동          :         ext, after be2, 4d

    section 검증·배포
    통합·E2E 테스트     :         qa, after fe1, 5d
    보안 감사          :crit,    sec, after qa, 3d
    스테이징·UAT       :         uat, after sec, 4d
    프로덕션 배포 ✋     :milestone, rel, after uat, 0d
```

표기: `done`=완료, `active`=진행, `crit`=임계경로, `milestone`=이정표. 반드시 표기할 것: 작업 의존(`after`), 임계 경로(crit), 배포 이정표(사람 승인). 일정은 추정이지 약속이 아님을 밝힐 것. → 우선순위·스코프 [[우선순위와 스코프]].
