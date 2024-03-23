import Nav from "@/components/problem/Nav";
import WorkSpace from "@/components/problem/Workspace";
import React from "react";

const ProblemDesc = () => {
  return (
    <main
      className="w-full pb-4 dark relative bg-gradient-to-br from-[#0F1522] to-background 
    text-foreground min-h-screen"
    >
      <Nav />
      <WorkSpace />
    </main>
  );
};

export default ProblemDesc;
