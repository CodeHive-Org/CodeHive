import ComingSoon from "@/components/ComingSoon";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";

export default function MyQuestions() {
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
