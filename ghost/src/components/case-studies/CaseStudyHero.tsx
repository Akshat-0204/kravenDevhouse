import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import type { CaseStudy } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type CaseStudyHeroProps = {
  caseStudy: CaseStudy
}

export default function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroMedia = caseStudy.hero
  const videoUrl = heroMedia.video?.trim()
  const hasVideo = Boolean(videoUrl)

  useEffect(() => {
    if (videoRef.current && hasVideo) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback (handled silently)
      })
    }
  }, [hasVideo, videoUrl])

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background glow subtle radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,181,106,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Eyebrow / Client & Industry */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-3"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-[#efe7db]/80 font-medium">
              {caseStudy.industry}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/50">
              {caseStudy.client.name}
            </span>
          </motion.div>

          {caseStudy.timeline && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.05 }}
              className="text-xs uppercase tracking-[0.25em] text-white/40"
            >
              Timeline: <span className="text-white/70">{caseStudy.timeline}</span>
            </motion.div>
          )}
        </div>

        {/* Large Editorial Project Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-8 max-w-5xl text-4xl font-semibold tracking-[-0.07em] text-[#f4ebde] md:text-6xl lg:text-[4.75rem] lg:leading-[1.05]"
        >
          {caseStudy.title}
        </motion.h1>

        {/* Short Project Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-xl"
        >
          {caseStudy.description}
        </motion.p>

        {/* Service Tags */}
        {caseStudy.services && caseStudy.services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.22 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {caseStudy.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm"
              >
                {service}
              </span>
            ))}
          </motion.div>
        )}

        {/* Hero Media Visual Container */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease, delay: 0.28 }}
          className="mt-12 overflow-hidden rounded-[2rem] border border-white/12 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.5)] md:mt-16"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            {hasVideo ? (
              <video
                ref={videoRef}
                key={videoUrl}
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={heroMedia.poster || heroMedia.image}
                className="h-full w-full object-cover object-center"
              />
            ) : heroMedia.image ? (
              <img
                src={heroMedia.image}
                alt={heroMedia.alt ?? caseStudy.title}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white/30">
                Media Preview
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
