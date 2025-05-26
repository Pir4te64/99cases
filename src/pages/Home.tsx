import Header from "@/components/UI/Header";
import HeroImage from "@/components/UI/HeroImage";
import Coleccion from "@/components/Coleccion";
import Productos from "@/components/Fundas/FundasPredeterminadas/Productos";
import Marcas from "@/components/UI/Marcas";
import Pagos from "@/components/Payments/Pagos";
import NosEligen from "@/components/NosEligen/NosEligen";
import Scroll from "@/components/UI/Scroll";
import Registro from "@/components/FormularioContacto";
import TextHorizontal from "@/components/UI/TextHorizontal";
export default function Home() {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <Header />
      <HeroImage />
      <Coleccion />
      <Productos />
      <Marcas />
      <Pagos />
      <NosEligen />
      <Scroll />
      <TextHorizontal />
      <Registro />
    </div>
  );
}
