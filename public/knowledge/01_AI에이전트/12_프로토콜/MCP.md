---
tags: [AI-Agent, 프로토콜, 도구]
---

# MCP (Model Context Protocol)

> 한 줄 정의
> LLM·에이전트를 외부 데이터·도구에 연결하기 위한 개방형 표준 프로토콜. Anthropic이 2024년 11월 공개했으며, 흔히 "AI 애플리케이션의 USB-C"로 비유된다.

## 왜 중요한가

도구·데이터 연동은 본질적으로 **N×M 문제**다. 에이전트(M개)마다 외부 시스템(N개)을 일일이 커스텀 연결하면 조합이 폭발한다. MCP는 이 연결 방식을 **표준 인터페이스**로 고정해, 한 번 MCP 서버를 만들면 이를 지원하는 모든 호스트(Claude Desktop, IDE, 커스텀 에이전트)가 그대로 쓸 수 있게 한다.

## 구조

```
Host(앱)  ──  Client  ──(JSON-RPC 2.0)──  Server(도구/데이터)
```

- **Host**: 사용자와 상호작용하는 앱 (Claude Desktop, Cursor, 커스텀 에이전트).
- **Client**: Host 내부에서 서버 하나와 1:1 연결을 관리하는 커넥터.
- **Server**: 실제 능력을 노출하는 프로세스. 외부 API·DB·파일시스템을 감싼다.

## 서버가 노출하는 3가지

- **Tools**: 모델이 호출해 부수효과를 내는 함수 (검색, 쓰기, 실행). → [[Tool Calling]]
- **Resources**: 모델이 읽어 컨텍스트로 쓰는 데이터 (파일, DB 레코드).
- **Prompts**: 재사용 가능한 프롬프트/워크플로우 템플릿.

## 전송 방식 (Transport)

- **stdio**: 로컬 프로세스 간 통신. 로컬 도구·파일 접근에 적합.
- **Streamable HTTP / SSE**: 원격 서버 연결. 인증·다중 클라이언트 지원.

## 에이전트 설계에서의 의미

- 도구 계층을 표준화해 **ACI(Agent-Computer Interface)** 설계를 재사용 가능하게 만든다 → [[Agent 설계 원칙]].
- 신뢰할 수 없는 MCP 서버는 **indirect prompt injection**의 경로가 될 수 있어 권한 최소화·검증이 필요하다 → [[Prompt Injection]].
- 에이전트 간 협업 표준인 [[A2A]]와 보완 관계: **MCP = 에이전트↔도구**, **A2A = 에이전트↔에이전트**.

## 관련 노트

- [[Tool Calling]]
- [[Function Calling]]
- [[A2A]]
- [[Agent Architecture]]
- [[Agent 설계 원칙]]
- [[Prompt Injection]]
