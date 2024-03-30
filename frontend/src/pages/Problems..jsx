import React from "react";
import { cn } from "@/lib/utils";
import Nav from "@/components/problems/Nav";
import ProblemsContainer from "@/components/problems/ProblemsContainer";
import Footer from "@/components/Footer";
import { useAddress } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import AddQuestionBox from "@/components/problems/AddQuestionBox";

const Problems = () => {
  // const address = useAddress();
  // const navigate = useNavigate();

  // console.log("address : ", address);

  // if (!address || address === undefined) {
  //   toast("please login to access this page !");

  //   navigate("/", { replace: true });
  // }

  return (
    <main className="w-full pb-4 dark relative bg-gradient-to-br from-[#0F1522] to-background min-h-screen">
      <Nav />
      <MaxWidthWrapper className="flex justify-between gap-10 max-lg:flex-col items-start py-16">
        <ProblemsContainer />
        {/* <AddQuestionBox /> */}
      </MaxWidthWrapper>
      <Footer className={cn("absolute bottom-0")} />
      <Toaster />
    </main>
  );
};

export default Problems;
