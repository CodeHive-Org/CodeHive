import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { outputAtom } from "../../atoms/problemAtom";

const TestCasesandResult = ({ problem }) => {
  const [, setLoading] = useState(true);

  const [activeTestCaseId, setActiveTestCaseId] = useState(0); // indexing for testcases from the problem;
  const [innerNavs, setInnerNavs] = useState(["TestCases"]);
  const [activeBar, setActiveBar] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const output = useRecoilValue(outputAtom);
  const outputState = output?.data;

  const openTestCases = problem.testcases.filter((el, index) => {
    if (!el.hidden) {
      return el;
    }
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (innerNavs.length < 2 && outputState && !innerNavs.includes("Console")) {
      setInnerNavs((prev) => [...prev, "Console"]);
    }
  }, [outputState]);

  const getOutput = () => {
    let statusId = outputState?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 text-[1.1rem] font-normal text-red-500">
          {atob(outputState?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 text-[1.1rem] font-normal text-green-500">
          {atob(outputState.stdout) !== null
            ? `${atob(outputState.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 text-[1.1rem] font-normal text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 text-[1.1rem] font-normal text-red-500">
          {atob(outputState?.stderr)}
        </pre>
      );
    }
  };

  console.log(
    typeof Object.values(problem.testcases[activeTestCaseId]?.input)[0],
  );
  console.log(
    typeof Object.values(problem.testcases[activeTestCaseId]?.input)[0],
  );


  return (
    <div className="h-full w-full overflow-auto bg-third px-5 py-2">
      {/* testcase heading */}

      <div className="flex h-10 items-center space-x-6">
        <div
          className={`relative flex h-full cursor-pointer items-center justify-center space-x-4`}
        >
          <div
            onClick={() => setActiveBar(0)}
            className={`pb-2  text-[1rem] font-semibold leading-5
          ${activeBar === 0 ? "border-b text-primary" : "text-gray-500"}
              `}
          >
            {innerNavs[0]}
          </div>
          <div
            onClick={() => setActiveBar(1)}
            className={`pb-2  text-[1rem] font-semibold leading-5
          ${activeBar === 1 ? "border-b text-primary" : "text-gray-500"}
              `}
          >
            {innerNavs[1]}
          </div>
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
              {typeof problem.testcases[activeTestCaseId].input == "object"
                ? // login here to manage multiple object with
                  typeof Object.values(
                    problem.testcases[activeTestCaseId]?.input,
                  )[0] == "string"
                  ? Object.values(
                      problem.testcases[activeTestCaseId]?.input,
                    )[0].toString()
                  : "[" +
                    Object.values(
                      problem.testcases[activeTestCaseId]?.input,
                    )[0].toString() +
                    "]"
                : problem.testcases[activeTestCaseId].input.toString()}
            </div>
            <p className="mt-4 text-sm font-medium text-white">Output:</p>
            <div className="mt-2 w-full cursor-text rounded-lg border border-transparent bg-gray-400/20 px-3 py-[10px] text-white">
              {problem.testcases[activeTestCaseId].output.toString()}
            </div>
          </div>
        </section>
      ) : (
        <div className="h-[90%] rounded-md border border-gray-700 bg-[rgb(30,30,30)] text-white">
          <div className="flex flex-col space-x-1 p-5">
            <h1 className="text-gray-200">Output : </h1>
            <div className="mt-4 w-full overflow-y-auto rounded-md bg-[#06090f] text-sm font-normal text-white">
              {outputState ? <div className="flex">{getOutput()}</div> : null}
            </div>
          </div>

          {/* output details :  */}
          <div
            className="ml-5 mt-4 flex items-center space-x-3 text-gray-300 hover:text-white"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            <h3>Output Details</h3>
            {showDetails ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showDetails ? (
            <div className="metrics-container ml-10 mt-4 flex flex-col space-y-3">
              {output?.type == "submit" && (
                <>
                  <p className="text-sm">
                    ExpectedOutput:{" "}
                    <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                      {output?.expectedOutput}
                    </span>
                  </p>
                  {/* <p className="text-sm">
                    Status:{" "}
                    <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                      {outputState?.status?.description}
                    </span>
                  </p> */}
                </>
              )}

              <p className="text-sm">
                Memory:{" "}
                <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                  {outputState?.memory}
                </span>
              </p>
              <p className="text-sm">
                Time:{" "}
                <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                  {outputState?.time}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default TestCasesandResult;
