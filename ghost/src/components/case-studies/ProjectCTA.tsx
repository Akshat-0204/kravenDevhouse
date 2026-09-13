import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ProjectCTAData } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type ProjectCTAProps = {
  cta?: ProjectCTAData
}

export default function ProjectCTA({ cta }: ProjectCTAProps) {
  const title = cta?.title || 'Have a product worth building?'
  const description =
    cta?.description || "Let's engineer a digital experience that commands authority and drives measurable revenue."
  const label = cta?.label || 'Start a Conversation'
  const href = cta?.href || '/book-a-call'

  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32" aria-label="Call to Action">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-20 text-center shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl md:px-12 md:py-28"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d8b56a]">
          WORK WITH KRAVEN
        </span>

        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-medium tracking-[-0.06em] text-white md:text-5xl lg:text-6xl">
          {title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
          {description}
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to={href}
            className="inline-flex items-center gap-3.5 rounded-full bg-[#efe4d6] px-8 py-4 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            <span>{label}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs">
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
