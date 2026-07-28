---
tags: [AI-Agent, RAG, 아키텍처]
---

# Self-RAG

> 한 줄 정의
> 모델이 **언제 검색할지, 검색 결과가 쓸모 있는지, 생성한 답이 근거에 부합하는지**를 스스로 판단하도록 학습시킨 자기성찰형 RAG. (Self-Reflective RAG, 2023)

## 핵심 아이디어

기존 RAG는 항상 고정 개수의 문서를 검색해 무조건 프롬프트에 넣는다. Self-RAG는 모델이 특수 토큰(**reflection token**)을 출력하며 검색·평가를 **스스로 제어**한다.

## Reflection Token

| 토큰 | 판단 |
|------|------|
| **Retrieve** | 지금 검색이 필요한가? (필요 없으면 [[Reasoning Model]] 기반 파라미터 지식으로 바로 생성) |
| **IsRel** | 검색된 문서가 질의와 관련 있는가? |
| **IsSup** | 생성한 문장이 그 문서에 의해 뒷받침되는가? (근거성 → [[Grounding]]) |
| **IsUse** | 최종 답변이 실제로 유용한가? |

## 동작 흐름

```
질의 → [Retrieve?] → (필요시) 검색 → [IsRel] 관련 문서만 선별
     → 생성 → [IsSup] 근거 검증 → [IsUse] 유용성 점수 → 최적 출력 선택
```

여러 후보를 생성한 뒤 reflection token 점수로 가장 근거 있고 유용한 답을 고른다.

## 의의

- **불필요한 검색을 생략**해 비용·노이즈를 줄인다 → [[Adaptive RAG]]와 같은 동기.
- 생성문 단위로 근거를 자가 검증 → 환각·[[Hallucination Detection]] 완화.
- [[Reflection]] 패턴을 RAG에 내재화한 형태.

## 관련 노트

- [[RAG Architecture]]
- [[Corrective RAG]]
- [[Adaptive RAG]]
- [[Reflection]]
- [[Grounding]]
- [[Agentic RAG]]
