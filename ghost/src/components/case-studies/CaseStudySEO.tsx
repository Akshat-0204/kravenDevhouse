import { useEffect } from 'react'
import type { CaseStudy } from '../../types/case-study'

type CaseStudySEOProps = {
  caseStudy?: CaseStudy
  defaultTitle?: string
  defaultDescription?: string
}

export default function CaseStudySEO({
  caseStudy,
  defaultTitle = 'Case Studies — Kraven Devhouse',
  defaultDescription = "A closer look at the systems, products, and digital experiences we've built for ambitious teams.",
}: CaseStudySEOProps) {
  useEffect(() => {
    const title = caseStudy
      ? `${caseStudy.client.name} — ${caseStudy.title} | Kraven Devhouse`
      : defaultTitle
    const description = caseStudy?.description || defaultDescription

    document.title = title

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', title)

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogDesc) {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      document.head.appendChild(ogDesc)
    }
    ogDesc.setAttribute('content', description)

    // Open Graph Image
    if (caseStudy?.hero?.image) {
      let ogImg = document.querySelector('meta[property="og:image"]')
      if (!ogImg) {
        ogImg = document.createElement('meta')
        ogImg.setAttribute('property', 'og:image')
        document.head.appendChild(ogImg)
      }
      const absoluteUrl = caseStudy.hero.image.startsWith('http')
        ? caseStudy.hero.image
        : `${window.location.origin}${caseStudy.hero.image}`
      ogImg.setAttribute('content', absoluteUrl)
    }
  }, [caseStudy, defaultTitle, defaultDescription])

  return null
}
