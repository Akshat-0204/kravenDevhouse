import { motion } from 'framer-motion'
import Threads from '../components/Threads'

const HowItWorksSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black px-6 py-24 md:px-8">
      <div className="absolute inset-0 opacity-55">
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2),rgba(0,0,0,0.72))]" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="text-sm uppercase tracking-[0.4em] text-white/35">
            -- HOW IT WORKS --
          </span>
          <h2 className="mt-8 text-5xl font-semibold tracking-tighter text-white md:text-7xl">
            You dream it.
            <br />
            We ship it.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed tracking-tight text-zinc-500 md:text-xl">
            Share your vision. We handle the rest-wireframes, design, code, launch.
            All in days, not quarters.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorksSection
