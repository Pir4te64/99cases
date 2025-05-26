import img1 from "@/assets/Eligen/1.jpg";
import img2 from "@/assets/Eligen/2.jpg";
import img3 from "@/assets/Eligen/3.jpeg";
import img4 from "@/assets/Eligen/4.jpeg";
import img5 from "@/assets/Eligen/5.jpeg";
import img6 from "@/assets/Eligen/6.jpeg";
import img7 from "@/assets/Eligen/7.jpeg";
import img8 from "@/assets/Eligen/8.jpeg";
import img9 from "@/assets/Eligen/9.jpeg";
import img10 from "@/assets/Eligen/10.jpeg";
import img11 from "@/assets/Eligen/11.jpeg";
import img12 from "@/assets/Eligen/12.jpeg";
import img13 from "@/assets/Eligen/13.jpeg";
import ImageCard from "@/components/NosEligen/ImageCard";

const NosEligen = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto flex h-[200px] items-center justify-center">
        <h2 className="mb-6 text-center font-favoritExpanded text-xl font-bold uppercase tracking-widest sm:text-2xl md:text-3xl">
          Ellos también nos eligen
        </h2>
      </div>

      <div className="space-y-8">
        <ImageCard image={img1} title="Guadalupe Alonso" />

        <ImageCard
          image={img2}
          title="Protección con estilo"
          subtitle="Diseños que hablan por vos"
          linkText="Ver Todos"
          linkTo="/predeterminadas"
        />
        <ImageCard image={img3} title="JOAQUÍN POLI" />
        <ImageCard image={img4} title="DARÍO ARCO" />
        <ImageCard image={img5} title="GUADA ALONSO" />
        <ImageCard image={img6} title="CAMI LOPEZ" />
        <ImageCard image={img7} title="SANTI SALGADO" />
        <ImageCard image={img8} title="MARTY LIMA" />
        <ImageCard image={img9} title="CANDE LIMA" />
        <ImageCard image={img10} title="LIMA BROTHERS" />
        <ImageCard image={img11} title="POLI BROTHERS" />
        <ImageCard image={img12} title="LUCAS ESTOMBA" />
        <ImageCard image={img13} title="MATEO CABAÑA" />
      </div>
    </div>
  );
};

export default NosEligen;
