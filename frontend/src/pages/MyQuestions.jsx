import ComingSoon from "@/components/ComingSoon";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";

export default function MyQuestions() {
  // useEffect(() => {
  //   const getQuestions = async () => {
  //     const contract = await window.tronLink.tronWeb.contract(
  //       ABI_Bank,
  //       import.meta.env.VITE_NILE_BANK_ADD,
  //     );
  //     const questions = await contract.questionList().call();
  //   };
  //   getQuestions();
  // }, [ABI_Bank]);
  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Nav />
      <MaxWidthWrapper className="mt-[200px] flex items-center justify-center">
        <ComingSoon />
      </MaxWidthWrapper>
    </main>
  );
}
