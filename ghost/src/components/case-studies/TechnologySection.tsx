import { motion } from 'framer-motion'
import type { CaseStudyTechnology } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type TechnologySectionProps = {
  technology?: CaseStudyTechnology[]
  technologySummary?: string
}

export default function TechnologySection({
  technology,
  technologySummary,
}: TechnologySectionProps) {
  if (!technology || technology.length === 0) return null

  const hasDetailedTech = technology.some(
    (item) => typeof item === 'object' && item !== null && (item.category || item.description),
  )

  return (
    <section
      className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32"
      aria-label="Technology Stack"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:items-start">
          {/* Left Column: Heading & Stack Rationale */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease }}
              className="text-xs font-semibold uppercase tracking-[0.45em] text-[#d8b56a]"
            >
              THE TECHNOLOGY
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease, delay: 0.05 }}
              className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
            >
              Engineered for speed &amp; scale.
            </motion.h2>

            {technologySummary && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease, delay: 0.1 }}
                className="mt-6 text-base leading-relaxed text-white/65 md:text-lg"
              >
                {technologySummary}
              </motion.p>
            )}
          </div>

          {/* Right Column: Technology Grid */}
          <div>
            {hasDetailedTech ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {technology.map((tech, index) => {
                  const { name, category, description } =
                    typeof tech === 'string'
                      ? { name: tech, category: undefined, description: undefined }
                      : tech

                  return (
                    <motion.div
                      key={`${name}-${index}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_12px_36px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base font-semibold tracking-tight text-[#f4ebde] transition-colors group-hover:text-white">
                          {name}
                        </span>
                        {category && (
                          <span className="rounded-full border border-[#d8b56a]/30 bg-[#d8b56a]/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#d8b56a]">
                            {category}
                          </span>
                        )}
                      </div>

                      {description && (
                        <p className="mt-2.5 text-xs leading-relaxed text-white/55">
                          {description}
                        </p>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              /* Compact Labels layout for string arrays */
              <div className="flex flex-wrap gap-3">
                {technology.map((tech, index) => {
                  const name = typeof tech === 'string' ? tech : tech.name
                  return (
                    <motion.div
                      key={`${name}-${index}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, ease, delay: index * 0.04 }}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d8b56a]" />
                      <span>{name}</span>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
