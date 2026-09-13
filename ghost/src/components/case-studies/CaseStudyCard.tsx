import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { CaseStudy } from '../../types/case-study'
import { useSignedUrl } from '../../hooks/useSignedMedia'

const ease = [0.22, 1, 0.36, 1] as const

type CaseStudyCardProps = {
  caseStudy: CaseStudy
  index?: number
  priority?: boolean
}

export default function CaseStudyCard({
  caseStudy,
  index = 0,
  priority = false,
}: CaseStudyCardProps) {
  const cardImageCandidate = caseStudy.cardImage || caseStudy.hero.image || caseStudy.hero.poster
  const { url: imageUrl } = useSignedUrl(cardImageCandidate)
  const { url: videoUrl } = useSignedUrl(caseStudy.cardImage ? undefined : caseStudy.hero.video)
  const mediaSrc = imageUrl || cardImageCandidate
  const videoSrc = videoUrl || (caseStudy.cardImage ? undefined : caseStudy.hero.video)
  const isVideo = Boolean(videoSrc) && !caseStudy.cardImage

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <Link
        to={`/case-studies/${caseStudy.slug}`}
        className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efe4d6]"
        aria-label={`View case study: ${caseStudy.title} for ${caseStudy.client.name}`}
      >
        {/* Visual Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
          {isVideo && videoSrc ? (
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={caseStudy.hero.poster || caseStudy.hero.image}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : mediaSrc ? (
            <motion.img
              src={mediaSrc}
              alt={caseStudy.hero.alt ?? caseStudy.title}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white/30">
              Visual Preview Unavailable
            </div>
          )}

          {/* Atmospheric gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col justify-between p-7 md:p-8">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#f4ebde] transition-colors duration-300 group-hover:text-white md:text-3xl">
              {caseStudy.title}
            </h3>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/60 md:text-base">
              {caseStudy.description}
            </p>
          </div>

          {/* Footer Action */}
          <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-5">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 group-hover:text-white/70">
              Read Study
            </span>
            <div className="flex items-center gap-2 text-sm font-medium text-[#efe4d6] transition-transform duration-300 ease-out group-hover:translate-x-1">
              <span>View case study</span>
              <span className="text-base">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
