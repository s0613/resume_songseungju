// 블로그 목록 전체가 공유하는 1회성 조회수 배치 요청.
// 카드·정렬 어디서 호출해도 fetch는 한 번만 나간다. API 미설정·오류 시 null.
let countsPromise: Promise<Record<string, number> | null> | null = null

export function getViewCounts(): Promise<Record<string, number> | null> {
    if (!countsPromise) {
        countsPromise = fetch("/api/blog/views")
            .then(async (res) => {
                if (!res.ok) return null
                const data: unknown = await res.json()
                if (
                    typeof data === "object" &&
                    data !== null &&
                    typeof (data as { counts?: unknown }).counts === "object"
                ) {
                    return (data as { counts: Record<string, number> }).counts
                }
                return null
            })
            .catch(() => null)
    }
    return countsPromise
}
