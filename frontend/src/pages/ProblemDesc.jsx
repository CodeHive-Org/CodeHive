import Nav from "@/components/problem/Nav";
import WorkSpace from "@/components/problem/Workspace";
import React, { useEffect, useState } from "react";
import { problems } from "../utils/problems/index";
import { useParams } from "react-router-dom";

const ProblemDesc = () => {
  // if (isNaN(pid)) return <div>Invalid parameter</div>;
  let { pid } = useParams();
  const [Problem, setProblem] = useState(null);
  console.log("pid : ", pid);

  useEffect(() => {
    const problem = problems[pid];
    console.log("problem : ", problem);

    if (!problem) {
      setProblem(null);
    } else {
      setProblem(problem);
    }
  }, []);

  if (Problem == null) {
    return <div>Question not found !</div>;
  }

  return (
    <main
      className="dark relative min-h-screen w-full bg-gradient-to-br from-[#0F1522] to-background 
    pb-4 text-foreground"
    >
      <Nav />
      <WorkSpace problem={Problem} />
    </main>
  );
};

export default ProblemDesc;
