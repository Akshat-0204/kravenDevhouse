import { AnimatePresence, motion } from 'framer-motion'
import { addDays, format, startOfDay } from 'date-fns'
import { useMemo, useState, type FormEvent } from 'react'
import { DayPicker } from 'react-day-picker'
import toast from 'react-hot-toast'
import FooterSection from '../sections/footer'
import SiteNavbar from '../components/SiteNavbar'

const ease = [0.22, 1, 0.36, 1] as const

const serviceCards = [
  {
    key: 'growth',
    title: 'Growth Systems',
    subtitle: 'Websites, CRM, Lead Capture',
  },
  {
    key: 'automation',
    title: 'Automation Systems',
    subtitle: 'AI Appointment Booking, Client Onboarding, Workflow Automation',
  },
  {
    key: 'intelligence',
    title: 'Intelligence Systems',
    subtitle: 'AI Agents, Reporting, Business Intelligence',
  },
] as const

const steps = [
  'Book your slot.',
  "We'll review your business before the call.",
  "We meet, discuss challenges, and explore solutions.",
  "You'll receive a clear roadmap and next steps.",
]

const faqItems = [
  {
    question: 'How long is the call?',
    answer: 'Typically 30–45 minutes.',
  },
  {
    question: 'Is the call free?',
    answer: 'Yes. No obligations.',
  },
  {
    question: 'What happens after the call?',
    answer: 'If there’s a good fit, we’ll propose a tailored solution and roadmap.',
  },
]

type FormState = {
  fullName: string
  workEmail: string
  companyName: string
  companyWebsite: string
  projectDetails: string
  selectedServices: string[]
  preferredDate: Date | undefined
  preferredTime: string
}

type FormErrors = Partial<Record<keyof Omit<FormState, 'preferredDate' | 'selectedServices'> | 'preferredDate' | 'selectedServices', string>>

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']

function SectionTitle({
  eyebrow,
  title,
  align = 'left',
}: {
  eyebrow: string
  title: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease }}
        className="text-xs uppercase tracking-[0.45em] text-white/35"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease, delay: 0.05 }}
        className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-white md:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  )
}

function BookingCard({
  title,
  subtitle,
  selected,
  onClick,
}: {
  title: string
  subtitle: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={[
        'group relative overflow-hidden rounded-[1.4rem] border bg-white/[0.03] p-5 text-left transition-colors',
        selected ? 'border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.18)]' : 'border-white/10',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium tracking-[-0.04em] text-white md:text-xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{subtitle}</p>
        </div>
        <motion.span
          animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.6 }}
          transition={{ duration: 0.2, ease }}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white"
        >
          <span className="text-sm leading-none">✓</span>
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ opacity: selected ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 bg-white/[0.025]"
      />
    </motion.button>
  )
}

function FAQItem({
  question,
  answer,
  index,
  open,
  onToggle,
}: {
  question: string
  answer: string
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      onClick={onToggle}
      className="w-full border-b border-white/10 py-5 text-left"
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-base font-medium tracking-[-0.04em] text-white md:text-lg">
          {question}
        </span>
        <span className="text-white/45">{open ? '—' : '+'}</span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.28, ease }}
            className="overflow-hidden pt-3 text-sm leading-relaxed text-white/58 md:text-base"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function formatDateLabel(date: Date | undefined) {
  return date ? format(date, 'EEEE, MMMM d, yyyy') : ''
}

