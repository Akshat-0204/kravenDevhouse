import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SiteNavbar from '../components/SiteNavbar'
import FooterSection from '../sections/footer'
import CaseStudyCard from '../components/case-studies/CaseStudyCard'
import CaseStudySEO from '../components/case-studies/CaseStudySEO'
import Threads from '../components/Threads'
import { caseStudies as rawCaseStudies } from '../data/case-studies'
import { useResolvedCaseStudies } from '../hooks/useSignedMedia'

const ease = [0.22, 1, 0.36, 1] as const

export default function CaseStudiesPage() {
  const { caseStudies } = useResolvedCaseStudies(rawCaseStudies)
  return (
    <div className="min-h-screen bg-black text-white">
      <CaseStudySEO
        defaultTitle="Selected Work & Case Studies — Kraven Devhouse"
        defaultDescription="A closer look at the systems, products, and digital experiences we've built for ambitious teams."
      />

      <SiteNavbar />

      <main className="pt-24 md:pt-28">
        {/* Editorial Hero */}
        <section className="relative mx-auto flex min-h-[55vh] max-w-6xl flex-col items-center justify-center overflow-hidden px-6 text-center md:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <Threads amplitude={1} distance={0} enableMouseInteraction />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),rgba(0,0,0,0.85))]" />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="relative z-10 text-xs uppercase tracking-[0.45em] text-[#d8b56a]"
          >
            SELECTED WORK
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="relative z-10 mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.08em] text-[#f4ebde] md:text-7xl lg:text-[5.75rem]"
          >
            Built for the real world.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.16 }}
            className="relative z-10 mt-8 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
          >
            A closer look at the systems, products, and digital experiences we’ve built for ambitious teams. No generic templates—only engineered outcomes.
          </motion.p>
        </section>

        {/* Case Studies Listing Section */}
        <section className="px-6 py-12 md:px-10 md:py-20" aria-label="Case Studies List">
          <div className="mx-auto max-w-7xl">
            {/* Grid of Case Studies */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((caseStudy, index) => (
                <CaseStudyCard
                  key={caseStudy.slug}
                  caseStudy={caseStudy}
                  index={index}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Global Bottom CTA */}
        <section className="relative px-6 py-20 md:px-10 md:py-32" aria-label="CTA">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_40%)]" />
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-20 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-12 md:py-28">
            <span className="text-xs uppercase tracking-[0.45em] text-[#d8b56a]">
              COLLABORATION
            </span>
            <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-medium tracking-[-0.06em] text-white md:text-5xl lg:text-6xl">
              Your next digital experience could be the case study we write next.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Let&apos;s build software, automation workflows, and high-converting systems tailored to your business goals.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/book-a-call"
                className="inline-flex items-center gap-3.5 rounded-full bg-[#efe4d6] px-8 py-4 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                <span>Work with Kraven</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  )
}
