import headerPredeterminadas from "@/assets/predeterminadas/headerPredeterinadas.jpg";

const FundasPredeterminadasHeader = () => {
  return (
    <div className="relative h-[50vh] w-full sm:h-[60vh] md:h-[70vh] lg:h-[700px]">
      {/* Imagen de fondo */}
      <img
        src={headerPredeterminadas}
        alt="Fundas Predeterminadas"
        className="h-full w-full object-cover select-none pointer-events-none"
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

      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />

      <div className="absolute bottom-5 left-0 w-full p-4 text-center">
        <h1 className="font-dharmaGothicM text-6xl font-bold uppercase italic leading-none tracking-wide text-white sm:text-5xl md:text-7xl lg:text-9xl xl:text-[216px]">
          FUNDAS EXCLUSIVAS
        </h1>
      </div>
    </div>
  );
};

export default FundasPredeterminadasHeader;
