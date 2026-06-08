"use client"

import Image from "next/image"

export default function SSkillsPage() {
    const copyInstall = () => {
        navigator.clipboard.writeText("claude plugin install s0613/S-skills")
    }

    return (
        <>
            <style>{`
                @font-face {
                    font-family: 'rulesExpanded';
                    src: url('/fonts/rulesExpanded-700.woff2') format('woff2');
                    font-weight: 700;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'rulesExpanded';
                    src: url('/fonts/rulesExpanded.woff2') format('woff2');
                    font-weight: 400;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'collapseFont';
                    src: url('/fonts/collapseFont-700.woff2') format('woff2');
                    font-weight: 700;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'courierPrime';
                    src: url('/fonts/courierPrime.woff2') format('woff2');
                    font-weight: 400;
                    font-display: swap;
                }

                .ss-root {
                    --orange: rgb(255, 172, 2);
                    --orange-dim: rgba(255, 172, 2, 0.65);
                    --orange-faint: rgba(255, 172, 2, 0.35);
                    --font: collapseFont, 'Inter', system-ui, sans-serif;
                    --mono: courierPrime, 'Courier New', monospace;
                    --hero: rulesExpanded, Impact, sans-serif;
                    background: #c8d9ec;
                    color: var(--orange);
                    font-family: var(--font);
                    min-height: 100vh;
                    -webkit-font-smoothing: antialiased;
                }

                /* BG */
                .ss-bg-img {
                    position: fixed; inset: 0; z-index: 0; pointer-events: none;
                }
                .ss-bg-img img {
                    width: 100%; height: 100%;
                    object-fit: cover; object-position: center top;
                    opacity: 0.14;
                }
                .ss-bg-overlay {
                    position: fixed; inset: 0; z-index: 1; pointer-events: none;
                    background:
                        linear-gradient(to right, #c8d9ec 30%, transparent 65%),
                        radial-gradient(at 0% 0%, rgba(255,189,56,0) 60%, rgba(255,189,56,0.35) 100%);
                }

                .ss-nav, .ss-main, .ss-footer { position: relative; z-index: 2; }

                /* NAV */
                .ss-nav {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 18px 48px;
                    border-bottom: 1px solid rgba(255,172,2,0.2);
                }
                .ss-nav-logo {
                    font-family: var(--font);
                    font-size: 22px; font-weight: 700;
                    letter-spacing: 0.04em;
                    color: var(--orange);
                    text-decoration: none;
                }
                .ss-nav-links {
                    display: flex; align-items: center; gap: 36px; list-style: none;
                }
                .ss-nav-links a {
                    font-size: 12px; font-weight: 500;
                    letter-spacing: 0.12em; text-transform: uppercase;
                    color: var(--orange); text-decoration: none;
                    opacity: 0.75; transition: opacity 0.15s;
                }
                .ss-nav-links a:hover { opacity: 1; }
                .ss-nav-gh { color: var(--orange); opacity: 0.75; font-size: 14px; text-decoration: none; }
                .ss-nav-gh:hover { opacity: 1; }

                /* HERO */
                .ss-hero { text-align: center; padding: 80px 48px 60px; }
                .ss-hero h1 {
                    font-family: var(--hero);
                    font-size: clamp(56px, 8vw, 105px);
                    line-height: 0.95; letter-spacing: 0.01em;
                    color: var(--orange); margin-bottom: 20px;
                }
                .ss-hero-sub {
                    font-size: 14px; color: var(--orange-dim);
                    line-height: 1.7; max-width: 460px;
                    margin: 0 auto 36px;
                }
                .ss-install-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; }
                .ss-install-row {
                    display: flex;
                    border: 1px solid rgba(255,172,2,0.4);
                }
                .ss-install-input {
                    font-family: var(--mono); font-size: 13px;
                    color: var(--orange); background: rgba(0,0,0,0.55);
                    border: none; outline: none;
                    padding: 10px 16px; width: 320px;
                }
                .ss-install-btn {
                    background: var(--orange); color: #000;
                    font-family: var(--font); font-size: 11px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    border: none; padding: 10px 18px;
                    cursor: pointer; transition: opacity 0.15s;
                }
                .ss-install-btn:hover { opacity: 0.85; }
                .ss-install-alts {
                    display: flex; gap: 24px;
                    font-size: 11px; font-weight: 500;
                    letter-spacing: 0.08em; text-transform: uppercase;
                }
                .ss-install-alts a { color: var(--orange-dim); text-decoration: none; }
                .ss-install-alts a:hover { color: var(--orange); }

                /* SECTIONS */
                .ss-section {
                    padding: 52px 48px;
                    border-top: 1px solid rgba(255,172,2,0.18);
                }
                .ss-section-label {
                    font-size: 11px; font-weight: 700;
                    letter-spacing: 0.18em; text-transform: uppercase;
                    color: var(--orange); margin-bottom: 24px;
                }

                /* DEMO */
                .ss-demo-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    border: 1px solid rgba(255,172,2,0.25);
                }
                .ss-demo-terminal {
                    background: rgba(0,0,0,0.75);
                    padding: 24px;
                    font-family: var(--mono); font-size: 12px; line-height: 1.8;
                    min-height: 300px;
                    border-right: 1px solid rgba(255,172,2,0.2);
                }
                .t-prompt { color: rgba(255,172,2,0.4); }
                .t-cmd { color: var(--orange); }
                .t-label { color: var(--orange); }
                .t-out { color: rgba(255,172,2,0.6); }
                .t-green { color: rgba(255,172,2,0.8); }
                .ss-demo-right {
                    background: rgba(0,0,0,0.85);
                    display: flex; align-items: flex-end;
                    padding: 20px 24px;
                }
                .ss-demo-right-label {
                    font-family: var(--font); font-size: 13px; font-weight: 700;
                    letter-spacing: 0.14em; text-transform: uppercase;
                    color: var(--orange); opacity: 0.65;
                }

                /* FEATURES */
                .ss-features-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    column-gap: 48px; row-gap: 0;
                }
                .ss-feature-item {
                    padding: 24px 0;
                    border-bottom: 1px solid rgba(255,172,2,0.15);
                }
                .ss-feature-item:nth-last-child(-n+3) { border-bottom: none; }
                .ss-feature-title {
                    font-size: 12px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    color: var(--orange); margin-bottom: 8px;
                }
                .ss-feature-desc { font-size: 13px; color: var(--orange-dim); line-height: 1.65; }
                .ss-feature-more {
                    display: inline-block; margin-top: 10px;
                    font-size: 11px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    color: var(--orange-dim); text-decoration: none;
                }
                .ss-feature-more:hover { color: var(--orange); }

                /* SKILLS */
                .ss-skills-table {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
                }
                .ss-skills-cat {
                    border-top: 1px solid rgba(255,172,2,0.25);
                    padding-top: 16px;
                }
                .ss-skills-cat-header {
                    font-size: 10px; font-weight: 700;
                    letter-spacing: 0.15em; text-transform: uppercase;
                    color: var(--orange-dim); margin-bottom: 12px;
                }
                .ss-skills-list { display: flex; flex-direction: column; gap: 8px; }
                .ss-skill-row { display: flex; align-items: baseline; gap: 12px; font-size: 13px; }
                .ss-skill-row code {
                    font-family: var(--mono); font-size: 12px;
                    color: var(--orange); min-width: 130px; flex-shrink: 0;
                }
                .ss-skill-row span { color: rgba(255,172,2,0.65); line-height: 1.4; }

                /* FOOTER */
                .ss-footer {
                    padding: 24px 48px;
                    border-top: 1px solid rgba(255,172,2,0.18);
                    display: flex; align-items: center; justify-content: space-between;
                }
                .ss-footer-brand {
                    font-size: 12px; font-weight: 700;
                    letter-spacing: 0.12em; text-transform: uppercase;
                    color: var(--orange);
                }
                .ss-footer-meta {
                    display: flex; gap: 28px;
                    font-size: 11px; font-weight: 500;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    color: var(--orange-dim);
                }
                .ss-footer-meta a { color: var(--orange-dim); text-decoration: none; }
                .ss-footer-meta a:hover { color: var(--orange); }

                @media (max-width: 900px) {
                    .ss-nav, .ss-hero, .ss-section, .ss-footer {
                        padding-left: 24px; padding-right: 24px;
                    }
                    .ss-demo-grid, .ss-features-grid { grid-template-columns: 1fr; }
                    .ss-feature-item { border-bottom: 1px solid rgba(255,172,2,0.15) !important; }
                    .ss-footer { flex-direction: column; gap: 12px; align-items: flex-start; }
                    .ss-skills-table { grid-template-columns: 1fr; }
                    .ss-nav-links { display: none; }
                }
            `}</style>

            <div className="ss-root">
                {/* Background */}
                <div className="ss-bg-img">
                    <Image src="/hermes-bg.webp" alt="" fill style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.14 }} priority />
                </div>
                <div className="ss-bg-overlay" />

                {/* Nav */}
                <nav className="ss-nav">
                    <a href="/s-skills" className="ss-nav-logo">S-SKILLS</a>
                    <ul className="ss-nav-links">
                        <li><a href="https://github.com/s0613/S-skills">Docs</a></li>
                        <li><a href="#">Portal</a></li>
                        <li><a href="#">Desktop App</a></li>
                    </ul>
                    <a href="https://github.com/s0613/S-skills" className="ss-nav-gh">GH</a>
                </nav>

                <main className="ss-main">
                    {/* Hero */}
                    <div className="ss-hero">
                        <h1>SJ COMPANY</h1>
                        <p className="ss-hero-sub">
                            IDE에 묶인 코딩 코파일럿도, 단순 API 래퍼도 아닙니다.
                            기획자, 디자이너, 개발자, QA, 보안 전문가가 Claude Code 안에서 팀처럼 협업합니다.
                        </p>
                        <div className="ss-install-wrap">
                            <div className="ss-install-row">
                                <input
                                    className="ss-install-input"
                                    defaultValue="claude plugin install s0613/S-skills"
                                    readOnly
                                />
                                <button className="ss-install-btn" onClick={copyInstall}>Install</button>
                            </div>
                            <div className="ss-install-alts">
                                <a href="#">macOS / Linux</a>
                                <a href="#">Windows</a>
                                <a href="https://github.com/s0613/S-skills">GitHub →</a>
                            </div>
                        </div>
                    </div>

                    {/* See It in Action */}
                    <div className="ss-section">
                        <p className="ss-section-label">See It in Action</p>
                        <div className="ss-demo-grid">
                            <div className="ss-demo-terminal">
                                <div><span className="t-prompt">❯ </span><span className="t-cmd">/sj-company 로그인 기능 만들어줘</span></div>
                                <br />
                                <div><span className="t-label">[ PM ]</span> <span className="t-out">복잡도: Medium · 에이전트 4개</span></div>
                                <div><span className="t-out">{"  → database, backend, security, frontend"}</span></div>
                                <br />
                                <div><span className="t-label">[ Tech Lead ]</span> <span className="t-out">병렬 디스패치 시작</span></div>
                                <div><span className="t-out">{"  1) database → 2) backend + security 병렬 → 3) frontend"}</span></div>
                                <br />
                                <div><span className="t-green">[ Database ]</span> <span className="t-out">스키마 완료 · 팀 채널 게시</span></div>
                                <div><span className="t-green">[ Security ]</span> <span className="t-out">OWASP A02 검증 완료</span></div>
                                <div><span className="t-green">[ Backend  ]</span> <span className="t-out">JWT 엔드포인트 구현 완료</span></div>
                                <div><span className="t-green">[ Frontend ]</span> <span className="t-out">로그인 폼 + 에러 처리 완료</span></div>
                                <br />
                                <div><span className="t-label">✓ 완료</span> <span className="t-out">— 4개 에이전트 · 테스트 통과</span></div>
                            </div>
                            <div className="ss-demo-right">
                                <span className="ss-demo-right-label">S-Skills</span>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="ss-section">
                        <p className="ss-section-label">Features</p>
                        <div className="ss-features-grid">
                            {[
                                { title: "자동 라우팅", desc: "태스크를 말로 설명하면 PM이 분석하고 Tech Lead가 필요한 전문가를 자동 투입합니다." },
                                { title: "취향이 쌓이는 디자인", desc: "거부한 방향은 봉인되고 승인한 방향은 누적됩니다. 실행할수록 브랜드 정체성이 선명해집니다." },
                                { title: "보안 감사 자동화", desc: "OWASP Top 10 + STRIDE 기반 보안 에이전트가 구현과 동시에 cross-cutting 리뷰를 수행합니다." },
                                { title: "팀 채널 직접 조율", desc: "서브에이전트들이 Tech Lead 없이 직접 소통합니다. Database 제약이 Backend에 즉시 전달됩니다." },
                                { title: "QA 독립 검증", desc: "QA는 구현자 산출물을 참조하지 않습니다. PM 브리프와 실제 파일만 보고 편향 없이 검증합니다." },
                                { title: "한 줄 설치", desc: "claude plugin install 하나로 완료. 어느 프로젝트에서나 /sj-company로 바로 시작합니다." },
                            ].map((f, i) => (
                                <div key={i} className="ss-feature-item">
                                    <div className="ss-feature-title">{f.title}</div>
                                    <div className="ss-feature-desc">{f.desc}</div>
                                    <a href="#" className="ss-feature-more">More Details →</a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="ss-section">
                        <p className="ss-section-label">Skills</p>
                        <div className="ss-skills-table">
                            {[
                                {
                                    header: "개발 파이프라인",
                                    skills: [
                                        ["/sj-company", "상태/의도 기반 라우터 — 모든 것의 시작점"],
                                        ["/pm", "요구사항 분석 · 리스크 · 우선순위"],
                                        ["/design", "레퍼런스 DNA 기반 UI 설계 + AI 티 제거"],
                                        ["/tech-lead", "전문 서브에이전트 병렬 디스패치 + 통합"],
                                        ["/qa", "독립 검증 — 구현자 산출물 참조 없이"],
                                    ],
                                },
                                {
                                    header: "품질 · 보안 · 릴리즈",
                                    skills: [
                                        ["/spec", "모호한 의도 → 5단계 정밀 명세"],
                                        ["/investigate", "가설 수립 → 검증 강제 디버깅"],
                                        ["/cso", "OWASP Top 10 + STRIDE 보안 감사"],
                                        ["/ship", "테스트 → 커버리지 → PR 원스톱 릴리즈"],
                                        ["/retro", "커밋·테스트·QA 지표로 주간 회고"],
                                    ],
                                },
                                {
                                    header: "마케팅 · SEO · 성장",
                                    skills: [
                                        ["/marketing", "SNS 캠페인 · 채널별 카피라이팅"],
                                        ["/seo", "Search Console + Naver 색인 자동화"],
                                        ["/secretary", "아침 브리핑 · 우선순위 정렬"],
                                    ],
                                },
                                {
                                    header: "문서 · 테스트 · 자동화",
                                    skills: [
                                        ["/docs-organize", "코드베이스 docs/ 생성 · 건강 점수"],
                                        ["/obsidian", "Obsidian 볼트 자동 문서화"],
                                        ["/test-scenario", "기능 검증 시나리오 생성"],
                                        ["/pw-loop", "Playwright 반복 테스트 루프"],
                                        ["/automation", "PC·UI 조작 · 네이티브 앱 제작"],
                                        ["/outsource", "막혔을 때 전문가 위임 리포트"],
                                    ],
                                },
                            ].map((cat, i) => (
                                <div key={i} className="ss-skills-cat">
                                    <div className="ss-skills-cat-header">{cat.header}</div>
                                    <div className="ss-skills-list">
                                        {cat.skills.map(([cmd, desc], j) => (
                                            <div key={j} className="ss-skill-row">
                                                <code>{cmd}</code>
                                                <span>{desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="ss-footer">
                    <span className="ss-footer-brand">S-SKILLS</span>
                    <div className="ss-footer-meta">
                        <a href="https://github.com/s0613/S-skills">SONG SEUNGJU</a>
                        <span>NOUS RESEARCH 영감</span>
                        <span>MIT LICENSE · 2026</span>
                    </div>
                </footer>
            </div>
        </>
    )
}
