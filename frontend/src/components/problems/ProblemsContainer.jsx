import React, { useEffect, useState } from "react";
import Problem from "./Problem";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MaxWidthWrapper from "../MaxWidthWrapper";
import axios from "axios";
import { useGetQuestions } from "@/hooks/getQuestions";
import { useTheContext } from "@/context";
import { ABI_Bank } from "@/utils/problems";

const ProblemsContainer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { ABI_Bank: a_b } = useTheContext();
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    //calling the contract to detch the data of the problems.
    if (ABI_Bank.length == 0) {
      console.error("Something horible happened cant access the Bank_address.");
      return;
    }
    const getQuestions = async () => {
      const contract = await window.tronLink.tronWeb.contract(
        ABI_Bank,
        import.meta.env.VITE_NILE_BANK_ADD,
      );
      const questions = await contract.questionList().call();
      const filtered = questions.filter(
        (item) => item[0] != "41cbab21365ee65d78f6b57f0e77bbda5f4fd4bd69",
      );
      setProblems(filtered);
    };
    getQuestions();
  }, [ABI_Bank]);
  const isAnyOpen = activeIndex !== null;

  return (
    <main className="relative flex-1 p-2">
      <h1 className='text-[1.6rem] text-center pb-2 text-white border-b font-semibold border-gray-700'>Problems</h1>
      <Table className="mr-auto w-full max-w-[1000px] px-4 text-white">
        <TableHeader>
          <TableRow className="border-gray-500 text-left text-white">
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Difficulty (Mesured in 🐑)</TableHead>
            <TableHead>Take Part</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {problems &&
            problems.length > 0 &&
            problems.map((p, i) => {
              const handleOpen = () => {
                setActiveIndex(activeIndex === i ? null : i);
              };
              const isOpen = i === activeIndex;

              return (
                <Problem
                  key={i}
                  id={i}
                  title={p.name}
                  address={p.question}
                  difficulty={p.difficulty}
                  isOpen={isOpen}
                  isAnyOpen={isAnyOpen}
                  handleOpen={handleOpen}
                />
              );
            })}
        </TableBody>
      </Table>

      {problems && !problems.length > 0 && (
        <h1 className="top-1 w-full px-2 pt-5 text-center text-xl text-primary">
          There are no Questions as of now ! come back later or add your own
          question
        </h1>
      )}
    </main>
  );
};

export default ProblemsContainer;
