import ProductosSimilares from "@/components/Fundas/FundasPredeterminadas/ProductosSimilares";
import TextHorizontal from "./TextHorizontal";

const PredeterminadoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>{children}</div>
      <section className="text-center">
        <div className="flex h-64 items-center justify-center bg-white text-center md:h-96">
          <h1 className="px-4 font-dharmaGothicM text-6xl font-bold uppercase italic text-black sm:text-4xl md:text-8xl">
            ¡Protegé tu teléfono con onda, estilo y calidad!
          </h1>
        </div>

        <ProductosSimilares />
        <TextHorizontal />
      </section>
    </div>
  );
};

export default PredeterminadoLayout;
