
import ProductosSimilares from "@/components/Fundas/FundasPredeterminadas/ProductosSimilares";
const PredeterminadoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>{children}</div>

      <section className=" text-center">
        <div className="bg-white  h-64 md:h-96 flex items-center justify-center text-center">
          <h1 className="text-6xl sm:text-4xl md:text-8xl font-dharmaGothicM italic font-bold text-black uppercase px-4">
            ¡Protegé tu teléfono con onda, estilo y calidad!
          </h1>
        </div>

        <ProductosSimilares />
      </section>
    </div>
  );
};

export default PredeterminadoLayout;
