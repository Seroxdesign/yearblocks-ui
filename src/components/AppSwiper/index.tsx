import { Children, useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface AppSwiperProps {
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween?: number;
  breakpoints?: any;
  showPagination?: boolean;
  showNavigation?: boolean;
}
type Swiper = any;

const AppSwiper: React.FC<AppSwiperProps> = ({
  children,
  slidesPerView,
  spaceBetween,
  breakpoints,
  showPagination = false,
  showNavigation = false,
}) => {
  const swiperRef = useRef<Swiper | null>(null);
  const slidesLength = Children.count(children);
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrev = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }, []);

  const handleSlideChange = (swiper: Swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  const handlePaginationClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="w-full items-center relative">
      <Swiper
        className="w-full flex items-center relative"
        ref={swiperRef}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        onSlideChange={handleSlideChange}
      >
        {Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Custom Pagination */}
      {showPagination && slidesLength - (slidesPerView - 1) !== 1 ? (
        <div className="absolute left-0 right-0 -bottom-8 sm:-bottom-10 flex justify-center">
          {[...Array(slidesLength - (slidesPerView - 1))].map((_, index) => (
            <div
              key={index}
              className={`w-9 2xl:w-10 h-2.5 2xl:h-3 rounded-md mx-1 cursor-pointer ${
                index === activeSlide ? "bg-primary-700" : "bg-gray-100"
              }`}
              onClick={() => handlePaginationClick(index)}
            ></div>
          ))}
        </div>
      ) : null}

      {/* Swiper Custom Navigate Buttons */}
      {showNavigation && slidesLength - (slidesPerView - 1) !== 1 ? (
        <div className="absolute top-[88px] left-0 right-0 hidden xl:flex items-center z-10">
          <button
            className="absolute -left-8 2xl:-left-12 disabled:opacity-70 disabled:cursor-not-allowed h-10 w-10 bg-gray-100 rounded-full p-2"
            onClick={handlePrev}
            disabled={activeSlide === 0}
          >
            <svg
              width="100%"
              height="100%"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button
            className="absolute -right-8 2xl:-right-12 disabled:opacity-70 disabled:cursor-not-allowed h-10 w-10 bg-gray-100 rounded-full p-2"
            onClick={handleNext}
            disabled={activeSlide === slidesLength - slidesPerView}
          >
            <svg
              width="100%"
              height="100%"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AppSwiper;