export default function BookCallPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [form, setForm] = useState<FormState>({
    fullName: '',
    workEmail: '',
    companyName: '',
    companyWebsite: '',
    projectDetails: '',
    selectedServices: [],
    preferredDate: undefined,
    preferredTime: '',
  })

  const tomorrow = useMemo(() => startOfDay(addDays(new Date(), 1)), [])
  const selectedDateLabel = formatDateLabel(form.preferredDate)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const toggleService = (key: string) => {
    setForm((current) => {
      const selectedServices = current.selectedServices.includes(key)
        ? current.selectedServices.filter((item) => item !== key)
        : [...current.selectedServices, key]

      return { ...current, selectedServices }
    })
    setErrors((current) => ({ ...current, selectedServices: undefined }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.workEmail.trim()) nextErrors.workEmail = 'Work email is required.'
    if (!form.companyName.trim()) nextErrors.companyName = 'Company name is required.'
    if (!form.projectDetails.trim()) nextErrors.projectDetails = 'Tell us a bit about the project.'
    if (form.selectedServices.length === 0) nextErrors.selectedServices = 'Select at least one service.'
    if (!form.preferredDate) nextErrors.preferredDate = 'Choose a preferred date.'
    if (!form.preferredTime) nextErrors.preferredTime = 'Choose a preferred time.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) {
      toast.error('Please complete the highlighted fields.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          services: form.selectedServices,
          preferredDate: format(form.preferredDate!, 'yyyy-MM-dd'),
        }),
      })

      const raw = await response.text()
      const data = raw ? (JSON.parse(raw) as { error?: string }) : {}
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      toast.success('Booking request submitted.')
      setForm({
        fullName: '',
        workEmail: '',
        companyName: '',
        companyWebsite: '',
        projectDetails: '',
        selectedServices: [],
        preferredDate: undefined,
        preferredTime: '',
      })
      setErrors({})
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit booking request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black text-white">
      <SiteNavbar />

      <main className="pt-24 md:pt-28">
        <section className="px-6 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col justify-between border-b border-white/10 pb-10 lg:border-b-0 lg:border-r lg:border-white/10 lg:pb-0 lg:pr-10"
            >
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.45em] text-white/35">
                  01 / DISCOVERY CALL
                </p>
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.08 }}
                  className="mt-6 text-5xl font-semibold tracking-[-0.08em] text-white md:text-7xl lg:text-[5.8rem]"
                >
                  Let&apos;s explore what&apos;s possible.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.16 }}
                  className="mt-8 max-w-lg text-base leading-relaxed text-white/62 md:text-lg"
                >
                  Tell us about your business, your challenges, and where you want to go. We&apos;ll discuss
                  ideas, opportunities, and whether we&apos;re the right fit.
                  <br />
                  <br />
                  No sales pressure. No generic pitches. Just a focused conversation about your business.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.22 }}
                className="mt-12 space-y-3 border-t border-white/10 pt-8"
              >
                {['30-minute strategy session', 'Tailored recommendations', 'Completely free'].map(
                  (item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, ease, delay: 0.28 + index * 0.06 }}
                      className="flex items-center gap-3 text-sm text-white/72 md:text-base"
                    >
                      <span className="text-white/45">✓</span>
                      <span>{item}</span>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { label: 'Full Name', key: 'fullName', required: true },
                  { label: 'Work Email', key: 'workEmail', required: true },
                  { label: 'Company Name', key: 'companyName', required: true },
                  { label: 'Company Website', key: 'companyWebsite', required: false },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.35em] text-white/40">
                        {field.label}
                      </span>
                      {field.required ? <span className="text-xs text-white/20">Required</span> : null}
                    </div>
                    <input
                      value={form[field.key as keyof FormState] as string}
                      onChange={(e) => update(field.key as keyof FormState, e.target.value as never)}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
                      placeholder={field.label}
                      type={field.key === 'workEmail' ? 'email' : 'text'}
                    />
                    {errors[field.key as keyof FormErrors] ? (
                      <p className="mt-2 text-xs text-white/45">{errors[field.key as keyof FormErrors]}</p>
                    ) : null}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-white/40">Select services</span>
                  <span className="text-xs text-white/20">Choose one or more</span>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {serviceCards.map((service) => {
                    const selected = form.selectedServices.includes(service.title)
                    return (
                      <BookingCard
                        key={service.key}
                        title={service.title}
                        subtitle={service.subtitle}
                        selected={selected}
                        onClick={() => toggleService(service.title)}
                      />
                    )
                  })}
                </div>
                {errors.selectedServices ? (
                  <p className="mt-2 text-xs text-white/45">{errors.selectedServices}</p>
                ) : null}
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <label className="block">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.35em] text-white/40">
                      Tell us about your project
                    </span>
                  </div>
                  <textarea
                    value={form.projectDetails}
                    onChange={(e) => update('projectDetails', e.target.value)}
                    placeholder="Share your goals, current challenges, and what you'd like to build..."
                    rows={7}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
                  />
                  {errors.projectDetails ? (
                    <p className="mt-2 text-xs text-white/45">{errors.projectDetails}</p>
                  ) : null}
                </label>

                <div className="space-y-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.35em] text-white/40">
                        Preferred date
                      </span>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/10 bg-black/35 p-3">
                      <DayPicker
                        mode="single"
                        selected={form.preferredDate}
                        onSelect={(date) => {
                          update('preferredDate', date)
                          update('preferredTime', '')
                        }}
                        disabled={{ before: tomorrow }}
                        className="w-full text-white"
                        classNames={{
                          root: 'w-full',
                          months: 'flex w-full flex-col gap-4',
                          month: 'w-full space-y-4',
                          month_caption: 'flex items-center justify-between px-1 pb-2',
                          caption_label: 'text-sm uppercase tracking-[0.35em] text-white/45',
                          nav: 'flex items-center gap-2',
                          button_previous:
                            'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 hover:bg-white/10',
                          button_next:
                            'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 hover:bg-white/10',
                          month_grid: 'w-full border-collapse',
                          weekdays: 'grid grid-cols-7 mb-2',
                          weekday: 'text-[10px] uppercase tracking-[0.35em] text-white/28 text-center py-2',
                          week: 'grid grid-cols-7',
                          day: 'flex items-center justify-center p-0 text-sm text-white/70',
                          day_button:
                            'flex h-11 w-full items-center justify-center rounded-full transition-colors hover:bg-white/10',
                          selected: 'bg-white text-black hover:bg-white',
                          today: 'border border-white/20',
                          outside: 'text-white/15',
                          disabled: 'text-white/15 line-through',
                        }}
                      />
                    </div>
                    {errors.preferredDate ? (
                      <p className="mt-2 text-xs text-white/45">{errors.preferredDate}</p>
                    ) : null}
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.35em] text-white/40">
                        Preferred time
                      </span>
                      {selectedDateLabel ? (
                        <span className="text-xs text-white/28">{selectedDateLabel}</span>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => {
                        const selected = form.preferredTime === slot
                        const disabled = !form.preferredDate
                        return (
                          <motion.button
                            key={slot}
                            type="button"
                            whileHover={!disabled ? { y: -2 } : undefined}
                            whileTap={!disabled ? { scale: 0.98 } : undefined}
                            onClick={() => !disabled && update('preferredTime', slot)}
                            disabled={disabled}
                            className={[
                              'rounded-2xl border px-4 py-3 text-sm transition-colors',
                              selected
                                ? 'border-white bg-white text-black'
                                : 'border-white/10 bg-black/35 text-white/72',
                              disabled ? 'cursor-not-allowed opacity-35' : '',
                            ].join(' ')}
                          >
                            {slot}
                          </motion.button>
                        )
                      })}
                    </div>
                    {errors.preferredTime ? (
                      <p className="mt-2 text-xs text-white/45">{errors.preferredTime}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.01 } : undefined}
                  whileTap={!loading ? { scale: 0.99 } : undefined}
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex h-4 w-4 animate-spin rounded-full border border-black/15 border-t-black" />
                  ) : null}
                  Submit booking request
                </motion.button>
              </div>
            </motion.form>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl border-t border-white/10 pt-10 md:pt-14">
            <SectionTitle eyebrow="WHAT HAPPENS NEXT" title="What happens next" />
            <div className="mt-12 hidden gap-6 lg:grid lg:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease, delay: index * 0.08 }}
                  className="border-t border-white/10 pt-5"
                >
                  <p className="text-xs uppercase tracking-[0.45em] text-white/30">0{index + 1}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/74">{step}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 space-y-6 lg:hidden">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease, delay: index * 0.08 }}
                  className="border-l border-white/10 pl-5"
                >
                  <p className="text-xs uppercase tracking-[0.45em] text-white/30">0{index + 1}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/74">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-3xl border border-white/10 px-6 py-12 text-center md:px-10 md:py-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease }}
              className="text-xs uppercase tracking-[0.45em] text-white/35"
            >
              A Note From The Founders
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease, delay: 0.05 }}
              className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-white md:text-5xl"
            >
              A Note From The Founders
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base"
            >
              We&apos;re a small team obsessed with building thoughtful systems for ambitious businesses.
              <br />
              <br />
              If we believe we&apos;re not the right fit, we&apos;ll tell you honestly and point you in the right direction.
            </motion.p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl border-t border-white/10 pt-10 md:pt-14">
            <SectionTitle eyebrow="FAQ" title="Frequently asked questions" />
            <div className="mt-10">
              {faqItems.map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  )
}
