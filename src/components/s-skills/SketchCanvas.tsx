"use client"
import { useEffect, useRef } from "react"

const G = {
    full:  "rgba(255,172,2,1)",
    hi:    "rgba(255,172,2,0.85)",
    mid:   "rgba(255,172,2,0.55)",
    lo:    "rgba(255,172,2,0.3)",
    faint: "rgba(255,172,2,0.09)",
}

function ease(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t }
function prg(t: number, a: number, b: number) {
    if (b <= a) return t >= a ? 1 : 0
    return ease(Math.max(0, Math.min(1, (t-a)/(b-a))))
}

function rectBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, p: number) {
    if (p <= 0) return
    const perim = 2*(w+h)
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.setLineDash([perim])
    ctx.lineDashOffset = perim*(1-p)
    ctx.stroke()
    ctx.restore()
}

function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, p: number) {
    if (p <= 0) return
    const len = Math.hypot(x2-x1, y2-y1)
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.setLineDash([len])
    ctx.lineDashOffset = len*(1-p)
    ctx.stroke()
    ctx.restore()
}

function typeText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, p: number) {
    if (p <= 0) return
    const str = text.slice(0, Math.ceil(text.length*p))
    ctx.fillText(str, x, y)
    if (p < 1) {
        const w = ctx.measureText(str).width
        ctx.fillRect(x+w+1, y-10, 1.5, 12)
    }
}

// ─── Scene 1: Webpage ──────────────────────────────────────────────────────
function drawWebpage(ctx: CanvasRenderingContext2D, t: number, W: number, H: number, alpha: number) {
    ctx.save()
    ctx.globalAlpha = alpha
    const pad = W*0.08
    const bx = pad, by = H*0.08, bw = W-pad*2, bh = H*0.82
    const urlH = bh*0.07, navH = bh*0.07

    ctx.strokeStyle = G.mid
    ctx.lineWidth = 1
    rectBorder(ctx, bx, by, bw, bh, prg(t, 0, 0.1))

    // browser tabs
    if (prg(t, 0.06, 0.13) > 0) {
        const p = prg(t, 0.06, 0.13)
        ctx.strokeStyle = G.lo
        ctx.lineWidth = 0.8
        rectBorder(ctx, bx+8, by-14, 70*p, 14, p)
    }

    // URL bar
    ctx.strokeStyle = G.lo
    ctx.lineWidth = 0.8
    drawLine(ctx, bx, by+urlH, bx+bw, by+urlH, prg(t, 0.1, 0.18))
    ctx.fillStyle = G.lo
    ctx.font = `${W*0.023}px monospace`
    typeText(ctx, "localhost:3000/s-skills", bx+10, by+urlH*0.72, prg(t, 0.14, 0.24))

    // Nav
    const navY = by+urlH
    ctx.strokeStyle = G.mid
    ctx.lineWidth = 0.8
    drawLine(ctx, bx, navY+navH, bx+bw, navY+navH, prg(t, 0.22, 0.28))
    ctx.fillStyle = G.full
    ctx.font = `bold ${W*0.03}px monospace`
    typeText(ctx, "S-SKILLS", bx+10, navY+navH*0.7, prg(t, 0.24, 0.32))
    ctx.fillStyle = G.lo
    ctx.font = `${W*0.019}px monospace`
    typeText(ctx, "Docs  외주  이력서 →", bx+bw*0.55, navY+navH*0.7, prg(t, 0.28, 0.36))

    // Hero text
    const heroY = navY+navH+H*0.03
    ctx.fillStyle = G.full
    ctx.font = `bold ${W*0.085}px sans-serif`
    typeText(ctx, "SJ COMPANY", bx+10, heroY+W*0.085, prg(t, 0.32, 0.48))
    ctx.fillStyle = G.lo
    ctx.font = `${W*0.022}px sans-serif`
    typeText(ctx, "Claude Code 안에서 팀처럼 협업합니다", bx+10, heroY+W*0.085+H*0.042, prg(t, 0.46, 0.56))

    // Install bar
    const instY = heroY+W*0.085+H*0.09
    ctx.strokeStyle = G.lo
    ctx.lineWidth = 0.8
    rectBorder(ctx, bx+10, instY, bw*0.72, H*0.045, prg(t, 0.54, 0.62))
    ctx.fillStyle = G.lo
    ctx.font = `${W*0.019}px monospace`
    typeText(ctx, "claude plugin install s0613/S-skills", bx+18, instY+H*0.03, prg(t, 0.6, 0.7))

    // Cards row
    const cardY = instY+H*0.08
    const cardW = (bw-30)/3
    ;[0,1,2].forEach(i => {
        const cx = bx+10+i*(cardW+6)
        ctx.strokeStyle = G.lo
        ctx.lineWidth = 0.8
        rectBorder(ctx, cx, cardY, cardW, H*0.18, prg(t, 0.66+i*0.04, 0.76+i*0.04))
        const lp = prg(t, 0.72+i*0.04, 0.8+i*0.04)
        if (lp > 0) {
            ctx.fillStyle = G.faint
            ;[10,18,26].forEach((dy, k) => {
                ctx.fillRect(cx+6, cardY+dy, cardW*(0.5+k*0.1)*lp, 2)
            })
        }
    })

    // Footer
    ctx.strokeStyle = G.lo
    ctx.lineWidth = 0.8
    drawLine(ctx, bx, by+bh-20, bx+bw, by+bh-20, prg(t, 0.82, 0.88))
    ctx.fillStyle = G.lo
    ctx.font = `${W*0.018}px monospace`
    typeText(ctx, "S-SKILLS  ·  MIT LICENSE  ·  2026", bx+10, by+bh-7, prg(t, 0.87, 0.96))

    ctx.restore()
}

