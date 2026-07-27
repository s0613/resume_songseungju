"use client"

import Image from "next/image"
import Link from "next/link"
import { posts, type BlogPost } from "@/data/blog"
import { portfolioProjects } from "@/data/portfolio"
import s from "./home.module.css"

const BUILDS = [
    {
        name: "S-Skills",
        tagline: "역할 기반 Claude Code 하네스",
        problem: "혼자 일하는 개발자에게는 요구사항을 정리해 주고 결과를 검증해 줄 팀이 없습니다.",
        structure: "PM · 디자인 · 개발 · QA 역할별 에이전트가 하나의 작업을 이어받아 처리하고, 구현과 분리된 독립 QA 에이전트가 결과를 다시 검증합니다.",
        status: "MIT 오픈소스 · v3.x 운영 중",
        install: "claude plugin install s0613/S-skills",
        links: [
            { label: "제품 페이지", href: "/s-skills" },
            { label: "GitHub", href: "https://github.com/s0613/S-skills" },
        ],
    },
    {
        name: "open-trader",
        tagline: "LLM-in-the-loop 트레이딩 하네스",
        problem: "증권사 OpenAPI는 회사마다 규격이 달라, 연동할 때마다 같은 어댑터 작업을 반복하게 됩니다.",
        structure: "Claude가 브로커 어댑터 코드를 생성하고, 생성한 코드를 하네스가 다시 검증하는 루프로 연동 과정을 자동화합니다.",
        status: "오픈소스 · 페이퍼 트레이딩 단계",
        install: null,
        links: [
            { label: "제품 페이지", href: "/open-trader" },
            { label: "GitHub", href: "https://github.com/Totaro-int/claude-trade-harness" },
        ],
    },
]

const FEATURED_POST_SLUGS = [
    "harness-obsidian-long-term-memory",
    "making-my-own-harness",
    "starting-london-system-agent",
]

const FEATURED_POSTS: BlogPost[] = FEATURED_POST_SLUGS
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p))

const SKILLS = [
    {
        name: "Frontend",
        tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "HTML/CSS"],
    },
    {
        name: "Backend",
        tags: ["Spring Boot", "Django", "Node.js", "MariaDB", "MySQL", "PostgreSQL"],
    },
    {
        name: "DevOps",
        tags: ["AWS EC2", "AWS S3", "CloudFront", "AWS RDS", "Nginx", "Docker"],
    },
    {
        name: "Tools",
        tags: ["Git", "GitHub", "Figma", "Postman", "Notion", "Claude Code", "Cursor AI"],
    },
]

// 에이전트·AI 관련 프로젝트를 앞에 배치 (src/data/portfolio.ts 단일 소스)
const EXPERIENCES = portfolioProjects.map((p) => ({
    name: p.name,
    href: `/portfolio/${p.slug}`,
    date: p.date,
    desc: p.description,
    tags: p.tags,
}))

const AWARDS = [
    { name: "창업지원 단장상 Launch Pad 최우수상", project: "Trynic — 2025.03" },
    { name: "제13회 아랩 액셀러레이팅 프로그램 최우수상", project: "Trynic" },
    { name: "Moong 커넥톤 우수상", project: "Trynic" },
    { name: "아이로드 글로벌 해커톤 대상", project: "Totaload — 한국자동차산업수출협동조합" },
]

