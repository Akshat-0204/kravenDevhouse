import type { CaseStudy } from '../../types/case-study'
import { vynoxCaseStudy } from './vynox'

export { vynoxCaseStudy }

export const caseStudies: CaseStudy[] = [
  vynoxCaseStudy,
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  if (!slug) return undefined
  const cleanSlug = slug.toLowerCase().trim()
  return caseStudies.find((item) => item.slug.toLowerCase() === cleanSlug)
}

export function getNextCaseStudy(currentSlug: string): CaseStudy {
  const currentIndex = caseStudies.findIndex((item) => item.slug === currentSlug)
  if (currentIndex === -1 || currentIndex === caseStudies.length - 1) {
    return caseStudies[0]
  }
  return caseStudies[currentIndex + 1]
}

export function getRelatedCaseStudies(currentSlug: string): CaseStudy[] {
  return caseStudies.filter((item) => item.slug !== currentSlug)
}
