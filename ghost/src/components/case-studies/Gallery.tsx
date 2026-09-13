import { motion } from 'framer-motion'
import type { GalleryItem } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type GalleryProps = {
  gallery?: GalleryItem[]
}

export default function Gallery({ gallery }: GalleryProps) {
  if (!gallery || gallery.length === 0) return null

  return (
    <section className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32" aria-label="Visual Showcase">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.45em] text-[#efe7db]/40"
          >
            VISUAL SHOWCASE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease, delay: 0.05 }}
            className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
          >
            Curated Interface Details
          </motion.h2>
        </div>

        {/* Dynamic Asymmetric Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {gallery.map((item, index) => {
            let colSpan = 'lg:col-span-6'
            if (item.size === 'full') colSpan = 'lg:col-span-12'
            else if (item.size === 'large') colSpan = 'lg:col-span-8'
            else if (item.size === 'small') colSpan = 'lg:col-span-4'

            const isVideo = item.type === 'video'

            return (
              <motion.figure
                key={`${item.src}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease, delay: index * 0.08 }}
                className={[
                  'group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_24px_70px_rgba(0,0,0,0.4)]',
                  colSpan,
                ].join(' ')}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {isVideo ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={item.poster}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {item.caption && (
                  <figcaption className="p-4 text-center text-xs text-white/50">
                    {item.caption}
                  </figcaption>
                )}
              </motion.figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
