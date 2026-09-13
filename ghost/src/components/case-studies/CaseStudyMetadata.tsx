import { motion } from 'framer-motion'
import type { CaseStudy } from '../../types/case-study'

const ease = [0.22, 1, 0.36, 1] as const

type CaseStudyMetadataProps = {
  caseStudy: CaseStudy
}

export default function CaseStudyMetadata({ caseStudy }: CaseStudyMetadataProps) {
  const stackItems = Array.isArray(caseStudy.technology)
    ? caseStudy.technology.map((item) => (typeof item === 'string' ? item : item.name))
    : []

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease }}
      className="mx-auto max-w-6xl px-6 md:px-10"
      aria-label="Project Information"
    >
      <div className="grid grid-cols-2 gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-md md:grid-cols-4 md:p-8 lg:grid-cols-5">
        {/* Client */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Client</span>
          <p className="mt-2 text-sm font-semibold tracking-tight text-white md:text-base">
            {caseStudy.client.name}
          </p>
          {caseStudy.client.website && (
            <a
              href={caseStudy.client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-[#d8b56a] hover:underline"
            >
              Visit Website ↗
            </a>
          )}
        </div>

        {/* Industry */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Industry</span>
          <p className="mt-2 text-sm font-semibold tracking-tight text-white md:text-base">
            {caseStudy.industry}
          </p>
        </div>

        {/* Services */}
        {caseStudy.services && caseStudy.services.length > 0 && (
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Services</span>
            <p className="mt-2 text-sm leading-snug text-white/80">
              {caseStudy.services.join(' · ')}
            </p>
          </div>
        )}

        {/* Timeline */}
        {caseStudy.timeline && (
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Timeline</span>
            <p className="mt-2 text-sm font-semibold tracking-tight text-white md:text-base">
              {caseStudy.timeline}
            </p>
          </div>
        )}

        {/* Stack */}
        {stackItems.length > 0 && (
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Stack</span>
            <p className="mt-2 text-sm leading-snug text-white/80">
              {stackItems.slice(0, 3).join(', ')}
              {stackItems.length > 3 ? ` +${stackItems.length - 3}` : ''}
            </p>
          </div>
        )}
      </div>
    </motion.section>
  )
}
