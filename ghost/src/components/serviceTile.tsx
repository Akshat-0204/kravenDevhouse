import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface FeatureTileProps {
  number: string
  title: string
  description: string
  image: string
  href: string
  delay?: number
}

const FeatureTile = ({ number, title, description, image, href, delay = 0 }: FeatureTileProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -4 }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl md:gap-5 md:p-5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:h-24 sm:w-24">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.06]"
        />
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/35">
          <span>{number}</span>
          <span className="h-px w-6 bg-white/15 transition-all duration-500 group-hover:w-10 group-hover:bg-[#efe4d6]" />
        </div>

        <h3 className="mt-2 text-base font-semibold leading-tight tracking-[-0.04em] text-white md:text-xl">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/58 md:text-sm">
          {description}
        </p>

        <Link
          to={href}
          className="mt-2 inline-flex w-fit items-center gap-1.5 text-[0.65rem] font-medium tracking-[0.18em] text-[#efe4d6] transition-transform duration-300 group-hover:translate-x-1"
        >
          Explore
          <span className="text-white/40 transition-colors group-hover:text-white">→</span>
        </Link>
      </div>
    </motion.article>
  )
}

export default FeatureTile
