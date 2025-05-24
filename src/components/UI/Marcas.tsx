import iphone from "@/assets/marcas/iphone-logo-01.svg";
import samsung from "@/assets/marcas/Sam.svg";
import moto from "@/assets/marcas/Moto.svg";
import xiaomi from "@/assets/marcas/xiao.svg";

const Marcas: React.FC = () => {
  const images = [iphone, samsung, moto, xiaomi];

  return (
    <div className="bg-black py-6 md:py-8">
      <div className="mx-auto grid grid-cols-2 items-center justify-items-center gap-6 px-4 md:grid-cols-4 md:gap-8">
        {images.map((img, index) => (
          <div key={index} className="relative aspect-[3/2] w-full max-w-[200px]">
            <img
              src={img}
              alt={`Marca ${index + 1}`}
              className="absolute inset-0 h-full w-full object-contain"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marcas;
