import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";
import useDeployQuestion from "@/hooks/useDeployQuestion";

import ComingSoon from "@/components/ComingSoon";

const AddQuestion = () => {
  //hook to deploy...
  const { DEPLOY, deployed, deployAddress, error } = useDeployQuestion();

  const handleOk = () => {
    console.log("working !");
  };

  return (
    <main className="h-screen bg-black">
      <Nav />
      {/*<ProblemForum DEPLOY={DEPLOY}/>*/}
      <MaxWidthWrapper className=" mt-[200px] flex items-center justify-center">
        <ComingSoon />
      </MaxWidthWrapper>
    </main>
  );
};

export default AddQuestion;
