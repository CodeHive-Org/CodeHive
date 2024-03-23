"use client";

import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const ProblemDescription = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pid = queryParams.get('pid');

  console.log('params : ', pid);

  const problem = {
    title: "Two Sum",
    fees: 0,
    description: "Given an array of integers `nums` and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
  };

  const solved = true;

  return (
    <main>
      <div className='bg-third'>
        {/* TAB */}
        <div className='flex h-11 w-full items-center pt-2 bg-secondary text-white overflow-x-hidden border-b border-gray-500'>
          <div className={"bg-gray-700 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
            Description
          </div>
        </div>

        <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
          <div className='px-5'>
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
            <div className='w-full flex flex-col gap-4'>
              <div className='flex space-x-4'>
                <div className='flex-1 mr-2 text-xl text-white font-medium'>
                  <span className='text-[1.7rem]'>{pid}. </span> {problem?.title}</div>
              </div>

              {/* Problem Statement(paragraphs) */}
              <div className='text-gray-300 text-[0.9rem]'>
                <div dangerouslySetInnerHTML={{ __html: problem.description }} />
              </div>

              {/* Examples */}
              <div className=''>
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

              {/* Constraints */}
              <div className='my-4 pb-4'>
                <div className='text-white text-sm font-medium'>Constraints:</div>
                <ul className='text-white ml-5 list-disc '>
                  <li dangerouslySetInnerHTML={{ __html: "n == nums.length" }} />
                  <li dangerouslySetInnerHTML={{ __html: "1 <= n <= 105" }} />
                  <li dangerouslySetInnerHTML={{ __html: "n is a multiple of 3." }} />
                  <li dangerouslySetInnerHTML={{ __html: "1 <= k <= 105" }} />
                </ul>
              </div>

              {/* more info regarding problem  */}
              <div className='flex flex-col space-y-4 max-w-max'>
                <div className='flex p-2 rounded-md px-4 bg-orange-400 text-white font-semibold'>
                  <h1 className='text-black font-medium mr-2'>People attempted to solve this problem : </h1> 6
                </div>
                <div className='flex p-2 rounded-md px-4 bg-orange-400 text-red-700 font-semibold'>
                  <h1 className='text-black font-medium mr-2'>Reward if you solve this : </h1> 6 Eth
                </div>
                <div className='flex p-2 rounded-md px-4 bg-orange-400 text-blue-700 font-semibold'>
                  <h1 className='text-black font-medium mr-2'>Probability of solving this problem : </h1> 10 %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProblemDescription