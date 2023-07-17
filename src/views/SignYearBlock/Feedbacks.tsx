import AppSwiper from "components/AppSwiper";

function Feedbacks() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1335px] margins py-8 sm:py-16 lg:py-24 relative">
        <AppSwiper
          slidesPerView={3}
          spaceBetween={20}
          showNavigation={true}
          showPagination={true}
          breakpoints={{
            280: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-full bg-gray-100 min-h-[auto] sm:min-h-[160px] py-5 sm:py-4 px-4 sm:px-6 md:px-8 flex flex-col justify-center"
            >
              <div className="text-sm sm:text-base text-service-900 mb-3 ellipsis-3">
                We had a great year, looking forward to hanging out this summer!
              </div>
              <div className="text-sm sm:text-base text-service-900">
                Jane Doe
              </div>
            </div>
          ))}
        </AppSwiper>
      </div>
    </div>
  );
}

export default Feedbacks;
