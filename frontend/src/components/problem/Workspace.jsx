import { outputAtom } from "@/atoms/problemAtom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useRecoilState } from "recoil";
import { Toaster, toast } from "sonner";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";
import SubmitBox from "./SubmitBox";
import TestCasesandResult from "./TestCasesandResult";
import { useTheContext } from "@/context";
import axios from "axios";
// import TestCasesandResult from "./TestCasesandResult";


const WorkSpace = ({ data, pid, contract }) => {

  console.log(data);
  let [userCode, setUserCode] = useState((data?.defaultCode)?(data?.defaultCode):"/* no startercode error*/");

  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const { address } = useTheContext();

  const [, setOutputState] = useRecoilState(outputAtom);
  const user = address ? address : "not_set_yet";

  const [processing, setProcessing] = useState();


  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      // userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = "function";

      if (typeof handler === "function") {
        const success = null;
        if (success) {
          toast.success("Congrats! All tests passed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);

          // setSolved(true);
        }
      }
    } catch (error) {
      console.log(error.message);
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:",
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  const handleRun = async () => {
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problem.runnerFunction;

      if (typeof handler === "function") {
        const output = handler(cb);
        setOutputState(JSON.stringify(output));
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[100vh] max-w-full rounded-lg border-none"
    >
      <Toaster richColors />
      <ResizablePanel defaultSize={50}>
        {/* Problem Description */}
        <ProblemDescription problem={data} pid={pid} contract={contract} />
      </ResizablePanel>
      <ResizableHandle withHandle className="w-[5px] bg-gray-600" />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            {/* Code Editor */}
            <CodeEditor
              setUserCode={setUserCode}
              userCode={userCode}
              starterCode={data?.defaultCode}
            />
          </ResizablePanel>
          <ResizableHandle withHandle className="w-[5px] bg-gray-600" />
          <ResizablePanel defaultSize={50}>
            {/* Test Cases */}
            <TestCasesandResult problem={data} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <SubmitBox handleSubmit={handleSubmit} handleRun={handleRun} />
      {success && (
        <ReactConfetti
          gravity={0.3}
          tweenDuration={4000}
          width={width - 1}
          height={height - 1}
        />
      )}
    </ResizablePanelGroup>
  );
};

export default WorkSpace;
