import { Link } from 'react-router-dom'

// components/WorkWithUsSection.tsx

const WorkWithUsSection = () => {
  return (
    <section className="bg-black px-8 py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
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
