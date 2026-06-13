"use client"

import type React from "react"
import Image from "next/image"

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-start gap-4 mb-10">
        <span className="text-8xl font-extralight leading-none text-amber-200/70 select-none mt-1 hidden sm:block">{num}</span>
        <div className="pt-1 sm:pt-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">{title}</h2>
            <div className="h-0.5 bg-amber-500 mt-2.5 w-10" />
        </div>
    </div>
)

const OpenTraderPage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            {/* Hero — 황금 포대화상(布袋·彌勒) */}
            <section className="relative h-[78vh] w-full">
                <Image
                    src="/OpenTrader/budai-hero.webp"
                    alt="황금 포대화상 — 재물과 풍요의 상징"
                    fill
                    className="object-cover object-[center_30%]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                {/* Nav — s-skills처럼 자체 네비게이션 */}
                <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 sm:px-14 md:px-20 lg:px-28 py-6">
                    <a href="/open-trader" className="font-mono text-sm font-bold tracking-[0.18em] text-amber-200 uppercase hover:text-amber-100 transition-colors">
                        OPEN-TRADER
                    </a>
                    <div className="flex items-center gap-5 sm:gap-7">
                        <a href="https://github.com/Totaro-int/claude-trade-harness" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors">
                            GitHub ↗
                        </a>
                        <a href="/" className="font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-amber-200 transition-colors">
                            이력서 →
                        </a>
                    </div>
                </nav>

                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-amber-300/80 uppercase mb-3">
                        Open Source · LLM-in-the-loop · Trading Harness
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        open-trader
                    </h1>
                    <p className="text-base md:text-lg text-white/80 max-w-2xl mb-3">
                        증권사 OpenAPI 문서만 넣으면 Claude가 브로커 어댑터를 자동 생성·검증해 연결하고,
                        자연어 전략을 두뇌(Claude)에 물려 <span className="text-amber-200">페이퍼 트레이딩</span>으로 돌리는 로컬 골격.
                    </p>
                    <p className="text-sm text-white/55 max-w-2xl mb-8 italic">
                        황금 포대화상은 재물의 상징이지만 — 이 하네스의 정직한 점수판은 대부분 음수입니다. 그게 정상입니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["TypeScript", "Node.js", "Claude Code", "better-sqlite3", "Zod", "uPlot", "Playwright"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-amber-300/30 text-amber-100/70 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">
                {/* Lead */}
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        open-trader(claude-trade-harness)는 매매 전략이 아니라 <strong className="font-semibold">하네스(harness)</strong> 그 자체가 제품입니다.
                        브로커 무관 어댑터 자동생성, 코드로 강제되는 가드레일, 모든 판단·체결의 관측성, 그리고
                        시세·포지션·전략을 프롬프트로 묶어 Claude의 판단을 받아오는 사이클 엔진 — 배우고 포크할 가치가 있는 건 이 네 가지입니다.
                    </p>
                </section>

                <div className="h-px bg-amber-300/40 mb-24" />

                {/* 01 진짜 제품은 하네스 */}
                <section className="mb-24">
                    <SectionHeader num="01" title="진짜 제품은 '하네스'" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            내장 전략은 돈 버는 시스템이 아닙니다. 기본 제공되는 대형주 지표 + LLM 판단은
                            <span className="font-medium text-gray-900"> 참고용 베이스라인이며, 거래비용을 못 이기는 것으로 알려진 접근</span>입니다.
                            전략을 <code className="font-mono text-sm bg-white px-1.5 py-0.5 rounded border border-gray-200">strategy/*.md</code>로
                            직접 교체(BYO)하는 것이 이 도구의 전제입니다. 그래서 배포되는 가치는 &lsquo;수익&rsquo;이 아니라 &lsquo;안전하게 실험할 수 있는 골격&rsquo;입니다.
                        </p>
                        <div className="bg-white border border-amber-200/60 rounded-lg p-6 shadow-sm">
                            <p className="text-xs font-mono text-amber-700 uppercase tracking-wider mb-4">배우고 포크할 4가지</p>
                            <ul className="space-y-3 text-gray-700">
                                {[
                                    "브로커 무관 어댑터 자동생성 — OpenAPI 문서만으로 TS 어댑터 생성·검증",
                                    "코드로 강제되는 가드레일 — 돈이 움직이는 경로는 결정론적 TypeScript만",
                                    "관측성 — 모든 판단·체결·스냅샷 기록 + 로컬 대시보드 실시간",
                                    "claude-in-the-loop — 시세·포지션·전략을 묶어 판단을 받는 사이클 엔진",
                                ].map((f, i) => (
                                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
                                        <span className="text-amber-500 font-mono mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 02 동작 3단계 */}
                <section className="mb-24">
                    <SectionHeader num="02" title="어떻게 동작하나 — 세 단계" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "온보딩",
                                desc: "증권사 OpenAPI 문서 URL과 API 키를 입력하면 Claude가 TypeScript 어댑터를 자동 생성. 정적 검사·컴파일·읽기전용 연결 테스트(인증·시세·잔고)를 모두 통과해야 활성화됩니다.",
                            },
                            {
                                step: "전략 설정",
                                desc: "자연어로 작성한 투자 전략 문서(Markdown)를 업로드. 내장 베이스라인을 그대로 쓰지 말고 본인 전략으로 교체하는 것을 권장합니다.",
                            },
                            {
                                step: "운영",
                                desc: "장중 30분 간격으로 Claude가 시세·지표·전략을 조합해 판단하고, 코드 가드레일 7가지를 통과한 경우에만 가상 체결. 토스 스타일 로컬 대시보드에서 SSE로 실시간 확인.",
                            },
                        ].map((s, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm relative overflow-hidden">
                                <span className="absolute -top-2 -right-1 text-7xl font-extralight text-amber-100 select-none">{i + 1}</span>
                                <p className="text-lg font-semibold text-gray-900 mb-3 relative">{s.step}</p>
                                <p className="text-[15px] text-gray-600 leading-relaxed relative">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 03 온보딩 파이프라인 */}
                <section className="mb-24">
                    <SectionHeader num="03" title="어댑터 자동생성 파이프라인" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            증권사마다 다른 OpenAPI 스펙을 사람이 일일이 붙이는 대신, 문서와 키만 주면
                            Claude가 어댑터 코드를 짜고 하네스가 자동으로 검증 게이트를 통과시킵니다.
                            <span className="block mt-4 text-base text-amber-700/90 bg-amber-50 border border-amber-200/60 rounded-md px-4 py-3">
                                ⚠️ 단, 생성된 어댑터의 <code className="font-mono">submitOrder</code>(주문 경로)는 읽기전용 게이트를 통과하지 않습니다 —
                                라이브 전 사람이 직접 검토해야 하는 미검증 코드입니다.
                            </span>
                        </p>
                        <div className="bg-gray-900 rounded-lg p-6 font-mono text-[13px] leading-relaxed text-gray-300 shadow-sm overflow-x-auto">
                            <p className="text-amber-400 mb-3"># 온보딩 검증 게이트</p>
                            {[
                                "문서 URL + API 키 입력",
                                "→ Claude가 어댑터 코드 생성",
                                "→ 정적 검사 (import/process/fetch/eval 금지)",
                                "→ TypeScript 컴파일 통과",
                                "→ 읽기전용 연결 (인증 → 시세 → 잔고)",
                                "→ 통과 시 어댑터 활성화",
                            ].map((line, i) => (
                                <div key={i} className={line.startsWith("→") ? "text-gray-400" : "text-white"}>{line}</div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 04 안전 설계 */}
                <section className="mb-24">
                    <SectionHeader num="04" title="안전 설계 — 기본값은 '거래 안 함'" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { t: "결정론적 경로", d: "돈이 움직이는 코드 경로는 AI 생성 코드가 아닌 정적 TypeScript로만 구성됩니다." },
                            { t: "기본값 = 안전", d: "모든 에러·예외·예상치 못한 상황의 기본 동작은 '거래 안 함'입니다." },
                            { t: "라이브 미실행 (v1)", d: "v1은 3중 잠금을 모두 통과하더라도 실제 라이브 주문을 실행하지 않습니다(페이퍼만). 의도된 안전장치입니다." },
                            { t: "라이브 3중 잠금", d: "향후 라이브 지원 시: config.json mode:live + 환경변수 LIVE_CONFIRM=1 + 계좌번호 끝 4자리 확인, 셋 다 맞아야 전환." },
                            { t: "지표 필수", d: "어댑터가 getCandles를 구현하지 않아 지표가 없으면 그 사이클은 매매하지 않고 건너뜁니다. lastPrice만으로 하는 노이즈 트레이딩 기본 차단." },
                            { t: "시크릿 격리", d: "시크릿은 .env에만. adapters·strategy·data·.env는 .gitignore 등록 — 포크·공유 시 개인정보 미포함." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 py-4 px-5 bg-white border border-gray-200 rounded-lg">
                                <span className="text-amber-500 font-mono text-sm mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">{item.t}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 05 가드레일 설정 */}
                <section className="mb-24">
                    <SectionHeader num="05" title="가드레일 설정" />
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/80">
                                    <th className="px-5 py-3 text-xs font-mono text-gray-500 uppercase tracking-wider">항목</th>
                                    <th className="px-5 py-3 text-xs font-mono text-gray-500 uppercase tracking-wider hidden sm:table-cell">기본값</th>
                                    <th className="px-5 py-3 text-xs font-mono text-gray-500 uppercase tracking-wider">설명</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    ["maxPositionPct", "20", "종목당 최대 비중 (%)"],
                                    ["maxOrderPct", "10", "1회 주문 금액 상한 (%)"],
                                    ["maxOrdersPerCycle", "3", "사이클당 최대 주문 수"],
                                    ["dailyLossLimitPct", "3", "일일 손실 한도 (%) — 도달 시 당일 거래 중단"],
                                    ["maxOrdersPerDay", "10", "하루 최대 주문 수"],
                                    ["reentryCooldownMin", "60", "매도 후 동일 종목 재매수 금지 시간 (분)"],
                                    ["maxTotalExposurePct", "80", "총 주식 노출 상한 (%)"],
                                ].map(([k, v, d]) => (
                                    <tr key={k} className="hover:bg-amber-50/40 transition-colors">
                                        <td className="px-5 py-3 font-mono text-sm text-gray-900 whitespace-nowrap">{k}</td>
                                        <td className="px-5 py-3 font-mono text-sm text-amber-600 hidden sm:table-cell">{v}</td>
                                        <td className="px-5 py-3 text-sm text-gray-600">{d}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 06 정직한 점수판 — pull quote */}
                <section className="mb-24">
                    <SectionHeader num="06" title="정직한 점수판" />
                    <div className="relative bg-gradient-to-br from-amber-50 to-[#F7F4EF] border-l-4 border-amber-500 rounded-r-lg px-8 py-10">
                        <p className="text-2xl md:text-3xl font-light text-gray-900 leading-snug mb-6 max-w-3xl">
                            절대 수익률이 아니라, <span className="font-semibold text-amber-700">동일가중 buy-and-hold 벤치마크 대비 초과수익(%p)</span>으로 전략을 평가합니다.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                            대시보드와 백테스트 리포트에서 가장 크게 표시되는 이 값은 <strong className="text-gray-900">대부분 음수일 것이고, 그게 정상입니다.</strong>
                            전략을 실거래에 붙이기 전에 위험 없이 과거 캔들로 평가하세요 —
                            실제와 동일한 PaperBroker(수수료·세금·스프레드)·가드레일·프롬프트로 리플레이합니다.
                        </p>
                        <div className="mt-6 font-mono text-sm text-gray-500">
                            <span className="text-amber-600">$</span> npm run backtest -- --bars 120
                        </div>
                    </div>
                </section>

                {/* 07 Claude Code 플러그인 */}
                <section className="mb-24">
                    <SectionHeader num="07" title="Claude Code 플러그인" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            터미널에서 <code className="font-mono text-sm bg-white px-1.5 py-0.5 rounded border border-gray-200">npm start</code>를
                            직접 치는 대신, 슬래시 커맨드로 온보딩·운영·상태조회·백테스트를 제어하는 얇은 런처 플러그인을 함께 제공합니다.
                            플러그인은 <span className="font-medium text-gray-900">런처일 뿐</span>이며, 매매 엔진은 이 저장소가 백그라운드 데몬으로 실행합니다.
                        </p>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 shadow-sm">
                            {[
                                ["/trade-setup", "첫 온보딩 — 의존성 설치 후 온보딩 서버 시작"],
                                ["/trade-start", "운영 데몬 백그라운드 시작 + 대시보드"],
                                ["/trade-status", "자산·일손익·벤치마크 대비 초과수익·포지션 요약"],
                                ["/trade-stop", "데몬 정상 종료"],
                                ["/trade-backtest", "과거 캔들 백테스트"],
                            ].map(([cmd, d]) => (
                                <div key={cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-3.5">
                                    <code className="font-mono text-sm text-amber-700 sm:w-40 flex-shrink-0">{cmd}</code>
                                    <span className="text-sm text-gray-600">{d}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 08 Tech Stack */}
                <section className="mb-24">
                    <SectionHeader num="08" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            { title: "Core", items: ["TypeScript", "Node.js 20+", "tsx", "Zod (스키마 검증)"] },
                            { title: "Brain & Data", items: ["Claude Code CLI", "better-sqlite3", "claude-in-the-loop"] },
                            { title: "Dashboard & Test", items: ["uPlot 차트", "SSE 실시간", "Vitest", "Playwright E2E"] },
                        ].map((group) => (
                            <div key={group.title}>
                                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">{group.title}</p>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span key={item} className="px-3 py-1.5 bg-white text-gray-800 text-sm font-mono border border-gray-200 rounded">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 면책 고지 */}
                <section>
                    <div className="border border-amber-200/70 bg-amber-50/60 rounded-lg px-7 py-6">
                        <p className="text-xs font-mono text-amber-700 uppercase tracking-wider mb-3">면책 고지 · MIT License</p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            교육·연구 목적의 오픈소스입니다. 매매 판단과 그로 인한 모든 손실은 사용자 본인의 책임이며,
                            어떠한 투자 수익도 보장하지 않습니다. 기본 동작 모드는 <strong>페이퍼 트레이딩(가상 체결)</strong>이며,
                            실거래 전환은 명시적 잠금 해제가 필요하고 v1에서는 권장하지 않습니다.
                        </p>
                        <p className="text-[11px] text-gray-400 mt-4">
                            히어로 이미지: 寶覺寺 彌勒大佛 (Bao Jue Temple, Taichung) · Outlookxp, CC BY-SA 4.0 via Wikimedia Commons
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default OpenTraderPage
