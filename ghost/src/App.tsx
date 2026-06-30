import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import FooterSection from './sections/footer'
import HowItWorksSection from './sections/howItWorks'
import ServicesSection from './sections/serviceSection'
import TestimonialSection from './sections/testimonialSection'
import WhyUsSection from './sections/whyUsSection'
import WorkWithUsSection from './sections/workWithUs'
import heroImage from './assets/bgimg.gif'
import GrowthSystemsPage from './pages/GrowthSystemsPage'
import AutomationSystemsPage from './pages/AutomationSystems'
import IntelligentSystems from './pages/IntelligentSystems'
import BookCallPage from './pages/BookCallPage'

const ease = [0.22, 1, 0.36, 1] as const
const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '#services',
    dropdown: [
      { label: 'Growth Systems', href: '/services/growth-systems' },
      { label: 'Automation Systems', href: '/services/automation-systems' },
      { label: 'Intelligent Systems', href: '/services/intelligent-systems' },
    
    ],
  },
  { label: 'Why Us', href: '#why-us' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isDesktop
}

function ScrollShell() {
  const heroRef = useRef<HTMLElement | null>(null)
  const [heroHeight, setHeroHeight] = useState(0)
  const [navVisible, setNavVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const { scrollY } = useScroll()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const update = () => setHeroHeight(heroRef.current?.offsetHeight ?? window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    return scrollY.on('change', (value) => {
      setNavVisible(value > Math.max(heroHeight - 40, 120))
    })
  }, [heroHeight, scrollY])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  const titleScale = useTransform(scrollY, [0, Math.max(heroHeight * 0.55, 1)], [1, 0.34])
  const titleY = useTransform(scrollY, [0, Math.max(heroHeight * 0.55, 1)], [0, -heroHeight * 0.32])
  const titleX = useTransform(scrollY, [0, Math.max(heroHeight * 0.55, 1)], [0, -20])
  const titleOpacity = useTransform(scrollY, [0, heroHeight * 0.45], [1, 0.1])

  const currentServiceName = useMemo(() => {
    const match = navLinks[1].dropdown?.find((item) => item.href === location.pathname)
    return match?.label ?? 'Services'
  }, [location.pathname])
  const isServiceRoute = location.pathname.startsWith('/services/')
  const isGrowthSystemsRoute = location.pathname === '/services/growth-systems'
  const isAutoationSystemsRoute = location.pathname === '/services/automation-systems'
  const isIntelligentSystemsRoute = location.pathname === '/services/intelligent-systems'
  const isBookCallRoute = location.pathname === '/book-a-call'


  if (isGrowthSystemsRoute) {
    return <GrowthSystemsPage />
  }
  if (isAutoationSystemsRoute) {
    return <AutomationSystemsPage />
  }
  if (isIntelligentSystemsRoute) {
    return <IntelligentSystems />
  }
  if (isBookCallRoute) {
    return <BookCallPage />
  }

  return (
    <div className="bg-black text-white">
      <AnimatePresence>
        {navVisible && (
          <motion.header
            initial={{ opacity: 0, y: -24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(10px)' }}
            transition={{ duration: 0.45, ease }}
            className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:top-5"
          >
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-3 text-left"
              >
                <motion.span
                  layoutId="kraven-logo"
                  className="text-xl font-semibold tracking-[0.18em]  text-[#efe7db] md:text-2xl tracking-tight"
                  transition={{ duration: 0.55, ease }}
                >
                  Kraven
                </motion.span>
                
              </button>

              <nav className="hidden items-center gap-2 lg:flex">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => isDesktop && setServicesOpen(true)}
                      onMouseLeave={() => isDesktop && setServicesOpen(false)}
                    >
                      <button
                        onClick={() => setServicesOpen((open) => !open)}
                        className="rounded-full px-4 py-2 text-sm text-white/72 transition-colors hover:bg-white/8 hover:text-white"
                      >
                        {link.label}
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(10px)' }}
                            transition={{ duration: 0.25, ease }}
                            className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-[1.25rem] border border-white/10 bg-[#0e0e0f]/90 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                          >
                            {link.dropdown.map((item) => (
                              <button
                                key={item.href}
                                onClick={() => navigate(item.href)}
                                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                              >
                                <span>{item.label}</span>
                                <span className="text-white/25">↗</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => {
                        if (link.href.startsWith('#')) {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        } else {
                          navigate(link.href)
                        }
                      }}
                      className="rounded-full px-4 py-2 text-sm text-white/72 transition-colors hover:bg-white/8 hover:text-white"
                    >
                      {link.label}
                    </button>
                  ),
                )}
              </nav>

              <div className="relative lg:hidden">
                <button
                  onClick={() => setMenuOpen((open) => !open)}
                  onMouseEnter={() => isDesktop && setMenuOpen(true)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 backdrop-blur"
                  aria-label="Open navigation menu"
                >
                  <span className="flex flex-col gap-1.5">
                    <span className="block h-px w-4 bg-current" />
                    <span className="block h-px w-4 bg-current" />
                    <span className="block h-px w-4 bg-current" />
                  </span>
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 14, scale: 0.98, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 14, scale: 0.98, filter: 'blur(10px)' }}
                      transition={{ duration: 0.28, ease }}
                      className="absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-1.5rem))] rounded-[1.35rem] border border-white/10 bg-[#0d0d0e]/95 p-3 shadow-[0_28px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                    >
                      <div className="space-y-1">
                        {navLinks.map((link) => (
                          <button
                            key={link.label}
                            onClick={() => {
                              if (link.href.startsWith('#')) {
                                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                              } else {
                                navigate(link.href)
                              }
                              setMenuOpen(false)
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
                          >
                            <span>{link.label}</span>
                            <span className="text-white/25">↗</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {isServiceRoute ? (
        <main>
          <ServiceDetailPage
            title={currentServiceName}
            description="A premium placeholder page for the selected service. This route is ready for deeper content, case studies, and conversion-focused storytelling."
          />
        </main>
      ) : (
        <main>
          <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">
          <header className="relative z-20 px-6 pt-5 md:px-10 md:pt-8">
            <div className="flex items-center justify-between gap-4">
              <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
                <motion.span
                  layoutId="kraven-logo"
                  className="text-lg font-semibold tracking-[0.16em] text-[#efe7db] md:text-xl"
                  transition={{ duration: 0.55, ease }}
                >
                  Kraven
                </motion.span>
                <h3 className="text-sm font-semibold tracking-[-0.03em] text-white/70 md:text-base">
                  devhouse
                </h3>
              </button>

              <nav className="hidden items-center gap-2 lg:flex">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      if (link.href.startsWith('#')) {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      } else {
                        navigate(link.href)
                      }
                    }}
                    className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </header>

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_32%),linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.82)_78%)]" />
          <div className="relative z-10 flex min-h-screen flex-col px-6 py-5 md:px-10 md:py-8">
            <div className="flex flex-1 items-end pb-16 md:pb-12">
              <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div className="max-w-4xl">
                  <motion.div style={{ x: titleX, y: titleY, scale: titleScale, opacity: titleOpacity }}>
                    <motion.h1
                      layoutId="kraven-logo"
                      transition={{ duration: 0.65, ease }}
                      className="origin-left text-[clamp(4.75rem,16vw,11rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-[#f0e6d6] drop-shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
                    >
                      Kraven
                    </motion.h1>
                  </motion.div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.04em] text-white/65 md:text-xl">
                    devhouse
                  </h3>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                    We design cinematic websites, automate operations, and build premium AI systems for teams that want to move faster without losing polish.
                  </p>
                </div>

                <div className="max-w-lg justify-self-start lg:justify-self-end">
                  <p className="text-sm uppercase tracking-[0.35em] text-white">Build. Automate. Scale.</p>
                  <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-orange-200 md:text-5xl">
                    A black-on-black digital studio with a quieter kind of confidence.
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                    Scroll to explore the experience. The navigation condenses into a floating glass shell while the brand mark travels into place.
                  </p>
                  <button
                    onClick={() => navigate('/book-a-call')}
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#efe4d6] px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Book a Call
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="scroll-section snap-start snap-always" id="how-it-works">
          <SectionMotion>
            <HowItWorksSection />
          </SectionMotion>
        </div>

        <div className="scroll-section snap-start snap-always" id="testimonials">
          <SectionMotion>
            <TestimonialSection />
          </SectionMotion>
        </div>

        <div className="scroll-section snap-start snap-always" id="services">
          <SectionMotion>
            <ServicesSection />
          </SectionMotion>
        </div>

        <div className="scroll-section snap-start snap-always" id="why-us">
          <SectionMotion>
            <WhyUsSection />
          </SectionMotion>
        </div>

        <div className="scroll-section snap-start snap-always" id="contact">
          <SectionMotion>
            <WorkWithUsSection />
          </SectionMotion>
        </div>

        <SectionMotion>
          <div className="scroll-section snap-start snap-always">
            <FooterSection />
          </div>
        </SectionMotion>
        </main>
      )}
    </div>
  )
}

function SectionMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease }}
    >
      {children}
    </motion.div>
  )
}

function ServiceDetailPage({ title, description }: { title: string; description: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease }}
      className="min-h-screen bg-black px-6 py-24 text-white md:px-10"
    >
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-end">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Service</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.08em] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">{description}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur transition-colors hover:bg-white/10"
        >
          Back to home
        </button>
      </div>
    </motion.section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0a0a0a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.12)',
          },
        }}
      />
      <LayoutGroup>
        <ScrollShell />
      </LayoutGroup>
    </BrowserRouter>
  )
}
