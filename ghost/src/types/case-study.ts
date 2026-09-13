export type CaseStudyMedia = {
  image?: string
  video?: string
  poster?: string
  alt?: string
}

export type CaseStudyClient = {
  name: string
  website?: string
  logo?: string
}

export type TransformationExperience = {
  title?: string
  description?: string
  before: {
    video?: string
    image?: string
    poster?: string
    label?: string
    description?: string
  }
  after: {
    video?: string
    image?: string
    poster?: string
    label?: string
    description?: string
  }
}

export type ApproachPrinciple = {
  title: string
  description: string
}

export type SolutionItem = {
  title: string
  description: string
  media?: string
  mediaType?: 'image' | 'video'
  poster?: string
  alt?: string
}

export type FeatureItem = {
  title: string
  description?: string
}

export type CaseStudyTechnology =
  | string
  | {
      name: string
      category?: string
      description?: string
    }

export type CaseStudyResult = {
  value?: string
  label: string
  description?: string
}

export type GalleryItem = {
  src: string
  alt: string
  type?: 'image' | 'video'
  poster?: string
  size?: 'small' | 'medium' | 'large' | 'full'
  caption?: string
}

export type TestimonialData = {
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: string
}

export type ProjectCTAData = {
  title: string
  description?: string
  label: string
  href?: string
}

export type CaseStudy = {
  slug: string
  client: CaseStudyClient
  title: string
  description: string
  industry: string
  services: string[]
  timeline?: string
  cardImage?: string
  hero: CaseStudyMedia
  overview: string
  challenge: {
    title?: string
    description: string
    bulletPoints?: string[]
  }
  transformation?: TransformationExperience
  approach?: ApproachPrinciple[]
  solution?: SolutionItem[]
  features?: FeatureItem[]
  technology?: CaseStudyTechnology[]
  technologySummary?: string
  results?: CaseStudyResult[]
  gallery?: GalleryItem[]
  testimonial?: TestimonialData
  cta?: ProjectCTAData
  relatedCaseStudies?: string[]
}
