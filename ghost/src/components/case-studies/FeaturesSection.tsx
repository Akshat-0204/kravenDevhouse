import { motion } from 'framer-motion'
import type { FeatureItem } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type FeaturesSectionProps = {
  features?: FeatureItem[]
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  if (!features || features.length === 0) return null

  return (
    <section className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32" aria-label="Key Features">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.45em] text-[#efe7db]/40"
          >
            SYSTEM CAPABILITIES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease, delay: 0.05 }}
            className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
          >
            Key Features &amp; Deliverables
          </motion.h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: index * 0.06 }}
              className="group flex flex-col justify-between rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/16 hover:bg-white/[0.04]"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d8b56a]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white md:text-xl">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {feature.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
