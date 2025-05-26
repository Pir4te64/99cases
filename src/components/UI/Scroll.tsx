import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import s1 from "@/assets/Scroll/s1.jpg";
import s2 from "@/assets/Scroll/s2.jpg";
import s3 from "@/assets/Scroll/s3.jpeg";
import s4 from "@/assets/Scroll/s4.jpeg";
import s5 from "@/assets/Scroll/s5.jpeg";
import s6 from "@/assets/Scroll/s6.jpeg";
import s7 from "@/assets/Scroll/s7.jpeg";
import s8 from "@/assets/Scroll/s8.jpeg";
import s9 from "@/assets/Scroll/s9.jpeg";
import s10 from "@/assets/Scroll/s10.jpeg";
import s11 from "@/assets/Scroll/s11.jpeg";
import s12 from "@/assets/Scroll/s12.jpeg";
import s13 from "@/assets/Scroll/s13.jpeg";
import s14 from "@/assets/Scroll/s14.jpeg";
import s15 from "@/assets/Scroll/s15.jpeg";
import s16 from "@/assets/Scroll/s16.jpeg";
import s18 from "@/assets/Scroll/s18.jpeg";
import s19 from "@/assets/Scroll/s19.jpeg";
import s20 from "@/assets/Scroll/s20.jpeg";
import s21 from "@/assets/Scroll/s21.jpeg";
import s22 from "@/assets/Scroll/s22.jpeg";

const Scroll: React.FC = () => {
  const images = [
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    s10,
    s11,
    s12,
    s13,
    s14,
    s15,
    s16,
    s18,
    s19,
    s20,
    s21,
    s22,
  ];

  return (
    <div className="mx-auto my-8 w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        // autoplay activo siempre, sin pausas al interactuar ni al entrar el mouse
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              loading="lazy"
              alt={`Slide ${idx}`}
              className="h-[450px] w-full object-cover md:h-[900px]" // altura reducida en móvil
              onContextMenu={(e) => e.preventDefault()}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Scroll;
