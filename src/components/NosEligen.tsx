import img1 from "@/assets/Eligen/1.jpg";
import img2 from "@/assets/Eligen/2.jpg";
import { Link } from "react-router-dom";

const NosEligen = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto flex h-[200px] items-center justify-center">
        <h2 className="mb-6 text-center font-favoritExpanded text-xl font-bold uppercase tracking-widest sm:text-2xl md:text-3xl">
          Ellos también nos eligen
        </h2>
      </div>


      {/* Primera imagen */}
      <div className="relative mb-8 aspect-[3/4] overflow-hidden md:aspect-[16/9]">
        <picture>
          <img
            loading="lazy"
            src={img1}
            alt="Guadalupe Alonso"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 right-2 z-10 whitespace-nowrap px-4 text-center text-white">
          <h3 className="text-end font-dharmaGothicM text-4xl font-bold uppercase italic sm:text-5xl md:text-9xl">
            Guadalupe Alonso
          </h3>
        </div>
      </div>

      {/* Segunda imagen */}
      <div className="relative aspect-[3/4] overflow-hidden md:aspect-[16/9]">
        <picture>
          <img
            loading="lazy"
            src={img2}
            alt="Protección con estilo"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>

        {/* Desktop version: text on right */}
        <div className="absolute bottom-4 right-4 z-10 hidden whitespace-nowrap text-right text-white md:block">
          <h3 className="font-dharmaGothicM text-5xl font-bold uppercase italic md:text-9xl">
            Protección con estilo
          </h3>
          <p className="mt-2 font-favoritExpanded text-sm md:text-base">
            Diseños que hablan por vos
          </p>
          <button className="mt-2 rounded bg-red-600 px-4 py-2 font-favoritExpanded font-bold text-white hover:bg-red-700">
            <Link to="/predeterminadas">Ver Todos</Link>
          </button>
        </div>

        {/* Mobile version: centered text */}
        <div className="absolute bottom-4 left-1/2 z-10 block -translate-x-1/2 whitespace-nowrap text-center text-white md:hidden">
          <h3 className="font-dharmaGothicM text-5xl font-bold uppercase italic md:text-9xl">
            Protección con estilo
          </h3>
          <p className="mt-2 font-favoritExpanded text-sm md:text-base">
            Diseños que hablan por vos
          </p>
          <button className="mt-2 rounded bg-red-600 px-4 py-2 font-favoritExpanded font-bold text-white hover:bg-red-700">
            <Link to="/predeterminadas">Ver Todos</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NosEligen;
