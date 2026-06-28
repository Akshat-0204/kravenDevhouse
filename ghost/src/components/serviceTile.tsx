import { motion } from 'framer-motion'

interface FeatureTileProps {
  number: string
  title: string
  description: string
  image: string
  delay?: number
}

const FeatureTile = ({ number, title, description, image, delay = 0 }: FeatureTileProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-7"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/35">
            <span>{number}</span>
            <span className="h-px w-10 bg-white/15 transition-all duration-500 group-hover:w-16 group-hover:bg-[#efe4d6]" />
          </div>

          <h2 className="mt-5 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
            {description}
          </p>

          <button className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium tracking-[0.18em] text-[#efe4d6] transition-transform duration-300 group-hover:translate-x-1">
            Explore
            <span className="text-white/40 transition-colors group-hover:text-white">→</span>
          </button>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
            <img
              src={image}
              alt={title}
              className="h-[260px] w-full object-cover object-center transition duration-700 group-hover:scale-[1.04] md:h-[320px]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </motion.article>
  )
}

export default FeatureTile
