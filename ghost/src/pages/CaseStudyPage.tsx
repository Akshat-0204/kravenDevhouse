import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import SiteNavbar from '../components/SiteNavbar'
import FooterSection from '../sections/footer'
import CaseStudyTemplate from '../components/case-studies/CaseStudyTemplate'
import CaseStudySEO from '../components/case-studies/CaseStudySEO'
import { getCaseStudyBySlug } from '../data/case-studies'
import { useResolvedCaseStudy } from '../hooks/useSignedMedia'

export default function CaseStudyPage() {
  const params = useParams<{ slug?: string }>()
  const location = useLocation()

  // Extract slug from useParams or fallback from pathname (/case-studies/:slug)
  const slug =
    params.slug ||
    location.pathname.replace(/^\/case-studies\/?/, '').split('/')[0]

  const rawCaseStudy = getCaseStudyBySlug(slug)
  const { caseStudy } = useResolvedCaseStudy(rawCaseStudy)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-black text-white">
        <CaseStudySEO
          defaultTitle="Case Study Not Found — Kraven Devhouse"
          defaultDescription="The requested case study could not be located."
        />
        <SiteNavbar />

        <main className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center md:px-10">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d8b56a]">
            404 — NOT FOUND
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
            Case Study Not Found
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
            The project you are looking for does not exist or may have been moved.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-full bg-[#efe4d6] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              <span>← All Case Studies</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </main>

        <FooterSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <CaseStudySEO caseStudy={caseStudy} />
      <SiteNavbar />
      <main>
        <CaseStudyTemplate caseStudy={caseStudy} />
      </main>
      <FooterSection />
    </div>
  )
}
