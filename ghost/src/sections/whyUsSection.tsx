import { motion } from 'framer-motion'
import Threads from '../components/Threads'
import WhyUsCard from '../components/whyUsCard'
import { useSectionVisible } from '../hooks/useSectionVisible'

const reasons = [
  {
    stat: '01',
    title: 'Days, not months',
    description:
      'Concept to launch at a pace that redefines fast. Because waiting is not a strategy.',
  },
  {
    stat: '02',
    title: 'Obsession over detail',
    description:
      'Every interaction is tuned to feel considered, quiet, and premium instead of noisy or decorative.',
  },
  {
    stat: '03',
    title: 'Built to convert',
    description:
      'Layouts and copy structure are shaped around clarity, trust, and measurable outcomes.',
  },
  {
    stat: '04',
    title: 'Secure by default',
    description:
      'Performance, privacy, and reliability are treated as baseline requirements, not add-ons.',
  },
]

const WhyUsSection = () => {
  const { ref, isVisible } = useSectionVisible<HTMLElement>()

  return (
    <section
      ref={ref}
      id="why-us"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black px-6 py-16 md:px-10 md:py-20"
    >
      <div className="absolute inset-0 opacity-45">
        {isVisible && <Threads amplitude={1} distance={0} enableMouseInteraction />}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15),rgba(0,0,0,0.78))]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.45em] text-white/35">
              Why Us
            </span>
            <h2 className="mt-4 max-w-sm text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
              A sharper way to build the systems behind your brand.
            </h2>
          </div>
          <p className="max-w-2xl self-end text-sm leading-relaxed text-white/55 md:text-base">
            We pair strategy with execution, so every system we ship is built to hold
            up under real usage, not just look good in a pitch.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-6"
          >
            <p className="text-sm uppercase tracking-[0.38em] text-white/35">
              Design principle
            </p>
            <h3 className="mt-3 text-xl font-medium tracking-[-0.04em] text-white md:text-3xl">
              We build with restraint so the work feels expensive, not busy.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              A monochrome, premium visual language with strong contrast, clear
              hierarchy, and room to breathe.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <WhyUsCard
                key={reason.title}
                stat={reason.stat}
                title={reason.title}
                description={reason.description}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection
