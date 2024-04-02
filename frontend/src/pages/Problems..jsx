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
    <main className="dark relative min-h-screen w-full bg-gradient-to-br from-[#0F1522] to-background pb-4">
      <Nav />
      <MaxWidthWrapper className="flex items-start justify-between gap-10 py-16 max-lg:flex-col">
        <ProblemsContainer />
        {/* <AddQuestionBox /> */}
      </MaxWidthWrapper>
      <Footer className={cn("absolute bottom-0")} />
      <Toaster />
    </main>
  );
};

export default Problems;
