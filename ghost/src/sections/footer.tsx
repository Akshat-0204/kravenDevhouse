import { Link, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

// components/FooterSection.tsx

const FooterSection = () => {
  const navigate = useNavigate()

  return (
    <footer className="border-t border-zinc-900 bg-[#080808] px-8 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <h3 className="text-4xl font-light tracking-tighter text-white">
            Kraven
          </h3>

          <p className="mt-6 text-zinc-500">
            Software, AI Systems & Automation.
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
            <li>
              <Link to="/services/growth-systems" className="cursor-pointer hover:text-white">
                Growth Systems
              </Link>
            </li>

            <li>
              <Link to="/services/automation-systems" className="cursor-pointer hover:text-white">
                Automation Systems
              </Link>
            </li>

            <li>
              <Link to="/services/intelligent-systems" className="cursor-pointer hover:text-white">
                Intelligent Systems
              </Link>
            </li>

            <li>
              <Link to="/services/software-solutions" className="cursor-pointer hover:text-white">
                Software Solutions
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-8 text-sm tracking-[0.3em] text-[#D8B56A]">
            COMPANY
          </h4>

          <ul className="space-y-5 text-zinc-400">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection(navigate, 'contact')}
                className="cursor-pointer hover:text-white"
              >
                Contact
              </button>
            </li>

            

            <li>
              <button
                type="button"
                onClick={() => scrollToSection(navigate, 'how-it-works')}
                className="cursor-pointer hover:text-white"
              >
                Blog
              </button>
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

            
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-20 max-w-7xl border-t border-zinc-900 pt-10">
        <div className="flex flex-col items-center justify-between gap-6 text-sm text-zinc-600 md:flex-row">
          <p>© 2026 Kraven. All rights reserved.</p>

          <div className="flex gap-8">
            <Link to="/privacy-policy" className="cursor-pointer hover:text-zinc-400">
              Privacy Policy
            </Link>

            <Link to="/terms-of-service" className="cursor-pointer hover:text-zinc-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
