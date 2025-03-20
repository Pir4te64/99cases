import headerDesktop from "../../assets/FundasPersonalizadas/HeaderDesktop.jpeg";
import headerMobile from "../../assets/FundasPersonalizadas/HeaderMobile.jpeg";

const FundasPredeterminadasHeader = () => {
  return (
    <div
      // Ajusta la altura para que sea responsiva:
      // 50% de la pantalla en móviles, 60% en sm, 70% en md, y 700px en pantallas grandes.
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[700px]"
    >
      {/* Imagen de fondo para desktop */}
      <img
        src={headerDesktop}
        alt="Fundas Personalizadas Desktop"
        className="hidden md:block w-full h-full object-cover"
      />
      {/* Imagen de fondo para mobile */}
      <img
        src={headerMobile}
        alt="Fundas Personalizadas Mobile"
        className="block md:hidden w-full h-full object-cover"
      />

      {/* Capa gradiente (de negro a transparente) ocupando la mitad inferior */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />

      {/* Contenedor del texto, anclado en la parte inferior */}
      <div className="absolute bottom-5 left-0 w-full text-center p-4">
        <h1
          className="
            text-white 
            text-5xl 
            sm:text-5xl 
            md:text-7xl 
            lg:text-9xl 
            xl:text-[216px] 
            font-bold 
            font-dharmaGothic 
            uppercase 
            leading-none 
            tracking-wide
          "
        >
          FUNDAS PERSONALIZADAS
        </h1>
      </div>
    </div>
  );
};

export default FundasPredeterminadasHeader;
