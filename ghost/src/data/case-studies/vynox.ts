import type { CaseStudy } from '../../types/case-study'

export const vynoxCaseStudy: CaseStudy = {
  slug: 'vynox',
  client: {
    name: 'Vynox',
    website: 'https://vynoxmedia.com',
  },
  title: 'Vynox',
  description:
    'We engineered a conversion-driven web platform with fluid interactions, ultra-fast load times, and an editorial aesthetic that elevated brand perception and doubled qualified inbound inquiries.',
  industry: 'Digital Systems & Growth',
  services: [
    'Brand Positioning',
    'UX/UI Design',
    'Frontend Engineering',
    'Conversion Architecture',
    'Performance Optimization',
  ],
  timeline: '6 Weeks',
  cardImage: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/vynox-dp.png',
  hero: {
    video: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/vynoxMainWebsite.mp4',
    image: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/vynox-dp.png',
    poster: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/vynox-dp.png',
    alt: 'Vynox Rebrand and High-Performance Digital Platform',
  },
  overview:
    "We rebuilt the digital experience around a simple idea: the website shouldn't just explain what the company does. It should make potential clients want to work with them.",
  challenge: {
    title: 'The Challenge',
    description:
      'Vynox had grown into a premier performance consultancy. However, their digital footprint was held back by a slow, cluttered legacy CMS website that confused visitors and lost high-intent paid traffic.',
    bulletPoints: [
      'Bloated legacy WordPress infrastructure causing sluggish 4.8s initial page loads.',
      'High paid traffic bounce rate (74%) due to generic tropes and buried value propositions.',
      'Fragmented customer journeys that forced prospects into generic email forms rather than qualified booking flows.',
      'Lack of responsive visual hierarchy, failing to convey the caliber of enterprise clients they actually served.',
    ],
  },
  approach: [
    {
      title: 'Clarify the message within the first viewport',
      description:
        'Eliminated vague jargon. Positioned Vynox clearly as an elite performance engineering partner within the first 3 seconds of scroll.',
    },
    {
      title: 'Create a ruthless visual hierarchy',
      description:
        'Structured typography, high-contrast dark aesthetic, and generous whitespace so readers naturally flow from value proposition to proof.',
    },
    {
      title: 'Design around conversion velocity',
      description:
        'Replaced standard contact forms with a frictionless multi-step qualifier and interactive pipeline simulator tailored to executive decision makers.',
    },
    {
      title: 'Build a scalable, high-speed technical foundation',
      description:
        'Crafted in React and TypeScript with zero runtime bloat, sub-second edge CDN delivery, and smooth 60fps micro-animations.',
    },
  ],
  solution: [
    {
      title: '01 / High-Impact Hero & Positioning',
      description:
        'The new homepage establishes the value proposition within the first viewport and creates a clear, undeniable path toward conversion. Ambient lighting and precise typography command immediate authority.',
      media: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/v1.png',
      mediaType: 'image',
      alt: 'Homepage Hero & Brand Positioning',
    },
    {
      title: '02 / Structured Growth Infrastructure & Services',
      description:
        'We designed a modular showcase for Vynox’s core service pillars. By replacing unstructured paragraphs with clear capability cards and interactive visual cues, prospective partners can instantly understand their full spectrum of services.',
      media: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/v2.png',
      mediaType: 'image',
      alt: 'Vynox Services and Growth Infrastructure Modules',
    },
    {
      title: '03 / High-Velocity Qualification Funnel & Case Proof',
      description:
        'A streamlined qualification experience that presents real-world proof points and seamlessly routes high-intent prospects into automated booking and CRM advisory tables.',
      media: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/v3.png',
      mediaType: 'image',
      alt: 'Vynox Qualification Funnel and Performance Proof',
    },
  ],
  features: [
    {
      title: 'Conversion-focused landing experience',
      description:
        'Engineered to guide prospective enterprise clients directly from headline to qualified booking with zero friction.',
    },
    {
      title: 'Responsive modular design system',
      description:
        'Bespoke design tokens and reusable UI primitives crafted exclusively for Vynox’s brand identity.',
    },
    {
      title: 'Interactive case proof showcase',
      description:
        'Filterable portfolio matrix highlighting vertical-specific outcomes with live metrics and verified attribution data.',
    },
    {
      title: 'Performance-optimized implementation',
      description:
        '99/100 Google Lighthouse score with hardware-accelerated transitions and sub-second asset delivery.',
    },
    {
      title: 'Direct CRM pipeline synchronization',
      description:
        'Real-time automated routing that captures lead parameters and schedules meetings instantly into advisor calendars.',
    },
  ],
  technology: [
    {
      name: 'React 19',
      category: 'Frontend Framework',
      description: 'Component architecture and concurrent rendering for immediate interaction.',
    },
    {
      name: 'TypeScript',
      category: 'Type Safety',
      description: 'Strict type modeling for data feeds, props, and analytics contracts.',
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling System',
      description: 'Utility-first token system ensuring responsive styling and minimal CSS payload.',
    },
    {
      name: 'Framer Motion',
      category: 'Animation Engine',
      description: 'GPU-accelerated physics-based scroll reveals and fluid transitions.',
    },
    {
      name: 'Vite',
      category: 'Build Pipeline',
      description: 'Lightning-fast asset bundling and optimized modern ES module distribution.',
    },
    {
      name: 'Cloudflare Edge',
      category: 'Infrastructure',
      description: 'Global edge caching and sub-second content distribution.',
    },
  ],
  technologySummary:
    'The implementation was architected around maintainability, zero runtime bloat, and future expansion rather than simply reproducing a static visual design.',
  results: [
    {
      value: '+142%',
      label: 'Qualified Inbound Enquiries',
      description: 'Direct increase in booked discovery calls within 60 days of launch.',
    },
    {
      value: '0.8s',
      label: 'Average Page Load Time',
      description: 'Slashed from 4.8s on the legacy CMS to sub-second edge delivery.',
    },
    {
      value: '-54%',
      label: 'Paid Traffic Bounce Rate',
      description: 'High-intent search and social ad traffic converted at 3.2× previous baseline.',
    },
    {
      value: '2.4×',
      label: 'Multi-Touch Conversions',
      description: 'Substantial improvement in prospective deal progression velocity.',
    },
  ],
  testimonial: {
    quote:
      'Kraven Devhouse completely changed how our prospective clients see us. The transformation wasn’t just aesthetic - our conversion rates doubled in the first month, and our clients constantly compliment the speed and feel of the site.',
    author: 'Nitin Sheokand',
    role: 'Founder',
    company: 'Vynox Media',
    avatar: 'https://s3.eu-north-1.amazonaws.com/kravendev.dev.media/Vynox/avatar.jpg',
  }, 
  cta: {
    title: 'Have a product worth building?',
    description: "Let's engineer a digital experience that commands authority and drives measurable revenue.",
    label: 'Start a Conversation',
    href: '/book-a-call?service=software-solutions',
  },
  relatedCaseStudies: [],
}
