---
tags: [AI-Agent, 도구, OCR]
---

# Amazon Textract

> AWS가 제공하는 완전관리형 문서 분석 서비스. 단순 OCR을 넘어 표·양식·키-값 구조까지 추출하는 클라우드 API다.

https://aws.amazon.com/textract/

## 특징

- **입력**: 이미지(JPEG/PNG), PDF, TIFF. 동기 API(단일/소수 페이지)와 비동기 API(대용량·다중 페이지)를 제공한다.
- **출력**: 추출 텍스트와 함께 블록(Block) 단위 JSON — 단어·라인·표(Table)·양식의 키-값 쌍(Form)·신뢰도·좌표를 구조화해 반환한다.
- **전용 분석**: AnalyzeDocument(표/양식), AnalyzeExpense(영수증·청구서), AnalyzeID(신분증), Queries(질의 기반 필드 추출) 등 특화 기능을 제공한다.
- 완전관리형이라 인프라·모델 운영 부담이 없고 사용량 기반 과금이다.
- 한국어 등 다국어 지원은 기능별로 차이가 있으므로 대상 언어 지원 범위를 확인해야 한다.

## 에이전트/RAG에서의 활용

- 양식·계약서·인보이스에서 키-값과 표를 구조화 추출해 RAG 인덱싱·[[Chunking]] 전처리로 사용한다.
- Queries 기능으로 "총액", "계약일" 같은 필드를 바로 뽑아 에이전트의 데이터 추출 [[Tool]]로 연결한다.
- 추출된 구조 정보를 메타데이터로 저장해 [[Hybrid Retrieval]] 필터링에 활용한다.

## 장단점

- **장점**: 운영 부담 없는 관리형, 표·양식·영수증 등 구조 추출 강점, 다른 AWS 서비스와 통합 용이.
- **단점**: 클라우드 의존(데이터 외부 전송), 사용량 과금, 온프레미스/오프라인 불가, 벤더 락인.

## 관련 노트

- [[Docling]]
- [[PaddleOCR]]
- [[OpenDataLoader]]
- [[Chunking]]
- [[Hybrid Retrieval]]
- [[RAG Architecture]]
