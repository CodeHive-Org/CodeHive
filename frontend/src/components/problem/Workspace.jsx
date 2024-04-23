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
<<<<<<< HEAD
  console.log(data);
  let [userCode, setUserCode] = useState((data?.defaultCode)?(data?.defaultCode):"/* no startercode error*/");
=======
  let [userCode, setUserCode] = useState(
    data?.starterCode ? data?.starterCode : "/* no startercode error*/",
  );
>>>>>>> 599c69e612f9b01840408c34d57155336f05e6d1
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

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "5d554234f7mshd75e9c988490a60p18022cjsna5cd1d593132",
      },
    };
    try {
<<<<<<< HEAD
      userCode = userCode.slice(userCode.indexOf(data.compileFunctionName));
      console.log(userCode);
      const cb = new Function(`return ${userCode}`)();
      const handler = problem.runnerFunction;
=======
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
>>>>>>> 599c69e612f9b01840408c34d57155336f05e6d1

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputState(response.data)
        toast.success(`Compiled Successfully!`)
        console.log('response.data', response.data)
        return
      }
<<<<<<< HEAD
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
=======
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      toast.error('Error in the code !');
>>>>>>> 599c69e612f9b01840408c34d57155336f05e6d1
    }
  };

  const handleRun = async () => {
    // try {
    // userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
    //   const cb = new Function(`return ${userCode}`)();
    //   const handler = "function";
    //   if (typeof handler === "function") {
    //     const output = false;
    //     setOutputState(JSON.stringify(output));
    //   }
    // } catch (error) {
    //   console.log(error.message);
    //   toast.error(error.message, {
    //     position: "top-center",
    //     autoClose: 3000,
    //     theme: "dark",
    //   });
    // }

    setProcessing(true);
    const formData = {
      language_id: 63,
      // encode source code in base64
      source_code: btoa(userCode),
      // stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "5d554234f7mshd75e9c988490a60p18022cjsna5cd1d593132",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });

    console.log('usercode : ', userCode);
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
