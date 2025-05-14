// src/components/PersonalizadosID/PersonalizadosLayout.tsx
import React from "react";
import ProductosSimilaresPersonalizados from "@/components/Fundas/FundasPersonalizadas/ProductosSimilaresPersonalizados";

const PersonalizadosLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // Evita overflow horizontal en toda la sección
    <div className="overflow-x-hidden">
      {/* Contenido principal */}
      <div className="min-w-0">
        {children}
      </div>

      {/* Llamado a la acción y productos similares */}
      <section className="overflow-x-hidden text-center">
        <div className="flex h-[16rem] items-center justify-center bg-white px-4 md:h-[24rem]">
          <h1 className="font-dharmaGothicM text-4xl font-bold uppercase italic leading-tight text-black sm:text-5xl md:text-8xl lg:text-[96px]">
            ¡Protegé tu teléfono con onda, estilo y calidad!
          </h1>
        </div>

        <div className="min-w-0">
          <ProductosSimilaresPersonalizados />
        </div>
      </section>
    </div>
  );
};

export default PersonalizadosLayout;
