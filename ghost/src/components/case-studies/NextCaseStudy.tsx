import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { CaseStudy } from '../../types/case-study'
import { getNextCaseStudy } from '../../data/case-studies'
import { useResolvedCaseStudy } from '../../hooks/useSignedMedia'

const ease = [0.22, 1, 0.36, 1] as const

type NextCaseStudyProps = {
  currentSlug: string
}

export default function NextCaseStudy({ currentSlug }: NextCaseStudyProps) {
  const rawNextCaseStudy: CaseStudy = getNextCaseStudy(currentSlug)
  const { caseStudy: nextCaseStudy } = useResolvedCaseStudy(rawNextCaseStudy)

  if (!nextCaseStudy || nextCaseStudy.slug === currentSlug) {
    return null
  }

  const mediaSrc = nextCaseStudy.cardImage || nextCaseStudy.hero.image || nextCaseStudy.hero.poster

  return (
    <section className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32" aria-label="Next Case Study">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.45em] text-[#efe7db]/40">
            NEXT CASE STUDY
          </span>
          <Link
            to="/case-studies"
            className="text-xs font-medium text-white/50 transition-colors hover:text-white"
          >
            All Case Studies ↗
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
        >
          <Link
            to={`/case-studies/${nextCaseStudy.slug}`}
            className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-12"
          >
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#d8b56a]">
                <span>{nextCaseStudy.industry}</span>
                <span>·</span>
                <span>{nextCaseStudy.client.name}</span>
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white transition-colors group-hover:text-[#efe4d6] md:text-4xl lg:text-5xl">
                {nextCaseStudy.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
                {nextCaseStudy.description}
              </p>

              <div className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#efe4d6] transition-transform duration-300 group-hover:translate-x-2">
                <span>View next case study</span>
                <span>→</span>
              </div>
            </div>

            {/* Teaser Visual Preview */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950">
              {mediaSrc ? (
                <img
                  src={mediaSrc}
                  alt={nextCaseStudy.hero.alt ?? nextCaseStudy.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white/30">
                  Preview
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
