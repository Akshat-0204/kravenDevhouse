import { motion } from 'framer-motion'
import type { SolutionItem } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type SolutionSectionProps = {
  solution?: SolutionItem[]
}

function SolutionCard({ item, index }: { item: SolutionItem; index: number }) {
  const isEven = index % 2 === 0
  const isVideo = item.mediaType === 'video'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease, delay: index * 0.1 }}
      className={[
        'grid gap-8 items-center lg:gap-14',
        isEven ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1.1fr]',
      ].join(' ')}
    >
      {/* Visual media */}
      <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
          {item.media ? (
            isVideo ? (
              <video
                key={item.media}
                src={item.media}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={item.poster}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <img
                src={item.media}
                alt={item.alt ?? item.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            )
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center bg-zinc-900 text-white/30">
              Solution Feature Preview
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#efe7db]/45">
          MILESTONE {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl lg:text-4xl">
          {item.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function SolutionSection({ solution }: SolutionSectionProps) {
  if (!solution || solution.length === 0) return null

  return (
    <section className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32" aria-label="The Solution">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.45em] text-[#d8b56a]"
          >
            03 / THE SOLUTION
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease, delay: 0.05 }}
            className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
          >
            Precision engineering in every layer.
          </motion.h2>
        </div>

        <div className="space-y-20 md:space-y-28">
          {solution.map((item, index) => (
            <SolutionCard
              key={`${item.title}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
