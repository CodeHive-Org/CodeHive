import React, { useState } from "react";
import axios from "axios";
import Nav from "@/components/problems/Nav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useTheContext } from "@/context";
import useDeployQuestion from "@/hooks/useDeployQuestion";
import ProblemForum from "@/components/AddProblemForm";

const AddQuestion = () => {
  //hook to deploy...
  const { DEPLOY, deployed, deployAddress, error} = useDeployQuestion();

  return (  
    <main className="bg-[black] h-screen">
      <Nav />
      <MaxWidthWrapper>
        <ProblemForum DEPLOY={DEPLOY}/>
      </MaxWidthWrapper>
    </main>
  );
};

export default AddQuestion;
