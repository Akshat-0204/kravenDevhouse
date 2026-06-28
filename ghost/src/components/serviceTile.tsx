// components/FeatureTile.tsx

import React from "react";

interface FeatureTileProps {
  number: string;
  title: string;
  description: string;
  image: string;
}

const FeatureTile: React.FC<FeatureTileProps> = ({
  number,
  title,
  description,
  image,
}) => {
  return (
    <div className="w-full rounded-3xl border border-zinc-800 bg-black px-8 py-8 md:px-10 md:py-10">
      <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-1 flex-col items-start">
          {/* Serial Number */}
          <span className="text-lg tracking-tight text-[#E8B88A]">
            | {number}
          </span>

          {/* Title */}
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tighter text-white md:text-4xl">
            {title}
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-lg text-base leading-relaxed tracking-tight text-gray-400">
            {description}
          </p>

          {/* CTA Button */}
          <button className="mt-8 text-sm tracking-tight text-[#E8B88A] transition-all duration-300 hover:translate-x-1 md:text-base">
            EXPLORE →
          </button>
        </div>

        {/* Right Section */}
        <div className="shrink-0">
          <div className="h-[320px] w-[180px] overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTile;