import { motion } from 'framer-motion'
import type { TestimonialData } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type TestimonialProps = {
  testimonial?: TestimonialData
}

export default function Testimonial({ testimonial }: TestimonialProps) {
  if (!testimonial || !testimonial.quote) return null

  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-black/60 px-6 py-28 md:px-10 md:py-36" aria-label="Client Testimonial">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,181,106,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
        >
          <p className="text-2xl font-normal leading-relaxed tracking-[-0.03em] text-[#f4ebde] md:text-3xl lg:text-4xl">
            {testimonial.quote}
          </p>

          <footer className="mt-10">
            <cite className="not-italic">
              {testimonial.avatar && (
                <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border border-[#d8b56a]/30 bg-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-2 ring-white/10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}
              <span className="block text-base font-semibold tracking-tight text-white md:text-lg">
                {testimonial.author}
              </span>
              {(testimonial.role || testimonial.company) && (
                <span className="mt-1 block text-sm text-white/50">
                  {testimonial.role}
                  {testimonial.role && testimonial.company && ' · '}
                  {testimonial.company}
                </span>
              )}
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
