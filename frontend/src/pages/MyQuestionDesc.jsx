import React, { useState, useEffect } from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";
import { ABI } from "@/utils/problems";
import { useParams } from 'react-router-dom';
import { SkeletonPage } from '@/components/SkeletonPage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const fetchTHeData = async (url, fxn) => {
  const URL = import.meta.env.VITE_PINATA_URL + url;
  var myHeaders = new Headers();
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const data = await (await fetch(URL, requestOptions)).text();
  fxn(JSON.parse(data));
}

const fetchTHeCode = async (url, fxn) => {
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

export default function MyQuestionDesc() {
  let {pid} = useParams();
  const [ loading , setLoading] = useState(true);
  const [ problem, setProblem ] = useState();
  const [ claimer, setClaimer ] = useState();
  const [ claimed, setClaimed ] = useState(false); 
  const [ bounty, setBounty ] = useState();
  const [ codes, setCodes ] = useState();
  const [ name, setName ] = useState();
  const [ difficulty, setDiff ] = useState();
  const [ winnerCode, setWinnerCode ] = useState();

  const [ contract, setContract ] = useState();
  
  useEffect(() => {
    const getContract = async () => {
      const instance = await window.tronLink.tronWeb.contract(ABI, pid);
      setContract(instance);
    };
    getContract();
  }, [ABI]);

  useEffect(()=>{
    const getDATA = async () => {
      contract.QuestionData().call().then(data=>fetchTHeData( data, setProblem));
      contract.bountyValue().call().then(data=>setBounty(parseInt(data._hex,16)));
      contract.claimed().call().then(data=>setClaimed(data));
      contract.bountyWinner().call().then(val=>setClaimer(val));
      contract.allCodes().call().then(codes=>setCodes(codes));
      contract.topicName().call().then(data=>setName(data));
      contract.difficulty().call().then(data=>setDiff(data));
      // "giveAway(address)"
    }

    if(contract){
      getDATA();
    }
  },[contract]);
  useEffect(()=>{
    if(problem&&claimer&&bounty&&codes&&name&&difficulty){
      setLoading(false);
    }
  },[problem, claimer, bounty, codes, name, difficulty])
  //fetching the winner code...
  useEffect(()=>{
    //fetchignt the winner
    if(contract){
      contract.winnerCode().call().then(data=>fetchTHeCode(data,setWinnerCode))
    }
    
  },[claimed]);
  console.log(claimed,winnerCode);
  if(loading){
    return <SkeletonPage/>
  }
  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Nav />
      <MaxWidthWrapper className="relative py-[40px] h-full flex flex-col items-center justify-center">
        <div className="w-[80%] items-center flex flex-col gap-3 py-[10px]">
          <div className="w-full flex justify-between items-center">
            <p className="text-primary text-[34px] font-bold flex gap-2">{name}<span className="align-top text-[13px]">{claimed?<p className="border border-primary rounded-[4px] px-[3px] py-[1px]">claimed</p>:""}</span></p>
            <p className="text-[#3c3c3c] text-[18px] font-bold">{pid}</p>
          </div>
          <div className="w-[90%] text-[#7e7e7e]">
            {problem?.description}
          </div>
        </div>
        <div className="w-[70%] items-center flex flex-col gap-3 py-[10px]">
          {claimed &&
            // adding the winning code herer...
            <Accordion type="single" collapsible className="w-full px-[20px]">
              <AccordionItem value="69">
                <AccordionTrigger className="text-[1.2rem] xl:text-[1.4rem] text-primary">
                  Winner Code
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative whitespace-pre-wrap border rounded-[5px] p-2">
                    {winnerCode}
                    {!claimed &&
                      <button className="absolute top-[10px] right-[10px] border border-primary text-primary font-bold text-[12px] rounded-[5px] px-[3px] py-[2px] pt-[4px] hover:text-black hover:bg-primary" onClick={()=>fundAcc()}>Fund This</button>
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          }
        </div>
        <div className="w-[60%] items-center flex flex-col gap-3 py-[10px] pt-[30px]">
          <p className="w-full text-primary text-[20px] font-bold">
            Code Submissions:
          </p>
          <Accordion type="single" collapsible className="w-full px-[20px]">
              {codes.map((code,index)=><CodeSegment contract={contract} codeData={code} key={index} index={index} claimed={claimed}/>)}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

function CodeSegment({ contract, codeData, index, claimed }){
  const [ code, setCode ] = useState();
  const [ loading, setLoading ] = useState(true);
  useEffect(()=>{
    fetchTHeCode(codeData.code, setCode);
  },[]);
  console.log(index,codeData);
  useEffect(()=>{
    if(code){
      setLoading(false);
    }
  },[code]);
  if(loading){
    return (
      "skeleton small maannn"
    )
  }
  const fundAcc = async()=>{
    //check if allready claime
    let isClaimed = await contract.claimed().call();
    if(!isClaimed){
      //running the code to fund it.....
      //todo: set loading true
      const result = await contract.giveAway(codeData.by).send();
      console.log(result);
      //todo: set loading false
    }
    else{
      //todo: alert allready claimed
    }
  }
  return (
    <>
      <AccordionItem value={index.toString()}>
            <AccordionTrigger className="text-[1.2rem] xl:text-[1.4rem]">
              {codeData.by.slice(0,6)+"..."+codeData.by.slice(-14)}
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative whitespace-pre-wrap border rounded-[5px] p-2">
                {code}
                {!claimed &&
                  <button className="absolute top-[10px] right-[10px] border border-primary text-primary font-bold text-[12px] rounded-[5px] px-[3px] py-[2px] pt-[4px] hover:text-black hover:bg-primary" onClick={()=>fundAcc()}>Fund This</button>
                }
              </div>
              <div className="flex items-center justify-between gap-2">
                <p>Memory: <span>{Math.floor(parseInt(codeData.runTime._hex,16)/10000)}</span></p>  {/* number placed from index 4 to onwards are memory. */}
                <p>Run Time: <span>{parseInt(codeData.runTime._hex,16)%10000}</span></p> {/* number placed as 0 to 3 index is the runtime of the code. */}
                <p>Post Time: <span>{parseInt(codeData.submitTime._hex,16)}</span></p>
              </div>
            </AccordionContent>
          </AccordionItem>
    </>

  )
}
