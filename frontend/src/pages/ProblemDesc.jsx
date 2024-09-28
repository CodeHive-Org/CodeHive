import Nav from "@/components/problem/Nav";
import WorkSpace from "@/components/problem/Workspace";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ABI } from "../utils/problems/index.js";
import { useTheContext } from "@/context/index.jsx";
import { SkeletonPage } from "@/components/SkeletonPage.jsx";
import { useRecoilState } from "recoil";
import { submissionErrorAtom } from "@/atoms/userAtom.js";
import axios from "axios";

const ProblemDesc = () => {
  // const { getContract } = useTheContext();
  let { pid } = useParams();
  const [contract, setContract] = useState();
  const [Problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertBox, setAlertBox] = useRecoilState(submissionErrorAtom);

  useEffect(() => {
    const getProblem = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/problems/${pid}`,
        );
        console.log("respnse : ", response.data);
        setProblem(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProblem();
  }, []);

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
        <WorkSpace data={Problem} pid={pid} />
      ) : (
        <div className="h-full w-full text-center text-2xl font-medium text-white">
          <h2 className="mt-20">Problem Not Found ☹️!</h2>
        </div>
      )}
    </main>
  );
};

export default ProblemDesc;
