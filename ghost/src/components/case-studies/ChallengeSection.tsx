import { motion } from 'framer-motion'
import type { CaseStudy } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type ChallengeSectionProps = {
  challenge: CaseStudy['challenge']
}

export default function ChallengeSection({ challenge }: ChallengeSectionProps) {
  if (!challenge || !challenge.description) return null

  return (
    <section className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32" aria-label="The Challenge">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left Column: Numbered Title & Big Statement */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease }}
              className="text-xs font-semibold uppercase tracking-[0.45em] text-[#d8b56a]"
            >
              01 / THE CHALLENGE
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease, delay: 0.05 }}
              className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
            >
              {challenge.title || 'What wasn’t working before.'}
            </motion.h2>
          </div>

          {/* Right Column: Narrative & Bottleneck Points */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="text-base leading-relaxed text-white/70 md:text-lg"
            >
              {challenge.description}
            </motion.p>

            {challenge.bulletPoints && challenge.bulletPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease, delay: 0.15 }}
                className="mt-8 space-y-3"
              >
                {challenge.bulletPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4 backdrop-blur-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-semibold text-red-400">
                      ✕
                    </span>
                    <p className="text-sm leading-relaxed text-white/60 md:text-base">
                      {point}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
