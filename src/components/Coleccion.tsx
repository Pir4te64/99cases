import { Link } from "react-router-dom";
import fundaPersonalizada from "@/assets/fundasPersonalizadas.jpg";
import fundaPredeterminada from "@/assets/fundasPredeterminadas.jpg";
import useInViewMobile from "@/utils/useInViewMobile";

const Coleccion = () => {
  const [ref1, isMobileVisible1] = useInViewMobile({ threshold: 0.5 });
  const [ref2, isMobileVisible2] = useInViewMobile({ threshold: 0.5 });

  return (
    <div className="bg-black py-8 text-white" id="productos">
      <div className="mx-auto grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2">
        {/* Tarjeta 1 */}
        <Link to="/predeterminadas">
          <div ref={ref1} className="group relative overflow-hidden">
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={fundaPredeterminada}
              />
              <source
                media="(max-width: 767px)"
                srcSet={fundaPredeterminada}
              />
              <img
                loading="lazy"
                src={fundaPredeterminada}
                alt="Funda Predeterminada"
                className="h-[400px] w-full transform object-cover transition-transform duration-300 group-hover:scale-105 md:h-auto"
                onContextMenu={(e) => e.preventDefault()}
              />
            </picture>
            <div
              className={`absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-0 ${isMobileVisible1 ? "opacity-100" : "opacity-0"
                } md:group-hover:opacity-100`}
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 cursor-pointer p-4 text-center">
              <h2 className="font-dharmaGothicM text-7xl font-bold uppercase italic md:text-9xl">
                Fundas EXCLUSIVAS
              </h2>
              <p className="mt-2 font-favoritExpanded text-sm uppercase md:text-lg">
                Ver Colección
              </p>
            </div>
          </div>
        </Link>

        {/* Tarjeta 2 */}
        <Link to="/personalizadas">
          <div ref={ref2} className="group relative cursor-pointer overflow-hidden">
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={fundaPersonalizada}
              />
              <source
                media="(max-width: 767px)"
                srcSet={fundaPersonalizada}
              />
              <img
                loading="lazy"
                src={fundaPersonalizada}
                alt="Funda Personalizada"
                className="h-[400px] w-full transform object-cover transition-transform duration-300 group-hover:scale-105 md:h-auto"
                onContextMenu={(e) => e.preventDefault()}
              />
            </picture>
            <div
              className={`absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-0 ${isMobileVisible2 ? "opacity-100" : "opacity-0"
                } md:group-hover:opacity-100`}
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-center">
              <h2 className="font-dharmaGothicM text-7xl font-bold uppercase italic md:text-9xl">
                Fundas Personalizadas
              </h2>
              <p className="mt-2 font-favoritExpanded text-sm uppercase md:text-lg">
                Ver Colección
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Coleccion;
