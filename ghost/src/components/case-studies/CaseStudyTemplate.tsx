import type { CaseStudy } from '../../types/case-study'
import CaseStudyHero from './CaseStudyHero'
import CaseStudyMetadata from './CaseStudyMetadata'
import CaseStudyOverview from './CaseStudyOverview'
import ChallengeSection from './ChallengeSection'
import BeforeAfter from './BeforeAfter'
import ApproachSection from './ApproachSection'
import SolutionSection from './SolutionSection'
import FeaturesSection from './FeaturesSection'
import TechnologySection from './TechnologySection'
import ResultsSection from './ResultsSection'
import Gallery from './Gallery'
import Testimonial from './Testimonial'
import NextCaseStudy from './NextCaseStudy'
import ProjectCTA from './ProjectCTA'

type CaseStudyTemplateProps = {
  caseStudy: CaseStudy
}

export default function CaseStudyTemplate({ caseStudy }: CaseStudyTemplateProps) {
  return (
    <article className="min-h-screen bg-black text-white">
      {/* 1. Hero */}
      <CaseStudyHero caseStudy={caseStudy} />

      {/* 2. Metadata Info Bar */}
      <CaseStudyMetadata caseStudy={caseStudy} />

      {/* 3. Project Statement Overview */}
      {caseStudy.overview && <CaseStudyOverview overview={caseStudy.overview} />}

      {/* 4. The Challenge (01) */}
      {caseStudy.challenge && <ChallengeSection challenge={caseStudy.challenge} />}

      {/* 5. The Transformation (Before & After) */}
      {caseStudy.transformation && (
        <BeforeAfter transformation={caseStudy.transformation} />
      )}

      {/* 6. The Approach (02) */}
      {caseStudy.approach && caseStudy.approach.length > 0 && (
        <ApproachSection approach={caseStudy.approach} />
      )}

      {/* 7. The Solution (03) */}
      {caseStudy.solution && caseStudy.solution.length > 0 && (
        <SolutionSection solution={caseStudy.solution} />
      )}

      {/* 8. Key Features */}
      {caseStudy.features && caseStudy.features.length > 0 && (
        <FeaturesSection features={caseStudy.features} />
      )}

      {/* 9. Technology Architecture */}
      {caseStudy.technology && (
        <TechnologySection
          technology={caseStudy.technology}
          technologySummary={caseStudy.technologySummary}
        />
      )}

      {/* 10. The Results (04) */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <ResultsSection results={caseStudy.results} />
      )}

      {/* 11. Visual Showcase Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <Gallery gallery={caseStudy.gallery} />
      )}

      {/* 12. Testimonial */}
      {caseStudy.testimonial && <Testimonial testimonial={caseStudy.testimonial} />}

      {/* 13. Next Case Study Navigation */}
      <NextCaseStudy currentSlug={caseStudy.slug} />

      {/* 14. Kraven CTA */}
      <ProjectCTA cta={caseStudy.cta} />
    </article>
  )
}
