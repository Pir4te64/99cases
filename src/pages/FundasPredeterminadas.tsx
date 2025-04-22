import FundasPredeterminadasHeader from "@/components/FundasPredeterminadas/FundasPredeterminadasHeader";
import Marcas from "@/components/Marcas";
import Pagos from "@/components/Pagos";
import Scroll from "@/components/Scroll";
import TextHorizontal from "@/components/TextHorizontal";
import FormularioContacto from "@/components/FormularioContacto";
import FundasPredeterminadasProductos from "@/components/FundasPredeterminadas/FundasPredeterminadasProductos";
const FundasPredeterminadas = () => {
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
