// src/components/NosEligen/NosEligenSlider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
import img14 from "@/assets/Eligen/14.jpeg";

import ImageCard from "@/components/NosEligen/ImageCard";
const specialSlide = {
  image: img2,
  title: "Protección con estilo",
  subtitle: "Diseños que hablan por vos",
  linkText: "Ver Todos",
  linkTo: "/predeterminadas",
};

const slides = [
  { image: img1, title: "Guada Alonso" },
  { image: img3, title: "AGUSTÍN POLI" },
  { image: img14, title: "JOAQUÍN POLI" },
  { image: img4, title: "DARÍO ARCO" },
  { image: img5, title: "GUADA ALONSO" },
  { image: img6, title: "CAMI LOPEZ" },
  { image: img7, title: "SANTI SALGADO" },
  { image: img8, title: "MARTY LIMA" },
  { image: img9, title: "CANDE LIMA" },
  { image: img10, title: "LIMA BROTHERS" },
  { image: img11, title: "POLI BROTHERS" },
  { image: img12, title: "LUCAS ESTOMBA" },
  { image: img13, title: "MATEO CABAÑA" },
];

const NosEligenSlider: React.FC = () => (
  <div className="py-8">
    {/* título */}
    <div className="container mx-auto flex h-[200px] items-center justify-center">
      <h2 className="mb-6 text-center font-favoritExpanded text-xl font-bold uppercase tracking-widest sm:text-2xl md:text-3xl">
        Ellos también nos eligen
      </h2>
    </div>

    {/* Carrusel + flechas */}
    <div className="relative mx-auto w-full">
      {/* Flechas */}
      <button
        className="nosEligen-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded bg-white/20 p-2 backdrop-blur-sm hover:bg-white"
        aria-label="Anterior"
      >
        <FiChevronLeft size={24} className="text-black" />
      </button>

      <button
        className="nosEligen-next absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded bg-white/20 p-2 backdrop-blur-sm hover:bg-white"
        aria-label="Siguiente"
      >
        <FiChevronRight size={24} className="text-black" />
      </button>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: ".nosEligen-prev", nextEl: ".nosEligen-next" }}
        loop
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
      >
        {slides.map((props, idx) => (
          <SwiperSlide key={idx}>
            <ImageCard {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className="mt-8">
      <ImageCard {...specialSlide} />
    </div>
  </div>
);

export default NosEligenSlider;
