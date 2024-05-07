import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";
import { ABI } from "@/utils/problems";
import { useParams } from "react-router-dom";
import { SkeletonPage } from "@/components/SkeletonPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fetchTHeData = async (url, fxn) => {
  // const URL = import.meta.env.VITE_PINATA_URL + url;
  // var myHeaders = new Headers();
  // var requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };
  // const data = await (await fetch(URL, requestOptions)).text();
  // fxn(JSON.parse(data));
  //code goes here that fetches from the declared node boi........

// const btfsPath = "QmYdDodAxMbt9PVayHAB43BietATomB8JhRgamcWVvUY9o"
const queryParams = new URLSearchParams({
    arg: url,
});

fetch(`${import.meta.env.VITE_BTFS_NODE_URL}?${queryParams}`, {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": true
    }
})
.then(async response => {
    const decoder = new TextDecoder();
    const reader = response.body.getReader();

    return reader.read().then(({ value, done }) => {
        if (done) {
            console.log('Stream reading complete');
            return;
        }
        const decodedValue = decoder.decode(value, { stream: true });
        // console.log(decodedValue.split("~json~")[1]);
        return JSON.parse(decodedValue.split("~json~")[1].split("\x00")[0]);
    });
}).then(data=>{
  console.log(data);
  fxn(data);
})
.catch(error => {
    console.error('Error:', error);
});



};

const fetchTHeCode = async (url, fxn) => {
  if (url == "") {
    //default case baby man...
    url = "bafkreib4sbyv6qwkrdpukntyv34c2qb6qqqwjr53rp4dezm4i56q4m4vsi";
    console.error("Im showing a default code cause my code was blure....");
  }
  const URL = import.meta.env.VITE_PINATA_URL + url;

  var myHeaders = new Headers();
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await (await fetch(URL, requestOptions)).text();
  fxn(JSON.parse(data).code);
};

