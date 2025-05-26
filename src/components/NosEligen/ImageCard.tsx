import { Link } from "react-router-dom";

interface ImageCardProps {
  image: string;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkTo?: string;
  isMobile?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  subtitle,
  linkText,
  linkTo,
  isMobile = false,
}) => {
  return (
    <div className="relative aspect-[3/4] overflow-hidden md:aspect-[16/9]">
      <picture>
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Desktop version: text on right */}
      <div className="absolute bottom-4 right-4 z-10 hidden whitespace-nowrap text-right text-white md:block">
        <h3 className="font-dharmaGothicM text-5xl font-bold uppercase italic md:text-9xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 font-favoritExpanded text-sm md:text-base">
            {subtitle}
          </p>
        )}
        {linkText && linkTo && (
          <button className="mt-2 rounded bg-red-600 px-4 py-2 font-favoritExpanded font-bold text-white hover:bg-red-700">
            <Link to={linkTo}>{linkText}</Link>
          </button>
        )}
      </div>

      {/* Mobile version: centered text */}
      <div className="absolute bottom-4 left-1/2 z-10 block -translate-x-1/2 whitespace-nowrap text-center text-white md:hidden">
        <h3 className="font-dharmaGothicM text-5xl font-bold uppercase italic md:text-9xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 font-favoritExpanded text-sm md:text-base">
            {subtitle}
          </p>
        )}
        {linkText && linkTo && (
          <button className="mt-2 rounded bg-red-600 px-4 py-2 font-favoritExpanded font-bold text-white hover:bg-red-700">
            <Link to={linkTo}>{linkText}</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
