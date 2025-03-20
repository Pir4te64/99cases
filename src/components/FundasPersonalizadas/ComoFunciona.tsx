import React from "react";
import img1 from "../../assets/FundasPersonalizadas/ComoFunciona/1.png";
import img2 from "../../assets/FundasPersonalizadas/ComoFunciona/2.png";
import img3 from "../../assets/FundasPersonalizadas/ComoFunciona/3.png";
import img4 from "../../assets/FundasPersonalizadas/ComoFunciona/4.png";
import img5 from "../../assets/FundasPersonalizadas/ComoFunciona/5.png";

const steps = [
  {
    img: img1,
    text: "Elegí tu diseño favorito",
  },
  {
    img: img2,
    text: "Personalizalo y hacelo único",
  },
  {
    img: img3,
    text: "Agregalo al carrito y realizá el pago",
  },
  {
    img: img4,
    text: "Pedido enviado a producción",
  },
  {
    img: img5,
    text: "Pedido empaquetado y enviado",
  },
];

const ComoFunciona = () => {
  return (
    <div className="w-full  mx-auto px-4 py-8 bg-white">
      {/* Título */}
      <h2 className="text-center text-4xl md:text-5xl text-black font-favorit mb-8 uppercase tracking-wide">
        ¿CÓMO FUNCIONA?
      </h2>

      {/* Contenedor de los pasos */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center justify-items-center mx-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              index === 4 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            {/* Icono/paso */}
            <img
              src={step.img}
              alt={`Paso ${index + 1}`}
              className="mb-4 w-16 h-16"
            />
            {/* Texto del paso con máximo de dos líneas */}
            <p className="text-sm text-black text-center">
              <span className="text-white bg-red-500 rounded-full w-8 h-8 inline-flex items-center justify-center font-bold mr-1">
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
