// components/TestimonialCard.tsx

interface TestimonialCardProps {
  quote: string;
  name: string;
  designation: string;
  image: string;
  featured?: boolean;
}

const TestimonialCard = ({
  quote,
  name,
  designation,
  image,
  featured = false,
}: TestimonialCardProps) => {
  return (
    <div className={featured ? 'flex h-full flex-col justify-between gap-10' : 'flex h-full flex-col justify-between gap-6'}>
      {/* Quote */}
      <p className={featured ? 'max-w-2xl text-2xl leading-[1.45] tracking-[-0.04em] text-white md:text-[2rem]' : 'text-lg leading-relaxed tracking-[-0.03em] text-white/90'}>
        {quote}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <img
          src={image}
          alt={name}
          className={featured ? 'h-14 w-14 rounded-full object-cover ring-1 ring-white/15' : 'h-12 w-12 rounded-full object-cover ring-1 ring-white/10'}
        />

        <div>
          <h3 className="text-base font-medium tracking-[-0.03em] text-white">
            {name}
          </h3>

          <p className="text-sm tracking-[-0.02em] text-white/45">
            {designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