// ─── Scene 2: Marketing Card News ─────────────────────────────────────────
function drawMarketingCard(ctx: CanvasRenderingContext2D, t: number, W: number, H: number, alpha: number) {
    ctx.save()
    ctx.globalAlpha = alpha
    const cw = Math.min(W*0.78, H*0.78)
    const ch = cw
    const cx = (W-cw)/2, cy = (H-ch)/2

    // Card border
    ctx.strokeStyle = G.mid
    ctx.lineWidth = 1.5
    rectBorder(ctx, cx, cy, cw, ch, prg(t, 0, 0.14))

    // Subtle bg fill
    const bgP = prg(t, 0.08, 0.22)
    if (bgP > 0) {
        ctx.fillStyle = `rgba(255,172,2,${0.05*bgP})`
        ctx.fillRect(cx, cy, cw, ch)
    }

    // Brand tag
    ctx.fillStyle = G.mid
    ctx.font = `bold ${W*0.022}px monospace`
    typeText(ctx, "/ MARKETING", cx+12, cy+24, prg(t, 0.18, 0.28))
    ctx.strokeStyle = G.lo
    ctx.lineWidth = 0.8
    drawLine(ctx, cx, cy+32, cx+cw, cy+32, prg(t, 0.26, 0.33))

    // Image placeholder
    const imgH = ch*0.38
    ctx.strokeStyle = G.lo
    ctx.lineWidth = 0.8
    rectBorder(ctx, cx+14, cy+42, cw-28, imgH, prg(t, 0.3, 0.44))
    const xP = prg(t, 0.42, 0.5)
    if (xP > 0) {
        drawLine(ctx, cx+14, cy+42, cx+14+(cw-28)*xP, cy+42+imgH*xP, xP)
        drawLine(ctx, cx+14+(cw-28), cy+42, cx+14+(cw-28)*(1-xP), cy+42+imgH*xP, xP)
    }

    // Headline
    ctx.fillStyle = G.full
    ctx.font = `bold ${W*0.06}px sans-serif`
    typeText(ctx, "SNS 캠페인", cx+14, cy+imgH+68, prg(t, 0.48, 0.6))
    ctx.fillStyle = G.hi
    ctx.font = `bold ${W*0.048}px sans-serif`
    typeText(ctx, "카피라이팅", cx+14, cy+imgH+68+W*0.052, prg(t, 0.56, 0.66))

    // Body
    ctx.fillStyle = G.lo
    ctx.font = `${W*0.022}px sans-serif`
    typeText(ctx, "채널별 타겟 메시지 자동 생성", cx+14, cy+imgH+68+W*0.052+H*0.052, prg(t, 0.63, 0.73))

    // Engagement bar
    const barY = cy+ch-34
    ctx.strokeStyle = G.lo
    ctx.lineWidth = 0.8
    drawLine(ctx, cx, barY, cx+cw, barY, prg(t, 0.72, 0.78))
    if (prg(t, 0.76, 0.86) > 0) {
        const ep = prg(t, 0.76, 0.86)
        ctx.fillStyle = G.mid
        ctx.font = `${W*0.022}px monospace`
        ctx.fillText(`♥ ${Math.floor(2847*ep).toLocaleString()}`, cx+14, barY+20)
        ctx.fillText(`↑ ${Math.floor(394*ep).toLocaleString()}`, cx+90, barY+20)
    }

    // CTA
    const btnW = cw*0.5
    const btnX = cx+(cw-btnW)/2
    ctx.strokeStyle = G.mid
    ctx.lineWidth = 1
    rectBorder(ctx, btnX, cy+ch-62, btnW, 24, prg(t, 0.86, 0.94))
    ctx.fillStyle = G.mid
    ctx.font = `${W*0.021}px monospace`
    typeText(ctx, "/ marketing →", btnX+16, cy+ch-45, prg(t, 0.9, 0.98))

    ctx.restore()
}

