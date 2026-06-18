// 송승주의 AI 블로그 — 전용 콘텐츠 데이터
// 이력서의 S-Skills 인사이트와는 분리된, 친근한 톤의 개인 블로그 글 모음입니다.

export type BlogBlock =
    | { type: "paragraph"; content: string }
    | { type: "heading"; content: string }
    | { type: "quote"; content: string; author?: string }
    | { type: "list"; items: string[] }
    | { type: "tip"; title: string; content: string }
    | { type: "figure"; emoji: string; caption?: string }
    | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string }
    | { type: "code"; lang?: string; code: string; caption?: string }

export interface BlogPost {
    slug: string
    category: string
    title: string
    date: string // "2026. 6. 17."
    readTime: string // "5분"
    excerpt: string
    tags: string[]
    blocks: BlogBlock[]
}

export interface BlogProfile {
    nickname: string
    handle: string
    intro: string
    links: { label: string; href: string }[]
}

export const blogProfile: BlogProfile = {
    nickname: "승주",
    handle: "songseungju",
    intro: "AI 에이전트 개발 일기",
    links: [
        { label: "이력서", href: "/" },
        { label: "GitHub", href: "https://github.com/s0613" },
        { label: "S-Skills", href: "/s-skills" },
    ],
}

export interface Category {
    name: string
    slug: string
    count: number
}

// 글의 category 값과 매칭됩니다.
export const categories: Category[] = [
    { name: "전체보기", slug: "all", count: 3 },
    { name: "소개", slug: "intro", count: 1 },
    { name: "에이전트 경험", slug: "experience", count: 1 },
    { name: "AI 학습노트", slug: "learning", count: 1 },
    { name: "인사이트", slug: "insight", count: 0 },
]

