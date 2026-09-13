import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

type CaseStudyOverviewProps = {
  overview: string
}

export default function CaseStudyOverview({ overview }: CaseStudyOverviewProps) {
  if (!overview) return null

  return (
    <section className="px-6 py-20 md:px-10 md:py-28" aria-label="Project Overview">
      <div className="mx-auto max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
          className="text-xs uppercase tracking-[0.45em] text-[#efe7db]/50"
        >
          Project Overview
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-6 text-2xl font-medium leading-relaxed tracking-[-0.03em] text-[#f4ebde] md:text-3xl lg:text-4xl"
        >
          {overview}
        </motion.blockquote>
      </div>
    </section>
  )
}
