import iphone from "@/assets/marcas/iphone-logo-01.svg";
import samsung from "@/assets/marcas/Samsung.png";
import moto from "@/assets/marcas/moto.png";
import xiaomi from "@/assets/marcas/xia.png";

const Marcas: React.FC = () => {
    const images = [iphone, samsung, moto, xiaomi];

    return (
        <div className="bg-black py-8">
            <div className="grid grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Marca ${index + 1}`}
                        className="h-8 object-contain sm:h-10 md:h-10"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                ))}
            </div>
        </div>
    );
};

export default Marcas;
