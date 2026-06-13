"use client"

import Image from "next/image"
import s from "./open-trader.module.css"

const REPO = "https://github.com/Totaro-int/claude-trade-harness"

export default function OpenTraderPage() {
    const copyInstall = () => {
        navigator.clipboard.writeText("/plugin marketplace add Totaro-int/claude-trade-harness")
    }

    return (
        <div className={s.root}>
            {/* Background — 보티첼리, 비너스의 탄생 */}
            <div className={s.bgImg}>
                <Image src="/OpenTrader/venus-bg.webp" alt="" fill style={{ objectFit: "cover", objectPosition: "center center", opacity: 0.34 }} priority />
            </div>
            <div className={s.bgOverlay} />

            {/* Nav */}
            <nav className={s.nav}>
                <a href="/open-trader" className={s.navLogo}>OPEN-TRADER</a>
                <ul className={s.navLinks}>
                    <li><a href={REPO}>Docs</a></li>
                    <li><a href="#how">동작 원리</a></li>
                    <li><a href="#safety">안전 설계</a></li>
                    <li><a href="/">이력서 →</a></li>
                </ul>
                <a href={REPO} className={s.navGh}>GH</a>
            </nav>

            <main className={s.otMain}>
                {/* Hero */}
                <div className={s.hero}>
                    <p className={s.heroKicker}>LLM-in-the-loop · Trading Harness · Open Source</p>
                    <h1>OPEN-TRADER</h1>
                    <p className={s.heroSub}>
                        증권사 OpenAPI 문서만 넣으면 Claude가 브로커 어댑터를 자동 생성·검증해 연결하고,
                        자연어 전략을 두뇌(Claude)에 물려 페이퍼 트레이딩으로 돌리는 로컬 골격입니다.
                    </p>
                    <p className={s.heroNote}>
                        비너스가 바다에서 태어나듯 — 진짜 제품은 전략이 아니라 하네스 그 자체입니다.
                    </p>
                    <div className={s.installWrap}>
                        <div className={s.installRow}>
                            <input className={s.installInput} defaultValue="/plugin marketplace add Totaro-int/claude-trade-harness" readOnly />
                            <button className={s.installBtn} onClick={copyInstall}>Copy</button>
                        </div>
                        <div className={s.installAlts}>
                            <a href={REPO}>npm start</a>
                            <a href={REPO}>Paper Trading</a>
                            <a href={REPO}>GitHub →</a>
                        </div>
                    </div>
                </div>

                {/* See It in Action */}
                <div className={s.section} id="how">
                    <p className={s.sectionLabel}>See It in Action</p>
                    <div className={s.demoGrid}>
                        <div className={s.demoTerminal}>
                            <div><span className={s.tPrompt}>❯ </span><span className={s.tCmd}>npm start</span></div>
                            <br />
                            <div><span className={s.tLabel}>[ Onboard ]</span> <span className={s.tOut}>브로커 OpenAPI 문서 분석 → 어댑터 생성</span></div>
                            <div><span className={s.tOut}>{"  → 정적검사 · 컴파일 · 읽기전용 연결(인증·시세·잔고) 통과"}</span></div>
                            <br />
                            <div><span className={s.tLabel}>[ Cycle ]</span> <span className={s.tOut}>09:30 · Claude 판단 요청 (시세 + 포지션 + 전략)</span></div>
                            <div><span className={s.tOut}>{"  → 005930 삼성전자 : 지표 약세, 관망"}</span></div>
                            <div><span className={s.tGreen}>{"  → 000660 SK하이닉스 : 분할매수 신호"}</span></div>
                            <br />
                            <div><span className={s.tLabel}>[ Guardrail ]</span> <span className={s.tOut}>maxOrderPct 10% · dailyLoss 3% 통과</span></div>
                            <div><span className={s.tGreen}>[ Paper ]</span> <span className={s.tOut}>BUY 000660 ×10 @ 178,000 (가상 체결)</span></div>
                            <br />
                            <div><span className={s.tLabel}>✓ 사이클 완료</span> <span className={s.tOut}>— 가드레일 7종 통과 · 대시보드 실시간 갱신</span></div>
                        </div>
                        <div className={s.scoreboard}>
                            <span className={s.scoreLabel}>정직한 점수판 · 벤치마크 대비</span>
                            <span className={s.scoreValue}>-0.4%p</span>
                            <span className={s.scoreNote}>
                                절대 수익률이 아니라 동일가중 buy-and-hold 대비 초과수익으로 평가합니다.
                                이 값은 대부분 음수일 것이고, 그게 정상입니다.
                            </span>
                            <div className={s.scoreDivider} />
                            <div className={s.scoreRow}><span>총자산</span><span>10,420,000</span></div>
                            <div className={s.scoreRow}><span>일손익</span><span>+0.2%</span></div>
                            <div className={s.scoreRow}><span>모드</span><span>PAPER</span></div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className={s.section}>
                    <p className={s.sectionLabel}>Features</p>
                    <div className={s.featuresGrid}>
                        {[
                            { title: "어댑터 자동생성", desc: "증권사 OpenAPI 문서만으로 TypeScript 어댑터를 생성하고, 정적검사·컴파일·읽기전용 연결 테스트로 검증합니다." },
                            { title: "코드 가드레일", desc: "돈이 움직이는 경로는 AI 생성 코드가 아닌 결정론적 TypeScript로만 구성됩니다. 포지션·주문·일일 손실 한도." },
                            { title: "실시간 관측성", desc: "모든 판단·체결·스냅샷이 기록되고, 토스 스타일 로컬 대시보드에서 SSE로 실시간 표시됩니다." },
                            { title: "claude-in-the-loop", desc: "시세·포지션·전략을 프롬프트로 묶어 장중 30분 간격으로 Claude의 판단을 받아오는 사이클 엔진." },
                            { title: "기본값 = 안전", desc: "모든 에러·예외의 기본 동작은 '거래 안 함'. v1은 3중 잠금을 풀어도 라이브 주문을 실행하지 않습니다." },
                            { title: "BYO 전략", desc: "내장 베이스라인은 참고용일 뿐. strategy/*.md에 자연어 전략을 직접 써 교체하는 것이 전제입니다." },
                        ].map((f, i) => (
                            <div key={i} className={s.featureItem}>
                                <div className={s.featureTitle}>{f.title}</div>
                                <div className={s.featureDesc}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Commands & Config */}
                <div className={s.section} id="safety">
                    <p className={s.sectionLabel}>Commands &amp; Guardrails</p>
                    <div className={s.skillsTable}>
                        {[
                            {
                                header: "플러그인 커맨드",
                                skills: [
                                    ["/trade-setup", "첫 온보딩 — 의존성 설치 후 온보딩 서버 시작"],
                                    ["/trade-start", "운영 데몬 백그라운드 시작 + 대시보드"],
                                    ["/trade-status", "자산 · 일손익 · 벤치마크 대비 · 포지션 요약"],
                                    ["/trade-stop", "데몬 정상 종료"],
                                    ["/trade-backtest", "과거 캔들 백테스트"],
                                ],
                            },
                            {
                                header: "동작 3단계",
                                skills: [
                                    ["온보딩", "OpenAPI 문서 + 키 → 어댑터 생성 · 검증"],
                                    ["전략 설정", "자연어 전략 Markdown 업로드 (BYO 권장)"],
                                    ["운영", "장중 30분 간격 판단 → 가드레일 → 가상 체결"],
                                ],
                            },
                            {
                                header: "가드레일 (config.json)",
                                skills: [
                                    ["maxPositionPct", "종목당 최대 비중 20%"],
                                    ["maxOrderPct", "1회 주문 금액 상한 10%"],
                                    ["dailyLossLimitPct", "일일 손실 한도 3% — 도달 시 당일 중단"],
                                    ["maxTotalExposurePct", "총 주식 노출 상한 80%"],
                                ],
                            },
                            {
                                header: "라이브 3중 잠금",
                                skills: [
                                    ["config.json", "mode: \"live\" 설정"],
                                    ["LIVE_CONFIRM=1", "환경변수 명시적 확인"],
                                    ["계좌 끝 4자리", "API로 계좌번호 확인"],
                                    ["v1 차단", "셋 다 맞아도 v1은 페이퍼만 — 의도된 안전장치"],
                                ],
                            },
                        ].map((cat, i) => (
                            <div key={i} className={s.skillsCat}>
                                <div className={s.skillsCatHeader}>{cat.header}</div>
                                <div className={s.skillsList}>
                                    {cat.skills.map(([cmd, desc], j) => (
                                        <div key={j} className={s.skillRow}>
                                            <code>{cmd}</code>
                                            <span>{desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Disclaimer block */}
                <div className={s.section}>
                    <div className={s.discBlock}>
                        <div className={s.discText}>
                            <h2 className={s.discTitle}>교육·연구 목적의 오픈소스입니다</h2>
                            <p className={s.discDesc}>
                                매매 판단과 그로 인한 모든 손실은 사용자 본인의 책임이며, 어떠한 투자 수익도 보장하지 않습니다.
                                기본 동작 모드는 페이퍼 트레이딩(가상 체결)이고, 생성된 어댑터의 주문 경로는 미검증이므로
                                라이브 전 사람이 직접 검토하세요. MIT License.
                            </p>
                        </div>
                        <a href={REPO} className={s.discCta}>GitHub에서 보기 →</a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className={s.footer}>
                <span className={s.footerBrand}>OPEN-TRADER</span>
                <div className={s.footerMeta}>
                    <a href="/">SONG SEUNGJU</a>
                    <span>BIRTH OF VENUS · BOTTICELLI</span>
                    <span>MIT LICENSE · 2026</span>
                </div>
            </footer>
        </div>
    )
}
