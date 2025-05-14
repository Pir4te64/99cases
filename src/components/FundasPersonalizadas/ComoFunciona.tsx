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
    <div className="mx-auto w-full overflow-x-hidden bg-white px-4 py-8">
      {/* Título */}
      <h2 className="mb-8 text-center font-favoritExpandedBook text-4xl uppercase tracking-wide text-black md:text-5xl">
        ¿CÓMO FUNCIONA?
      </h2>

      {/* Contenedor de los pasos */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 justify-items-center gap-8 text-center md:grid-cols-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`min-w-0 flex flex-col items-center ${index === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
          >
            {/* Icono/paso */}
            <img
              src={step.img}
              alt={`Paso ${index + 1}`}
              className="mb-4 h-16 w-16"
            />
            {/* Texto del paso con máximo de dos líneas */}
            <p className="text-center font-favoritExpandedBook text-sm text-black">
              <span className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-favoritExpandedBook font-bold text-white">
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
