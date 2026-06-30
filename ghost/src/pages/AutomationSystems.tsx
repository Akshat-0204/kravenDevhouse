import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import FooterSection from '../sections/footer'
import SiteNavbar from '../components/SiteNavbar'
import Threads from '../components/Threads'
import heroImage from '../assets/bgimg.gif'
import altImage from '../assets/hero.png'

const ease = [0.22, 1, 0.36, 1] as const

const systems = [
  {
    title: 'AI Appointment Booking',
    description:
      'Your calendar should fill itself. We build AI assistants that qualify, schedule, and follow up—around the clock.',
    image: heroImage,
  },
  {
    title: 'Client Onboarding',
    description:
      'First impressions set the tone. We automate onboarding so every new client experiences speed, clarity, and zero friction.',
    image: altImage,
  },
  {
    title: 'Workflow Automations',
    description:
      'Busywork is expensive. We design intelligent workflows that quietly handle repetitive operations while your team focuses on work that matters.',
    image: heroImage,
  },
]

const deliverySteps = [
  {
    number: '01',
    title: 'Audit',
    description:
      'We map your existing workflows, identify bottlenecks, and uncover where time, revenue, and opportunities are being lost.',
    image: heroImage,
  },
  {
    number: '02',
    title: 'Architect',
    description:
      'We design the ideal automation flow, defining how people, processes, and systems should interact.',
    image: altImage,
  },
  {
    number: '03',
    title: 'Integrate',
    description:
      'We connect the tools your business already relies on — CRMs, calendars, communication platforms, and internal systems.',
    image: heroImage,
  },
  {
    number: '04',
    title: 'Automate',
    description:
      "We build, test, and deploy intelligent automations that handle repetitive work with speed and precision.",
    image: altImage,
  },
  {
    number: '05',
    title: 'Refine',
    description:
      'Once live, we monitor performance, optimize workflows, and continuously improve the system as your business evolves.',
    image: heroImage,
  },
]

