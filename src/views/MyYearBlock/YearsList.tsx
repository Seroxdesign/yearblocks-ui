import YearBlockCard from "components/YearBlockCard";
import routes from "routes";

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

function YearsList() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-8xl margins py-8 sm:py-10 lg:py-12">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {yearsList.map((data, index) => (
            <YearBlockCard data={data} key={index} />
          ))}
        </div>
        <div className="w-full flex items-center justify-center mt-8 sm:mt-10 lg:mt-12">
          <button className="buttonPrimary">All My YearBlocks</button>
        </div>
      </div>
    </div>
  );
}

export default YearsList;
