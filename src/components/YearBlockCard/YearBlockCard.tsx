import Link from "next/link";

interface YearBlockCardTypes {
  name: string;
  description: string;
  image: string;
  link: string;
  target?: any;
}

function YearBlockCard({ data }: { data: YearBlockCardTypes }) {
  if (data?.target === "_blank") {
    return (
      <a href={data.link} target="_blank" className="w-full flex flex-col">
        <div
          className="bgImage !h-[250px]  md:!h-[270px] mb-3 lg:mb-5"
          style={{ backgroundImage: `url(${data.link})` }}
        />
        <div className="font-bold text-lg lg:text-[22px] leading-7 lg:leading-8 mb-1 lg:mb-3 text-center">
          {data.name}
        </div>
        <div className="text-sm lg:text-base text-gray-600 ellipsis-3 text-center">
          {data.description}
        </div>
      </a>
    );
  }
  return (
    <Link href={data.link} className="w-full flex flex-col">
      <div
        className="bgImage !h-[250px]  md:!h-[270px] mb-3 lg:mb-5"
        style={{ backgroundImage: `url(${data.link})` }}
      />
      <div className="font-bold text-lg lg:text-[22px] leading-7 lg:leading-8 mb-1 lg:mb-3 text-center">
        {data.name}
      </div>
      <div className="text-sm lg:text-base text-gray-600 ellipsis-3 text-center">
        {data.description}
      </div>
    </Link>
  );
}

export default YearBlockCard;
