import { motion } from 'framer-motion'
import FeatureTile from '../components/serviceTile'

const services = [
  {
    number: '01',
    title: 'Growth Systems',
    description:
      'Websites and CRM infrastructures that attract, convert and retain customers .',
    image: '/growthSystemService.png',
    href: '/services/growth-systems',
  },
  {
    number: '02',
    title: 'Automation systems',
    description:
      'Automate repetitive tasks, connect your tools, and build intelligent systems that save time and increase efficiency.',
    image: '/automationSystemsServices.png',
    href: '/services/automation-systems',
  },
  {
    number: '03',
    title: 'Intelligent Systems',
    description:
      'Custom AI agents and reporting systems that give teams instant answers and actionable insights',
    image: '/intelligentSystemServices.png',
    href: '/services/intelligent-systems',
  },
  {
    number: '04',
    title: 'Software Solutions',
    description:
      'Custom software and frontend engineering — from marketing sites to full product builds — for teams that need more than automation.',
    image: '/softwareSolutionsService.avif',
    href: '/services/software-solutions',
  },
]

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black px-6 py-20 md:px-10 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 100%)',
        }}
      >
        <div
          className="aurora-blob absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-orange-500/20 blur-3xl"
          style={{ animationDuration: '24s' }}
        />
        <div
          className="aurora-blob absolute -right-20 top-1/3 h-[22rem] w-[22rem] rounded-full bg-[#efe4d6]/15 blur-3xl"
          style={{ animationDuration: '30s', animationDelay: '-6s' }}
        />
        <div
          className="aurora-blob absolute -bottom-24 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[#D8B56A]/15 blur-3xl"
          style={{ animationDuration: '20s', animationDelay: '-10s' }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.45em] text-white/35">
              Services
            </span>
            <h2 className="mt-4 max-w-sm text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
              What we build for teams that care about taste.
            </h2>
          </div>
          <p className="max-w-2xl self-end text-sm leading-relaxed text-white/55 md:text-base">
            The services layout is now more atmospheric and less blocky. Each card
            behaves like a premium editorial panel with image depth, stronger spacing,
            and a clearer call to action.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <FeatureTile
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
              image={service.image}
              href={service.href}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
