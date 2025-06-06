// src/components/FundasPersonalizadas/ComoFunciona.tsx
import img1 from "@/assets/FundasPersonalizadas/ComoFunciona/1.png";
import img2 from "@/assets/FundasPersonalizadas/ComoFunciona/2.png";
import img3 from "@/assets/FundasPersonalizadas/ComoFunciona/3.png";
import img4 from "@/assets/FundasPersonalizadas/ComoFunciona/4.png";
import img5 from "@/assets/FundasPersonalizadas/ComoFunciona/5.png";

const steps = [
  { img: img1, text: "Elegí tu diseño favorito" },
  { img: img2, text: "Personalizalo y hacelo único" },
  { img: img3, text: "Agregalo al carrito y realizá el pago" },
  { img: img4, text: "El pedido se envia a producción" },
  { img: img5, text: "El pedido se empaqueta y envia" },
];

const ComoFunciona: React.FC = () => {
  return (
    <div className="mx-auto w-full bg-white px-4 py-8">
      {/* Título */}
      <h2 className="mb-8 text-center font-favoritExpandedBook text-2xl uppercase tracking-wide text-black sm:text-4xl md:text-5xl">
        ¿CÓMO FUNCIONA?
      </h2>

      {/* Ahora siempre grid de 5 columnas */}
      <div className="grid w-full grid-cols-5 gap-4 pb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2"
          >
            {/* Icono/paso */}
            <img
              src={step.img}
              alt={`Paso ${index + 1}`}
              className="h-10 w-10 sm:h-16 sm:w-16"
              onContextMenu={(e) => e.preventDefault()}
            />
            {/* Texto del paso */}
            <p className="flex flex-col items-center text-center font-favoritExpandedBook text-[10px] text-black sm:text-sm">
              <span className="mb-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-favoritExpandedBook text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-base">
                {index + 1}
              </span>
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComoFunciona;
