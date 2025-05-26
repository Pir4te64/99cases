import { Link } from "react-router-dom";

interface ImageCardProps {
  image: string;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkTo?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  subtitle,
  linkText,
  linkTo,
}) => {
  return (
    /*  ─── wrapper ───
        • h-[400px] en mobile
        • md:h-auto + md:aspect-[16/9] en desktop */
    <div className="relative h-[400px] overflow-hidden md:h-auto md:aspect-[16/9]">
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Desktop: texto a la derecha */}
      <div className="absolute bottom-4 right-4 z-10 hidden text-right text-white md:block">
        <h3 className="font-dharmaGothicM text-5xl font-bold italic uppercase md:text-9xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 font-favoritExpanded text-base">{subtitle}</p>
        )}
        {linkText && linkTo && (
          <Link
            to={linkTo}
            className="mt-2 inline-block rounded bg-red-600 px-4 py-2 font-favoritExpanded tracking-wide font-bold text-white hover:bg-red-700"
          >
            {linkText}
          </Link>
        )}
      </div>

      {/* Mobile: texto centrado */}
      <div className="absolute bottom-4 left-1/2 z-10 block -translate-x-1/2 text-center text-white md:hidden">
        <h3 className="font-dharmaGothicM text-5xl font-bold italic uppercase">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 font-favoritExpanded text-sm">{subtitle}</p>
        )}
        {linkText && linkTo && (
          <Link
            to={linkTo}
            className="mt-2 text-sm inline-block rounded bg-red-600 px-4 py-2 font-favoritExpanded font-bold text-white hover:bg-red-700"
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
