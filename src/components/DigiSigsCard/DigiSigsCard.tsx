function DigiSigsCard({ data }: { data: any }) {
  return (
    <a href={data.link || "#"} target="_blank" className="w-full flex flex-col">
      <div
        className="bgImage !h-[250px]  md:!h-[270px] mb-3 lg:mb-5"
        style={{ backgroundImage: `url(${data?.thumbnail})` }}
      />
      <div className="w-full text-xl font-semibold text-center text-gray-500 mb-2">
        {`#${data.id}`}
      </div>
      <div className="font-bold text-lg lg:text-[22px] leading-7 lg:leading-8 mb-1 lg:mb-2 text-center">
        {data.name}
      </div>
      <div className="text-sm lg:text-base text-gray-600 ellipsis-3 text-center">
        {data.comment}
      </div>
    </a>
  );
}

export default DigiSigsCard;
