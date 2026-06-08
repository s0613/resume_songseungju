"use client"

import Image from "next/image"
import s from "./s-skills.module.css"

export default function SSkillsPage() {
    const copyInstall = () => {
        navigator.clipboard.writeText("claude plugin install s0613/S-skills")
    }

    return (
        <div className={s.root}>
            {/* Background */}
            <div className={s.bgImg}>
                <Image src="/hermes-bg.webp" alt="" fill style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.14 }} priority />
            </div>
            <div className={s.bgOverlay} />

            {/* Nav */}
            <nav className={s.nav}>
                <a href="/s-skills" className={s.navLogo}>S-SKILLS</a>
                <ul className={s.navLinks}>
                    <li><a href="https://github.com/s0613/S-skills">Docs</a></li>
                    <li><a href="#">Portal</a></li>
                    <li><a href="#">Desktop App</a></li>
                </ul>
                <a href="https://github.com/s0613/S-skills" className={s.navGh}>GH</a>
            </nav>

            <main className={s.ssMain}>
                {/* Hero */}
                <div className={s.hero}>
                    <h1>SJ COMPANY</h1>
                    <p className={s.heroSub}>
                        IDE에 묶인 코딩 코파일럿도, 단순 API 래퍼도 아닙니다.
                        기획자, 디자이너, 개발자, QA, 보안 전문가가 Claude Code 안에서 팀처럼 협업합니다.
                    </p>
                    <div className={s.installWrap}>
                        <div className={s.installRow}>
                            <input className={s.installInput} defaultValue="claude plugin install s0613/S-skills" readOnly />
                            <button className={s.installBtn} onClick={copyInstall}>Install</button>
                        </div>
                        <div className={s.installAlts}>
                            <a href="#">macOS / Linux</a>
                            <a href="#">Windows</a>
                            <a href="https://github.com/s0613/S-skills">GitHub →</a>
                        </div>
                    </div>
                </div>

                {/* See It in Action */}
                <div className={s.section}>
                    <p className={s.sectionLabel}>See It in Action</p>
                    <div className={s.demoGrid}>
                        <div className={s.demoTerminal}>
                            <div><span className={s.tPrompt}>❯ </span><span className={s.tCmd}>/sj-company 로그인 기능 만들어줘</span></div>
                            <br />
                            <div><span className={s.tLabel}>[ PM ]</span> <span className={s.tOut}>복잡도: Medium · 에이전트 4개</span></div>
                            <div><span className={s.tOut}>{"  → database, backend, security, frontend"}</span></div>
                            <br />
                            <div><span className={s.tLabel}>[ Tech Lead ]</span> <span className={s.tOut}>병렬 디스패치 시작</span></div>
                            <div><span className={s.tOut}>{"  1) database → 2) backend + security 병렬 → 3) frontend"}</span></div>
                            <br />
                            <div><span className={s.tGreen}>[ Database ]</span> <span className={s.tOut}>스키마 완료 · 팀 채널 게시</span></div>
                            <div><span className={s.tGreen}>[ Security ]</span> <span className={s.tOut}>OWASP A02 검증 완료</span></div>
                            <div><span className={s.tGreen}>[ Backend  ]</span> <span className={s.tOut}>JWT 엔드포인트 구현 완료</span></div>
                            <div><span className={s.tGreen}>[ Frontend ]</span> <span className={s.tOut}>로그인 폼 + 에러 처리 완료</span></div>
                            <br />
                            <div><span className={s.tLabel}>✓ 완료</span> <span className={s.tOut}>— 4개 에이전트 · 테스트 통과</span></div>
                        </div>
                        <div className={s.demoRight}>
                            <span className={s.demoRightLabel}>S-Skills</span>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className={s.section}>
                    <p className={s.sectionLabel}>Features</p>
                    <div className={s.featuresGrid}>
                        {[
                            { title: "자동 라우팅", desc: "태스크를 말로 설명하면 PM이 분석하고 Tech Lead가 필요한 전문가를 자동 투입합니다." },
                            { title: "취향이 쌓이는 디자인", desc: "거부한 방향은 봉인되고 승인한 방향은 누적됩니다. 실행할수록 브랜드 정체성이 선명해집니다." },
                            { title: "보안 감사 자동화", desc: "OWASP Top 10 + STRIDE 기반 보안 에이전트가 구현과 동시에 cross-cutting 리뷰를 수행합니다." },
                            { title: "팀 채널 직접 조율", desc: "서브에이전트들이 Tech Lead 없이 직접 소통합니다. Database 제약이 Backend에 즉시 전달됩니다." },
                            { title: "QA 독립 검증", desc: "QA는 구현자 산출물을 참조하지 않습니다. PM 브리프와 실제 파일만 보고 편향 없이 검증합니다." },
                            { title: "한 줄 설치", desc: "claude plugin install 하나로 완료. 어느 프로젝트에서나 /sj-company로 바로 시작합니다." },
                        ].map((f, i) => (
                            <div key={i} className={s.featureItem}>
                                <div className={s.featureTitle}>{f.title}</div>
                                <div className={s.featureDesc}>{f.desc}</div>
                                <a href="#" className={s.featureMore}>More Details →</a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className={s.section}>
                    <p className={s.sectionLabel}>Skills</p>
                    <div className={s.skillsTable}>
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
            </main>

            {/* Footer */}
            <footer className={s.footer}>
                <span className={s.footerBrand}>S-SKILLS</span>
                <div className={s.footerMeta}>
                    <a href="https://github.com/s0613/S-skills">SONG SEUNGJU</a>
                    <span>NOUS RESEARCH 영감</span>
                    <span>MIT LICENSE · 2026</span>
                </div>
            </footer>
        </div>
    )
}
