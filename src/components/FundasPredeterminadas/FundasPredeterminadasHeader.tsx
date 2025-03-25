import headerPredeterminadas from "../../assets/predeterminadas/headerPredeterinadas.jpg";

const FundasPredeterminadasHeader = () => {
  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[700px]">
      {/* Imagen de fondo */}
      <img
        src={headerPredeterminadas}
        alt="Fundas Predeterminadas"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />

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
          font-dharmaGothicM 
          italic 
          uppercase 
          leading-none 
          tracking-wide
        "
        >
          FUNDAS PREDETERMINADAS
        </h1>
      </div>
    </div>
  );
};

export default FundasPredeterminadasHeader;
