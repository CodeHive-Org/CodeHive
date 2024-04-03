import { resultAtom } from "@/atoms/userAtom";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const TestCasesandResult = ({ problem }) => {
  const [loading, setLoading] = useState(true);
  const resultState = useRecoilValue(resultAtom);

  const [activeTestCaseId, setActiveTestCaseId] = useState(0); // indexing for testcases from the problem;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (resultState) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  // if (loading) {
  //   return (
  //     <h1 className="mx-auto py-5 text-center text-xl">
  //       waiting for Your Output ...
  //     </h1>
  //   );
  // }

  // if (!resultState) {
  //   setLoading(true);
  //   return (
  //     <h1 className="mx-auto py-5 text-center text-xl">
  //       Waiting for your code submission !
  //     </h1>
  //   );
  // }

  return (
    <div className="h-full w-full overflow-auto bg-third px-5">
      {/* testcase heading */}
      <div className="flex h-10 items-center space-x-6">
        <div className="relative flex h-full cursor-pointer flex-col justify-center">
          <div className="text-sm font-medium leading-5 text-white">
            Testcases
          </div>
          <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
        </div>
      </div>

      <div className="mt-4 flex rounded-md bg-black">
        {problem.examples.map((example, index) => (
          <div
            className="mr-2 mt-2 items-start "
            key={example.id}
            onClick={() => setActiveTestCaseId(index)}
          >
            <div className="flex flex-wrap items-center gap-y-4">
              <div
                className={`bg-dark-fill-3 hover:bg-dark-fill-2 relative inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg px-4 py-1 font-medium transition-all focus:outline-none
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
              >
                Case {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-4 font-semibold">
        <p className="mt-4 text-sm font-medium text-white">Input:</p>
        <div className="mt-2 w-full cursor-text rounded-lg border border-transparent bg-gray-400/20 px-3 py-[10px] text-white">
          {problem.examples[activeTestCaseId].inputText}
        </div>
        <p className="mt-4 text-sm font-medium text-white">Output:</p>
        <div className="mt-2 w-full cursor-text rounded-lg border border-transparent bg-gray-400/20 px-3 py-[10px] text-white">
          {problem.examples[activeTestCaseId].outputText}
        </div>
      </div>
    </div>

    // <main className="w-full overflow-auto h-full relative bg-third">
    //   <nav>
    //     <div className="flex w-full items-center bg-secondary text-white overflow-x-hidden border-b border-gray-500">
    //       <div
    //         className={
    //           "rounded-t-[5px] px-5 py-[10px] flex items-center text-sm cursor-pointer"
    //         }
    //       >
    //         <Check className="text-green-500 mr-3" /> Result
    //       </div>
    //     </div>
    //   </nav>
    //   <h2 className="text-red-400 text-[1.4rem] px-2 py-4">
    //     {"Wrong Output :( "}
    //   </h2>
    //   <p className="pl-3 text-red-300">Hello there !</p>
    //   <div className="flex flex-col p-3 text-gray-300 gap-4">
    //     <h1 className="text-[1rem] border-b border-gray-400 text-white font-semibold">
    //       Expected Result :{" "}
    //     </h1>
    //     <p>Hello world !</p>
    //   </div>
    // </main>
  );
};

export default TestCasesandResult;