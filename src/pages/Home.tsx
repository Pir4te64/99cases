import Header from "@/components/Header";
import HeroImage from "@/components/HeroImage";
import Coleccion from "@/components/Coleccion";
import Productos from "@/components/Fundas/FundasPredeterminadas/Productos";
import Marcas from "@/components/Marcas";
import Pagos from "@/components/Pagos";
import NosEligen from "@/components/NosEligen";
import Scroll from "@/components/Scroll";
import Registro from "@/components/FormularioContacto";
import TextHorizontal from "@/components/TextHorizontal";
export default function Home() {
  return (
    <div className="w-full h-full overflow-x-hidden">
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
