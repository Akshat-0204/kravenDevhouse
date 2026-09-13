import { motion } from 'framer-motion'
import type { ApproachPrinciple } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type ApproachSectionProps = {
  approach?: ApproachPrinciple[]
}

export default function ApproachSection({ approach }: ApproachSectionProps) {
  if (!approach || approach.length === 0) return null

  return (
    <section className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32" aria-label="The Approach">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.45em] text-[#d8b56a]"
          >
            02 / THE APPROACH
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease, delay: 0.05 }}
            className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
          >
            How we solved it.
          </motion.h2>
        </div>

        {/* Responsive Grid of Principles */}
        <div className="grid gap-6 md:grid-cols-2">
          {approach.map((item, index) => {
            const stepNum = String(index + 1).padStart(2, '0')
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#efe7db]/40 transition-colors group-hover:text-[#efe7db]/80">
                    {stepNum}
                  </span>
                  <span className="text-sm text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/60">
                    ↗
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
