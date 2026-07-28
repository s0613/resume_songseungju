---
type: checklist
domain: product
role: Security·Privacy
status: active
last-reviewed: 2026-07-27
---

# Security·Privacy 완료 체크리스트

## 인증·인가·입력

- [ ] 자체 암호·hash·token 알고리즘을 작성하지 않았다.
- [ ] 모든 보호 endpoint에 server-side 인증·인가가 있다.
- [ ] 인증 실패가 사용자 존재 여부와 내부 정보를 누설하지 않는다.
- [ ] CSRF, session 수명·철회, 민감 endpoint rate limit이 적용됐고 발주사 계정·세션 정책과 정합한다.
- [ ] IDOR, SQLi, XSS, SSRF, path traversal을 점검했다.

## Secret·데이터·인프라

- [ ] source·CI·image·log·error에 평문 secret과 PII가 없다.
- [ ] PII의 최소 수집, 암호화·가명처리, 접근, 보존·삭제가 검증됐다.
- [ ] 실제 사용자 정보를 seed·test fixture에 사용하지 않았고, 수행사 환경 반출 실데이터는 발주사 승인·파기 계획이 있다.
- [ ] 외부 fork CI secret 격리와 HTTPS·HSTS·CSP·CORS를 확인했다.
- [ ] dependency·container의 알려진 취약점과 조치가 기록됐다.

## 발주사 심사 대응

- [ ] 발주사 보안 정책·심사 점검 항목을 입수해 통제 매핑과 대조했다.
- [ ] 심사 지적사항이 [[05_취약점·예외 승인대장]]에서 조치·증적과 함께 추적된다.
- [ ] 심사·검수 제출용 증적(테스트 결과·설정·삭제 파기 증거)이 추출 가능하다.

## 독립 검증·판정

- [ ] 리뷰 모드를 명시하고 다른 리뷰 결론에 앵커링되지 않았다.
- [ ] 실제 변경 파일과 원본 요구사항으로 재현·검증했다.
- [ ] 발견마다 Severity, 근거, Owner, 기한, 재검증 증거가 있다.
- [ ] CRITICAL·HIGH가 해소됐거나 권한 있는 승인자(발주사 포함)가 기간 제한으로 수용했다.
- [ ] 미수행 영역과 잔여 위험을 PASS로 숨기지 않았다.
- [ ] [[99_Security·Privacy Result Card 템플릿]]으로 모드별 결과를 분리 저장했다.

**판정:** PASS / FAIL / CONDITIONAL / BLOCKED  
**BLOCKED 사유(발주사 제공 지연 등 외부 요인으로 검증 불가 시):**  
**판정자·날짜:**  
**오픈·검수 차단·예외:**
