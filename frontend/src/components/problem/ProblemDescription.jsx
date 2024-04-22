"use client";

import { useTheContext } from "@/context";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProblemDescription = ({ problem, pid, contract}) => {
  const { tronWeb } = useTheContext();
  const location = useLocation();
  const [ claimer,  setClaimer ] = useState(); 
  const [ bounty,  setBounty ] = useState(); 
  useEffect(()=>{
    contract.bountyWinner().call()
    .then(winner => {
      if(winner !=  "410000000000000000000000000000000000000000"){
        setClaimer(winner);
      }
    })
    .catch(error => console.error(error));
    contract.bountyValue().call()
    .then(value => {
      setBounty(parseInt(value._hex));
    })
    //
  },[]);

  return (
    <main>
      <div className="bg-third">
        {/* TAB */}
        <div className="flex h-11 w-full items-center overflow-x-hidden border-b border-gray-500 bg-secondary pt-2 text-white">
          <div
            className={
              "cursor-pointer rounded-t-[5px] bg-gray-700 px-5 py-[10px] text-xs"
            }
          >
            Description
          </div>
        </div>

        <div className="flex h-[calc(100vh-94px)] overflow-y-hidden px-0 py-4">
          <div className="px-5">
            <div className="flex w-full flex-col gap-4">
              <div className="flex space-x-4">
                <div className="mr-2 flex-1 text-xl font-medium text-white">
                  {problem?.name}
                  <span className="text-[0.5rem]"> {pid}</span>{" "}
                  
                </div>
              </div>

              {/* Problem Statement(paragraphs) */}
              <div className="text-[0.9rem] text-gray-300">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>

              {/* Examples */}
              <div className="mt-4 rounded-md bg-gray-400/40 p-4">
                {problem.examples.map((example, index) => (
                  <div key={index}>
                    <p className="font-medium text-white ">
                      Example {index + 1}:{" "}
                    </p>
                    {example.img && (
                      <img src={example.img} alt="" className="mt-3" />
                    )}
                    <div className="example-card">
                      <pre>
                        <strong className="text-white">Input: </strong>{" "}
                        {example.input.toString()}
                        <br />
                        <strong>Output: </strong>
                        {example.output.toString()} <br />
                        {example.explanation && (
                          <>
                            <strong>Explanation:</strong> {example.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="my-4 pb-4">
                <div className="text-sm font-medium text-white">
                  Constraints:
                </div>
                <ul className="ml-5 list-disc text-white ">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>

              {/* more info regarding problem  */}
              <div className="flex max-w-max flex-col space-y-4">
                <div className="flex rounded-md bg-rose-600 p-2 px-4 font-semibold text-white">
                  <h1 className="mr-2 font-medium text-black">
                    Bounty Claimed :<span> {claimer?"Allready claimed":"Is yet to be claimed."}</span>
                  </h1>
                </div>
                <div className="flex rounded-md bg-orange-400 p-2 px-4 font-semibold text-red-700">
                  <h1 className="mr-2 font-medium text-black">
                    Reward if you solve this : {bounty/1000000} TRX
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProblemDescription;
