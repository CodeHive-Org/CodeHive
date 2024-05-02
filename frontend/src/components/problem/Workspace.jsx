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
import { useRecoilState } from "recoil";
import { Toaster, toast } from "sonner";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";
import SubmitBox from "./SubmitBox";
import TestCasesandResult from "./TestCasesandResult";
import { alertAtom } from "@/atoms/userAtom";

// import TestCasesandResult from "./TestCasesandResult";

const WorkSpace = ({ data, pid, contract }) => {
  const [alert, setAlert] = useRecoilState(alertAtom);
  let [userCode, setUserCode] = useState();

  const [lastUserValidCode, setLastUserValidCode] = useState("");

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
        toast.success(`Compiled Successfully!`, { position: "top-center" });
        return response.data;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      toast.error("Error in the code !");
    }
  };

  const testcaseInput = JSON.stringify(data?.examples[0]?.input);

  const [temp, setTemp] = useState(true); // make sures that the alert pop ups only once.

  console.log("open ;", alert);

  const handleSubmit = async () => {
    if (!address) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

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
            setLastUserValidCode(userCode);
            // create a pop up for a upload code option...
            handleUpload(userCode);
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
  const handleUpload = async (uploadCode) => {
    //check that if the useer has allready submitted  code?
    //code fetch using the contract...
    try {
      const data = await contract.haveSubmitted().call();
      if (data) {
        alert("allready submitted the code..");
        return;
      }
    } catch (err) {
      // todo : add a todo saying allready submitted for this bounty...
      alert(
        "Error fetching the contract to check if the user has allready submitted the code..",
      );
      return;
    }

    if (uploadCode == null || uploadCode == "") {
      alert("submit the code before uploding to chain..");
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
      console.log("Result for that:", result);
    } catch (error) {
      console.log("Error contacting the contract:", error);
    }
  };

  const handleRun = async () => {
    setProcessing(true);

    const sourceCode = `
    function defaultFunc(inputs) {
      ${userCode}

      return ${data?.compileFunctionName}(inputs)
    }

    console.log(defaultFunc(${testcaseInput}));
  `;

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
