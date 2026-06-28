import { motion } from 'framer-motion'

interface WhyUsCardProps {
  stat: string
  title: string
  description: string
  delay?: number
}

const WhyUsCard = ({ stat, title, description, delay = 0 }: WhyUsCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/4 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/35">
            {stat}
          </span>
          <span className="h-px w-10 bg-white/15 transition-all duration-500 group-hover:w-16 group-hover:bg-[#efe4d6]" />
        </div>

        <h3 className="mt-6 text-xl font-medium tracking-[-0.04em] text-white md:text-2xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-[0.95rem]">
          {description}
        </p>
      </div>
    </motion.article>
  )
}

export default WhyUsCard
