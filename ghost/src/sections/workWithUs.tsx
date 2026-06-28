// components/WorkWithUsSection.tsx

const WorkWithUsSection = () => {
  return (
    <section className="bg-black px-8 py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-zinc-100">
          Work With Us
        </h2>

        <p className="mt-8 max-w-2xl text-lg tracking-tight text-zinc-500">
          Book an intro call to explore our suite of services.
          We might have a waitlist.
        </p>

        <button className="mt-12 rounded-full bg-[#D8B56A] px-10 py-4 text-sm font-semibold tracking-[0.2em] text-black transition-all duration-300 hover:scale-105">
          BOOK A CALL
        </button>
      </div>
    </section>
  );
};

export default WorkWithUsSection;