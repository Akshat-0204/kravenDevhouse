import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1] as const

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '#services',
    dropdown: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'AI Automation', href: '/services/ai-automation' },
      { label: 'CRM Systems', href: '/services/crm-systems' },
      { label: 'AI Chatbots', href: '/services/ai-chatbots' },
      { label: 'Custom Software', href: '/services/custom-software' },
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

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isDesktop = useIsDesktop()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className={[
        'fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-[1.5rem] px-4 py-3 md:top-5',
        scrolled
          ? 'border border-white/10 bg-black/45 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
          : 'border border-white/8 bg-black/20 backdrop-blur-xl',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
          <span className="text-xl font-semibold tracking-[0.18em] text-[#efe7db] md:text-2xl">
            Kraven
          </span>
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

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const target = document.querySelector('#cta')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                navigate('/#contact')
              }
            }}
            className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 lg:inline-flex"
          >
            Book a Call
          </button>

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
      </div>
    </motion.header>
  )
}
