---
tags: [AI-Agent, 메모리, 프레임워크]
---

# Memory Frameworks

> 한 줄 정의
> 에이전트에 지속적이고 자가관리되는 메모리를 부여하는 전용 프레임워크·서비스. 추출 → 저장 → 회상 → 갱신/망각의 메모리 생명주기를 자동화한다.

## 대표 도구

### MemGPT / Letta
- LLM을 **운영체제**처럼 본다: 컨텍스트 윈도우 = "RAM", 외부 저장소 = "디스크".
- 모델이 스스로 메모리를 페이징(읽기·쓰기·검색)해, 윈도우 한계를 넘는 장기 기억을 다룬다.
- → [[Context Compaction]]의 자동화·고도화 버전으로 볼 수 있다.

### Mem0
- 대화에서 중요한 사실을 추출·저장하고, 관련 시점에 회상하는 **메모리 레이어**.
- 벡터 + 그래프 하이브리드 저장으로 관계까지 기억.

## 공통 메커니즘

```
추출(무엇이 기억할 가치) → 저장 → 회상(관련 시 검색) → 갱신/망각
```

이는 [[Long Term Memory]]·[[Semantic Memory]]·[[Episodic Memory]]를 운영 가능한 형태로 구현한 것이다.

## 관련 노트

- [[Memory Architecture]]
- [[Long Term Memory]]
- [[Episodic Memory]]
- [[Semantic Memory]]
- [[Context Compaction]]
