import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import s1 from "@/assets/Scroll/s1.jpg";
import s2 from "@/assets/Scroll/s2.jpg";

const Scroll: React.FC = () => {
  const images = [s1, s2, s1, s2];

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
              alt={`Slide ${idx}`}
              className="h-[900px] w-full object-cover" // altura fija para todas
              onContextMenu={(e) => e.preventDefault()}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Scroll;
