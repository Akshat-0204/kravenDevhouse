import { motion } from 'framer-motion'
import FooterSection from '../sections/footer'
import SiteNavbar from '../components/SiteNavbar'

const sections = [
  {
    title: '1. Agreement to these terms',
    body:
      'By accessing Kraven’s website or engaging with our services, you agree to these Terms of Service. If you are accepting on behalf of a company or other legal entity, you confirm that you have authority to bind that entity.',
  },
  {
    title: '2. What we do',
    body:
      'Kraven is a creative systems and automation studio. We design and build websites, CRM workflows, automation systems, AI agents, reporting tools, and related digital experiences tailored to each client’s needs.',
  },
  {
    title: '3. Proposals, scope, and delivery',
    body:
      'Each project begins with a discovery process and may be followed by a proposal, statement of work, or written scope. Timelines, deliverables, and revision rounds are defined there. Any work outside the agreed scope may require a new estimate or change order.',
  },
  {
    title: '4. Client responsibilities',
    body:
      'Clients agree to provide timely feedback, access to necessary systems, accurate content, and any approvals required to keep work moving. Delays caused by missing materials or approvals may shift delivery dates.',
  },
  {
    title: '5. Payments',
    body:
      'Payment terms are defined in the project agreement or invoice. Unless otherwise stated, fees are due in accordance with the schedule provided by Kraven. Late payments may pause work until balances are resolved.',
  },
  {
    title: '6. Intellectual property',
    body:
      'Upon full payment, clients typically own the final deliverables created specifically for them, excluding Kraven’s pre-existing frameworks, internal tools, methods, templates, and reusable know-how. We may showcase completed work in our portfolio unless a written agreement says otherwise.',
  },
  {
    title: '7. Third-party services',
    body:
      'Some projects rely on third-party tools, APIs, hosting, or platforms. Kraven is not responsible for outages, pricing changes, policy changes, or restrictions imposed by third-party providers.',
  },
  {
    title: '8. Acceptable use',
    body:
      'You agree not to use our website or services for unlawful activity, misuse our systems, infringe rights, or interfere with the security or operation of the services we provide.',
  },
  {
    title: '9. Warranty disclaimer',
    body:
      'Our website and services are provided on an “as is” and “as available” basis. While we aim for high-quality, reliable work, we do not guarantee uninterrupted access, error-free operation, or specific business outcomes.',
  },
  {
    title: '10. Limitation of liability',
    body:
      'To the fullest extent permitted by law, Kraven will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.',
  },
  {
    title: '11. Contact',
    body:
      'If you have questions about these terms, contact us at hello@kraven.dev.',
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="bg-black text-white">
      <SiteNavbar />
      <main className="px-6 pb-20 pt-32 md:px-10 md:pt-40">
        <section className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.45em] text-white/40"
          >
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-4xl font-semibold tracking-[-0.08em] md:text-6xl"
          >
            Terms of Service
          </motion.h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
            These terms describe how we work together, what you can expect from Kraven, and the responsibilities that help projects run smoothly.
          </p>
        </section>

        <section className="mx-auto mt-16 grid max-w-4xl gap-6">
          {sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <h2 className="text-xl font-medium tracking-[-0.04em] text-white md:text-2xl">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
                {section.body}
              </p>
            </motion.article>
          ))}
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
