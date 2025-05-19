import img1 from "@/assets/Eligen/1.jpg";
import img2 from "@/assets/Eligen/2.jpg";
import { Link } from "react-router-dom";

const NosEligen = () => {
  return (
    <div className="py-8">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold font-favoritMono uppercase mb-6 tracking-widest">
        Ellos también nos eligen
      </h2>

      {/* Primera imagen */}
      <div className="relative aspect-[3/4] md:aspect-[16/9] mb-8 overflow-hidden">
        <picture>
          <img
            loading="lazy"
            src={img1}
            alt="Guadalupe Alonso"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white z-10 px-4 whitespace-nowrap">
          <h3 className="text-4xl sm:text-5xl md:text-9xl font-dharmaGothicM italic  font-bold uppercase">
            Guadalupe Alonso
          </h3>
        </div>
      </div>

      {/* Segunda imagen */}
      <div className="relative aspect-[3/4] md:aspect-[16/9] overflow-hidden">
        <picture>
          <img
            loading="lazy"
            src={img2}
            alt="Protección con estilo"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>

        {/* Desktop version: text on right */}
        <div className="hidden md:block absolute bottom-4 right-4 text-right text-white z-10 whitespace-nowrap">
          <h3 className="text-5xl md:text-9xl font-dharmaGothicM italic font-bold uppercase">
            Protección con estilo
          </h3>
          <p className="text-sm md:text-base font-favoritMono mt-2">
            Diseños que hablan por vos
          </p>
          <button className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold font-favoritMono py-2 px-4 rounded">
            <Link to="/predeterminadas">Ver Todos</Link>
          </button>
        </div>

        {/* Mobile version: centered text */}
        <div className="block md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white z-10 whitespace-nowrap">
          <h3 className="text-5xl md:text-9xl font-dharmaGothicM italic font-bold uppercase">
            Protección con estilo
          </h3>
          <p className="text-sm md:text-base font-favoritMono mt-2">
            Diseños que hablan por vos
          </p>
          <button className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold font-favoritMono py-2 px-4 rounded">
            <Link to="/predeterminadas">Ver Todos</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NosEligen;
