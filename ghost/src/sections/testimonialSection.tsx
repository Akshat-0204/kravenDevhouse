import { motion } from 'framer-motion'
import TestimonialCard from '../components/testimonial'

const featured = {
  quote:
    'Kraven gave our launch the kind of polish that usually takes months. The motion, clarity, and speed made the whole experience feel unmistakably premium.',
  name: 'Manu Arora',
  designation: 'Tech Innovator & Entrepreneur',
  image: '/manu.jpg',
}

const testimonials = [
  {
    quote:
      'The automation workflows saved us countless hours every week and significantly improved our efficiency.',
    name: 'Sarah Chen',
    designation: 'Founder & CEO',
    image: '/sarah.jpg',
  },
  {
    quote:
      'Working with this platform has fundamentally changed how our team collaborates and ships products.',
    name: 'Alex Johnson',
    designation: 'Product Designer',
    image: '/alex.jpg',
  },
]

const TestimonialSection = () => {
  return (
    <section className="w-full bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.45em] text-white/35">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
              Proof from teams that care about taste and speed.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            The layout now gives one story room to breathe while keeping
            supporting voices visible and balanced on every screen size.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8"
          >
            <TestimonialCard {...featured} featured />
          </motion.div>

          <div className="grid gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                whileHover={{ y: -3 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6"
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
