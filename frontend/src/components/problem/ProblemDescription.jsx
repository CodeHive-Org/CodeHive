"use client";

import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ProblemDescription = ({ problem }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pid = queryParams.get("pid");

  console.log("params : ", pid);

  // {problem.examples.map((example, index) => (
  //   <div key={example.id}>
  //     <p className="font-medium text-white ">
  //       Example {index + 1}:{" "}
  //     </p>
  //     {example.img && (
  //       <img src={example.img} alt="" className="mt-3" />
  //     )}
  //     <div className="example-card">
  //       <pre>
  //         <strong className="text-white">Input: </strong>{" "}
  //         {example.inputText}
  //         <br />
  //         <strong>Output:</strong>
  //         {example.outputText} <br />
  //         {example.explanation && (
  //           <>
  //             <strong>Explanation:</strong> {example.explanation}
  //           </>
  //         )}

  // const problem = {
  //   title: "Two Sum",
  //   fees: 0,
  //   description:
  //     "Given an array of integers `nums` and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  //   examples: [
  //     {
  //       id: 1,
  //       img: "",
  //       inputText: "nums = [34,3,54,1,5,14], target = 9",
  //       outputText: "[9.4]",
  //       explanation:
  //         "a random explanation about the code which i dont understand !",
  //     },
  //   ],
  // };

  const solved = true;

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

        <div className="flex h-[calc(100vh-94px)] overflow-y-auto px-0 py-4">
          <div className="px-5">
            {/*  PROBLEM solved info */}
            {/* {!loading && (
              <div className='flex items-center mt-3'>
                {(solved) && (
                  <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s flex text-dark-green-s'>
                    <span>You have already solved it </span> <Check className='text-green-500 ml-3' />
                  </div>
                )}
              </div>
            )} */}
            {/* Problem heading */}
            <div className="flex w-full flex-col gap-4">
              <div className="flex space-x-4">
                <div className="mr-2 flex-1 text-xl font-medium text-white">
                  <span className="text-[1.7rem]">{pid}. </span>{" "}
                  {problem?.title}
                </div>
              </div>

              {/* Problem Statement(paragraphs) */}
              <div className="text-[0.9rem] text-gray-300">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>

              {/* Examples */}
              <div className="">
                {/* {problem.examples.map((example, index) => (
                  <div key={example.id}>
                    <p className='font-medium text-white '>Example {index + 1}: </p>
                    {example.img && <img src={example.img} alt='' className='mt-3' />}
                    <div className='example-card'>
                      <pre>
                        <strong className='text-white'>Input: </strong> {example.inputText}
                        <br />
                        <strong>Output:</strong>
                        {example.outputText} <br />
                        {example.explanation && (
                          <>
                            <strong>Explanation:</strong> {example.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                ))} */}
              </div>

              {/* Examples */}
              <div className="mt-4 rounded-md bg-gray-400/40 p-4">
                {problem.examples.map((example, index) => (
                  <div key={example.id}>
                    <p className="font-medium text-white ">
                      Example {index + 1}:{" "}
                    </p>
                    {example.img && (
                      <img src={example.img} alt="" className="mt-3" />
                    )}
                    <div className="example-card">
                      <pre>
                        <strong className="text-white">Input: </strong>{" "}
                        {example.inputText}
                        <br />
                        <strong>Output:</strong>
                        {example.outputText} <br />
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
                  <li
                    dangerouslySetInnerHTML={{ __html: "n == nums.length" }}
                  />
                  <li dangerouslySetInnerHTML={{ __html: "1 <= n <= 105" }} />
                  <li
                    dangerouslySetInnerHTML={{
                      __html: "n is a multiple of 3.",
                    }}
                  />
                  <li dangerouslySetInnerHTML={{ __html: "1 <= k <= 105" }} />
                </ul>
              </div>

              {/* more info regarding problem  */}
              <div className="flex max-w-max flex-col space-y-4">
                <div className="flex rounded-md bg-orange-400 p-2 px-4 font-semibold text-white">
                  <h1 className="mr-2 font-medium text-black">
                    People attempted to solve this problem :{" "}
                  </h1>{" "}
                  6
                </div>
                <div className="flex rounded-md bg-orange-400 p-2 px-4 font-semibold text-red-700">
                  <h1 className="mr-2 font-medium text-black">
                    Reward if you solve this :{" "}
                  </h1>{" "}
                  6 Eth
                </div>
                <div className="flex rounded-md bg-orange-400 p-2 px-4 font-semibold text-blue-700">
                  <h1 className="mr-2 font-medium text-black">
                    Probability of solving this problem :{" "}
                  </h1>{" "}
                  10 %
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
