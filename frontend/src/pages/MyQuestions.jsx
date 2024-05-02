import React, { useState, useEffect } from "react";
import Nav from "@/components/problems/Nav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import logo from "../assets/justlogo2.png";
import twitter from "../assets/twitte.png";  
import tron from "../assets/tron.png";

export default function MyQuestions() {
  return (
    <main className=" bg-background min-h-screen w-full">
      {/* right side */}
      <Nav />
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
}
