"use client";
import { GetMyCardRes } from "@/types/api/card";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// const listData: SearchCardType[] = Array(5).fill({
//   name: "카드이름",
//   image_url:
//     "https://d1c5n4ri2guedi.cloudfront.net/card/13/card_img/28201/13card.png",
//   company_name: "현대",
//   card_type: "타입",
//   card_id: 0,
//   benefits: [
//     { benefit_category: "혜택 카테고리1", benefit_description: "혜택 설명" },
//     { benefit_category: "혜택 카테고리2", benefit_description: "혜택 설명" },
//     { benefit_category: "혜택 카테고리3", benefit_description: "혜택 설명" },
//   ],
// });

interface Props {
  listData: GetMyCardRes;
}

export default function MyCardList({ listData }: Props) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      spaceBetween={30}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="w-full h-[300px]"
    >
      {listData.map(({ card_id, card }, idx) => {
        const { card_image } = card;
        return (
          <SwiperSlide key={`${card_id}_${idx}`} className="h-full">
            <div className="h-full w-full flex flex-col justify-center items-cente mx-auto px-auto">
              <img src={card_image} className="w-36" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}