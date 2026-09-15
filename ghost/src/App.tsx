import { AnimatePresence, LayoutGroup, motion, useScroll } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import FooterSection from './sections/footer'
import HowItWorksSection from './sections/howItWorks'
import ServicesSection from './sections/serviceSection'
// import TestimonialSection from './sections/testimonialSection'
import WhyUsSection from './sections/whyUsSection'
import WorkWithUsSection from './sections/workWithUs'
import { SparkleParticles } from './components/SparkleParticles'
import Threads from './components/Threads'
import { scrollToSection } from './utils/scrollToSection'
import GrowthSystemsPage from './pages/GrowthSystemsPage'
import AutomationSystemsPage from './pages/AutomationSystems'
import IntelligentSystems from './pages/IntelligentSystems'
import SoftwareSolutionsPage from './pages/SoftwareSolutions'
import BookCallPage from './pages/BookCallPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyPage from './pages/CaseStudyPage'

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
      { label: 'Software Solutions', href: '/services/software-solutions' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'How It Works', href: '#how-it-works' },
  // { label: 'Testimonials', href: '#testimonials' },
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
      setNavVisible(value > 30)
      if (value > 30 && menuOpen) {
        setMenuOpen(false)
      }
    })
  }, [scrollY, menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
    if (location.pathname !== '/') {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])





  const currentServiceName = useMemo(() => {
    const match = navLinks[1].dropdown?.find((item) => item.href === location.pathname)
    return match?.label ?? 'Services'
  }, [location.pathname])
  const isServiceRoute = location.pathname.startsWith('/services/')
  const isGrowthSystemsRoute = location.pathname === '/services/growth-systems'
  const isAutoationSystemsRoute = location.pathname === '/services/automation-systems'
  const isIntelligentSystemsRoute = location.pathname === '/services/intelligent-systems'
  const isSoftwareSolutionsRoute = location.pathname === '/services/software-solutions'
  const isBookCallRoute = location.pathname === '/book-a-call'
  const isPrivacyPolicyRoute = location.pathname === '/privacy-policy'
  const isTermsOfServiceRoute = location.pathname === '/terms-of-service'
  const isCaseStudiesIndex = location.pathname === '/case-studies' || location.pathname === '/case-studies/'
  const isCaseStudyDetail = location.pathname.startsWith('/case-studies/') && location.pathname !== '/case-studies/'

  if (isCaseStudiesIndex) {
    return <CaseStudiesPage />
  }
  if (isCaseStudyDetail) {
    return <CaseStudyPage />
  }
  if (isGrowthSystemsRoute) {
    return <GrowthSystemsPage />
  }
  if (isAutoationSystemsRoute) {
    return <AutomationSystemsPage />
  }
  if (isIntelligentSystemsRoute) {
    return <IntelligentSystems />
  }
  if (isSoftwareSolutionsRoute) {
    return <SoftwareSolutionsPage />
  }
  if (isBookCallRoute) {
    return <BookCallPage />
  }
  if (isPrivacyPolicyRoute) {
    return <PrivacyPolicyPage />
  }
  if (isTermsOfServiceRoute) {
    return <TermsOfServicePage />
  }

  return (
    <div className="bg-black text-white">
      <AnimatePresence>
        {navVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="navbar-fading-blur"
            />
            <motion.header
              initial={{ opacity: 0, y: -24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease }}
              className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:top-5"
            >
            <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => scrollToSection(navigate, 'top')}
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
                          if (link.href === '/') {
                            scrollToSection(navigate, 'top')
                          } else if (link.href.startsWith('#')) {
                            scrollToSection(navigate, link.href.slice(1))
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
          </>
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
          <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black flex flex-col justify-between">
            {/* Top Fading Blur behind static header */}
            <div className="hero-top-fading-blur" />

            {/* Top Navigation / Brand Header */}
            <header className="relative z-30 px-6 pt-5 md:px-10 md:pt-8">
              <div className="flex items-center justify-between gap-4">
                <button onClick={() => scrollToSection(navigate, 'top')} className="flex items-center gap-3 text-left">
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
                          className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white"
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
                          if (link.href === '/') {
                            scrollToSection(navigate, 'top')
                          } else if (link.href.startsWith('#')) {
                            scrollToSection(navigate, link.href.slice(1))
                          } else {
                            navigate(link.href)
                          }
                        }}
                        className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                      >
                        {link.label}
                      </button>
                    ),
                  )}
                </nav>

                {/* Mobile Navigation Hamburger in Hero */}
                <div className="relative lg:hidden">
                  <button
                    onClick={() => setMenuOpen((open) => !open)}
                    onMouseEnter={() => isDesktop && setMenuOpen(true)}
                    className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 backdrop-blur transition-colors hover:bg-white/10"
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
                        className="absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-[1.35rem] border border-white/10 bg-[#0d0d0e]/95 p-3 shadow-[0_28px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl z-50"
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
            </header>

            {/* Background Layer: Sparkling Particles and Ambient Radial Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <SparkleParticles
                className="absolute inset-0 h-full w-full"
                particleColor="#f0e6d6"
                backgroundColor="transparent"
                baseDensity={120}
                particleCount={15}
                maxParticleSize={2}
                minParticleOpacity={0.35}
                maxSpeed={0.8}
                opacityAnimationSpeed={2.8}
                enableHoverGrab
                enableParallax
                zIndexLevel={0}
              />
            </div>
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.85)_85%)] pointer-events-none" />

            {/* Tilted Matte Charcoal Left Panel with Grains & Boundary Black Fade */}
            <div className="hero-tilted-matte-panel">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.04),transparent_55%)] pointer-events-none" />
              <div className="hero-grain-overlay" />
              <div className="hero-boundary-black-fade" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.4)_70%,#000000_100%)] pointer-events-none" />
            </div>

            {/* Tilted Threads Boundary with one end in right bottom corner */}
            <div className="hero-tilted-threads-container">
              <div className="hero-tilted-threads-inner">
                <Threads
                  color={[0.95, 0.91, 0.84]}
                  amplitude={1.35}
                  distance={0.18}
                  enableMouseInteraction
                />
              </div>
            </div>

            {/* Hero Main Content (Z-Index 20 above overlay) */}
            <div className="relative z-20 flex flex-1 flex-col justify-center px-4 py-8 md:px-8 lg:px-12 xl:px-16 max-w-[84rem] mx-auto w-full pt-6 md:pt-14 pb-4">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl lg:max-w-4xl text-center md:text-left mx-auto md:mx-0 translate-x-0 md:-translate-x-3 lg:-translate-x-5 translate-y-1 md:translate-y-3 flex flex-col items-center md:items-start"
              >
                {/* Terminal / Live Status Line with blipping >_ cursor */}
                <div className="mb-3.5 md:mb-6 inline-flex items-center gap-2 md:gap-2.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 md:px-3.5 md:py-1.5 text-[11px] md:text-sm font-mono text-white/65 backdrop-blur-md">
                  <span className="flex items-center font-bold text-orange-300 tracking-tight">
                    &gt;<span className="animate-terminal-blink">_</span>
                  </span>
                  <span className="font-mono text-[11px] md:text-[0.8125rem] text-white/70 tracking-tight">
                    building production ready softwares...
                  </span>
                </div>

                <h1 className="text-[clamp(3.15rem,9.5vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[#efe7db] drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <span className="block">AI Systems</span>
                  <span className="block text-[#f4ece1]">that runs your</span>
                  <span className="block text-orange-300">businesses.</span>
                </h1>

                <p className="mt-5 md:mt-10 max-w-xl text-sm sm:text-base md:text-lg lg:text-[1.125rem] leading-relaxed text-white/70 font-normal tracking-[-0.01em] mx-auto md:mx-0">
                  Kraven Devhouse designs and ships the AI-powered software — web apps, internal tools, and automations — that ambitious companies use to actually run, not just demo.
                </p>

                <div className="mt-7 md:mt-12 flex justify-center md:justify-start w-full">
                  <Link
                    to="/book-a-call"
                    className="group inline-flex items-center gap-2.5 md:gap-3.5 rounded-full bg-[#D8C3A5] px-5 py-3 md:px-7 md:py-4 text-xs sm:text-sm md:text-base font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#efe4d6] hover:shadow-[0_0_30px_rgba(216,195,165,0.35)]"
                  >
                    <span>Book a call</span>
                    <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-black text-white text-[10px] md:text-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>

                {/* Capsulated Service Tags (Translucent Glass Pills) */}
                <div className="mt-5 md:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-2.5">
                  {['Custom CRMs', 'AI Automations', 'Websites'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 md:px-3.5 md:py-1 text-[11px] md:text-sm font-normal text-white/55 backdrop-blur-lg transition-all duration-300 hover:border-white/18 hover:bg-white/[0.07] hover:text-white/85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom spacer for clean vertical rhythm */}
            <div className="relative z-20 h-8 md:h-12 pointer-events-none" />
          </section>

        <SectionMotion>
          <HowItWorksSection />
        </SectionMotion>

        {/* Testimonials temporarily disabled
        <div className="scroll-section snap-start snap-always" id="testimonials">
          <SectionMotion>
            <TestimonialSection />
          </SectionMotion>
        </div>
        */}

        <SectionMotion>
          <ServicesSection />
        </SectionMotion>

        <SectionMotion>
          <WhyUsSection />
        </SectionMotion>

        <SectionMotion>
          <WorkWithUsSection />
        </SectionMotion>

        <SectionMotion>
          <FooterSection />
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
