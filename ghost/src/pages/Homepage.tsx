// HomePage.tsx

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-8 md:px-16 py-8 font-sans"
   >
    
      {/* Navbar */}
      {/* Navbar */}
<nav className="w-full flex justify-center">
  <div className="flex items-center rounded-full border border-zinc-800 bg-[#050505] px-3 py-1.5">
    <ul className="flex items-center">
      <li className="cursor-pointer px-5 text-sm font-light italic text-zinc-400 transition-colors hover:text-white">
        Services
      </li>

      <div className="h-4 w-px bg-zinc-800" />

      <li className="cursor-pointer px-5 text-sm font-light italic text-zinc-400 transition-colors hover:text-white">
        Case Studies
      </li>

      <div className="h-4 w-px bg-zinc-800" />

      <li className="cursor-pointer px-5 text-sm font-light italic text-zinc-400 transition-colors hover:text-white">
        Blog
      </li>

      <div className="h-4 w-px bg-zinc-800" />

      <li className="cursor-pointer px-5 text-sm font-light italic text-zinc-400 transition-colors hover:text-white">
        Contact
      </li>
    </ul>
  </div>
</nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Section */}
      {/* Bottom Section */}
<section className="w-full flex flex-col md:flex-row justify-between items-end gap-12">
  {/* Left Side */}
  <div className="flex items-end gap-5">
    <h1 className="text-[7rem] md:text-[10rem] lg:text-[13rem] font-bold tracking-tighter text-orange-500 leading-none">
      Kraven
    </h1>

    <span className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-5">
      devhouse.
    </span>
  </div>

  {/* Right Side */}
  <div className="max-w-md flex flex-col items-start md:items-end text-left md:text-right">
    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter leading-tight">
      Build.<br />
      Automate.<br />
      Scale.
    </h3>

    <p className="mt-6 text-gray-400 leading-relaxed tracking-tight">
      We craft high-converting websites, AI systems, and workflow
      automations for ambitious businesses.
    </p>

    <button className="mt-8 flex items-center gap-4 rounded-full bg-[#D8C3A5] px-7 py-3 text-black font-semibold tracking-tight transition-transform hover:scale-[1.02]">
      <span>Book a Call</span>

      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
        →
      </span>
    </button>
  </div>
</section>
    </div>
  );
};

export default HomePage;