import { outputAtom } from "@/atoms/problemAtom";
import { resultAtom } from "@/atoms/userAtom";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const TestCasesandResult = ({ problem }) => {
  const [loading, setLoading] = useState(true);
  const resultState = useRecoilValue(resultAtom);

  const [activeTestCaseId, setActiveTestCaseId] = useState(0); // indexing for testcases from the problem;
  const [innerNavs, setInnerNavs] = useState(["TestCases"]);
  const [activeBar, setActiveBar] = useState(0);

  const outputState = useRecoilValue(outputAtom);
  const openTestCases = problem.testcases.filter((el,index)=>{
    if(!el.hidden){
      return el;
    }else{
      //todo: remove this below line as all test cases are hidden for now so we wont be able to see any
      return el;
    }
  })
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  useEffect(() => {
    if (innerNavs.length < 2) {
      {
        outputState && setInnerNavs((prev) => [...prev, "Console"]);
      }
    }
  }, [outputState]);

  console.log('problem : ', problem);

  return (
    <div className="h-full w-full overflow-auto bg-third px-5 py-2">
      {/* testcase heading */}

      <div className="flex h-10 items-center space-x-6">
        <div
          className={`relative flex h-full cursor-pointer items-center justify-center space-x-4`}
        >
          {innerNavs.map((nav, index) => (
            <div
              onClick={() => setActiveBar(index)}
              key={index}
              className={`pb-2  text-[1rem] font-semibold leading-5
          ${activeBar === index ? "border-b text-rose-500" : "text-gray-500"}
              `}
            >
              {nav}
            </div>
          ))}
        </div>
      </div>

      {activeBar === 0 ? (
        <section>
          <div className="mt-4 flex rounded-md bg-black">
            {openTestCases.map((example, index) => (
              <div
                className="mr-2 mt-2 items-start "
                key={index}
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

          {/* Output Section */}
          <div className="my-4 font-semibold">
            <p className="mt-4 text-sm font-medium text-white">Input:</p>
            <div className="mt-2 w-full cursor-text rounded-lg border border-transparent bg-gray-400/20 px-3 py-[10px] text-white">
              {/* todo: heree the input.strs is not valid is to be removed later when we got a new contract deloyed */}
              {problem.testcases[activeTestCaseId].input.toString()}
            </div>
            <p className="mt-4 text-sm font-medium text-white">Output:</p>
            <div className="mt-2 w-full cursor-text rounded-lg border border-transparent bg-gray-400/20 px-3 py-[10px] text-white">
              {problem.testcases[activeTestCaseId].output.toString()}
            </div>
          </div>
        </section>
      ) : (
        <div className="h-[90%] rounded-md border border-gray-700 bg-[#1E1E1E] text-white">
          <div className="flex space-x-4 p-5">
            <h1 className="text-gray-400">Output : </h1>
            {outputState && (
              <p className="text-[1.1rem] text-white">{outputState}</p>
            )}
          </div>
        </div>
      )}
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
