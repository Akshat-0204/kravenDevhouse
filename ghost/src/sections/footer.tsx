// components/FooterSection.tsx

const FooterSection = () => {
  return (
    <footer className="border-t border-zinc-900 bg-[#080808] px-8 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <h3 className="text-4xl font-light tracking-tighter text-white">
            Kraven
          </h3>

          <p className="mt-6 text-zinc-500">
            AI Systems & Automation.
          </p>

          <p className="mt-3 text-zinc-500">
            India
          </p>

          <p className="mt-3 text-zinc-500">
            hello@kraven.dev
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-8 text-sm tracking-[0.3em] text-[#D8B56A]">
            SERVICES
          </h4>

          <ul className="space-y-5 text-zinc-400">
            <li className="cursor-pointer hover:text-white">
              Web Development
            </li>

            <li className="cursor-pointer hover:text-white">
              AI Automations
            </li>

            <li className="cursor-pointer hover:text-white">
              CRM Systems
            </li>

            <li className="cursor-pointer hover:text-white">
              AI Chatbots
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-8 text-sm tracking-[0.3em] text-[#D8B56A]">
            COMPANY
          </h4>

          <ul className="space-y-5 text-zinc-400">
            <li className="cursor-pointer hover:text-white">
              Case Studies
            </li>

            <li className="cursor-pointer hover:text-white">
              Contact
            </li>

            <li className="cursor-pointer hover:text-white">
              Blog
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="mb-8 text-sm tracking-[0.3em] text-[#D8B56A]">
            CONNECT
          </h4>

          <ul className="space-y-5 text-zinc-400">
            <li className="cursor-pointer hover:text-white">
              LinkedIn
            </li>

            <li className="cursor-pointer hover:text-white">
              X
            </li>

            <li className="cursor-pointer hover:text-white">
              Instagram
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-20 max-w-7xl border-t border-zinc-900 pt-10">
        <div className="flex flex-col items-center justify-between gap-6 text-sm text-zinc-600 md:flex-row">
          <p>© 2026 Kraven. All rights reserved.</p>

          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-zinc-400">
              Privacy Policy
            </span>

            <span className="cursor-pointer hover:text-zinc-400">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;