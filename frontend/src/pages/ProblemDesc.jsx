import Nav from "@/components/problem/Nav";
import WorkSpace from "@/components/problem/Workspace";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ABI } from "../utils/problems/index.js";
import { useTheContext } from "@/context/index.jsx";
import { SkeletonPage } from "@/components/SkeletonPage.jsx";

const ProblemDesc = () => {
  // const { getContract } = useTheContext();
  let { pid } = useParams();
  const [contract, setContract] = useState();
  const [Problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAsyncContract = async () => {
    fetch(import.meta.env.VITE_TRONQL_ENDPOINT + "wallet/getcontract", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: import.meta.env.VITE_TRONQL_API_KEY, // Replace 'your_authorization_token_here' with your actual authorization token
      },
      body: JSON.stringify({
        value: pid,
        visible: true,
      }),
    })
      .then((res) => {
        const data = res?.contract;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    const instance = await window.tronLink.tronWeb.contract(ABI, pid);
    setContract(instance);
  };

  useEffect(() => {
    if (ABI.length > 0) {
      getAsyncContract();
    }

    // TODO : add the settimeout so that the skelotn gets called after some time internval
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [ABI]);

  useEffect(() => {
    if (!contract) {
      console.log("contract not found for the pid:");
      //todo:create a toast here... with this text
      return;
    }
    contract
      .QuestionData()
      .call()
      .then((questionData) => {
        fetchTHeData(questionData);
        //console.log("url",questionData);
      })
      .catch((error) => console.error(error));
  }, [contract]);
  const fetchTHeData = async (url) => {
    const URL = import.meta.env.VITE_PINATA_URL + url;

    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const data = await (await fetch(URL, requestOptions)).text();
    setProblem(JSON.parse(data));
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
          <h2 className="mt-20">Problem Not Found !</h2>
        </div>
      )}
    </main>
  );
};

export default ProblemDesc;
