import Nav from "@/components/problem/Nav";
import WorkSpace from "@/components/problem/Workspace";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ABI } from "../utils/problems/index.js";
import { useTheContext } from "@/context/index.jsx";
import { SkeletonPage } from "@/components/SkeletonPage.jsx";
import { useRecoilState } from "recoil";
import { submissionErrorAtom } from "@/atoms/userAtom.js";

const ProblemDesc = () => {
  // const { getContract } = useTheContext();
  let { pid } = useParams();
  const [contract, setContract] = useState();
  const [Problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertBox, setAlertBox] = useRecoilState(submissionErrorAtom);

  const getAsyncContract = async () => {
    console.log(ABI,pid);
    console.log(window.tronLink.tronWeb.contract);
    const instance = await window.tronLink.tronWeb.contract(ABI, window.tronLink.tronWeb.address.fromHex(pid));
    console.log(instance);
    setContract(instance);
  };

  useEffect(() => {
    if (ABI.length > 0) {
      getAsyncContract();
    }
  }, [ABI]);

  useEffect(() => {
    if (!contract) {
      console.log("contract not found for the pid:");
      // setAlertBox({
      //   isError: true,
      //   msg: `No contract associated to this PID ${pid}`,
      // });
      return;
    }
    contract
      .QuestionData()
      .call()
      .then((questionData) => {
        fetchTHeData(questionData, setProblem);
        //console.log("url",questionData);
      })
      .catch((error) => console.error(error));
  }, [contract]);
  const fetchTHeData = async (url, fxn) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(import.meta.env.VITE_PINATA_URL+url, requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result);return JSON.parse(result)})
    .then(data=>{
      fxn(data);
      setLoading(false);
    })
    .catch(error => console.log('error', error));
  };
  

  if (loading) {
    return <SkeletonPage />;
  }

  return (
    <main
      className="dark relative h-40 min-h-screen w-full overflow-hidden bg-gradient-to-br
    from-[#0F1522] to-background pb-4 text-foreground"
    >
      <Nav />
      {Problem ? (
        <WorkSpace data={Problem} pid={pid} contract={contract} />
      ) : (
        <div className="h-full w-full text-center text-2xl font-medium text-white">
          <h2 className="mt-20">Problem Not Found ☹️!</h2>
        </div>
      )}
    </main>
  );
};

export default ProblemDesc;