export default function MyQuestionDesc() {
  let { pid } = useParams();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState();
  const [claimer, setClaimer] = useState();
  const [claimed, setClaimed] = useState(false);
  const [bounty, setBounty] = useState();
  const [codes, setCodes] = useState();
  const [name, setName] = useState();
  const [difficulty, setDiff] = useState();
  const [winnerCode, setWinnerCode] = useState();

  const [contract, setContract] = useState();

  useEffect(() => {
    const getContract = async () => {
      const instance = await window.tronLink.tronWeb.contract(ABI, pid);
      setContract(instance);
    };
    getContract();
  }, [ABI]);

  useEffect(() => {
    const getDATA = async () => {
      contract
        .QuestionData()
        .call()
        .then((data) => fetchTHeData(data, setProblem));
      contract
        .bountyValue()
        .call()
        .then((data) => setBounty(parseInt(data._hex, 16)));
      contract
        .claimed()
        .call()
        .then((data) => setClaimed(data));
      contract
        .bountyWinner()
        .call()
        .then((val) => setClaimer(val));
      contract
        .allCodes()
        .call()
        .then((codes) => setCodes(codes));
      contract
        .topicName()
        .call()
        .then((data) => setName(data));
      contract
        .difficulty()
        .call()
        .then((data) => setDiff(data));
      // "giveAway(address)"
    };

    if (contract) {
      getDATA();
    }
  }, [contract]);
  useEffect(() => {
    if (problem && claimer && bounty && codes && name && difficulty) {
      setLoading(false);
    }
  }, [problem, claimer, bounty, codes, name, difficulty]);
  //fetching the winner code...
  useEffect(() => {
    //fetchignt the winner
    if (contract) {
      contract
        .winnerCode()
        .call()
        .then((data) => fetchTHeCode(data, setWinnerCode));
    }
  }, [claimed]);
  console.log(claimed, winnerCode);

  if (loading) {
    return (
      <main className=" min-h-screen w-full bg-background">
        <Nav />
        <main className="mt-20 flex h-full w-full flex-col items-center justify-center space-y-4">
          <h3 className="text-gray-300">Questions Loading ...</h3>

          <div role="status">
            <svg
              aria-hidden="true"
              className="inline h-[150px] w-[100px] animate-spin fill-red-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </main>
      </main>
    );
  }

  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Nav />
      <MaxWidthWrapper className="relative flex h-full flex-col items-center justify-center py-[40px]">
        <div className="flex w-[80%] flex-col items-center gap-3 py-[10px]">
          <div className="flex w-full items-center justify-between border-b border-gray-500">
            <p className="flex gap-2 text-[34px] font-bold text-gray-100">
              {name}
              <span className="align-top text-[1rem]">
                {claimed ? (
                  <p
                    className="float-right w-max rounded-[4px] border border-gray-900 p-[2px] 
                  text-primary"
                  >
                    claimed ✅
                  </p>
                ) : (
                  ""
                )}
              </span>
            </p>
            <p className="text-[18px] font-bold text-[#3c3c3c]">{pid}</p>
          </div>
          <div className="w-[90%] text-[#b4b0b0]">{problem?.description}</div>
        </div>
        <div className="flex w-[70%] flex-col items-center gap-3 py-[10px]">
          {claimed && (
            // adding the winning code herer...
            <Accordion type="single" collapsible className="w-full px-[20px]">
              <AccordionItem value="69">
                <AccordionTrigger className="text-[1.2rem] font-bold text-primary xl:text-[1.4rem]">
                  Winner Code
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative whitespace-pre-wrap rounded-[5px] border p-2">
                    {winnerCode}
                    {!claimed && (
                      <button
                        className="absolute right-[10px] top-[10px] rounded-[5px] border border-primary px-[3px] py-[2px] pt-[4px] text-[12px] font-bold text-primary hover:bg-primary hover:text-black"
                        onClick={() => fundAcc()}
                      >
                        Fund This
                      </button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
        <div className="flex w-[60%] flex-col items-center gap-3 py-[10px] pt-[30px]">
          <p className="w-full text-[20px] font-bold text-primary">
            Code Submissions:
          </p>
          <Accordion type="single" collapsible className="w-full px-[20px]">
            {codes.map((code, index) => (
              <CodeSegment
                contract={contract}
                codeData={code}
                key={index}
                index={index}
                claimed={claimed}
              />
            ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

function CodeSegment({ contract, codeData, index, claimed }) {
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTHeCode(codeData.code, setCode);
  }, []);
  console.log(index, codeData);
  useEffect(() => {
    if (code) {
      setLoading(false);
    }
  }, [code]);
  if (loading) {
    return "skeleton small maannn";
  }
  const fundAcc = async () => {
    //check if allready claime
    let isClaimed = await contract.claimed().call();
    if (!isClaimed) {
      //running the code to fund it.....
      //todo: set loading true
      const result = await contract.giveAway(codeData.by).send();
      console.log(result);
      //todo: set loading false
    } else {
      //todo: alert allready claimed
    }
  };
  return (
    <>
      <AccordionItem value={index.toString()}>
        <AccordionTrigger className="text-[1.2rem] xl:text-[1.4rem]">
          {codeData.by.slice(0, 6) + "..." + codeData.by.slice(-14)}
        </AccordionTrigger>
        <AccordionContent>
          <div className="relative whitespace-pre-wrap rounded-[5px] border p-2">
            {code}
            {!claimed && (
              <button
                className="absolute right-[10px] top-[10px] rounded-[5px] border border-primary px-[3px] py-[2px] pt-[4px] text-[12px] font-bold text-primary hover:bg-primary hover:text-black"
                onClick={() => fundAcc()}
              >
                Fund This
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>
              Memory:{" "}
              <span className="font-semibold text-primary">
                {Math.floor(parseInt(codeData.runTime._hex, 16) / 10000)}
              </span>
            </p>{" "}
            {/* number placed from index 4 to onwards are memory. */}
            <p>
              Run Time:{" "}
              <span className="font-semibold text-primary">
                {parseInt(codeData.runTime._hex, 16) % 10000}
              </span>
            </p>{" "}
            {/* number placed as 0 to 3 index is the runtime of the code. */}
            <p>
              Post Time:{" "}
              <span className="font-semibold text-primary">
                {" "}
                {parseInt(codeData.submitTime._hex, 16)}
              </span>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
