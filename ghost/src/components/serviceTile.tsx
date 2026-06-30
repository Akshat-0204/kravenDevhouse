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
      className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/35">
            <span>{number}</span>
            <span className="h-px w-8 bg-white/15 transition-all duration-500 group-hover:w-12 group-hover:bg-[#efe4d6]" />
          </div>

          <h2 className="mt-3 max-w-xl text-xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-[1.8rem]">
            {title}
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60 md:text-[0.9rem]">
            {description}
          </p>

          <button className="mt-4 inline-flex w-fit items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] text-[#efe4d6] transition-transform duration-300 group-hover:translate-x-1">
            Explore
            <span className="text-white/40 transition-colors group-hover:text-white">→</span>
          </button>
        </div>

        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-[1rem] border border-white/10 bg-black/30">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[1rem] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </motion.article>
  )
}

export default FeatureTile
