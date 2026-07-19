import { useEffect, useRef } from 'react'

interface HyperspaceJumpProps {
  className?: string
  starCount?: number
  colors?: string[]
}

const DEFAULT_COLORS = ['239, 228, 214', '216, 181, 106', '244, 208, 163']

interface Star {
  angle: number
  z: number
  speed: number
  color: string
  twinklePhase: number
  prevX: number
  prevY: number
}

export default function HyperspaceJump({
  className = '',
  starCount = 340,
  colors = DEFAULT_COLORS,
}: HyperspaceJumpProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let maxDist = 1
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      cx = width / 2
      cy = height / 2
      maxDist = Math.hypot(cx, cy) || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const pickColor = () => colors[Math.floor(Math.random() * colors.length)]

    const makeStar = (spread: boolean): Star => {
      const angle = Math.random() * Math.PI * 2
      const z = spread ? Math.random() * maxDist : 0
      return {
        angle,
        z,
        speed: 0.18 + Math.random() * 0.32,
        color: pickColor(),
        twinklePhase: Math.random() * Math.PI * 2,
        prevX: cx,
        prevY: cy,
      }
    }

    let stars: Star[] = []
    const resetStars = (spread: boolean) => {
      stars = Array.from({ length: starCount }, () => makeStar(spread))
    }

    resize()
    resetStars(true)

    const onResize = () => {
      resize()
    }
    window.addEventListener('resize', onResize)

    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height)
      stars.forEach((star) => {
        const x = cx + Math.cos(star.angle) * star.z
        const y = cy + Math.sin(star.angle) * star.z
        ctx.strokeStyle = `rgba(${star.color}, 0.16)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.stroke()
      })
      return () => window.removeEventListener('resize', onResize)
    }

    let rafId = 0
    let elapsed = 0

    const render = () => {
      elapsed += 0.016

      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)'
      ctx.fillRect(0, 0, width, height)

      for (const star of stars) {
        star.prevX = cx + Math.cos(star.angle) * star.z
        star.prevY = cy + Math.sin(star.angle) * star.z

        star.z += star.speed * (1 + star.z / maxDist) * 1.7

        const x = cx + Math.cos(star.angle) * star.z
        const y = cy + Math.sin(star.angle) * star.z

        if (x < -60 || x > width + 60 || y < -60 || y > height + 60) {
          Object.assign(star, makeStar(false))
          continue
        }

        const progress = Math.min(1, star.z / maxDist)
        const twinkle = 0.85 + 0.15 * Math.sin(elapsed * 3 + star.twinklePhase)
        const alpha = Math.min(0.95, (progress * 0.85 + 0.05) * twinkle)
        const lineWidth = Math.max(0.6, progress * 2.8)

        ctx.strokeStyle = `rgba(${star.color}, ${alpha})`
        ctx.lineWidth = lineWidth
        ctx.shadowColor = `rgba(${star.color}, ${Math.min(0.6, alpha)})`
        ctx.shadowBlur = lineWidth * 1.8
        ctx.beginPath()
        ctx.moveTo(star.prevX, star.prevY)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
      ctx.shadowBlur = 0

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [starCount, colors])

  return <canvas ref={canvasRef} className={className} />
}
