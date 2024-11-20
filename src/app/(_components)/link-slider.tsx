"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "@/styles/swiper.css";

interface LinkType {
  href: string;
  title: string;
  description: string;
}

interface Props {
  links: LinkType[];
}

export default function LinkSlider({ links }: Props) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ dynamicBullets: true, clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        stopOnLastSlide: false,
        pauseOnMouseEnter: true,
      }}
      style={{ margin: -20, padding: 20 }}
    >
      {links.map(({ href, title, description }, idx) => (
        <SwiperSlide className="select-none py-1" key={`${title}_${idx}`}>
          <a href={href} className="space-y-1">
            <h1 className="text-t4">{title}</h1>
            <p className="text-bd3"> {description}</p>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
