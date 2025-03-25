import React from "react";
import ProductosSimilaresPersonalizados from "./Fundas/FundasPersonalizadas/ProductosSimilaresPersonalizados";
const PersonalizadosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>{children}</div>

      <section className=" text-center">
        <div className="bg-white  h-64 md:h-96 flex items-center justify-center text-center">
          <h1 className="text-6xl sm:text-4xl md:text-8xl font-dharmaGothicM font-bold italic text-black uppercase px-4">
            ¡Protegé tu teléfono con onda, estilo y calidad!
          </h1>
        </div>

        <ProductosSimilaresPersonalizados />
      </section>
    </div>
  );
};

export default PersonalizadosLayout;
