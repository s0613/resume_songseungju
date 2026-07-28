---
tags: [AI-Agent, 도구, OCR]
---

# PaddleOCR

> Baidu의 PaddlePaddle 딥러닝 프레임워크 기반 오픈소스 OCR 툴킷. 가볍고 다국어를 지원하는 실용적 텍스트 인식 엔진이다.

https://github.com/PaddlePaddle/PaddleOCR

## 특징

- **입력**: 이미지(JPG/PNG 등), PDF.
- **출력**: 인식된 텍스트, 각 텍스트의 바운딩 박스 좌표, 신뢰도 점수. 구조화 모듈(PP-StructureV3)로 표·레이아웃·읽기 순서까지 추출해 마크다운/JSON으로 변환 가능.
- **파이프라인**: 텍스트 검출(detection) → 방향 분류 → 텍스트 인식(recognition)으로 구성. PP-OCR 경량 모델 계열로 모바일/엣지에서도 동작한다.
- **다국어**: 한국어·중국어·영어·일본어 등 80개 이상 언어를 지원한다.
- **부가 기능**: 표 인식, 레이아웃 분석, 수식 인식, 문서 방향 보정 등을 모듈로 제공한다.
- Apache 2.0 라이선스, 로컬 실행 가능.

## 에이전트/RAG에서의 활용

- 스캔 문서·이미지에서 텍스트를 추출해 RAG 인덱싱 전 [[Chunking]] 입력으로 사용한다.
- 바운딩 박스 좌표를 활용해 표·영역 단위로 구조화한 뒤 [[Embedding]]을 생성한다.
- 멀티모달 에이전트가 화면 캡처·스캔본을 읽는 OCR [[Tool]]로 연결한다.

## 장단점

- **장점**: 경량·고속, 폭넓은 다국어, 온프레미스 실행, 활발한 커뮤니티.
- **단점**: PaddlePaddle 의존성 설치가 다소 번거로울 수 있고, 복잡한 레이아웃은 구조화 모듈 추가 구성이 필요하다.

## 관련 노트

- [[Docling]]
- [[Textract]]
- [[OpenDataLoader]]
- [[Chunking]]
- [[Embedding]]
- [[RAG Architecture]]
