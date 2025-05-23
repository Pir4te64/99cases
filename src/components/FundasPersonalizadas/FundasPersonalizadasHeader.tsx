// src/components/FundasPersonalizadas/FundasPredeterminadasHeader.tsx
import headerDesktop from "@/assets/FundasPersonalizadas/HeaderDesktop.jpeg";
import headerMobile from "@/assets/FundasPersonalizadas/HeaderMobile.jpeg";

const FundasPredeterminadasHeader: React.FC = () => {
  return (
    <div
      // Evitamos cualquier overflow horizontal accidental
      className="relative h-[50vh] w-full overflow-x-hidden sm:h-[60vh] md:h-[70vh] lg:h-[700px]"
    >
      {/* Imagen de fondo para desktop */}
      <img
        src={headerDesktop}
        alt="Fundas Personalizadas Desktop"
        className="hidden h-full w-full object-cover md:block"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Imagen de fondo para mobile */}
      <img
        src={headerMobile}
        alt="Fundas Personalizadas Mobile"
        className="block h-full w-full object-cover md:hidden"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Capa gradiente (de negro a transparente) ocupando la mitad inferior */}
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />

      {/* Contenedor del texto, anclado en la parte inferior */}
      <div className="absolute bottom-5 left-0 w-full p-4 text-center">
        <h1 className="font-dharmaGothicM text-6xl font-bold uppercase italic leading-none tracking-wide text-white sm:text-5xl md:text-7xl lg:text-9xl xl:text-[216px]">
          FUNDAS PERSONALIZADAS
        </h1>
      </div>
    </div>
  );
};

export default FundasPredeterminadasHeader;
