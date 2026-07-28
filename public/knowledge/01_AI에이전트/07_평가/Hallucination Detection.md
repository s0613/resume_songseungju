---
tags: [AI-Agent, 평가]
---

# Hallucination Detection

> LLM이 사실과 다르거나 근거 없는 내용을 생성하는 환각(Hallucination)을 탐지·측정하는 기법.

## 핵심 개념

환각은 크게 두 유형으로 나뉜다 ([[Hallucination]]).

- **사실성 환각(Factuality)** — 세상의 사실과 어긋남.
- **충실성 환각(Faithfulness)** — 제공된 컨텍스트/소스에서 벗어남. RAG에서 핵심 문제이며 [[Grounding]] 실패로 나타난다.

탐지의 목표는 답변의 각 주장이 **신뢰할 수 있는 근거로 뒷받침되는지**를 검증하는 것이다.

## 탐지 방법

| 방법 | 원리 | 특징 |
|------|------|------|
| Groundedness 검증 | 답변 진술을 컨텍스트와 대조(NLI/entailment) | RAG에 직접 적용, [[RAG Evaluation]]의 Faithfulness |
| LLM-as-a-Judge | 심판 모델이 사실/근거 여부 판정 | 확장적, 사람 검증 병행 |
| Self-Consistency | 같은 질문을 여러 번 샘플링해 분산 측정 | 답이 흔들리면 환각 의심 |
| SelfCheckGPT | 다중 샘플 간 일관성으로 비사실 문장 식별 | 외부 지식 불필요 |
| Citation/근거 검증 | 인용한 출처가 실제로 주장을 뒷받침하는지 확인 | 출처 기반 시스템에 적합 |
| 불확실성 신호 | 토큰 확률·엔트로피로 저신뢰 구간 탐지 | [[Confidence Score]]와 연계 |

## 완화 전략

- **Grounding 강화** — 검색 컨텍스트에만 근거해 답하도록 프롬프트로 강제 ([[Grounding]]).
- **검색 품질 개선** — [[Re-ranking]], [[Hybrid Retrieval]]로 관련 컨텍스트 비중 향상.
- **Self Correction / Critic** — 답변 후 별도 검증 단계로 근거 없는 주장 수정 ([[Self Correction]], [[Critic Agent]]).
- **모름 허용** — 근거가 없으면 "정보 없음"을 반환하도록 설계.

## 예시 (NLI 기반 검증)

```
전제(premise): 검색된 컨텍스트
가설(hypothesis): 답변의 각 진술
판정: entailment / neutral / contradiction
→ entailment 비율이 낮으면 환각으로 플래그
```

## 관련 노트

- [[Hallucination]]
- [[Grounding]]
- [[RAG Evaluation]]
- [[Confidence Score]]
- [[Self Correction]]
- [[Critic Agent]]
