---
type: knowledge
domain: design
status: active
last-reviewed: 2026-07-06
---

# Y2K 크롬 (Y2K Chrome / Retro-futurism)

> 한 줄 정의
> 2000년 전후의 디지털 낙관주의 — 크롬 금속 텍스트, 아쿠아 버튼, 픽셀 폰트, 스파클(✦) — 를 의도적으로 소환하는 레트로 퓨처리즘. "미래는 반짝일 것"이라 믿었던 시절의 미래를 지금 화면에 재현한다.

![[preview-y2k.jpg]]

## 언제 쓰나 / 피하나

| 적합 | 부적합 |
|------|--------|
| 음악·패션·드롭 캠페인 | 신뢰·전문성 톤 (B2B·핀테크) |
| Z세대 커뮤니티·굿즈·아티스트 포트폴리오 | 텍스트 많은 서비스 (크롬·글로우 위 장문은 고문) |
| 이벤트 티저·앨범 사이트 | 향수 없는 타깃 (촌스러움으로 읽힐 위험) |

## 스타일 DNA

### 팔레트 — 은속 + 형광 포인트

| 토큰 | 값 | 역할 |
|------|-----|------|
| void | `#0E1220` | 바탕 (우주 다크) — 순백+하늘색 라이트 변주도 성립 |
| chrome-hi | `#F4F7FF` | 크롬 하이라이트 |
| chrome-lo | `#8A93A8` | 크롬 섀도 |
| aqua | `#59C1FF` | 아쿠아 버튼·글로우 |
| pink | `#FF5EDB` | 형광 포인트 |

- 크롬(은속)이 주인공, 형광은 조명 — 형광이 면을 차지하기 시작하면 Y2K가 아니라 사이버펑크로 넘어간다.

### 타이포

- 크롬 디스플레이: 초굵은 산세리프에 금속 그라디언트를 클립 — 서체보다 "도금"이 아이덴티티.
- 픽셀 폰트 (Press Start 2P, VT323): 라벨·스탯·타임스탬프 같은 "기계 목소리" 전용. 소문자 장문 금지.
- 본문: 평범한 산세리프로 도망갈 곳을 만든다 — 전부 반짝이면 읽을 곳이 없다.

### 장치 (시그니처 소품)

크롬 텍스트 · 아쿠아 젤 버튼 · 스파클(✦)·렌즈 플레어 · 오브(유리 구슬)·그라디언트 링 · 방문자 카운터·"UNDER CONSTRUCTION" 같은 웹 1.0 밈 소품(유머 자리에만).

## 핵심 레시피 (CSS)

```css
/* 크롬 텍스트 — 금속은 그라디언트 단이 많을수록 진짜 같다 */
h1 {
  font-weight: 900; letter-spacing: -.01em;
  background: linear-gradient(180deg,
    #FDFEFF 0%, #C9D4E8 34%, #5C6880 49%,   /* 수평선 — 금속 반사의 핵심 단차 */
    #EAF1FF 52%, #97A5C0 78%, #E8EEF9 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 2px 0 rgba(9,12,24,.55));
}
/* 아쿠아 젤 버튼 — 상단 절반 하이라이트가 전부다 */
.aqua {
  border-radius: 999px; color: #fff; font-weight: 700;
  background: linear-gradient(180deg, #8ED4FF, #1E7FD4 45%, #0B5FB0);
  box-shadow:
    inset 0 2px 6px rgba(255,255,255,.9),    /* 젤 광택 */
    inset 0 -6px 12px rgba(0,30,80,.45),
    0 8px 20px rgba(30,127,212,.35);
}
.sparkle::after { content: "✦"; color: #fff; text-shadow: 0 0 12px #59C1FF; }
```

- 크롬 그라디언트의 비밀은 49%→52%의 **급격한 명암 단차**(수평선) — 이게 없으면 그냥 회색 그라디언트다.
- [[리퀴드 글라스]]와의 차이: 그쪽은 무채색·재질의 절제, 이쪽은 채도·광택의 과잉. 같은 유리인데 세계관이 반대.

## 흔한 실수

- 전 요소 크롬 → 눈이 갈 곳이 없다. 크롬은 헤드라인 한 곳, 나머지는 받쳐주는 다크/플랫.
- 글로우 blur 과다(30px+) → 2000년이 아니라 2015 게이밍 배너가 된다.
- 아쿠아 버튼 위 얇은 라벨 → 버튼이 광나면 라벨은 굵고 또렷하게(흰색 + 미세 그림자).
- 픽셀 폰트로 본문 → 스탯·라벨 전용. 장문은 즉시 가독성 붕괴.
- 밈 소품(카운터·배너)을 진지한 화면에 → 유머는 유머 자리에만.

## 실물 레퍼런스

**사전 — 시대 미학의 분류학**
- [CARI (Consumer Aesthetics Research Institute)](https://cari.institute) — 70년대~현재 소비 미학을 명명·분류하는 아카이브. "Frutiger Aero"라는 이름도 여기서 나왔다.
- [CARI — Y2K Aesthetic](https://cari.institute/aesthetics/y2k-aesthetic) — Y2K 미학의 정의와 실물 자료 모음. 이 문서의 원천 사전.

**정석 — 살아 있는 웹 1.0/Y2K**
- [Windows 93](https://windows93.net) — 가짜 레트로 OS를 통째로 구현한 인터랙티브 아트의 컬트 클래식.
- [Neocities](https://neocities.org) — 지오시티스 정신의 부활. 날것 개인 홈페이지 수만 개 — 이 감성의 현재진행형 관찰지.
- 레트로 디지털 연출의 상업 버전은 [[택타일 아날로그]]의 Poolsuite 참조.

**아카이브 — 소품 발굴**
- [Cameron's World](https://www.cameronsworld.net) — 지오시티스(1994–2009) 유물로 만든 웹 콜라주 아트. 이 미학의 원료 창고를 한 화면에 압축한 러브레터.
- [GifCities](https://gifcities.org) — 인터넷 아카이브의 지오시티스 GIF 검색엔진(450만 개, 2025 시맨틱 검색 개편). 스파클·버튼·배너 소품은 여기서 캔다.

**폰트**
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) · [VT323](https://fonts.google.com/specimen/VT323) — 픽셀 라벨 전용. 크롬용은 아무 초굵은 산세리프에 도금하면 된다.

- 검색 키워드: `y2k aesthetic web`, `chrome text effect css`, `frutiger aero`

- 로컬 데모(코드=이 문서 레시피): `스타일/_previews/스타일-데모.html`

## 관련 문서

- [[디자인 스타일 카탈로그]] · 인접 스타일: [[서베일런스]] (같은 "기계 화면" 축의 어두운 버전), [[리퀴드 글라스]] (유리 광택의 현대 절제 버전), [[그레인 블러]] (반대 축 — 과잉 vs 분위기)
