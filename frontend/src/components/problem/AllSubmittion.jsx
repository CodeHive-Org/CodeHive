import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SkeletonPage } from "../SkeletonPage";


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
            //sort here...
            res.sort((a, b) => parseInt(a.submitTime._hex,16) - parseInt(b.submitTime._hex,16));
            setCodes(res);
            loader(false);
        })
        .catch((error) => {
            console.error(error);
            loader(false);
        });
    },[]);
    if(computeAddress.lenght == 0){
        return <SkeletonPage/>
    }
    return (
        <div className="h-[calc(100vh-94px)] overflow-y-hidden px-0 py-4 w-full">
            <div className="px-5">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex space-x-4">
                        <div className="mr-2 flex text-xl font-medium text-white">
                            All Submittions Here:
                        
                        </div>
                    </div>
                </div>
                {codes && codes.length>0? 
                        <Accordion type="single" collapsible className="p-4 flex flex-col gap-3 w-full">
                            {codes.map((code, index) =><Code key={index} index={index} item={code}/>)}
                        </Accordion>
                    :
                        <div className="">
                            <div className="text-gray-500 text-xl">No Code submitted Yet....</div>
                        </div>
                }   

                
            </div>
        </div>
    )
}

const fetchTHeData = async (url, fxn) => {
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
    fxn(JSON.parse(data).code);
}

function Code({item, index}){
    console.log(item);
    const [ code, setCode ] = useState("Loading...");
    useEffect(()=>{
       fetchTHeData(item[1], setCode);
    },[]);
    return (
        <div className="flex-col rounded-[10px]">
                <AccordionItem value={index}>
                    <AccordionTrigger className='xl:text-[1.4rem] 
                    text-[0.86rem] hover:text-primary
                    hover:text-[0.9rem] xl:hover:text-[1.5rem] px-4'>
                        <div className="flex justify-between items-center w-full">
                            <p>{"Claimer: "+ item[0].slice(0,4)+"....."+item[0].slice(-6)}</p>
                            <p>t#_{parseInt(item.submitTime._hex,16)}</p>                            
                        </div>    
                    </AccordionTrigger>
                    <AccordionContent className="whitespace-pre-wrap px-6 bg-gray-500 py-3 rounded-t-[10px]">
                        {code}
                    </AccordionContent>
                </AccordionItem>
        </div>
    )
}

