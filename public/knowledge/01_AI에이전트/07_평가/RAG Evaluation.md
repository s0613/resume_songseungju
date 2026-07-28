---
tags: [AI-Agent, 평가]
---

# RAG Evaluation

> 검색 증강 생성(RAG) 파이프라인을 **검색 품질**과 **생성 품질**로 나누어 측정하는 평가 방법론.

## 핵심 개념

RAG 평가는 두 단계를 분리해서 본다. 검색(Retrieval) 단계가 올바른 컨텍스트를 가져왔는지, 생성(Generation) 단계가 그 컨텍스트에 충실하게 답했는지를 각각 측정한다. RAGAS는 이를 정량화하는 대표적 프레임워크로, 대부분 LLM-as-a-Judge로 계산되어 사람 라벨이 없어도 동작하는 **reference-free** 지표를 제공한다.

## RAGAS 핵심 지표

| 지표 | 대상 단계 | 질문 | 비고 |
|------|-----------|------|------|
| **Faithfulness** | 생성 | 답변의 주장들이 검색된 컨텍스트에서 도출 가능한가 | 환각 측정의 핵심 |
| **Answer Relevancy** | 생성 | 답변이 질문에 직접적으로 부합하는가 | 동문서답·장황함 감점 |
| **Context Precision** | 검색 | 가져온 컨텍스트 중 실제로 관련된 것의 비율(상위 순위 가중) | 노이즈가 적을수록 높음 |
| **Context Recall** | 검색 | 정답에 필요한 정보를 컨텍스트가 모두 포함했는가 | Ground Truth 필요 |

### 지표 해설

- **Faithfulness** — 답변을 진술(claim) 단위로 분해한 뒤, 각 진술이 컨텍스트로 뒷받침되는 비율. 낮으면 환각을 의심한다 ([[Hallucination Detection]]).
- **Answer Relevancy** — 답변에서 역으로 질문을 생성해 원 질문과의 유사도로 측정. 정확성보다 **관련성**에 초점.
- **Context Precision** — 관련 청크가 상위에 올수록 높아지므로 [[Re-ranking]] 품질을 반영한다.
- **Context Recall** — 정답(ground truth)의 각 문장이 컨텍스트에서 찾을 수 있는지로 계산. 검색 누락을 잡아낸다 ([[Ground Truth]]).

## 평가 절차

1. 질문 + (정답) + 검색 컨텍스트 + 생성 답변으로 평가 데이터셋 구성.
2. 검색 지표(precision/recall)와 생성 지표(faithfulness/relevancy)를 각각 산출.
3. 낮은 지표를 진단해 병목을 분리 — 검색 문제면 임베딩·청킹·리랭킹을, 생성 문제면 프롬프트·grounding을 개선.

## 도구

- **RAGAS** — 위 4대 지표의 사실상 표준 구현.
- **DeepEval / TruLens** — RAG triad(context relevance, groundedness, answer relevance).
- **LangSmith / Arize Phoenix** — 데이터셋 관리와 평가 실행 ([[LangSmith]], [[Arize]]).

## 관련 노트

- [[Agent Evaluation]]
- [[Ground Truth]]
- [[Hallucination Detection]]
- [[Grounding]]
- [[Re-ranking]]
- [[RAG Architecture]]
