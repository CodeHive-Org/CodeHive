import { useState, useEffect } from 'react';
import ComingSoon from "@/components/ComingSoon";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Nav from "@/components/problems/Nav";
import { ABI_Bank } from "@/utils/problems";
import { useNavigate } from 'react-router-dom';

export default function MyQuestions() {
  const [ Questions, setQuestions ] = useState();
  useEffect(() => {
    const getQuestions = async () => {
      const contract = await window.tronLink.tronWeb.contract(
        ABI_Bank,
        import.meta.env.VITE_NILE_BANK_ADD,
      );
      const questions = await contract.questionList().call();
      setQuestions(questions.filter((data)=>data.creater == window.tronLink.tronWeb.defaultAddress.hex));
    };
    getQuestions();
  }, [ABI_Bank]);
  console.log(Questions);
  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Nav />
      <MaxWidthWrapper className="mt-[200px] flex flex-col justify-center">
        <div className="w-[80%] items-center flex flex-col gap-3 py-[10px]">
          <p className="text-primary text-[34px] font-bold flex gap-2">Questions held by YOU!</p>
        </div>
        <div className="flex flex-col ">

        {Questions && 
          Questions.map((el,index)=><ContratElem key={index} el={el}/>)
        }
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

function ContratElem({el}){
  const Navigate = useNavigate();
  console.log(el);
  return (
    <div className="w-[60%] flex items-center justify-between" onClick={()=>{Navigate("/myquestion/"+el[0])}}>
      <p>{el[1]}</p>
      <p>{el[0].slice(0,4)+"....."+el[0].slice(-8)}</p>
    </div>
  )
}
