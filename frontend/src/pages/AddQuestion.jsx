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
import twitter from "../assets/twitte.png";
import tron from "../assets/tron.png";

const AddQuestion = () => {
  //hook to deploy...
  const { DEPLOY, deployed, deployAddress, error} = useDeployQuestion();

  return (  
    <main className="bg-[black] h-screen">
      <Nav />
      {/*<ProblemForum DEPLOY={DEPLOY}/>*/}
      <MaxWidthWrapper className=" mt-[40px] flex items-center justify-center">
        <div className="flex items-center flex-col gap-[10px] w-[80%] bg-[#3c3c3c] h-[80%] rounded-[16px] p-[30px]">
          <div className="flex gap-4 items-center">
            {/* <div className="w-[30px] h-[30px] rounded-full overflow-hidden animate-spin">
              <img className="object-cover" src={logo}/>
            </div> */}
            <p className="text-[42px]">Comming Soon!!</p>
          </div>
          <p>Follow us on Twitter for updates:</p>
          <div className="flex gap-2 items-center justify-between ">
            <img onClick={()=>{window.open('https://twitter.com/Codehive01', '_blank')}} src={twitter} alt="" />
            <img onClick={()=>{window.open('https://forum.trondao.org/t/codehive-crack-the-code-reap-the-rewards/23646', '_blank')}} src={tron} alt="" />
          </div>
            
        </div>

      </MaxWidthWrapper>
    </main>
  );
};

export default AddQuestion;
