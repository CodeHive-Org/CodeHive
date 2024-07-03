import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";
import useDeployQuestion from "@/hooks/useDeployQuestion";

import ComingSoon from "@/components/ComingSoon";
import ProblemForum from "@/components/AddProblemForm";

const AddQuestion = () => {
  //hook to deploy...

  return ( 
    <main className="h-screen bg-black">
      <Nav />
      {/* <MaxWidthWrapper className=" mt-[200px] flex items-center justify-center"> */}
        <ProblemForum />
        {/* <ComingSoon /> */}
      {/* </MaxWidthWrapper> */}
    </main>
  );
};

export default AddQuestion;
