---
tags: [AI-Agent, 도구, OCR]
---

# OpenDataLoader (OpenDataLoader-PDF)

> 한국에서 만든 오픈소스 PDF 파서. PDF를 AI가 읽기 쉬운 구조화 텍스트로 변환하며, 프롬프트 인젝션 방어 기능을 내장한 것이 특징이다.

https://github.com/opendataloader-project/opendataloader-pdf

## 특징

- **입력**: PDF.
- **출력**: AI/LLM이 읽기 쉬운 구조화 텍스트(마크다운 등). 문서 내용을 LLM 파이프라인에 안전하게 투입할 수 있는 형태로 정규화한다.
- **프롬프트 인젝션 방어**: PDF에 숨겨진 악의적 지시(보이지 않는 텍스트, 조작된 콘텐츠 등)를 통한 프롬프트 인젝션 공격을 완화하는 보안 기능을 제공한다. RAG·에이전트가 신뢰할 수 없는 외부 문서를 다룰 때 중요한 안전장치다.
- 오픈소스로 로컬 실행이 가능하다.

## 에이전트/RAG에서의 활용

- 외부에서 수집한 PDF를 인덱싱하기 전 안전하게 파싱하는 1차 관문으로 사용한다.
- 파싱 결과를 [[Chunking]] → [[Embedding]] → [[Vector Database]] 파이프라인의 입력으로 연결한다.
- 신뢰 경계 밖의 문서를 다루는 에이전트의 문서 읽기 [[Tool]]에 붙여 인젝션 리스크를 낮춘다.

## 언제 쓰나

- 사용자 업로드·웹 수집 등 신뢰할 수 없는 PDF를 RAG에 넣어야 할 때.
- 프롬프트 인젝션을 통한 데이터 유출·탈취 리스크를 줄여야 하는 보안 민감 환경.
- 한국어 문서 중심 파이프라인에서 국산 도구를 활용하고 싶을 때.

> 더 짧은 라이브러리 메모는 [[11_유용한_라이브러리/OpenDataLoader|유용한 라이브러리: OpenDataLoader]] 참고.

## 관련 노트

- [[Docling]]
- [[PaddleOCR]]
- [[Textract]]
- [[Chunking]]
- [[RAG Architecture]]
- [[Tool]]
