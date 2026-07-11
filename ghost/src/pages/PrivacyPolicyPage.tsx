import { motion } from 'framer-motion'
import FooterSection from '../sections/footer'
import SiteNavbar from '../components/SiteNavbar'

const sections = [
  {
    title: '1. Information we collect',
    body:
      'We may collect the information you provide directly, such as your name, email address, company name, project details, and booking preferences. We may also collect limited technical data like browser type, device information, and usage patterns to help us improve the site.',
  },
  {
    title: '2. How we use information',
    body:
      'We use information to respond to inquiries, book calls, prepare proposals, deliver services, improve our website, maintain security, and communicate with clients and prospects.',
  },
  {
    title: '3. Information sharing',
    body:
      'We do not sell your personal information. We may share information with trusted service providers who help us run our business, such as hosting, analytics, communication, and scheduling tools, or when required by law.',
  },
  {
    title: '4. Cookies and analytics',
    body:
      'Our website may use cookies or similar technologies to understand how visitors use the site, remember preferences, and improve performance. You can control cookies through your browser settings.',
  },
  {
    title: '5. Data retention',
    body:
      'We keep personal information only as long as needed for the purposes described in this policy, to provide our services, comply with legal obligations, or resolve disputes.',
  },
  {
    title: '6. Security',
    body:
      'We use reasonable administrative, technical, and organizational safeguards to protect the information we handle. No system is perfectly secure, but we work to minimize risk and handle data carefully.',
  },
  {
    title: '7. Your choices',
    body:
      'You can request access, correction, or deletion of your personal information where applicable. You may also opt out of non-essential communications by contacting us directly.',
  },
  {
    title: '8. Third-party links and tools',
    body:
      'Our site may include links to third-party websites or services. We are not responsible for the privacy practices of those external services, and we encourage you to review their policies separately.',
  },
  {
    title: '9. Children’s privacy',
    body:
      'Our services are intended for business use and are not directed to children. We do not knowingly collect personal information from children.',
  },
  {
    title: '10. Changes to this policy',
    body:
      'We may update this Privacy Policy from time to time. When we do, we will revise the date above and post the updated version on this page.',
  },
  {
    title: '11. Contact',
    body:
      'If you have questions about this Privacy Policy or how your information is handled, contact us at hello@kraven.dev.',
  },
]

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </motion.h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
            This policy explains what information we collect, how we use it, and the choices you have when interacting with Kraven.
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
