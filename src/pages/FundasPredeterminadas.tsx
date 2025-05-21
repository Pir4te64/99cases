import FundasPredeterminadasHeader from "@/components/FundasPredeterminadas/FundasPredeterminadasHeader";
import Marcas from "@/components/UI/Marcas";
import Pagos from "@/components/Payments/Pagos";
import Scroll from "@/components/UI/Scroll";
import TextHorizontal from "@/components/UI/TextHorizontal";
import FormularioContacto from "@/components/FormularioContacto";
import FundasPredeterminadasProductos from "@/components/FundasPredeterminadas/FundasPredeterminadasProductos";
import { useEffect } from "react";
const FundasPredeterminadas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <FundasPredeterminadasHeader />
      <FundasPredeterminadasProductos />
      <Marcas />
      <Pagos />
      <Scroll />
      <TextHorizontal />
      <FormularioContacto />
    </div>
  );
};

export default FundasPredeterminadas;
