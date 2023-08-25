import Link from "next/link";
import routes from "routes";
import DigiSigsCard from "components/DigiSigsCard";

function DigiSigsList({
  loading,
  digiSigsList,
}: {
  loading: boolean;
  digiSigsList: any;
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
        ) : digiSigsList.length > 0 ? (
          <>
            <div className="text-3xl sm:text-4xl lg:text-5xl leading-[40px] sm:leading-[50px] lg:leading-[80px] font-bold text-service-900 text-center py-12">
              My DigiSigs
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {digiSigsList.map((data: any, index: number) => (
                <DigiSigsCard data={data} key={index} />
              ))}
            </div>
            <div className="w-full flex items-center justify-center mb-8 mt-8 sm:mt-10 lg:mt-12">
              {/* <button className="buttonPrimary">All My YearBlocks</button> */}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-12 md:py-16 lg:py-24">
            <div className="text-2xl text-service-900 mb-4 font-semibold">
              Not Found.
            </div>
            <div className="text-lg text-service-900 text-center mb-8">
              You have empty DigiSigs list. Let start and create your first
              DigiSigs
            </div>
            <Link href={routes.createDigiSigns} className="buttonPrimary">
              Create DigiSigs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default DigiSigsList;
