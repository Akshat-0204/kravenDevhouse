// components/ServicesSection.tsx

import FeatureTile from "../components/serviceTile.tsx";

const services = [
  {
    number: "01",
    title: "Custom Website Development",
    description:
      "Beautiful, fast, and conversion-focused websites engineered to elevate your brand and turn visitors into customers.",
    image: "/services/website.jpg",
  },
  {
    number: "02",
    title: "AI Workflow Automation",
    description:
      "Automate repetitive tasks, connect your tools, and build intelligent systems that save time and increase efficiency.",
    image: "/services/automation.jpg",
  },
  {
    number: "03",
    title: "CRM & Lead Systems",
    description:
      "Centralize your customer interactions with powerful CRM systems designed to capture, nurture, and convert leads.",
    image: "/services/crm.jpg",
  },
  {
    number: "04",
    title: "AI Agents & Chatbots",
    description:
      "Deploy intelligent AI assistants that engage customers, answer questions, and book appointments 24/7.",
    image: "/services/chatbot.jpg",
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full bg-black px-8 py-28 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-16 flex flex-col items-center">
          <span className="text-sm tracking-[0.4em] text-zinc-500">
            -- SERVICES --
          </span>

          <h2 className="mt-6 text-center text-4xl font-semibold tracking-tighter text-white md:text-6xl">
            What We Build
          </h2>

          <p className="mt-5 max-w-2xl text-center leading-relaxed tracking-tight text-zinc-400">
            We design, build, and automate digital experiences for ambitious
            businesses looking to scale faster.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {services.map((service) => (
            <FeatureTile
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;