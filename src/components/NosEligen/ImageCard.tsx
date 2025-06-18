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
    <div className="relative h-[400px] overflow-hidden md:aspect-[16/9] md:h-auto">
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        onContextMenu={(e) => e.preventDefault()}
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        style={{ 
          userSelect: 'none', 
          WebkitUserSelect: 'none', 
          WebkitTouchCallout: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      />

      {/* degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Desktop: texto a la derecha */}
      <div className="absolute bottom-4 right-4 z-10 hidden text-right text-white md:block">
        <h3 className="font-dharmaGothicM text-5xl font-bold uppercase italic md:text-9xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 font-favoritExpanded text-base">{subtitle}</p>
        )}
        {linkText && linkTo && (
          <Link
            to={linkTo}
            className="mt-2 inline-block rounded bg-red-600 px-4 py-2 font-favoritExpanded font-bold tracking-wide text-white hover:bg-red-700"
          >
            {linkText}
          </Link>
        )}
      </div>

      {/* Mobile: texto centrado */}
      <div className="absolute bottom-4 right-4 z-10 block w-full text-end text-white md:hidden">
        <h3 className="font-dharmaGothicM text-5xl font-bold uppercase italic">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 font-favoritExpanded text-sm">{subtitle}</p>
        )}
        {linkText && linkTo && (
          <Link
            to={linkTo}
            className="mt-2 inline-block rounded bg-red-600 px-4 py-2 font-favoritExpanded text-sm font-bold text-white hover:bg-red-700"
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