// ─── Scene 3: SEO / Analytics ─────────────────────────────────────────────
function drawAnalytics(ctx: CanvasRenderingContext2D, t: number, W: number, H: number, alpha: number) {
    ctx.save()
    ctx.globalAlpha = alpha
    const pad = W*0.09
    const fx = pad, fy = H*0.09, fw = W-pad*2, fh = H*0.82

    ctx.strokeStyle = G.lo
    ctx.lineWidth = 1
    rectBorder(ctx, fx, fy, fw, fh, prg(t, 0, 0.1))
    ctx.fillStyle = G.full
    ctx.font = `bold ${W*0.03}px monospace`
    typeText(ctx, "/ SEO", fx+12, fy+26, prg(t, 0.08, 0.17))

    // Chart frame
    const cx2 = fx+44, cy2 = fy+44, cw2 = fw-60, ch2 = fh*0.44
    ctx.strokeStyle = G.lo
    ctx.lineWidth = 0.8
    drawLine(ctx, cx2, cy2, cx2, cy2+ch2, prg(t, 0.16, 0.24))
    drawLine(ctx, cx2, cy2+ch2, cx2+cw2, cy2+ch2, prg(t, 0.2, 0.27))
    for (let i=1; i<=4; i++) {
        const gy = cy2+(ch2/4)*i
        drawLine(ctx, cx2, gy, cx2+cw2, gy, prg(t, 0.18+i*0.02, 0.26+i*0.02))
    }

    // Bars
    const bars = [0.28, 0.45, 0.42, 0.62, 0.55, 0.78, 0.68, 0.88]
    const bw2 = cw2/(bars.length*1.7)
    bars.forEach((h, i) => {
        const bp = prg(t, 0.28+i*0.03, 0.42+i*0.03)
        if (bp <= 0) return
        const bx2 = cx2+(cw2/bars.length)*i+(cw2/bars.length-bw2)/2
        const bh2 = ch2*h*bp
        const by2 = cy2+ch2-bh2
        ctx.fillStyle = i === bars.length-1 ? G.hi : G.faint
        ctx.fillRect(bx2, by2, bw2, bh2)
        ctx.strokeStyle = i === bars.length-1 ? G.full : G.lo
        ctx.lineWidth = 0.5
        ctx.strokeRect(bx2, by2, bw2, bh2)
    })

    // Line chart (lower half)
    const ly = cy2+ch2+fh*0.05
    const lh = fh*0.28
    const lp2 = prg(t, 0.55, 0.78)
    if (lp2 > 0) {
        const pts = [0.18,0.32,0.28,0.52,0.48,0.62,0.55,0.75].map((v,i) => ({
            x: cx2+(cw2/7)*i,
            y: ly+lh - lh*v
        }))
        ctx.strokeStyle = G.full
        ctx.lineWidth = 1.5
        ctx.setLineDash([])
        ctx.beginPath()
        const drawTo = lp2*(pts.length-1)
        pts.forEach((p, i) => {
            if (i > drawTo) return
            if (i === 0) { ctx.moveTo(p.x, p.y); return }
            const frac = Math.min(1, drawTo-i+1)
            const prev = pts[i-1]
            ctx.lineTo(prev.x+(p.x-prev.x)*frac, prev.y+(p.y-prev.y)*frac)
        })
        ctx.stroke()

        // dots
        pts.forEach((p, i) => {
            if (i > drawTo) return
            ctx.fillStyle = G.full
            ctx.beginPath()
            ctx.arc(p.x, p.y, 2, 0, Math.PI*2)
            ctx.fill()
        })
    }

    // Big metric
    if (prg(t, 0.78, 0.89) > 0) {
        const mp = prg(t, 0.78, 0.89)
        ctx.fillStyle = G.full
        ctx.font = `bold ${W*0.065}px monospace`
        ctx.fillText(`+${Math.floor(mp*247)}%`, fx+12, fy+fh-30)
    }
    ctx.fillStyle = G.mid
    ctx.font = `${W*0.02}px monospace`
    typeText(ctx, "organic traffic growth", fx+12, fy+fh-12, prg(t, 0.87, 0.97))

    ctx.restore()
}

// ─── Component ────────────────────────────────────────────────────────────
const SCENES = [
    { dur: 10000, fn: drawWebpage },
    { dur: 10000, fn: drawMarketingCard },
    { dur: 9500, fn: drawAnalytics },
]
const FADE = 900
const TOTAL = SCENES.reduce((s, sc) => s + sc.dur + FADE, 0)

export default function SketchCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")!
        let raf = 0

        function resize() {
            const dpr = window.devicePixelRatio || 1
            const rect = canvas!.getBoundingClientRect()
            canvas!.width = rect.width * dpr
            canvas!.height = rect.height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        window.addEventListener("resize", resize)

        const startTime = performance.now()

        function tick() {
            const W = canvas!.clientWidth
            const H = canvas!.clientHeight
            ctx.clearRect(0, 0, W, H)

            const cycle = (performance.now() - startTime) % TOTAL
            let accum = 0

            for (let i = 0; i < SCENES.length; i++) {
                const { dur, fn } = SCENES[i]
                const ss = accum, se = accum + dur
                const fe = se + FADE

                if (cycle >= ss && cycle < fe) {
                    const t = Math.min((cycle - ss) / dur, 1)
                    let a = 1
                    if (cycle - ss < FADE) a = (cycle - ss) / FADE
                    else if (cycle >= se) a = 1 - (cycle - se) / FADE
                    fn(ctx, t, W, H, a)
                }
                accum += dur + FADE
            }

            raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
        />
    )
}
