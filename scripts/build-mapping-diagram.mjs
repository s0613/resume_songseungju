import sharp from "sharp"
import path from "path"

const root = new URL("../", import.meta.url).pathname
const out = path.join(root, "public", "mapping-pipeline.webp")

const W = 1120
const H = 1210
const cx = 560

// palette
const ink = "#1f2a37"
const muted = "#6b7682"
const green = "#03C75A"
const greenDark = "#079a4b"
const line = "#c2cbd1"
const cardBorder = "#e7ece9"

// reusable card
function card(x, y, w, h, opts = {}) {
  const r = opts.r ?? 18
  const fill = opts.fill ?? "#ffffff"
  const stroke = opts.stroke ?? cardBorder
  const sw = opts.sw ?? 1.5
  const filter = opts.shadow === false ? "" : ` filter="url(#soft)"`
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${filter}/>`
}

function badge(x, y, n, color = green) {
  return `
  <circle cx="${x}" cy="${y}" r="17" fill="${color}"/>
  <text x="${x}" y="${y + 1}" text-anchor="middle" dominant-baseline="central" font-family="Pretendard" font-weight="700" font-size="18" fill="#ffffff">${n}</text>`
}

function txt(x, y, s, { size = 18, weight = 500, fill = ink, anchor = "middle", spacing = 0 } = {}) {
  const ls = spacing ? ` letter-spacing="${spacing}"` : ""
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="central" font-family="Pretendard" font-weight="${weight}" font-size="${size}" fill="${fill}"${ls}>${s}</text>`
}

// vertical arrow (solid)
function vArrow(x, y1, y2) {
  return `<path d="M ${x} ${y1} L ${x} ${y2}" stroke="${line}" stroke-width="2.4" fill="none" marker-end="url(#arrow)"/>`
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbfdfc"/>
      <stop offset="1" stop-color="#f3f8f4"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ecfaf1"/>
      <stop offset="1" stop-color="#e1f6e8"/>
    </linearGradient>
    <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff7e6"/>
      <stop offset="1" stop-color="#fdeecb"/>
    </linearGradient>
    <linearGradient id="inputg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f7f9fb"/>
      <stop offset="1" stop-color="#eef2f5"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#1f2a37" flood-opacity="0.07"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="${line}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#9fb0a6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- title -->
  ${txt(cx, 56, "기준용어 매핑 파이프라인", { size: 30, weight: 700 })}
  ${txt(cx, 90, "retrieve  →  rerank  →  결정", { size: 17, weight: 600, fill: green, spacing: 1 })}

  <!-- input -->
  ${card(280, 132, 560, 92, { fill: "url(#inputg)", stroke: "#dfe5ea" })}
  ${txt(cx, 168, "입력 · 수기 / 다국어 표현", { size: 19, weight: 700 })}
  ${txt(cx, 197, '"마이크로소프트(주)"   ·   "MSFT"   ·   "Microsoft Corp."', { size: 14.5, weight: 500, fill: muted })}
  ${vArrow(cx, 224, 268)}

  <!-- step 1 -->
  ${card(280, 276, 560, 92)}
  ${badge(322, 322, 1)}
  ${txt(cx, 312, "전처리 · 정규화", { size: 19, weight: 700 })}
  ${txt(cx, 340, "음역 · 약어 · 단위 · 대소문자 통일", { size: 14.5, weight: 500, fill: muted })}
  ${vArrow(cx, 368, 412)}

  <!-- step 2 band -->
  ${card(150, 420, 820, 168, { fill: "url(#band)", stroke: "#bfe8cd", r: 22 })}
  ${badge(196, 462, 2)}
  ${txt(cx, 462, "검색 (retrieve) · 후보 좁히기", { size: 19, weight: 700, fill: greenDark })}
  ${card(196, 502, 200, 60, { r: 14, stroke: "#cfeed9", shadow: false })}
  ${txt(296, 532, "BM25 (어휘)", { size: 15.5, weight: 600 })}
  ${card(420, 502, 230, 60, { r: 14, stroke: "#cfeed9", shadow: false })}
  ${txt(535, 532, "벡터 ANN (의미)", { size: 15.5, weight: 600 })}
  ${txt(688, 532, "→ RRF 융합 →", { size: 15.5, weight: 700, fill: greenDark })}
  ${card(786, 502, 158, 60, { r: 14, fill: "#d6f2e0", stroke: "#a9e2bd", shadow: false })}
  ${txt(865, 532, "top-k 후보", { size: 15.5, weight: 700, fill: greenDark })}
  ${vArrow(cx, 588, 632)}

  <!-- step 3 -->
  ${card(280, 640, 560, 92)}
  ${badge(322, 686, 3)}
  ${txt(cx, 676, "재랭킹 (rerank) · 정밀 판정", { size: 19, weight: 700 })}
  ${txt(cx, 704, "cross-encoder / LLM → 신뢰도 점수", { size: 14.5, weight: 500, fill: muted })}
  ${vArrow(cx, 732, 776)}

  <!-- step 4 decision -->
  ${card(350, 784, 420, 84, { fill: "url(#amber)", stroke: "#f0d488", r: 20 })}
  ${badge(392, 826, 4, "#d99b1c")}
  ${txt(585, 826, "결정 · 신뢰도 임계값", { size: 19, weight: 700, fill: "#9a6a08" })}

  <!-- branches -->
  <path d="M 470 868 L 330 944" stroke="${line}" stroke-width="2.4" fill="none" marker-end="url(#arrow)"/>
  <path d="M 660 868 L 800 944" stroke="${line}" stroke-width="2.4" fill="none" marker-end="url(#arrow)"/>
  ${txt(360, 905, "고신뢰", { size: 14, weight: 700, fill: greenDark })}
  ${txt(760, 905, "애매", { size: 14, weight: 700, fill: "#b97f12" })}

  <!-- left: auto confirm -->
  ${card(130, 952, 380, 116, { fill: "#edf9f1", stroke: "#bfe8cd", r: 18 })}
  ${txt(320, 994, "자동 확정", { size: 19, weight: 700, fill: greenDark })}
  ${txt(320, 1024, "표준 기준용어 · 골든레코드", { size: 14.5, weight: 500, fill: muted })}

  <!-- right: steward -->
  ${card(610, 952, 380, 116, { r: 18 })}
  ${txt(800, 994, "사람(steward) 검토", { size: 19, weight: 700 })}
  ${txt(800, 1024, "결정을 학습 예시로 → active learning", { size: 14.5, weight: 500, fill: muted })}

  <!-- feedback loop (routed below the boxes) -->
  <path d="M 800 1068 C 760 1122 520 1126 300 1126 C 150 1126 90 1100 90 985 L 90 508 C 90 488 110 480 146 480"
        stroke="#9fb0a6" stroke-width="2.2" stroke-dasharray="2 9" stroke-linecap="round"
        fill="none" marker-end="url(#arrowG)"/>
  ${txt(cx, 1170, "피드백 루프  ·  steward 결정 → 다음 매칭 개선", { size: 14.5, weight: 600, fill: "#8a949b" })}
</svg>`

await sharp(Buffer.from(svg), { density: 108 })
  .webp({ quality: 72, effort: 6 })
  .toFile(out)
const meta = await sharp(out).metadata()
console.log("wrote", out, `${meta.width}x${meta.height}`)
