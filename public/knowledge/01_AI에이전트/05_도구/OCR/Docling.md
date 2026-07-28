---
tags: [AI-Agent, 도구, OCR]
---

# Docling

> IBM이 오픈소스로 공개한 문서 파싱 라이브러리. PDF·오피스 문서를 구조를 보존한 채 마크다운/JSON으로 변환해 LLM·RAG 입력으로 만들어준다.

https://github.com/docling-project/docling

## 특징

- **입력**: PDF, DOCX, PPTX, XLSX, HTML, 이미지(PNG/JPEG/TIFF), 오디오 등 다양한 포맷.
- **출력**: 마크다운, JSON(DoclingDocument), HTML, 텍스트. 레이아웃·표·읽기 순서를 보존하는 통합 문서 표현(DoclingDocument)을 제공한다.
- **레이아웃 분석**: 자체 모델(layout 모델 + TableFormer 표 인식)으로 표, 그림, 코드 블록, 수식, 페이지 구조를 인식한다.
- **OCR**: 스캔 PDF·이미지에 대해 EasyOCR, Tesseract, RapidOCR 등 백엔드를 선택해 텍스트를 추출한다.
- **VLM 옵션**: SmolDocling 등 비전-언어 모델 기반 파이프라인도 지원한다.
- 로컬 실행 가능해 데이터를 외부로 보내지 않아도 된다. MIT 라이선스.
- LangChain, LlamaIndex 등 주요 프레임워크와의 통합 커넥터를 제공한다.

## 에이전트/RAG에서의 활용

- 문서를 청킹하기 좋은 마크다운/구조화 JSON으로 변환해 [[Chunking]] 전처리 단계로 사용한다.
- 표·제목 계층 같은 구조 정보를 메타데이터로 활용해 [[Hybrid Retrieval]]·[[Re-ranking]] 품질을 높인다.
- HybridChunker가 문서 구조와 토크나이저를 함께 고려해 임베딩 친화적인 청크를 만들어준다.
- 에이전트의 파일 읽기 [[Tool]]로 붙여 임의 포맷 문서를 표준 텍스트로 정규화한다.

## 언제 쓰나

- 표·레이아웃이 중요한 PDF를 로컬에서 안전하게 파싱해야 할 때.
- 클라우드 OCR API에 의존하지 않고 온프레미스로 처리하고 싶을 때.
- 다양한 오피스 포맷을 하나의 일관된 문서 표현으로 통합하고 싶을 때.

## 관련 노트

- [[PaddleOCR]]
- [[Textract]]
- [[OpenDataLoader]]
- [[Chunking]]
- [[RAG Architecture]]
- [[Vector Database]]
