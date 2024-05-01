import { useEffect, useState } from "react";

export default function AllSubmittion({ contract, claimer, loader }){
    const [ codes, setCodes ] = useState([]);
    useEffect(()=>{
        loader(true);
        //fetching the codes...via the contract...
        contract
        .allCodes()
        .call()
        .then((res) => {
            console.log(res);
            setCodes(res);
            loader(false);
        })
        .catch((error) => {
            console.error(error);
            loader(false);
        });
    },[]);

    return (
        <div className="flex h-[calc(100vh-94px)] overflow-y-hidden px-0 py-4">
            <div className="px-5">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex space-x-4">
                        <div className="mr-2 flex text-xl font-medium text-white">
                            All Submittions Here:
                        
                        </div>
                    </div>
                </div>
                {codes && codes.length>0? 
                        <div className="p-4 flex flex-col gap-3">
                            //mapping a component for codes...
                            {codes.map((code) =><Code code/>)}
                        </div>
                    :
                        <div className="">
                            <div className="text-gray-500 text-xl">No Code submitted Yet....</div>
                        </div>

                    
                }

                
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