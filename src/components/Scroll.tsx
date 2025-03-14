import React, { useState, useEffect } from "react";
import s1 from "../assets/Scroll/s1.jpg";
import s2 from "../assets/Scroll/s2.jpg";

// Hook para detectar el ancho de la ventana y cambiar el layout según el breakpoint
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

const Scroll: React.FC = () => {
    const images = [s1, s2, s1, s2];
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const chunkSize = isDesktop ? 2 : 1;
    const slides: string[][] = [];
    for (let i = 0; i < images.length; i += chunkSize) {
        slides.push(images.slice(i, i + chunkSize));
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = slides.length;

    const goToSlide = (index: number) => {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        setCurrentIndex(index);
    };

    return (
        <div className="w-full  mx-auto my-8">
            {/* Slider de imágenes */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slideImages, index) => (
                        <div key={index} className="w-full flex-shrink-0 flex">
                            {slideImages.map((img, i) => (
                                <div key={i} className={chunkSize === 2 ? "w-1/2" : "w-full"}>
                                    <img
                                        src={img}
                                        alt={`Slide ${index}-${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicadores (botones) debajo del slider */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-red-600" : "bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Scroll;
