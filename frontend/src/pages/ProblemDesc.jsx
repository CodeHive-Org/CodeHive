import Nav from "@/components/problem/Nav";
import WorkSpace from "@/components/problem/Workspace";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ABI } from "../utils/problems/index.js";
import { useTheContext } from "@/context/index.jsx";

const ProblemDesc = () => {
  const { tronWeb } = useTheContext();
  let { pid } = useParams();
  const [ contract, setContract ] = useState();
  const [Problem, setProblem] = useState(null);
  const getContract = async () => {
    const instance = await tronWeb.contract(ABI,pid);
    setContract(instance);
    console.log(instance);
  }
  useEffect(() => {
    getContract();
  }, []);
  useEffect(()=>{
    if(!contract){
      console.log("contract not found for the pid:");
      //todo:create a toast here... with this text
      return;
    }
    contract.QuestionData().call()
      .then(questionData => {
        fetchTHeData(questionData);
        //console.log("url",questionData);
      })
      .catch(error => console.error(error));
  },[contract]);
  const fetchTHeData = async (url) => {
    const URL = import.meta.env.VITE_PINATA_URL + url;

    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const data = await (await fetch(URL, requestOptions)).text();
    setProblem(JSON.parse(data));
  }
  if (Problem == null) {
    return <div>Question not found !</div>;
  }

  return (
    <main
      className="dark relative min-h-screen w-full bg-gradient-to-br from-[#0F1522] to-background 
    pb-4 text-foreground"
    >
      <Nav />
      {
        Problem && (<WorkSpace data={Problem} pid={pid} contract={contract}/>)
      }
    </main>
  );
};

export default ProblemDesc;
