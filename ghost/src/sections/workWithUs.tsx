import { Link } from 'react-router-dom'
import HyperspaceJump from '../components/HyperspaceJump'
import { useSectionVisible } from '../hooks/useSectionVisible'

// components/WorkWithUsSection.tsx

const WorkWithUsSection = () => {
  const { ref, isVisible } = useSectionVisible<HTMLElement>()

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-8 py-24"
    >
      <div className="absolute inset-0">
        {isVisible && (
          <>
            <HyperspaceJump className="absolute inset-0 h-full w-full" />
            <div
              key="jump-flash"
              className="hyperspace-flash pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,228,214,0.9),transparent_70%)]"
            />
          </>
        )}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),rgba(0,0,0,0.72))]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.45em] text-white/35">
          Work With Us
        </span>

        <h2 className="mt-5 max-w-3xl text-5xl font-medium tracking-[-0.06em] text-[#f3eadf] md:text-7xl">
          Let&apos;s build something sharp.
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed tracking-[-0.02em] text-white/55 md:text-xl">
          Book an intro call to explore our suite of services.
          We might have a waitlist, but every conversation starts with a clear next step.
        </p>

        <Link
          to="/book-a-call"
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#efe4d6] px-10 py-4 text-sm font-medium tracking-[0.18em] text-black transition-transform duration-300 hover:scale-[1.02]"
        >
          BOOK A CALL
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default WorkWithUsSection;
