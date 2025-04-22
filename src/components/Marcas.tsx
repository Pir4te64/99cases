import React from "react";
import iphone from "@/assets/marcas/Iphone.png";
import samsung from "@/assets/marcas/Samsung.png";
import moto from "@/assets/marcas/moto.png";
import xiaomi from "@/assets/marcas/xia.png";

const Marcas: React.FC = () => {
    const images = [iphone, samsung, moto, xiaomi];

    return (
        <div className="bg-black py-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 justify-items-center items-center">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Marca ${index + 1}`}
                        className="h-8 sm:h-10 md:h-10 object-contain"
                    />
                ))}
            </div>
        </div>
    );
};

export default Marcas;
