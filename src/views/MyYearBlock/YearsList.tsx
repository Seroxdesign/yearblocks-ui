import Link from "next/link";
import routes from "routes";
import YearBlockCard from "components/YearBlockCard";

const yearsList = [
  {
    name: "Claim My YearBlocks",
    description: `Claim a copy of your school's YearBlocks by simply clicking on the
    "Login with Google" button and use your school-provided email address.`,
    image: "/images/distribute.jpeg",
    link: routes.home,
  },
  {
    name: "View My YearBlocks",
    description: `Once you have claimed your YearBlocks, you can easily view them by accessing the dedicated My YearBlocks section, where you'll have access to browse and explore your school memories.`,
    image: "/images/yearblock-1.webp",
    link: routes.home,
  },
  {
    name: "Sign a Friend’s YearBlock",
    description: `You can sign your classmate’s YearBlock on the site by simply searching for their email, locating their YearBlock, and leaving a heartfelt message or signature to commemorate your friendship.`,
    image: "/images/yearblock-2.webp",
    link: routes.home,
  },
  {
    name: "2022-2023 Steady Studios High",
    description: `Campus YearBlock for the 2022-2023 School Year of Steady Studios`,
    image: "/images/yearblock-3.webp",
    link: routes.home,
  },
  {
    name: "2021-2022 Steady’s Flunks High",
    description: `Campus YearBlock for the 2021-2022 School Year of Steady Studios`,
    image: "/images/flunks-public.webp",
    link: routes.yearBlockPdf,
    target: "_blank",
  },
  {
    name: "Next Years Memories",
    description: `Placeholder for all of next years memories that will be preserved in your next YearBlocks copy.`,
    image: "/images/create.webp",
    link: routes.home,
  },
];

function YearsList({
  loading,
  yearBlocksList,
}: {
  loading: boolean;
  yearBlocksList: any;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-8xl margins">
        {loading ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full h-[250px]  md:h-[320px] holder"
              />
            ))}
          </div>
        ) : yearBlocksList.length > 0 ? (
          <>
            <div className="text-3xl sm:text-4xl lg:text-5xl leading-[40px] sm:leading-[50px] lg:leading-[80px] font-bold text-service-900 text-center py-12">
              My YearBlocks
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {yearBlocksList.map((data: any, index: number) => (
                <YearBlockCard data={data} key={index} />
              ))}
            </div>
            <div className="w-full flex items-center justify-center mb-8 mt-8 sm:mt-10 lg:mt-12">
              <button className="buttonPrimary">All My YearBlocks</button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-12 md:py-16 lg:py-24">
            <div className="text-2xl text-service-900 mb-4 font-semibold">
              Not Found.
            </div>
            <div className="text-lg text-service-900 text-center mb-8">
              You have empty YearBlocks. Let start and create your first
              YearBlock
            </div>
            <Link href={routes.createYearBlock} className="buttonPrimary">
              Create YearBlock
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default YearsList;
