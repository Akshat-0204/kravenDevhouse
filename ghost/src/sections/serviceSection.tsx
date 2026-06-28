import { motion } from 'framer-motion'
import FeatureTile from '../components/serviceTile'

const services = [
  {
    number: '01',
    title: 'Custom Website Development',
    description:
      'Beautiful, fast, and conversion-focused websites engineered to elevate your brand and turn visitors into customers.',
    image: '/services/website.jpg',
  },
  {
    number: '02',
    title: 'AI Workflow Automation',
    description:
      'Automate repetitive tasks, connect your tools, and build intelligent systems that save time and increase efficiency.',
    image: '/services/automation.jpg',
  },
  {
    number: '03',
    title: 'CRM & Lead Systems',
    description:
      'Centralize your customer interactions with powerful CRM systems designed to capture, nurture, and convert leads.',
    image: '/services/crm.jpg',
  },
  {
    number: '04',
    title: 'AI Agents & Chatbots',
    description:
      'Deploy intelligent AI assistants that engage customers, answer questions, and book appointments 24/7.',
    image: '/services/chatbot.jpg',
  },
]

const ServicesSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
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

        <div className="grid gap-6">
          {services.map((service, index) => (
            <FeatureTile
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
              image={service.image}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
