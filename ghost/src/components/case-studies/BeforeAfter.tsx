import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { TransformationExperience } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type BeforeAfterProps = {
  transformation?: TransformationExperience
}

export default function BeforeAfter({ transformation }: BeforeAfterProps) {
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split')

  if (!transformation) return null

  const { before, after } = transformation

  const renderMedia = (
    media: typeof before,
    title: string,
  ) => {
    const isVideo = Boolean(media.video)
    const imageSrc = media.image || media.poster

    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        {isVideo ? (
          <video
            key={media.video}
            src={media.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={media.poster || media.image}
            className="h-full w-full object-cover object-top"
          />
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={media.label || title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white/30">
            Media Preview
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-black/40 px-6 py-24 md:px-10 md:py-32" aria-label="The Transformation">
      {/* Background ambient gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,44,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease }}
              className="text-xs font-semibold uppercase tracking-[0.45em] text-[#ff7b39]"
            >
              THE TRANSFORMATION
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease, delay: 0.05 }}
              className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
            >
              {transformation.title || 'Before → After'}
            </motion.h2>

            {transformation.description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease, delay: 0.1 }}
                className="mt-4 text-sm leading-relaxed text-white/60 md:text-base"
              >
                {transformation.description}
              </motion.p>
            )}
          </div>

          {/* View Mode Controls */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
          >
            <button
              onClick={() => setViewMode('split')}
              className={[
                'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
                viewMode === 'split'
                  ? 'bg-[#efe4d6] text-black shadow-sm'
                  : 'text-white/60 hover:text-white',
              ].join(' ')}
            >
              Side by Side
            </button>
            <button
              onClick={() => setViewMode('before')}
              className={[
                'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
                viewMode === 'before'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'text-white/60 hover:text-white',
              ].join(' ')}
            >
              Before Only
            </button>
            <button
              onClick={() => setViewMode('after')}
              className={[
                'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
                viewMode === 'after'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-white/60 hover:text-white',
              ].join(' ')}
            >
              After Only
            </button>
          </motion.div>
        </div>

        {/* Visual Comparison Area */}
        <div className="mt-12 md:mt-16">
          <AnimatePresence mode="wait">
            {viewMode === 'split' && (
              <motion.div
                key="split"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="grid gap-8 lg:grid-cols-2"
              >
                {/* Before Card */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      {before.label || 'BEFORE · Legacy Experience'}
                    </span>
                  </div>

                  {renderMedia(before, 'Before Redesign')}

                  {before.description && (
                    <p className="px-2 text-xs leading-relaxed text-white/50 md:text-sm">
                      {before.description}
                    </p>
                  )}
                </div>

                {/* After Card */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {after.label || 'AFTER · Kraven Devhouse Redesign'}
                    </span>
                  </div>

                  {renderMedia(after, 'After Redesign')}

                  {after.description && (
                    <p className="px-2 text-xs leading-relaxed text-white/50 md:text-sm">
                      {after.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {viewMode === 'before' && (
              <motion.div
                key="before-only"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
                className="mx-auto max-w-5xl space-y-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                  {before.label || 'BEFORE · Legacy Experience'}
                </span>
                {renderMedia(before, 'Before Redesign')}
                {before.description && (
                  <p className="text-sm leading-relaxed text-white/60">{before.description}</p>
                )}
              </motion.div>
            )}

            {viewMode === 'after' && (
              <motion.div
                key="after-only"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
                className="mx-auto max-w-5xl space-y-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  {after.label || 'AFTER · Kraven Devhouse Redesign'}
                </span>
                {renderMedia(after, 'After Redesign')}
                {after.description && (
                  <p className="text-sm leading-relaxed text-white/60">{after.description}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
