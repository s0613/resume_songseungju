// <model-viewer> 커스텀 엘리먼트 JSX 타입 (@google/model-viewer)
import type * as React from "react"

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                src?: string
                alt?: string
                "auto-rotate"?: boolean
                "rotation-per-second"?: string
                "camera-orbit"?: string
                "disable-zoom"?: boolean
                "disable-pan"?: boolean
                "disable-tap"?: boolean
                "interaction-prompt"?: string
                "shadow-intensity"?: string
                exposure?: string
                loading?: "auto" | "lazy" | "eager"
            }
        }
    }
}
