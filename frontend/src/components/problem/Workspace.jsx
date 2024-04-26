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
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
// import TestCasesandResult from "./TestCasesandResult";

const WorkSpace = ({ data, pid, contract }) => {
  console.log(data);
  let [userCode, setUserCode] = useState();

  let testInput =
    typeof data?.testcases[0].input == "object"
      ? Object.values(data.testcases[0].input).toString()
      : data.testcases[0].input.toString();

  const wrappedCode = `function default(input) {\n${null}\n}\n console.log(default(${null}))`;
  // setUserCode(wrappedCode);

  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const { address } = useWallet();

  const [, setOutputState] = useRecoilState(outputAtom);

  const [processing, setProcessing] = useState();

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputState(response.data);
        toast(`Compiled Successfully!`);
        return response.data;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      toast.error("Error in the code !");
    }
  };

  const testcaseInput = JSON.stringify(data?.examples[0]?.input);

  const handleSubmit = async () => {
    if (!address) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // default template + starter code
    const sourceCode = `
      function defaultFunc(inputs) {
        ${userCode}

        return ${data?.compileFunctionName}(inputs)
      }

      console.log(defaultFunc(${testcaseInput}));
    `;

    setProcessing(true);
    const formData = {
      language_id: 63,
      // encode source code in base64
      source_code: btoa(sourceCode),
      stdin: btoa(testInput),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(async function (response) {
        const token = response.data.token;
        let output = await checkStatus(token);
        // the main output checking between the usersCode and the questioners code is done here !
        let statusId = output?.status?.id;

        console.log("output ; ", atob(output?.stdout));

        if (statusId !== 3) {
          // ! Dont run the contract if their is run time
          toast.error(
            "RunTime Error | Please Check your Code before submission !",
          );
          return;
        }
 
        if (atob(output.stdout) && atob(output.stdout) != null) {
          const outputString = String(atob(output?.stdout)).trim();
          const expectedOutput = String(data?.examples[0]?.output).trim();

          console.log("Output from API:", outputString);
          console.log("Expected Output:", expectedOutput);

          if (outputString === expectedOutput) {
            setSuccess(true);
            toast.success("Congratulations your submission was accepted ! 🥳");
          } else {
            toast.error("Submission Failed ! 🚫");
          }
        }
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const handleRun = async () => {
    setProcessing(true);
    const formData = {
      language_id: 63,
      // encode source code in base64
      source_code: btoa(userCode),
      // stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  console.log("data : ", data);

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