export const posts: BlogPost[] = [
    {
        slug: "reference-data-mapping-state-of-the-art",
        category: "AI 학습노트",
        title: "기준용어 매핑 최신 근황",
        date: "2026. 6. 18.",
        readTime: "13분",
        excerpt:
            "기준용어(reference data)는 회사마다 방대하고 나라별 수기 입력이 제각각이라 자동 매핑이 쉽지 않습니다. 정답이 하나는 아니지만, 요즘 '이렇게들 한다'에 가까운 파이프라인·검색 알고리즘·대표 논문을 출처와 함께 정리했습니다.",
        tags: ["엔티티매칭", "기준데이터", "MDM", "RAG", "정리노트"],
        blocks: [
            {
                type: "paragraph",
                content:
                    "현장에서 자주 듣는 이야기가 있습니다. 기준용어(reference data)는 회사마다 방대하고, 실제로는 수기 입력이 많고, 나라마다 표기와 입력 방식이 달라서, 로컬·수기 표현을 표준 용어에 맞추는 자동 매핑이 쉽지 않다는 것입니다. 이 문제는 학술적으로 __entity matching(엔티티 매칭) / record linkage / entity resolution__ 라고 불립니다. __정답이 하나로 정해진 분야는 아니고__, 아래는 '요즘 이렇게도 한다'에 가까운 정리입니다. 데이터 규모·언어·정합성 요구에 따라 골라 쓰는 편이 맞습니다.",
            },
            {
                type: "paragraph",
                content:
                    "(아래 내용은 1차 출처를 직접 확인해 정리했지만, 수치·세부는 데이터와 환경에 따라 달라질 수 있으니 참고 수준으로 봐 주세요.)",
            },
            { type: "heading", content: "요즘 쓰는 파이프라인" },
            {
                type: "paragraph",
                content:
                    "용어 정규화·매핑은 대체로 아래 단계를 따르는 경우가 많습니다. 절대적인 정석은 아니지만, 방대한 표준 카탈로그를 한 번에 비교하지 않고 __먼저 후보를 좁힌 뒤 정밀 판정__하는 2단계 구조가 흔합니다.",
            },
            {
                type: "list",
                items: [
                    "__전처리·정규화__ — 유니코드/음역 통일, 대소문자·단위·약어 정리",
                    "__블로킹(후보 생성)__ — N×M 비교를 줄임. 요즘은 고전적 blocking key 대신 임베딩 ANN 검색으로 top-k 후보를 뽑음",
                    "__매칭·재랭킹__ — retrieve-then-rerank: bi-encoder로 검색 → cross-encoder 또는 LLM으로 정밀 판정",
                    "__결정·골든레코드__ — 임계값 + survivorship(생존 규칙)으로 표준값 확정",
                    "__휴먼 검증__ — data steward 검토, 신뢰도가 높으면 자동 확정·낮으면 검토 큐로 분기",
                    "__피드백 루프__ — steward 결정을 학습 예시로 재활용(active learning)",
                ],
            },
            {
                type: "image",
                src: "/mapping-pipeline.webp",
                alt: "기준용어 매핑 파이프라인 다이어그램 — 입력·전처리 → 검색(BM25+벡터→RRF→top-k) → 재랭킹(cross-encoder/LLM) → 신뢰도 임계값 → 자동 확정 또는 steward 검토, 그리고 피드백 루프",
                width: 2240,
                height: 1520,
                caption:
                    "전체 흐름을 그림으로: 후보를 넓게 검색해 좁히고(retrieve), 정밀하게 재정렬한 뒤(rerank), 신뢰도로 자동 확정과 사람 검토를 나눕니다. 검토 결과는 다시 학습에 환류됩니다.",
            },
            {
                type: "paragraph",
                content:
                    "상용 MDM(master data management) 제품도 이런 구조를 따르는 경우가 많습니다. 예로 Semarchy xDM은 match group 생성 → 골든레코드 병합 → 확정 → survivorship 통합으로 흐르고, 퍼지 매칭과 ID(정확) 매칭을 구분하며, 신뢰도 점수에 따라 자동 병합과 steward 검토로 분기합니다. 출처: [Semarchy xDM matching 문서](https://www.semarchy.com/doc/semarchy-xdm/xdm/5.3/Design/matching/matching.html). 비슷한 상용으로 Informatica·Reltio·SAP MDG·Tamr, 오픈소스로 Magellan(py_entitymatching)·Zingg·dedupe·RecordLinkage 등이 있습니다.",
            },
            { type: "heading", content: "검색(retrieval) 알고리즘 — 후보를 좁히는 방법" },
            {
                type: "paragraph",
                content:
                    "후보를 좁히는 '검색' 단계에서 쓰는 방법도 한 가지가 아닙니다. 하나만 쓰기보다 __섞어 쓰는__ 경우가 늘었고, 어느 게 정답이라기보다 데이터 성격에 따라 고르는 편입니다.",
            },
            {
                type: "list",
                items: [
                    "__BM25(어휘 검색)__ — 역색인 기반 고전 키워드 매칭. 빠르고 설명 가능하지만 오타·약어·다국어 표현엔 약한 편",
                    "__밀집 벡터 + ANN__ — 임베딩을 HNSW·IVF 같은 근사 최근접 탐색으로 검색(FAISS, pgvector 등). 표기가 달라도 의미가 가까우면 잡아냄",
                    "__하이브리드(BM25 + 벡터)__ — 둘을 함께 돌려 __RRF(Reciprocal Rank Fusion)__ 로 융합. 가중치 튜닝 없이 1/(k+순위) 합으로 합치며, 단독보다 나은 경우가 많아 검색엔진들이 기본 옵션으로 제공하는 추세. 출처: [Elasticsearch RRF 문서](https://www.elastic.co/guide/en/elasticsearch/reference/current/rrf.html)",
                    "__학습형 희소 검색(SPLADE)__ — 역색인을 그대로 쓰면서 용어 확장을 학습. BM25의 운영 이점과 신경망 성능을 절충하려는 접근. [arXiv 2107.05720](https://arxiv.org/abs/2107.05720)",
                    "__late interaction(ColBERT)__ — 토큰 단위로 비교(MaxSim)해 정밀도를 높임. 문서 표현을 미리 계산해 둬 비교적 효율적. [arXiv 2004.12832](https://arxiv.org/abs/2004.12832)",
                    "__cross-encoder 리랭커__ — 검색으로 좁힌 top-k를 최종 재정렬하는 별도 모델(Cohere Rerank, bge-reranker 류). 정확도는 올라가지만 비용·지연이 늘어 보통 소수 후보에만 적용",
                ],
            },
            {
                type: "paragraph",
                content:
                    "실무에서는 __BM25 + 벡터 하이브리드로 후보를 뽑고, cross-encoder/LLM으로 재랭킹__하는 조합을 흔히 봅니다. 다만 하이브리드가 항상 이기는 건 아니어서, 자체 데이터로 BM25 단독·벡터 단독·하이브리드를 비교해 보는 걸 권합니다.",
            },
            { type: "heading", content: "코드로 보는 한 번의 매핑" },
            {
                type: "paragraph",
                content:
                    "말로만 보면 추상적이라, 가짜 예시로 한 사이클을 코드로 따라가 봅니다. 아래 네 토막은 위 다이어그램의 __① 전처리 → ② 검색 → ③ 재랭킹 → ④ 결정__ 에 그대로 대응합니다. (라이브러리·모델명은 예시이니 환경에 맞게 바꾸면 됩니다.)",
            },
            {
                type: "code",
                lang: "① 전처리·정규화 (Python)",
                code: `import re

def normalize(s: str) -> str:
    s = s.lower().strip()
    s = s.replace("(주)", "").replace("주식회사", "")
    return re.sub(r"\\s+", " ", s)

normalize("마이크로소프트(주)")   # -> "마이크로소프트"`,
            },
            {
                type: "code",
                lang: "② 검색: 하이브리드 + RRF (Python)",
                code: `# 1) 두 검색기로 각각 top-k 후보를 뽑는다
bm25_ids   = bm25_search(query, k=50)     # 어휘(BM25)
vector_ids = vector_search(query, k=50)   # 의미(임베딩 ANN)

# 2) RRF로 두 순위를 합친다 (가중치 튜닝 불필요)
def rrf(rankings, k=60):
    scores = {}
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    return sorted(scores, key=scores.get, reverse=True)

candidates = rrf([bm25_ids, vector_ids])[:20]`,
            },
            {
                type: "code",
                lang: "③·④ 재랭킹 + 임계값 분기 (Python)",
                code: `from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")   # 예시 모델
pairs  = [(query, standard_terms[c]) for c in candidates]
scores = reranker.predict(pairs)                     # 후보별 신뢰도

best, conf = candidates[scores.argmax()], float(scores.max())
if conf >= 0.90:
    confirm(best)                          # 자동 확정 → 골든레코드
else:
    send_to_steward(query, candidates[:5]) # 애매하면 사람 검토 큐`,
            },
            {
                type: "paragraph",
                content:
                    "임계값으로 거르고도 애매한 후보는, 마지막에 LLM에게 판정을 맡기기도 합니다. 자유 생성 대신 __후보를 제시하고 그 안에서 고르게__ 제약하는 게 안전합니다.",
            },
            {
                type: "code",
                lang: "애매할 때 LLM 판정 (프롬프트 예시)",
                code: `[질의] "MSFT"
[후보]
  1. Microsoft Corporation
  2. MicroStrategy Inc.
  3. Microchip Technology
[지시] 질의와 같은 회사인 후보 번호와 신뢰도(0~1)를 JSON으로만 답하라.
[출력] {"match": 1, "confidence": 0.97}`,
            },
            { type: "heading", content: "LLM·RAG가 바꾼 것" },
            {
                type: "list",
                items: [
                    "__retrieve-then-rerank__ — 빠른 임베딩 검색으로 1차 후보, LLM/cross-encoder로 2차 재랭킹. 품질과 비용·지연의 균형점. 출처: [LlamaIndex](https://www.llamaindex.ai/blog/using-llms-for-retrieval-and-reranking-23cf2d3a14b6)",
                    "__LLM few-shot 매칭__ — 'Microsoft Corporation'과 'MSFT'처럼 표기가 달라도 동일 엔티티임을 의미적으로 인식. 수작업 피처 엔지니어링 의존을 줄임",
                    "__cross-lingual__ — 다국어 임베딩으로 나라별 언어 차이를 흡수, 글로벌 데이터 통합에 유리",
                ],
            },
            {
                type: "paragraph",
                content:
                    "특히 [Peeters·Steiner·Bizer, \"Entity Matching using LLMs\" (arXiv 2310.11244)](https://arxiv.org/abs/2310.11244)는 __최고 성능 LLM이 학습 예시 없이(또는 소수만으로) 수천 건으로 파인튜닝한 BERT/RoBERTa급 성능__을 내고, 미관측 엔티티에 더 강건하다고 보고합니다. 라벨링 비용이 큰 현장에서 의미 있는 결과입니다.",
            },
            { type: "heading", content: "대표 논문·벤치마크" },
            {
                type: "list",
                items: [
                    "__Ditto__ — 엔티티 매칭을 시퀀스쌍 분류로 보고 PLM을 파인튜닝. 기존 SOTA 대비 최대 +29% F1, 라벨 절반으로 SOTA 도달(도메인 지식 주입·데이터 증강 포함). [arXiv 2004.00584](https://arxiv.org/abs/2004.00584)",
                    "__Deepmatcher / Magellan__ — clean 구조화 데이터엔 딥러닝이 전통 기법과 동급이지만 훨씬 느리고, __텍스트·dirty 데이터엔 딥러닝이 우위__. 데이터 성격에 따라 선택하라는 교훈. [SIGMOD'18](https://pages.cs.wisc.edu/~anhai/papers1/deepmatcher-sigmod18.pdf)",
                    "__WDC Products__ — 코너케이스 난이도·미관측 엔티티 비율·학습량을 조절하는 다차원 벤치마크. 모든 기법이 미관측 엔티티에서 성능이 떨어진다는 점을 정량화. [arXiv 2301.09521](https://arxiv.org/abs/2301.09521)",
                    "__OpenSanctions Pairs__ — 755,540 라벨 쌍·293 소스·31개국의 대규모 다국어/교차문자 벤치마크. 논문이 평가한 모델 기준 GPT-4o 98.95% F1, 로컬 배포형 오픈모델(DeepSeek-R1-Distill-Qwen-14B) 98.23%가 룰기반 91.33%를 상회. [arXiv 2603.11051](https://arxiv.org/abs/2603.11051)",
                    "__STEPMatch__ — 짧은 다국어 전자세금계산서 품목명을 blocking + 하이브리드(BM25+SBERT, RRF) 검색 + 다국어 cross-encoder 재랭킹으로 매칭. 영어→포르투갈어 cross-lingual 전이가 타깃 단독 학습을 능가(약 98.6 vs 94.3). [SciTePress 2025](https://www.scitepress.org/Papers/2025/132850/132850.pdf)",
                    "__BERTMap__ — 온톨로지/용어 정렬을 코퍼스 구성 → BERT 파인튜닝 → 매핑 예측 → 정제의 4단계로. 'after-candidate-classify-then-refine' 구조가 용어 정규화와 비슷함. [AAAI 2022](https://ojs.aaai.org/index.php/AAAI/article/view/20510)",
                ],
            },
            {
                type: "paragraph",
                content:
                    "수치는 모두 __논문이 평가한 시점의 모델 기준__입니다. GPT-4o처럼 지금 보면 구형인 모델도 있으니, 실제 도입 시에는 최신 모델(예: Claude Opus 4 계열, GPT-5 계열, Gemini, 최신 오픈 LLM)로 다시 재보는 게 맞습니다 — 성능 여지는 더 있다고 보는 편이 안전합니다.",
            },
            { type: "heading", content: "\"방대함 + 다국어 수기입력\"에 특히 효과적인 것" },
            {
                type: "list",
                items: [
                    "__retrieve-then-rerank__ — 방대한 카탈로그를 임베딩 검색으로 좁히고 정밀 판정. 규모 확장의 핵심",
                    "__다국어 임베딩__(LaBSE, multilingual-e5, BGE-M3 등) — 나라별 언어·표기 차이 흡수",
                    "__dirty·free-text 수기입력엔 LLM/딥러닝__ — Deepmatcher가 보여준 '텍스트·dirty 우위'와 일치",
                    "__cross-lingual 전이__ — 타깃 언어 라벨이 적을 때 고자원 언어에서 전이(STEPMatch)",
                    "__휴먼 검증 + active learning__ — 롱테일은 steward가 잡고, 그 결정을 예시로 축적",
                ],
            },
            { type: "heading", content: "한계" },
            {
                type: "list",
                items: [
                    "__코너케이스__(닮은 비매치 / 안 닮은 매치)에서 모든 기법의 성능이 급락",
                    "__미관측 엔티티__ 일반화가 약함 — 학습에 없던 새 엔티티에서 정확도 하락",
                    "__교차문자 음역·식별자 off-by-one__ 은 LLM의 대표적 실패 모드(아랍/키릴/라틴)",
                    "__LLM 비용·지연·환각__ — 자유 생성 대신 RAG로 후보를 제약해야 안전",
                    "__clean·ID 보유 데이터__ 엔 LLM/딥러닝이 비용 대비 비효율(전통 매처로 충분)",
                ],
            },
            { type: "heading", content: "실무에서 자주 보이는 선택" },
            {
                type: "paragraph",
                content:
                    "정해진 정석이라기보다, 비슷한 문제에서 자주 선택되는 형태입니다. 환경에 따라 일부만 취해도 됩니다.",
            },
            {
                type: "list",
                items: [
                    "표준 기준용어를 __다국어 임베딩 벡터 인덱스__로 구축",
                    "__BM25+벡터 하이브리드(RRF) 검색 → LLM/cross-encoder 재랭킹 + 신뢰도 점수__",
                    "__2단계 임계값__: 고신뢰는 자동 확정, 애매한 건 steward 큐",
                    "__데이터 분기__: dirty·다국어 free-text→최신 LLM(Claude Opus 4 계열·GPT-5 계열 등), clean·ID 보유→exact/rule (비용 절감)",
                    "steward 결정으로 __few-shot 예시·active learning__ 축적",
                    "평가셋에 __코너케이스·미관측 엔티티__ 를 포함해 현실 난이도 반영",
                ],
            },
            {
                type: "tip",
                title: "한 줄 요약",
                content:
                    "한 가지 정답은 아니지만 자주 보이는 형태는 'BM25+벡터 하이브리드로 좁히고(retrieve) → LLM/cross-encoder로 정밀 판정(rerank) → 애매하면 사람'입니다. 다국어·수기입력은 다국어 임베딩과 cross-lingual 전이로, 비용은 데이터 성격별 분기로 잡는 편입니다.",
            },
            {
                type: "paragraph",
                content:
                    "정리하면, 기준용어 매핑은 룰·사전 매칭만의 문제라기보다 검색(retrieval)과 LLM 판정을 결합한 파이프라인 설계 문제에 가까워지는 흐름입니다. 다만 환경마다 답이 다르니, 위 논문·문서를 출발점 삼아 __자체 데이터로 직접 비교해 보시길__ 권합니다.",
            },
        ],
    },
    {
        slug: "making-my-own-harness",
        category: "에이전트 경험",
        title: "요즘 하네스 만드는 게 재밌더라고요",
        date: "2026. 6. 17.",
        readTime: "6분",
        excerpt:
            "유명한 하네스들과 좋은 로직을 짬뽕해서, 제 개발 환경과 작업에 맞춘 하네스를 만들고 있습니다. 나만의 자산이 쌓인다는 생각에 요즘 이 작업이 꽤 즐겁습니다.",
        tags: ["하네스", "AI에이전트", "오케스트레이션", "개발환경"],
        blocks: [
            {
                type: "paragraph",
                content:
                    "요즘 하네스 만드는 게 재밌더라고요. 거창한 프레임워크를 새로 짜는 건 아니고, __여러 유명한 하네스와 좋은 로직들을 짬뽕해서__ 제 개발 환경과 작업 방식에 맞게 다듬는 일이에요.",
            },
            {
                type: "paragraph",
                content:
                    "남이 만든 걸 그대로 쓰는 게 아니라, 제 손에 맞는 도구를 조금씩 쌓아 올리는 거라 __나만의 자산을 만든다__는 느낌이 듭니다. 그 감각이 좋아서 자꾸 만지게 돼요.",
            },
            { type: "heading", content: "그대로 안 쓰고 직접 만드는 이유" },
            {
                type: "paragraph",
                content:
                    "기성 하네스를 그대로 가져오면, 꼭 제 작업 흐름과 어긋나는 지점이 생기더라고요. 1인 개발이라 역할을 자주 바꿔야 하고, 외주와 자체 프로젝트가 섞여 있고, 쓰는 스택도 정해져 있으니까요. 그래서 좋은 아이디어만 골라 와서 __제 환경에 맞게 조립__합니다. 그러면 확실히 손에 붙습니다.",
            },
            {
                type: "image",
                src: "/harness-demo.webp",
                alt: "sj-company 하네스가 PM, Tech Lead, 병렬 에이전트, QA를 거쳐 작업을 수행하는 터미널 화면",
                width: 2000,
                height: 1080,
                caption:
                    "명령 한 줄이면 PM이 복잡도를 판단하고, Tech Lead가 전문 에이전트를 병렬로 디스패치한 뒤, 독립 QA까지 돌아갑니다.",
            },
            {
                type: "paragraph",
                content:
                    '위 화면처럼 "/sj-company 로그인 기능 만들어줘" 한 줄이면, 기획부터 검증까지 한 흐름으로 굴러갑니다. 이 흐름을 처음부터 제가 발명한 건 아니고, 여러 하네스에서 좋은 부분을 가져와 엮은 거예요.',
            },
            { type: "heading", content: "무엇을 참고했나" },
            {
                type: "list",
                items: [
                    "__Karpathy 하네스__ — 컨텍스트를 최소화하고 태스크를 작게 쪼개는 방식. 실력보다 루프 속도가 이긴다는 관점이 좋아서, 짧은 루프와 명확한 목표 설정을 가져왔습니다.",
                    "__gstack__ — 멀티에이전트 오케스트레이션의 실전 구현. 에이전트들이 채널로 소통하고 Tech Lead가 병렬 디스패치·수렴을 조율하는 구조를, 혼자서도 팀처럼 일하려고 채택했습니다.",
                    "__Hermes (Nous Research)__ — 컨텍스트를 지우지 않고 archive만 하는 불변식. 세션이 끊겨도 과거 결정과 학습을 잃지 않으려고 메모리/컨텍스트 누적 방식을 빌려왔습니다.",
                    "__Claude Code의 서브에이전트·스킬 구조__ — 역할별 서브에이전트와 슬래시 스킬로 의도를 라우팅하는 방식. 매번 직접 지시하는 대신 적절한 전문가를 부르려고 참고했습니다.",
                ],
            },
            { type: "heading", content: "지금 갖춰진 스킬들" },
            {
                type: "paragraph",
                content:
                    "이렇게 모은 아이디어를 제 작업에 맞는 스킬들로 정리해 두었습니다. 의도를 입력하면 그에 맞는 역할이 움직이는 식이에요.",
            },
            {
                type: "list",
                items: [
                    "__/sj-company__ — 태스크 크기를 판단해 적절한 흐름으로 오케스트레이션",
                    "__/sj-pm__ — 요구사항·리스크·우선순위 정리",
                    "__/sj-tech-lead__ — 전문 개발 서브에이전트를 병렬로 디스패치하고 리뷰까지 집계",
                    "__전문 서브에이전트__ — frontend · backend · database · devops · security · data · SI 문서",
                    "__/sj-qa__ — 구현자 산출물을 보지 않고 독립적으로 검증",
                    "__/sj-design__ — 시안 여러 개를 먼저 보여주고 방향을 고른 뒤 구현",
                    "__/sj-loop__ — 반복 작업을 정지 조건이 있는 루프로 설계",
                    "__/pw-loop__ — Playwright로 기능 단위 테스트를 반복",
                ],
            },
            {
                type: "paragraph",
                content:
                    "아직 완성이라고 할 단계는 아니고, 작업하다 불편한 게 보이면 그때그때 고치고 더합니다. 그렇게 쌓인 게 결국 제 작업 방식 그 자체가 되는 것 같아서, 당분간은 계속 만지게 될 것 같아요.",
            },
        ],
    },
    {
        slug: "hello-im-songseungju",
        category: "소개",
        title: "블로그를 시작하며",
        date: "2026. 6. 17.",
        readTime: "3분",
        excerpt:
            "AI와 AI 에이전트를 만들며 배운 것들을 정리하려고 블로그를 시작합니다. 첫 글에서는 그동안 해온 일과 앞으로 쓸 글에 대해 적어 둡니다.",
        tags: ["소개", "AI에이전트", "개발", "기록"],
        blocks: [
            {
                type: "paragraph",
                content:
                    "송승주입니다. AI와 AI 에이전트를 만들고, 그 과정에서 알게 된 것들을 정리하려고 이 블로그를 시작합니다. 첫 글에서는 그동안 어떤 일을 해왔는지, 그리고 앞으로 어떤 글을 쓸지 적어 둡니다.",
            },
            { type: "heading", content: "걸어온 길" },
            {
                type: "paragraph",
                content:
                    "개발은 외주 프로젝트로 시작했습니다. 여러 도메인의 클라이언트와 일하며 요구사항을 코드로 옮기고, 기획부터 배포까지 혼자 책임지는 과정을 익혔습니다.",
            },
            {
                type: "paragraph",
                content:
                    "이후 자체 프로젝트도 여럿 진행했습니다. 직접 정한 문제를 제품으로 만들면서, 주어진 일을 처리하는 것과 끝까지 끌고 가는 것의 차이를 배웠습니다.",
            },
            {
                type: "paragraph",
                content:
                    "지금은 대기업에서 AI 에이전트를 개발하고 있습니다. 실제 업무에 에이전트를 적용하는 과정에서 데모와 현장의 거리를 자주 확인합니다. 잘 만든 데모와 실제로 동작하는 시스템은 다른 문제입니다.",
            },
            { type: "heading", content: "앞으로 다룰 것" },
            {
                type: "paragraph",
                content:
                    "이 블로그에는 AI 에이전트와 AI를 직접 다루며 경험하고 공부한 내용을 정리합니다. 잘된 부분뿐 아니라 막혔던 지점도 가능한 한 그대로 적으려 합니다.",
            },
            {
                type: "list",
                items: [
                    "에이전트를 실무에 적용하며 겪은 시행착오",
                    "AI 관련해 새로 공부하고 정리한 내용",
                    "외주·자체 프로젝트·1인 개발에서 얻은 경험",
                    "현장에서 통한 방법과 그렇지 않은 방법",
                ],
            },
            { type: "heading", content: "연락" },
            {
                type: "paragraph",
                content:
                    "글에 대해 궁금한 점이나 의견이 있으면 댓글이나 메일(farchicken00@naver.com)로 남겨 주세요. 꾸준히 기록하겠습니다.",
            },
        ],
    },
]

export function getPost(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug)
}
