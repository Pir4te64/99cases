// src/components/PersonalizadosID/PersonalizadosLayout.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductosSimilaresPersonalizados from "@/components/Fundas/FundasPersonalizadas/ProductosSimilaresPersonalizados";
import TextHorizontal from "@/components/UI/TextHorizontal";

const PersonalizadosLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Antes de Personalizar un Case se le recomienda Iniciar sesión",
        icon: "warning",
        confirmButtonText: "Ir al Login",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { replace: true });
        }
      });
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Contenido principal */}
      <div className="relative min-h-screen overflow-hidden">{children}</div>

      {/* Llamado a la acción y productos similares */}
      <section className="relative overflow-x-hidden text-center">
      <div className="flex h-64 items-center justify-center bg-white text-center md:h-96">
          <h1 className="px-4 font-dharmaGothicM text-6xl font-bold uppercase italic text-black sm:text-4xl md:text-8xl">
            ¡Protegé tu teléfono con onda, estilo y calidad!
          </h1>
        </div>

        <div className="min-w-0">
          <ProductosSimilaresPersonalizados />
        </div>
        <TextHorizontal />
      </section>
    </div>
  );
};

export default PersonalizadosLayout;