function SectionBlock({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease, delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function ServiceCard({
  title,
  description,
  index,
  image,
  className = '',
}: {
  title: string
  description: string
  index: number
  image: string
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={[
        'group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-sm',
        className,
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="relative aspect-[16/11] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            initial={{ scale: 1.06, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease }}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/12 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col px-6 py-6 md:px-7 md:py-7">
          <h3 className="text-2xl font-medium tracking-[-0.05em] text-white md:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/58">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AutomationSystemsPage() {
  const [ctaMode, setCtaMode] = useState<'automate' | 'build'>('automate')
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const ctaLabel = useMemo(
    () => (ctaMode === 'automate' ? 'Work Less. Scale Smarter. ' : 'Automate The Unnecessary.'),
    [ctaMode],
  )
  const activeStep = deliverySteps[hoveredStep ?? 0]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCtaMode((current) => (current === 'build' ? 'automate' : 'build'))
    }, 2200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="bg-black text-white">
      <SiteNavbar />

      <main className="pt-24 md:pt-28">
        <section className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center overflow-hidden px-6 text-center md:px-10">
          <div className="absolute inset-0 opacity-35">
            <Threads amplitude={1} distance={0} enableMouseInteraction />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.82))]" />
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="relative z-10 text-xs uppercase tracking-[0.45em] text-white/35"
          >
            02
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="relative z-10 mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.08em] text-[#f4ebde] md:text-7xl lg:text-[6rem]"
          >
            Automation Systems
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.16 }}
            className="relative z-10 mt-8 max-w-[44rem] text-base leading-relaxed text-white/60 md:text-lg"
          >
       Appointments should book themselves. Onboarding should feel effortless. Repetitive work should happen quietly in the background. We automate with one goal: giving your team more time to do work that truly moves the business forward.


          </motion.p>
        </section>

        <SectionBlock className="px-6 py-24 md:px-10 md:py-32" delay={0.03}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease }}
                className="text-xs uppercase tracking-[0.45em] text-white/35"
              >
                WHAT WE OFFER
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease, delay: 0.05 }}
                className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
              >
                Put busywork on autopilot
              </motion.h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {systems.map((system, index) => (
                <ServiceCard
                  key={system.title}
                  title={system.title}
                  description={system.description}
                  index={index}
                  image={system.image}
                  className={
                    index === 1
                      ? 'md:translate-y-6'
                      : index === 2
                        ? 'md:-translate-y-2'
                        : ''
                  }
                />
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock className="px-6 py-24 md:px-10 md:py-32" delay={0.05}>
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease }}
              className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, ease }}
                  className="text-xs uppercase tracking-[0.45em] text-white/35"
                >
                  Delivery Process
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease, delay: 0.04 }}
                  className="mt-4 max-w-md text-4xl font-medium tracking-[-0.06em] text-white md:text-6xl"
                >
                  How we deliver our services.
                </motion.h2>
              </div>
              <p className="max-w-2xl self-end text-sm leading-relaxed text-white/55 md:text-base">
             Every automation begins with friction. Hover through the process to see how we turn repetitive work into systems that run themselves.

              </p>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-start">
              <div className="space-y-0">
                {deliverySteps.map((step, index) => {
                  const isActive = hoveredStep === null || hoveredStep === index
                  const isHovered = hoveredStep === index
                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
                      whileHover={{ x: 6 }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      onFocus={() => setHoveredStep(index)}
                      onBlur={() => setHoveredStep(null)}
                      className={[
                        'group cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.26)] backdrop-blur-sm transition-opacity duration-300 md:px-6 md:py-6',
                        isActive ? 'opacity-100' : 'opacity-50 lg:opacity-45',
                      ].join(' ')}
                      tabIndex={0}
                    >
                      <div className="flex items-start gap-5">
                        <span className="mt-1 text-[10px] uppercase tracking-[0.45em] text-white/30">
                          {step.number}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[1rem] font-medium tracking-[-0.045em] text-white md:text-[1.15rem]">
                            {step.title}
                          </h3>
                          <motion.p
                            initial={false}
                            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.28, ease }}
                            className="overflow-hidden text-sm leading-relaxed text-white/56 md:text-[0.92rem]"
                          >
                            {step.description}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="relative lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.32)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeStep.title}
                      src={activeStep.image}
                      alt={activeStep.title}
                      loading="lazy"
                      initial={{ opacity: 0, y: 18, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 0.985 }}
                      transition={{ duration: 0.45, ease }}
                      className="h-[18rem] w-full object-cover object-center md:h-[26rem]"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock className="px-6 py-24 md:px-10 md:py-32" delay={0.07}>
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease }}
              className="text-xs uppercase tracking-[0.45em] text-white/35"
            >
              Why Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease, delay: 0.05 }}
              className="mt-4 text-4xl font-medium tracking-[-0.06em] text-white md:text-6xl"
            >
              Why we exist?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
            >
              Most businesses don't need more hours in the day. They need fewer repetitive tasks in it. Appointments go unbooked, onboarding stalls, and teams drown in manual work. We build automation systems that keep the business moving — without constant follow - ups, operational chaos, or unnecessary busywork.
            </motion.p>
          </div>
        </SectionBlock>

        <SectionBlock className="relative px-6 py-24 md:px-10 md:py-32" delay={0.09}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_40%)]" />
          <div
            id="cta"
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-6 py-20 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-10 md:py-28"
          >
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-medium tracking-[-0.06em] text-white md:text-6xl">
              <span className="inline-block min-w-[9ch] align-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ctaMode}
                    initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                    transition={{ duration: 0.35, ease }}
                    className="inline-block text-orange-300"
                  >
                    {ctaLabel}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}
              today
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Let&apos;s build automation systems that eliminate busywork, accelerate operations, and give your team time back to focus on what truly matters.


            </p>
            <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#efe4d6] px-7 py-3.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]">
              Let&apos;s Connect 
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                →
              </span>
            </button>
          </div>
        </SectionBlock>

        <FooterSection />
      </main>
    </div>
  )
}