export default function ResumePage() {
    return (
        <div className={s.root}>
            {/* Background */}
            <div className={s.bgImg}>
                <Image src="/ssireum.webp" alt="" fill style={{ objectFit: "cover", objectPosition: "60% center" }} priority />
            </div>
            <div className={s.bgOverlay} />

            {/* Nav */}
            <nav className={s.nav} aria-label="주요 메뉴">
                <div className={s.navInner}>
                    <div className={s.navBrand}>
                        <a href="/" className={s.navLogo}>SONG SEUNGJU</a>
                        <span className={s.navSub}>AI Agent Builder · 2026</span>
                    </div>
                    <ul className={s.navLinks}>
                        <li><a href="#builds">Builds</a></li>
                        <li><a href="#writing">Writing</a></li>
                        <li><a href="#archive">Archive</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                    <div className={s.navRight}>
                        <a href="https://github.com/s0613" className={s.navGh} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                        <a href="/blog" className={s.navSSkills}>Blog</a>
                        <a href="/open-trader" className={s.navSSkills}>open-trader</a>
                        <a href="/s-skills" className={s.navSSkills}>S-Skills</a>
                    </div>
                </div>
            </nav>

            <main className={s.main}>
                {/* Hero */}
                <section className={s.hero} aria-labelledby="hero-heading">
                    <div className={s.heroMeta}>AI Agent Builder · Fullstack Developer · Seoul, Korea</div>
                    <h1 id="hero-heading" className={s.heroName}>SONG<br />SEUNGJU</h1>
                    <p className={s.heroLead}>
                        AI 에이전트가 함께 일하는 시스템을 설계하고 제품으로 출시합니다.
                    </p>
                    <p className={s.heroTitle}>
                        S-Skills와 open-trader를 만든 풀스택 개발자 송승주입니다.
                    </p>
                    <div className={s.heroContacts}>
                        <a href="mailto:farchicken00@naver.com" className={s.heroContact}>
                            <span className={s.heroContactDot} />
                            farchicken00@naver.com
                        </a>
                        <a href="https://github.com/s0613" className={s.heroContact} target="_blank" rel="noopener noreferrer">
                            <span className={s.heroContactDot} />
                            github.com/s0613
                        </a>
                        <a href="https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%86%A1-73b41a2a8/" className={s.heroContact} target="_blank" rel="noopener noreferrer">
                            <span className={s.heroContactDot} />
                            LinkedIn
                        </a>
                    </div>
                    <div className={s.heroCtaRow}>
                        <a href="#builds" className={s.cta}>대표작 보기 ↓</a>
                    </div>
                </section>

                {/* Flagship Builds */}
                <section id="builds" className={s.section} aria-labelledby="builds-heading">
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>01</div>
                            <h2 id="builds-heading" className={s.sectionTitle}>FLAGSHIP<br />BUILDS</h2>
                            <div className={s.sectionLine} />
                        </div>
                        <div className={s.buildList}>
                            {BUILDS.map((b) => (
                                <article key={b.name} className={s.buildCard}>
                                    <div className={s.buildHead}>
                                        <h3 className={s.buildName}>{b.name}</h3>
                                        <span className={s.buildTagline}>{b.tagline}</span>
                                    </div>
                                    <dl className={s.buildRows}>
                                        <div className={s.buildRow}>
                                            <dt className={s.buildRowLabel}>해결한 문제</dt>
                                            <dd className={s.buildRowText}>{b.problem}</dd>
                                        </div>
                                        <div className={s.buildRow}>
                                            <dt className={s.buildRowLabel}>핵심 구조</dt>
                                            <dd className={s.buildRowText}>{b.structure}</dd>
                                        </div>
                                        <div className={s.buildRow}>
                                            <dt className={s.buildRowLabel}>현재 상태</dt>
                                            <dd className={s.buildRowText}>{b.status}</dd>
                                        </div>
                                    </dl>
                                    {b.install && <code className={s.buildInstall}>{b.install}</code>}
                                    <div className={s.buildLinks}>
                                        {b.links.map((l) => (
                                            l.href.startsWith("/") ? (
                                                <Link key={l.href} href={l.href} className={s.buildLink}>
                                                    {l.label} →
                                                </Link>
                                            ) : (
                                                <a key={l.href} href={l.href} className={s.buildLink} target="_blank" rel="noopener noreferrer">
                                                    {l.label} ↗
                                                </a>
                                            )
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Writing */}
                <section id="writing" className={s.section} aria-labelledby="writing-heading">
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>02</div>
                            <h2 id="writing-heading" className={s.sectionTitle}>WRITING</h2>
                            <div className={s.sectionLine} />
                        </div>
                        <div>
                            <div className={s.writeList}>
                                {FEATURED_POSTS.map((p) => (
                                    <Link key={p.slug} href={`/blog/${p.slug}`} className={s.writeItem}>
                                        <div className={s.writeHead}>
                                            <span className={s.writeTitle}>{p.title}</span>
                                            <span className={s.writeDate}>{p.date}</span>
                                        </div>
                                        <p className={s.writeExcerpt}>{p.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                            <Link href="/blog" className={s.sectionMore}>글 전체 보기 →</Link>
                        </div>
                    </div>
                </section>

                {/* Project Archive */}
                <section id="archive" className={s.section} aria-labelledby="archive-heading">
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>03</div>
                            <h2 id="archive-heading" className={s.sectionTitle}>PROJECT<br />ARCHIVE</h2>
                            <div className={s.sectionLine} />
                        </div>
                        <div className={s.archList}>
                            {EXPERIENCES.map((exp) => (
                                <Link key={exp.name} href={exp.href} className={s.archItem}>
                                    <div className={s.archHead}>
                                        <span className={s.archName}>{exp.name}</span>
                                        <span className={s.archDate}>{exp.date}</span>
                                    </div>
                                    <div className={s.archDesc}>{exp.desc}</div>
                                    <div className={s.archTags}>
                                        {exp.tags.map((t) => <span key={t} className={s.expTag}>{t}</span>)}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About + Contact */}
                <section id="about" className={s.section} aria-labelledby="about-heading">
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>04</div>
                            <h2 id="about-heading" className={s.sectionTitle}>ABOUT</h2>
                            <div className={s.sectionLine} />
                        </div>
                        <div>
                            <div className={s.introProfile}>
                                <div className={s.introPhoto}>
                                    <Image src="/IM.webp" alt="송승주 프로필 사진" width={100} height={100} />
                                </div>
                                <div>
                                    <div className={s.introHeadline}>
                                        AI 에이전트가 함께 일하는 구조를 만드는<br />풀스택 개발자
                                    </div>
                                    <div className={s.introSubline}>인하대학교 컴퓨터공학과 졸업 (2026)</div>
                                </div>
                            </div>
                            <div className={s.introDivider} />
                            <p className={s.introPara}>
                                작업을 사람이 전부 처리하는 대신, 역할을 나눈 AI 에이전트가 이어받아 처리하도록
                                설계합니다. 그렇게 만든 <span className={s.introStrong}>S-Skills</span>와
                                <span className={s.introStrong}> open-trader</span>는 둘 다 오픈소스로 공개해
                                직접 쓰면서 다듬고 있습니다.
                            </p>
                            <p className={s.introPara}>
                                에이전트를 붙이기 전에 제품을 끝까지 만들어 본 경험이 바탕입니다.
                                <span className={s.introStrong}> Next.js · Spring Boot · Django · AWS</span> 스택으로
                                기획부터 배포까지 혼자 수행했고, 의료·물류·뷰티·커머스 등 도메인을 가리지 않고
                                실제 사용자에게 닿는 수준까지 만들어 왔습니다. 예비창업패키지 3회 선정,
                                해커톤 대상 등 사업화 과정도 직접 겪었습니다.
                            </p>
                            <div className={s.introDivider} />
                            <div className={s.blockHeading}>STACK</div>
                            <div className={s.skillsGrid}>
                                {SKILLS.map((cat) => (
                                    <div key={cat.name} className={s.skillCat}>
                                        <div className={s.skillCatName}>{cat.name}</div>
                                        <div className={s.skillTags}>
                                            {cat.tags.map((t) => (
                                                <span key={t} className={s.skillTag}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={s.awardsHeading}>AWARDS</div>
                            <div>
                                {AWARDS.map((a) => (
                                    <div key={a.name} className={s.awardItem}>
                                        <span className={s.awardName}>{a.name}</span>
                                        <span className={s.awardProject}>{a.project}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={s.contactBlock}>
                                <div className={s.contactText}>
                                    에이전트 시스템·제품 개발 관련 제안은 메일로 주시면 확인합니다.
                                </div>
                                <a href="mailto:farchicken00@naver.com" className={s.cta}>farchicken00@naver.com →</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={s.footer}>
                <span className={s.footerBrand}>SONG SEUNGJU</span>
                <div className={s.footerMeta}>
                    <a href="mailto:farchicken00@naver.com">farchicken00@naver.com</a>
                    <a href="https://github.com/s0613" target="_blank" rel="noopener noreferrer">github.com/s0613</a>
                    <a href="/blog">Blog</a>
                    <span>인하대 컴퓨터공학과 · 2026</span>
                </div>
                <a href="/s-skills" className={s.footerSSkills}>S-SKILLS →</a>
            </footer>
        </div>
    )
}
