//@ts-nocheck
"use client";
import Image from "next/image";
import { MouseEventHandler, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-flip";
import { EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PayCard() {
  const [fullScreen, setFullScreen] = useState<boolean | HTMLImageElement>(
    false
  );
  const qrcodeRef = useRef<HTMLImageElement>(null);
  const barcodeRef = useRef<HTMLImageElement>(null);
  const loading = useRef<boolean>(false);

  const handleMoveBodyTransitionEnd = (target: HTMLImageElement) => {
    setFullScreen(target);
    document.body.getElementsByTagName("main")[0].appendChild(target);
    target.removeEventListener("transitionend", () =>
      handleMoveBodyTransitionEnd(target)
    );
    loading.current = false;
  };

  const handleMoveOriginTransitionEnd = (target: HTMLImageElement) => {
    if (target.id === "qrcode") {
      document.getElementById("pay")!.prepend(target);
    } else {
      document.getElementById("pay")!.appendChild(target);
    }
    setFullScreen(false);
    target.removeEventListener("transitionend", () =>
      handleMoveOriginTransitionEnd(target)
    );
    loading.current = false;
  };

  const handleBarcodeFullScreenMode: MouseEventHandler<
    HTMLImageElement
  > = async (e) => {
    const target = e.target as HTMLImageElement;
    loading.current = true;
    target.style.position = "absolute";
    target.style.right = "50%";
    target.style.top = "45%";
    target.style.zIndex = "999";
    target.style.transform = "rotate(90deg) scale(2) translate(0, -100%)";
    target.style.transition = "all 0.3s";

    target.addEventListener("transitionend", () =>
      handleMoveBodyTransitionEnd(target)
    );
  };

  const handleQRFullScreenMode: MouseEventHandler<HTMLImageElement> = async (
    e
  ) => {
    const target = e.target as HTMLImageElement;
    loading.current = true;
    target.style.position = "absolute";
    target.style.right = "50%";
    target.style.top = "45%";
    target.style.zIndex = "999";
    target.style.transform = "scale(3) translate(18%, 0)";
    target.style.transition = "all 0.3s";

    target.addEventListener("transitionend", () => {
      handleMoveBodyTransitionEnd(target);
    });
  };

  const handleCancelFullScreenMode = async (target: HTMLImageElement) => {
    target.style = {
      ...target.style,
      position: "static",
      transition: "all 0.3s",
      zIndex: "0",
      transform: "scale(1/2) translate(0, 0)",

      WebkitTransform: "rotate(90deg) scale(2) translate(0, -100%)", // 추가
    };
    target.addEventListener("transitionend", () =>
      handleMoveOriginTransitionEnd(target)
    );
  };

  return (
    <>
      <Swiper
        loop={true}
        effect={"flip"}
        modules={[EffectFlip]}
        className="relative w-full h-full"
        onClick={(swiper) => swiper.slideNext()}
        noSwipingClass="no-swiper"
      >
        <SwiperSlide className="card aspect-[1.6/1] w-full min-h-36 overflow-hidden p-0 bg-accent-green will-change-transform ">
          <div className=" w-full">
            <Image
              width={90}
              height={90}
              quality={100}
              src="/icons/ic.png"
              alt="카드 IC칩"
              className="h-[15%] w-auto absolute left-5 top-1/2 -translate-y-1/2 ml-5 rotate-0"
              style={{
                transform: "rotate(0deg)",
                WebkitTransform: "rotate(0deg)",
              }}
            />
            <div className="w-full h-full">
              <img
                src="/icons/card-logo.png"
                className="absolute w-[35%] top-16 max-xs:top-10 right-10 "
                alt="카드 로고"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="card aspect-[1.6/1] w-full min-h-36 bg-white">
          <div className="text-black flex flex-col items-center justify-center max-xs:gap-2 gap-10 w-full h-full">
            <div id="pay" className="flex gap-4">
              <img
                ref={qrcodeRef}
                id="qrcode"
                src="/temp/qr.png"
                alt="페이 QRcode"
                className="no-swiper w-auto max-h-24 aspect-square transition-all"
                onClick={(e) => {
                  if (loading.current) return;
                  handleQRFullScreenMode(e);
                }}
              />
              <Image
                ref={barcodeRef}
                id="barcode"
                src="/temp/barcode.png"
                width={300}
                height={300}
                className="no-swiper flex-1 min-w-0 max-h-24 aspect-[4/1] rounded-md transition-all"
                alt="페이 Barcode"
                onClick={(e) => {
                  if (loading.current) return;
                  handleBarcodeFullScreenMode(e);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between w-[200px]">
                <span className="text-bd3 xs:text-bd1">포인트</span>
                <span className="text-t4 xs:text-t3">8106원</span>
              </div>
              <div className="flex items-center justify-between w-[200px]">
                <span className="text-bd3 xs:text-bd1">머니</span>
                <span className="text-t4 xs:text-t3">330원</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {fullScreen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 z-40 animate-[fadeIn_0s]">
          <div className="w-full max-w-[500px] bg-white h-full mx-auto flex justify-end p-10">
            <img
              src="/icons/x.png"
              className="w-10 h-10 p-2"
              onClick={() =>
                handleCancelFullScreenMode(fullScreen as HTMLImageElement)
              }
            />
          </div>
        </div>
      )}
    </>
  );
}