import { useState, useEffect } from "react";
import ComingSoon from "@/components/ComingSoon";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";
import { ABI_Bank } from "@/utils/problems";
import { useNavigate } from "react-router-dom";

export default function MyQuestions() {
  const [Questions, setQuestions] = useState();
  useEffect(() => {
    const getQuestions = async () => {
      const contract = await window.tronLink.tronWeb.contract(
        ABI_Bank,
        import.meta.env.VITE_NILE_BANK_ADD,
      );
      const questions = await contract.questionList().call();
      setQuestions(
        questions.filter(
          (data) => data.creater == window.tronLink.tronWeb.defaultAddress.hex,
        ),
      );
    };
    getQuestions();
  }, [ABI_Bank]);
  console.log(Questions);
  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Nav />
      <MaxWidthWrapper className="mt-10 flex flex-col justify-center">
        <div className="flex flex-col gap-3 py-[10px]">
          <p className="flex gap-2 border-b border-gray-600 text-[2.0rem] font-bold text-rose-500">
            Your Questions
          </p>
        </div>
        <div className="mt-10 flex flex-col">
          {Questions &&
            Questions.map((el, index) => (
              <ContratElem key={index} i={index} el={el} />
            ))}
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

function ContratElem({ el, i }) {
  const Navigate = useNavigate();
  console.log(el);
  return (
    <div
      className="flex w-[60%] items-center justify-between text-white"
      onClick={() => {
        Navigate("/myquestion/" + el[0]);
      }}
    >
      <div className="w-full border-b border-gray-600 hover:text-whtie flex py-2 px-2 rounded-md justify-between mt-4 cursor-pointer hover:bg-gray-600">
        <p>{i + 1}</p>
        <p>{el[1]}</p>
        <p>{el[0].slice(0, 4) + "....." + el[0].slice(-8)}</p>
      </div>
    </div>
  );
}
