"use client"

import Image from "next/image"
import Link from "next/link"
import s from "./home.module.css"

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

const EXPERIENCES = [
    {
        name: "MONE",
        href: "/portfolio/mone",
        date: "2026.01 ~ 현재",
        desc: "선상 면세점 풀스택 통합 관리 시스템 — 예약·주문·정산·인사급여 등 13개 도메인",
        tags: ["Django", "Python", "DRF", "Next.js", "TypeScript", "PostgreSQL"],
        bullets: [
            "Django DRF 기반 13개 도메인 REST API 설계 및 구현",
            "예약→주문→결제→재고 전 과정 트랜잭션 흐름 설계",
            "월별마감보고, 매출정산보고, 부가세신고자료 자동 생성",
            "Next.js 승객 웹 및 Toss 결제 위젯 연동",
            "Playwright E2E 테스트 및 보안 정책 내재화",
        ],
    },
    {
        name: "Trynic",
        href: "/portfolio/trynic",
        date: "2025.01 ~ 현재",
        desc: "레퍼런스 기반 AI 생성 이미지·영상 웹 — 기획부터 개발·배포 전 과정 수행",
        tags: ["Next.js", "Tailwind CSS", "Spring Boot", "AWS S3", "CloudFront", "fal API"],
        bullets: [
            "서비스 컨셉 정의부터 전체 기획·디자인·개발까지 수행",
            "Spring Boot 기반 사용자 인증 및 보안 개선",
            "중소벤처기업부 예비창업패키지 선정",
            "창업지원단 Launch Pad 최우수상 · 기업가 정신 재단상 수상",
        ],
    },
    {
        name: "IndexKit",
        href: "/portfolio/indexkit",
        date: "2026.03 ~ 현재",
        desc: "네이버 블로그 포스트를 Google 검색에 자동 노출시키는 SaaS — 색인 요청 자동화",
        tags: ["Next.js", "Supabase", "TypeScript", "Vercel", "Google Search Console API", "PortOne"],
        bullets: [
            "네이버 블로그 신규 글 Google Search Console 자동 제출 파이프라인 구현",
            "부스터 팩(100/500/1,000 URL) 누락 글 일괄 색인 복구 기능",
            "PortOne 결제 연동으로 유료 플랜 온보딩 구현",
        ],
    },
    {
        name: "Cogmo 안녕",
        href: "/portfolio/cogmo",
        date: "2025.11 ~ 2026.01",
        desc: "고령자를 위한 AI 기반 인지건강 측정 및 관리 플랫폼 — 모바일 앱·보호자 대시보드 풀스택",
        tags: ["Flutter", "Spring Boot", "Next.js", "Gemini AI", "AWS", "WebSocket"],
        bullets: [
            "Spring Boot 백엔드 및 JWT/OAuth2 인증 시스템 구축",
            "Next.js 보호자 대시보드 (WebSocket 실시간 모니터링)",
            "Gemini AI 연동 맞춤형 피드백 및 PDF 리포트 자동 생성",
            "AWS 인프라 구축 (EC2, S3, SNS, SES) 및 배포 자동화",
        ],
    },
    {
        name: "Totaload",
        href: "/portfolio/totaload",
        date: "2025.07 ~ 현재",
        desc: "중고차 수출 디지털 인증서 자동 발급 SaaS — AI 판독과 규정 매핑 원스톱 솔루션",
        tags: ["Spring Boot", "Python AI", "AWS", "OCR", "PDF", "전자서명"],
        bullets: [
            "한국 중고차 수출 협동조합 해커톤 대상 수상",
            "딥테크 분야 예비창업패키지 선정",
            "AI OCR 차량 정보 자동 판독 및 정합성 검사 시스템 구축",
            "수입국별 규정 매핑 및 디지털 인증서 자동 발급",
        ],
    },
    {
        name: "MediVu",
        href: "/portfolio/medivu",
        date: "2025.03 ~ 2025.10",
        desc: "PACS 연동 문제를 해결하는 AI 기반 의료영상 판독문 자동 생성 솔루션",
        tags: ["Next.js", "TypeScript", "MCP", "PDF De-identification"],
        bullets: [
            "실험실 특화 창업지원 사업계획서 단독 작성 및 예창 합격",
            "정부지원사업 선정으로 총 1억원 지원금 수령",
            "PDF 판독문 내 개인정보 가명화 프로토타입 기능 개발",
        ],
    },
    {
        name: "S-Skills",
        href: "/portfolio/s-skills",
        date: "2025.12 ~ 현재",
        desc: "혼자 일하는 개발자의 팀 — Claude Code 역할 기반 AI 개발 오케스트레이터 오픈소스",
        tags: ["Claude Code", "TypeScript", "Multi-Agent", "Open Source"],
        bullets: [
            "PM, Design, Tech Lead, Frontend, Backend, Security, QA 7개 전문가 에이전트 설계",
            "claude plugin install 한 줄 설치, /sj-company로 자동 라우팅",
            "v1.0 → v3.1.0 지속적 업그레이드, MIT 오픈소스 공개",
        ],
    },
    {
        name: "Totaro Web",
        href: "/portfolio/totaroweb",
        date: "2025.10 ~ 진행중",
        desc: "AI 기반 K-Food 글로벌 B2B 소싱 플랫폼 — 바이어와 공급업체를 연결하는 마켓플레이스",
        tags: ["Next.js 16", "TypeScript", "Supabase", "Google Gemini", "next-intl", "Playwright"],
        bullets: [
            "Gemini AI 자연어 상품 검색·자동 견적 채팅 파이프라인 구현",
            "TanStack Query + Supabase RLS 기반 서버 상태 관리",
            "next-intl 한국어·영어·일본어 다국어 지원",
        ],
    },
    {
        name: "Totaro Cos",
        href: "/portfolio/totarocos",
        date: "2025.11 ~ 진행중",
        desc: "해외 바이어와 한국 화장품 공급사를 연결하는 K-Beauty B2B 소싱 플랫폼",
        tags: ["Next.js 16", "Supabase", "Google Gemini", "MFDS 데이터", "Playwright"],
        bullets: [
            "MFDS→Naver 화장품 데이터 파이프라인 설계 및 상품 DB 자동 구축",
            "Gemini AI 기반 성분 설명·OEM/ODM 견적 채팅 구현",
            "Supabase RLS 기반 역할별 데이터 접근 제어",
        ],
    },
    {
        name: "Upflow AX",
        href: "/portfolio/upflowax",
        date: "2025.12 ~ 진행중",
        desc: "SI 사업 전 주기 관리 플랫폼 — 제안부터 정산까지, DDD 도메인 캔버스·RTM·손익 통합",
        tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "TanStack Query", "Tiptap"],
        bullets: [
            "SI 산출 문서 6종 AI 보조 편집기 구현 (Tiptap)",
            "DDD 도메인 캔버스 — 바운디드 컨텍스트·애그리게이트 시각화",
            "RTM(요구사항 추적 매트릭스) 자동 생성·관리 모듈",
        ],
    },
    {
        name: "Curl CODE",
        href: "/portfolio/curlcode",
        date: "2025.10 ~ 2026.02",
        desc: "곱슬머리 유형 진단부터 맞춤 관리 루틴까지 제공하는 AI 헤어케어 컨설팅 웹앱",
        tags: ["Next.js", "TypeScript", "Supabase", "Recharts", "Playwright"],
        bullets: [
            "곱슬 유형 단계별 설문 → AI 분석 → 맞춤 관리 루틴 추천 플로우",
            "Recharts 기반 모발 상태 트래킹 대시보드",
            "Playwright E2E 테스트로 핵심 온보딩 플로우 검증",
        ],
    },
    {
        name: "RunningToYou",
        href: "/portfolio/runningtoyou",
        date: "2024.04 ~ 2024.11",
        desc: "러닝을 기반으로 한 자연스러운 만남을 연결하는 데이팅 MVP 서비스",
        tags: ["Next.js", "TypeScript", "Spring Boot", "MariaDB"],
        bullets: [
            "4인 팀 프로젝트로 기획·백엔드·배포·마케팅 담당",
            "Everytime 등 커뮤니티 활용 타겟 마케팅 실험",
        ],
    },
]

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
            <nav className={s.nav}>
                <div className={s.navInner}>
                    <div className={s.navBrand}>
                        <a href="/" className={s.navLogo}>SONG SEUNGJU</a>
                        <span className={s.navSub}>Fullstack Developer · 2026</span>
                    </div>
                    <ul className={s.navLinks}>
                        <li><a href="#introduce">About</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#education">Education</a></li>
                    </ul>
                    <div className={s.navRight}>
                        <a href="https://github.com/s0613" className={s.navGh} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                        <a href="/s-skills" className={s.navSSkills}>S-Skills</a>
                    </div>
                </div>
            </nav>

            <main className={s.main}>
                {/* Hero */}
                <section className={s.hero}>
                    <div className={s.heroMeta}>Fullstack Developer · Seoul, Korea · 2026</div>
                    <h1 className={s.heroName}>SONG<br />SEUNGJU</h1>
                    <p className={s.heroTitle}>1인 풀스택 개발자 · 스타트업 메이커 · AI 오케스트레이터</p>
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
                    <div className={s.heroScroll}>↓ scroll</div>
                </section>

                {/* Introduce */}
                <section id="introduce" className={s.section}>
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>01</div>
                            <div className={s.sectionTitle}>INTRODUCE</div>
                            <div className={s.sectionLine} />
                        </div>
                        <div>
                            <div className={s.introProfile}>
                                <div className={s.introPhoto}>
                                    <Image src="/IM.webp" alt="Profile" width={100} height={100} />
                                </div>
                                <div>
                                    <div className={s.introHeadline}>
                                        아이디어를 바로 제품으로 만드는<br />1인 풀스택 개발자
                                    </div>
                                    <div className={s.introSubline}>인하대학교 컴퓨터공학과 · 졸업</div>
                                </div>
                            </div>
                            <div className={s.introDivider} />
                            <p className={s.introPara}>
                                아이디어가 생기면 직접 만들어 검증합니다.
                                <span className={s.introStrong}> Next.js · Spring Boot · AWS</span> 스택으로
                                기획부터 배포까지 혼자 수행하고, 실제 사용자에게 닿는 수준까지
                                끌고 가는 것에 익숙합니다. 의료·물류·뷰티·AI 등 도메인을 가리지 않고
                                빠르게 컨텍스트를 익혀 제품을 만들어왔습니다.
                            </p>
                            <p className={s.introPara}>
                                기획·문서·마케팅도 필요하면 직접 합니다. 개발뿐 아니라
                                정부 지원사업 선정, 해커톤 수상, 제품 론칭까지 전 과정을 수행했습니다.
                                Claude Code 기반 AI 오케스트레이터 <span className={s.introStrong}>S-Skills</span>를 직접 만들어
                                1인 개발 생산성을 팀 수준으로 끌어올렸고, 현재도 오픈소스로 운영 중입니다.
                            </p>
                            <div className={s.introDivider} />
                            <div className={s.introBullets}>
                                <div className={s.introBullet}>
                                    <span className={s.introBulletDot} />
                                    <span>팀 없이도 제품을 출시한 경험이 여러 번. 기획·개발·배포·마케팅을 혼자 끝냅니다.</span>
                                </div>
                                <div className={s.introBullet}>
                                    <span className={s.introBulletDot} />
                                    <span>예비창업패키지 3회 선정, 해커톤 대상 등 아이디어를 사업화하는 실전 감각이 있습니다.</span>
                                </div>
                                <div className={s.introBullet}>
                                    <span className={s.introBulletDot} />
                                    <span>모르는 도메인도 빠르게 파고들어 작동하는 수준까지 만드는 것에 강점이 있습니다.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <section id="skills" className={s.section}>
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>02</div>
                            <div className={s.sectionTitle}>SKILLS</div>
                            <div className={s.sectionLine} />
                        </div>
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
                    </div>
                </section>

                {/* Experience */}
                <section id="experience" className={s.section}>
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>03</div>
                            <div className={s.sectionTitle}>EXPERIENCE</div>
                            <div className={s.sectionLine} />
                        </div>
                        <div className={s.expList}>
                            {EXPERIENCES.map((exp) => (
                                <Link key={exp.name} href={exp.href} className={s.expItem}>
                                    <div className={s.expHeader}>
                                        <span className={s.expName}>{exp.name}</span>
                                        <span className={s.expDate}>{exp.date}</span>
                                    </div>
                                    <div className={s.expDesc}>{exp.desc}</div>
                                    <div className={s.expTags}>
                                        {exp.tags.map((t) => <span key={t} className={s.expTag}>{t}</span>)}
                                    </div>
                                    <div className={s.expBullets}>
                                        {exp.bullets.map((b, i) => (
                                            <div key={i} className={s.expBullet}>
                                                <span className={s.expBulletArrow}>›</span>
                                                <span>{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={s.expMore}>상세히 보기 →</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section id="education" className={s.section}>
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>04</div>
                            <div className={s.sectionTitle}>EDUCATION</div>
                            <div className={s.sectionLine} />
                        </div>
                        <div className={s.eduList}>
                            <div className={s.eduItem}>
                                <div className={s.eduHeader}>
                                    <span className={s.eduName}>인하대학교</span>
                                    <span className={s.eduDate}>2020.03 ~ 2026.02</span>
                                </div>
                                <div className={s.eduDegree}>컴퓨터공학과 졸업</div>
                                <div className={s.eduBullets}>
                                    <div className={s.eduBullet}><span className={s.introBulletDot} /><span>재학 중 스타트업 활동 병행 — 예비창업패키지 선정, 해커톤 수상, 제품 론칭까지</span></div>
                                    <div className={s.eduBullet}><span className={s.introBulletDot} /><span>졸업 시점 10개 이상 프로젝트 경험, AI·클라우드·풀스택 독학으로 스택 확장</span></div>
                                    <div className={s.eduBullet}><span className={s.introBulletDot} /><span>해병대 복무(2020~2022) 후 복학, 이후 개발에 집중</span></div>
                                </div>
                                <div className={s.eduTags}>
                                    <span className={s.eduTag}>C++</span>
                                    <span className={s.eduTag}>Java</span>
                                    <span className={s.eduTag}>Web</span>
                                    <span className={s.eduTag}>클라우드</span>
                                </div>
                            </div>
                            <div className={s.eduItem}>
                                <div className={s.eduHeader}>
                                    <span className={s.eduName}>온양고등학교</span>
                                    <span className={s.eduDate}>2017.03 ~ 2020.02</span>
                                </div>
                                <div className={s.eduDegree}>일반고 / 이과</div>
                                <div className={s.eduTags}>
                                    <span className={s.eduTag}>이과</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ETC */}
                <section id="etc" className={s.section}>
                    <div className={s.sectionGrid}>
                        <div className={s.sectionLabel}>
                            <div className={s.sectionNum}>05</div>
                            <div className={s.sectionTitle}>ETC</div>
                            <div className={s.sectionLine} />
                        </div>
                        <div>
                            <div className={s.etcBlocks}>
                                <div className={s.etcBlock}>
                                    <div className={s.etcHeader}>
                                        <span className={s.etcTitle}>해병대 복무</span>
                                        <span className={s.etcMeta}>2020.11 ~ 2022.05 · 통신병 · 병장 전역</span>
                                    </div>
                                    <div className={s.etcBullets}>
                                        <div className={s.etcBullet}><span className={s.etcBulletDot}>›</span><span>통신병 — 군 무선통신 장비 운용 실무</span></div>
                                        <div className={s.etcBullet}><span className={s.etcBulletDot}>›</span><span>극한 환경에서의 팀 운용·의사결정 경험</span></div>
                                    </div>
                                </div>
                                <div className={s.etcBlock}>
                                    <div className={s.etcHeader}>
                                        <span className={s.etcTitle}>창업 동아리 — 인하벤처클럽</span>
                                    </div>
                                    <div className={s.etcBullets}>
                                        <div className={s.etcBullet}><span className={s.etcBulletDot}>›</span><span>선배 창업자·투자자 네트워크 연결 및 초기 창업 방법론 습득</span></div>
                                        <div className={s.etcBullet}><span className={s.etcBulletDot}>›</span><span>Trynic 창업 기반 마련 — 팀 빌딩, 사업계획서 최초 작성</span></div>
                                        <div className={s.etcBullet}><span className={s.etcBulletDot}>›</span><span>사용자 인터뷰 기반 피벗 경험</span></div>
                                    </div>
                                </div>
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
                    <span>인하대 컴퓨터공학과 · 2026</span>
                </div>
                <a href="/s-skills" className={s.footerSSkills}>S-SKILLS →</a>
            </footer>
        </div>
    )
}
