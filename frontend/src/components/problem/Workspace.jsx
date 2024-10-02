import { outputAtom } from "@/atoms/problemAtom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useWindowSize from "@/hooks/useWindowSize";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import axios from "axios";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useRecoilState, useRecoilValue } from "recoil";
import { Toaster, toast } from "sonner";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";
import SubmitBox from "./SubmitBox";
import TestCasesandResult from "./TestCasesandResult";
import { alertAtom, submissionErrorAtom, userState } from "@/atoms/userAtom";
import { ErrorAlert } from "../ErrorAlert";
import { signMessageWithTimeConstraint } from "@/hooks/SigMessage";

// import TestCasesandResult from "./TestCasesandResult";

const WorkSpace = ({ data, pid, contract }) => {
  const [alert, setAlert] = useRecoilState(alertAtom);
  const [, setSubmissionError] = useRecoilState(submissionErrorAtom);
  let [userCode, setUserCode] = useState();

  let testInput =
    typeof data?.testcases[0].input == "object"
      ? Object.values(data.testcases[0].input).toString()
      : data.testcases[0].input.toString();

  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const { address } = useWallet();

  const [outputState, setOutputState] = useRecoilState(outputAtom);
  const user = useRecoilValue(userState);

  const [submissionProcessing, setSubmissionProcessing] = useState(false);
  const [executionProcessing, setExecutionProcessing] = useState(false);
  const [testcasePassed, setTestcasePassed] = useState(0);

  console.log("data : ", data);

  const checkStatus = async (tokens, type) => {
    const token = tokens.map((item) => item.token).join(",");
    setTestcasePassed(0);

    console.log("token : ", token);

    const options = {
      method: "GET",
      url: "https://ce.judge0.com/submissions/" + "/batch?tokens=" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      console.log("res : ", response);

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutputState({
          type: type,
          data: response.data.submissions,
          expectedOutput: String(data?.examples[0]?.output).trim(),
        });
        response.data.submissions.map((output) => {
          if (output.status.description == "Accepted") {
            setTestcasePassed((t) => t + 1);
          }
        });

        toast.success(`Compiled Successfully!`, { position: "top-center" });
        return response.data;
      }
    } catch (err) {
      console.log("err", err);
      setSubmissionProcessing(false);
      setExecutionProcessing(false);
      toast.error(err.message);
    }
  };
  // test-1
  console.log("outputstate : ", outputState);

  const testcaseInput = JSON.stringify(data?.examples[0]?.input);

  const [temp, setTemp] = useState(true); // make sures that the alert pop ups only once.

  const handleSubmit = async () => {
    if (temp) {
      setAlert({
        isOpen: true,
        title: "Verify Your Code Before Submitting",
        description:
          "Please ensure you test your code using the 'Run' button to confirm there are no runtime or syntax errors. This helps prevent unnecessary gas fees due to incorrect submissions.",
      });
      setTemp(false);

      return;
    }

    const txnData = await signMessageWithTimeConstraint();

    if (!txnData?.message) {
      throw new Error("Transaction failed !");
    }

    setSubmissionProcessing(true);

    const formData = {
      userId: user.id,
      userCode: userCode,
      problemId: pid,
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_BACKEND_URL + "/code/submit",
      headers: {
        "Content-Type": "application/json",
        tron_message: txnData.message,
        tron_signature: txnData.signature,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(async function (response) {
        const submission = response.data;
        console.log("submission : ", submission);

        // if (statusId !== 3) {
        //   // ! Dont run the contract if their is run time
        //   setSubmissionProcessing(false);
        //   toast.error(
        //     "RunTime Error | Please Check your Code before submission !",
        //   );
        //   return;
        // }

        // if (atob(output.stdout) && atob(output.stdout) != null) {
        //   const outputString = String(atob(output?.stdout)).trim();
        //   const expectedOutput = String(data?.examples[0]?.output).trim();

        //   if (outputString == expectedOutput) {
        //     // create a pop up for a upload code option...
        //     handleUpload(userCode);
        //   } else {
        //     setSubmissionProcessing(false);
        //     toast.error("Submission Failed !");
        //   }
        // }
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setSubmissionProcessing(false);
        toast.error(err.message);
        console.log(error);
      })
      .finally(() => {
        setSubmissionProcessing(false);
      });
  };
  const handleUpload = async (uploadCode) => {
    //check that if the useer has allready submitted  code?
    //code fetch using the contract...
    try {
      const data = await contract.haveSubmitted().call();

      if (data) {
        setSubmissionError({
          isError: true,
          message: `You have already Submitted this Problem's Solution`,
        });
        setSubmissionProcessing(false);
        return;
        // alert("allready submitted the code..");
      }
    } catch (err) {
      setSubmissionError({
        isError: true,
        message: "Error Occured when fetching the submission contract info !",
      });
      setSubmissionProcessing(false);
      console.log("error : ", err);
      return;
    }

    if (uploadCode == null || uploadCode == "") {
      setSubmissionError({
        isError: true,
        message: "submit the code before uploding to chain..",
      });
      return;
    }
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: `{"pinataOptions":{"cidVersion":1},"pinataMetadata":{"name":"${address}.json"},"pinataContent":${JSON.stringify({ code: uploadCode })}}`,
    };
    const { IpfsHash } = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      options,
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res));
    try {
      let result = await contract.submitCode(IpfsHash, address, 200).send({
        feeLimit: 100_000_000_0,
        shouldPollResponse: true,
      });
      setSuccess(true);
      toast.success("Congratulations your submission was accepted ! 🥳");
      setSubmissionProcessing(false);
      console.log("Result for that:", result);
    } catch (error) {
      setSubmissionProcessing(false);
      console.log("Error contacting the contract:", error);
    }
  };

  const handleRun = async () => {
    // setProcessing(true);
    setExecutionProcessing(true);

    const getInputString = (args) => {
      return `\n



    console.log(${data?.compileFunctionName}(${args.join(",")}))
    `;
    };

    const sourceCode = (input) => {
      return `
      function defaultFunc(inputs) {
        ${userCode}
  
        return ${data?.compileFunctionName}(inputs)
      }
  
      console.log(defaultFunc(${testcaseInput}));
    `;
    };

    const submissions = data.testcases.map((testCase) => {
      console.log("testCase.output : ", testCase.output);
      return {
        source_code: btoa(userCode + getInputString([testCase.input])),
        language_id: 63,
        expected_output: btoa(testCase.output),
      };
    });

    const formData = {
      language_id: 63,
      // encode source code in base64
      source_code: btoa(sourceCode),
      stdin: btoa(testInput),
    };

    console.log(
      JSON.stringify({
        submissions,
      }),
    );

    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL + "/batch",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: JSON.stringify({
        submissions,
      }),
    };

    axios
      .request(options)
      .then(function (response) {
        const tokens = response.data;
        setExecutionProcessing(false);
        console.log("token : ", tokens);
        checkStatus(tokens, "run");
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setExecutionProcessing(false);
        console.log(error);
      });
  };

  //console.log("data : ", data);
  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 7000);
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-lg border-none"
    >
      <ErrorAlert />
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
            <TestCasesandResult
              testcasePassed={testcasePassed}
              problem={data}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <SubmitBox
        handleSubmit={handleSubmit}
        executionLoading={executionProcessing}
        submissionloading={submissionProcessing}
        handleRun={handleRun}
      />
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
