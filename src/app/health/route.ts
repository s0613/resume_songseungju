export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** nginx/ALB가 Next.js 프로세스의 liveness를 확인하는 최소 응답. */
export function GET() {
    return Response.json(
        { status: "ok" },
        { headers: { "Cache-Control": "no-store" } }
    )
}
