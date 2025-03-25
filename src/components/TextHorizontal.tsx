const textItems = [
  "Envíos a todo el país",
  "Hecho en Argentina",
  "Somos 99% Cases",
  "Envíos a todo el país",
];

const TextHorizontal = () => {
  return (
    <div>
      {/* Texto principal en fondo negro */}
      <div className="bg-black py-8 h-64 md:h-96 flex items-center justify-center text-center">
        <h1 className="text-6xl sm:text-4xl md:text-9xl font-dharmaGothicM italic font-bold text-white uppercase px-4">
          ¡Protegé tu teléfono con onda, estilo y calidad!
        </h1>
      </div>

      {/* Contenedor de la franja roja con overflow oculto y texto en "marquee" */}
      <div className="bg-red-600 overflow-hidden h-12 flex items-center whitespace-nowrap">
        <div
          className="
            flex 
            gap-16 
            uppercase 
            font-bold 
            font-favoritMono 
            tracking-wide 
            py-2
            italic
            animate-scrollText
          "
        >
          {/* Primera secuencia de texto */}
          {textItems.map((item, i) => (
            <span key={i} className="mx-4 text-xs sm:text-sm md:text-base">
              {item}
            </span>
          ))}

          {/* Repetición para scroll infinito */}
          {textItems.map((item, i) => (
            <span
              key={i + textItems.length}
              className="mx-4 text-xs sm:text-sm md:text-base"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextHorizontal;
