import { motion } from 'framer-motion'
import type { CaseStudyResult } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type ResultsSectionProps = {
  results?: CaseStudyResult[]
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  if (!results || results.length === 0) return null

  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] px-6 py-24 md:px-10 md:py-32" aria-label="The Results">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,181,106,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.45em] text-[#d8b56a]"
          >
            04 / THE RESULTS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl lg:text-6xl"
          >
            Measurable business impact.
          </motion.h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
            >
              {result.value && (
                <div className="text-4xl font-bold tracking-tight text-[#f4ebde] md:text-5xl">
                  {result.value}
                </div>
              )}
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/85">
                {result.label}
              </h3>
              {result.description && (
                <p className="mt-2 text-xs leading-relaxed text-white/55 md:text-sm">
                  {result.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
