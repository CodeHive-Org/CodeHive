import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useEffect, useState } from "react";

export default function MySubmittion({ contract, claimer, loader }){
    const { address } = useWallet();
    const [ myCode, setMyCode ] = useState();
    const [ allData, setAllData ] = useState();

    const fetchTHeData = async (url) => {
        if( url == ""){
            //default case baby man...
            url = "bafkreib4sbyv6qwkrdpukntyv34c2qb6qqqwjr53rp4dezm4i56q4m4vsi";
            console.error("Im showing a default code cause my code was blure....");
        }
        const URL = import.meta.env.VITE_PINATA_URL + url;
    
        var myHeaders = new Headers();
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        const data = await (await fetch(URL, requestOptions)).text();
        setMyCode(JSON.parse(data).code.split("\n"));
      }

    useEffect(()=>{
        //fetching the codes...via the contract...
        loader(true);
        contract
        .codes(address)
        .call()
        .then((res) => {
            if(res[0] == "410000000000000000000000000000000000000000"){
                return;
            }
            fetchTHeData(res.code);
            setAllData(res);
            loader(false);
        })
        .catch((error) => console.error(error));
    },[]);

    return (
        <div className="flex h-[calc(100vh-94px)] overflow-y-hidden px-0 py-4">
            <div className="px-5">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex space-x-4">
                        <div className="mr-2 flex-1 text-xl font-medium text-white">
                            My Submittions:
                        
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <br />
                    <div className="border-2 border-gray-700 rounded-[16px] bg-gray-600">
                        {myCode? 
                                <div className="p-4 flex flex-col gap-1">
                                    {myCode.map((el,i)=>(<span key={i} className="whitespace-pre-wrap">{el}</span>))}
                                </div>
                            :
                            <div className="">
                                <div className="text-white text-xl p-4 text-center">No Code submitted Yet....</div>
                            </div>
                            
                        }
                    </div>
                    {allData && 
                        <div>Submitted on: {parseInt(allData.submitTime._hex, 16)}</div>
                    }
                </div>

                
            </div>
        </div>
    )
}

function Code({code}){
    return (
        <div className="flex-col rounded-[10px] border-2 border-gray-600">
                code code code code{code}
        </div>
    )
}