import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import FooterSection from '../sections/footer'
import SiteNavbar from '../components/SiteNavbar'
import Threads from '../components/Threads'
import heroImage from '../assets/bgimg.gif'
import altImage from '../assets/hero.png'

const ease = [0.22, 1, 0.36, 1] as const

const standardsImages = [
  { src: heroImage, alt: 'Featured craftsmanship visual' },
  { src: altImage, alt: 'Detail composition one' },
  { src: heroImage, alt: 'Detail composition two' },
  { src: altImage, alt: 'Detail composition three' },
  { src: heroImage, alt: 'Detail composition four' },
]

const services = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Understanding goals, users, competitors, and business requirements.',
    image: heroImage,
  },
  {
    number: '02',
    title: 'UI / UX Design',
    description:
      'Creating intuitive interfaces and premium user experiences.',
    image: altImage,
  },
  {
    number: '03',
    title: 'Development',
    description:
      'Building fast, scalable, and maintainable applications.',
    image: heroImage,
  },
  {
    number: '04',
    title: 'Optimization',
    description:
      'Performance, SEO, accessibility, and analytics optimization.',
    image: altImage,
  },
  {
    number: '05',
    title: 'Launch & Support',
    description:
      'Deployment, monitoring, iteration, and long-term support.',
    image: heroImage,
  },
]

function SectionBlock({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function WebDevServicePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [ctaMode, setCtaMode] = useState<'launch' | 'scale'>('launch')
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const displayedService = services[hoveredIndex ?? activeIndex]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.72)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]

        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.index)
        if (!Number.isNaN(index)) {
          setActiveIndex(index)
          setOpenIndex(index)
        }
      },
      { threshold: [0.72, 0.84, 0.94] },
    )

    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCtaMode((current) => (current === 'launch' ? 'scale' : 'launch'))
    }, 2000)

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]" />
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="relative z-10 text-xs uppercase tracking-[0.45em] text-white/35"
          >
            01
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="relative z-10 mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.08em] text-[#f4ebde] md:text-7xl lg:text-[6rem]"
          >
            Website Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.16 }}
            className="relative z-10 mt-8 max-w-[42rem] text-base leading-relaxed text-white/60 md:text-lg"
          >
            We craft refined websites that feel intentional from the first frame,
            balancing strategy, motion, and clarity to create a digital presence
            that earns trust before a single word is read.
          </motion.p>
        </section>

        <SectionBlock className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-6xl px-2 md:px-6">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
                Standards
              </h1>
            </div>

            <div className="grid gap-5 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease }}
                className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:mx-6"
              >
                <img
                  src={standardsImages[0].src}
                  alt={standardsImages[0].alt}
                  loading="lazy"
                  className="h-[240px] w-full object-cover object-center transition duration-700 hover:scale-[1.02] md:h-[400px]"
                />
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 md:gap-6 md:px-6">
                {standardsImages.slice(1).map((image, index) => (
                  <motion.div
                    key={image.alt}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, ease, delay: index * 0.06 }}
                    className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-44 w-full object-cover object-center grayscale-[10%] transition duration-700 hover:scale-[1.03] hover:grayscale-0 md:h-60"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionBlock>

        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease }}
              className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.45em] text-white/35">
                  Complete Services
                </span>
                <h2 className="mt-4 max-w-md text-4xl font-medium tracking-[-0.06em] text-white md:text-6xl">
                  What We Offer
                </h2>
              </div>
              <p className="max-w-2xl self-end text-sm leading-relaxed text-white/55 md:text-base">
                A more tactile storytelling flow: each step of the process changes
                the image and sharpens the visual rhythm as you scroll or click.
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[0.72fr_0.48fr] lg:gap-20">
              <div className="space-y-0">
                {services.map((service, index) => {
                  const active = index === activeIndex
                  const open = index === openIndex
                  const expanded = active || open
                  return (
                    <div
                      key={service.number}
                      ref={(el) => {
                        stepRefs.current[index] = el
                      }}
                      data-index={index}
                      className={[
                        'group w-full snap-start snap-always px-0 py-0 text-left transition-all duration-500',
                        active
                          ? 'opacity-100'
                          : 'opacity-10 hover:opacity-100',
                      ].join(' ')}
                      onClick={() => {
                        setActiveIndex(index)
                        setOpenIndex((current) => (current === index ? -1 : index))
                      }}
                      onMouseEnter={() => {
                        setHoveredIndex(index)
                        setOpenIndex(index)
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(null)
                        setOpenIndex(activeIndex)
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={active}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setActiveIndex(index)
                          setOpenIndex((current) => (current === index ? -1 : index))
                          setHoveredIndex(index)
                        }
                      }}
                    >
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/28 to-transparent" />
                      <div className="px-0 py-3 md:py-4">
                        <div className="flex items-start gap-4">
                          <span className="mt-0.5 text-[10px] uppercase tracking-[0.45em] text-white/30">
                            {service.number}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3
                              className={[
                                'text-[1rem] font-medium tracking-[-0.045em] md:text-[1.1rem]',
                                active ? 'text-white' : 'text-white/50',
                              ].join(' ')}
                            >
                              {service.title}
                            </h3>
                            <motion.div
                              initial={false}
                              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                              transition={{ duration: 0.3, ease }}
                              className="overflow-hidden"
                            >
                              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/55 md:text-[0.88rem]">
                                {service.description}
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/28 to-transparent" />
                    </div>
                  )
                })}
              </div>

              <div className="relative hidden lg:block lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.32)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={displayedService.image + displayedService.title}
                      src={displayedService.image}
                      alt={displayedService.title}
                      loading="lazy"
                      initial={{ opacity: 0, y: 18, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 0.985 }}
                      transition={{ duration: 0.45, ease }}
                      className="h-[14rem] w-full object-cover object-center xl:h-[16rem]"
                    />
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>
        </section>

        <SectionBlock className="relative px-6 py-24 md:px-10 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_40%)]" />
          <div id="cta" className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-6 py-20 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-10 md:py-28">
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-medium tracking-[-0.06em] text-white md:text-6xl">
              <span className="inline-block min-w-[6.5ch] align-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ctaMode}
                    initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                    transition={{ duration: 0.35, ease }}
                    className="inline-block text-orange-300"
                  >
                    {ctaMode === 'launch' ? 'Launch' : 'Scale'}
                  </motion.span>
                </AnimatePresence>
              </span>{''}
              your website
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Let&apos;s build a website engineered to grow your business.
            </p>
            <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#efe4d6] px-7 py-3.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]">
              Book a Call
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
