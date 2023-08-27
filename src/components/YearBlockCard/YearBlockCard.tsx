import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { generateNumberID } from "utils/common";
import { mintYearBlockNFT } from "utils/flow";

interface YearBlockCardTypes {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
  target?: any;
  thumbnail?: string;
  allowList?: string[];
}

function YearBlockCard({ data }: { data: YearBlockCardTypes }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  
  const session = useSession();
  
  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const checkAllowList = () => {
    if (data?.allowList?.includes(session.data?.user?.email || 'any')) return true
    if (data?.allowList?.includes(user?.services[0]?.scoped?.email || 'any')) return true
    else return false
  }

  const claimYearBlock = async () => {
    let uniqueId = generateNumberID(6);
    const tx = await mintYearBlockNFT({
      setLoading,
      id: uniqueId,
      link: data?.link,
      thumbnail: data?.thumbnail,
      allowList: ['any'],
      name: data.name,
      description: data.description,
    });
    console.log(tx)
  }

  return (
    <div className="w-full flex flex-col">
      <div
        className="bgImage !h-[250px]  md:!h-[270px] mb-3 lg:mb-5"
        style={{ backgroundImage: `url(${data?.thumbnail})` }}
      />
      <div className="w-full text-xl font-semibold text-center text-gray-500 mb-2">
        {`#${data.id}`}
      </div>
      <a href={'https://yearblock.com/my-yearblocks/' || "#"} target="_blank">
      <div className="font-bold text-lg lg:text-[22px] leading-7 lg:leading-8 mb-1 lg:mb-2 text-center">
        {data.name}
      </div>
      </a>
      
      <div className="text-sm lg:text-base text-gray-600 ellipsis-3 text-center">
        {data.description}
      </div>
      {
        checkAllowList() ? (
          <button style={{ backgroundColor: '#dcd42b', padding: '1em', marginTop: '1em' }} onClick={claimYearBlock}>
            Claim
          </button>
        ) : (
          <></>
        )
      }
      
    </div>
  );
}

export default YearBlockCard;
