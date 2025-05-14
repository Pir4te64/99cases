// src/components/FundasPersonalizadas/FundasPersonalizadas.tsx
import FundasPersonalizadasHeader from "@/components/FundasPersonalizadas/FundasPersonalizadasHeader";
import ComoFunciona from "@/components/FundasPersonalizadas/ComoFunciona";
import FundasPersonalizadasProductos from "@/components/FundasPersonalizadas/FundasPersonalizadasProductos";

const FundasPersonalizadas: React.FC = () => {
  return (
    // Evita cualquier overflow horizontal en toda la página
    <div className="overflow-x-hidden">
      <FundasPersonalizadasHeader />
      <ComoFunciona />
      <FundasPersonalizadasProductos />
    </div>
  );
};

export default FundasPersonalizadas;
