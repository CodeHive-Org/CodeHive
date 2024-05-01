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
  // const { tronWeb } = useTheContext();
  //   {
  //     title: "TTYWGCYqyfmySVytAWzJGjqkqqFyG2VCR9",
  //     fees: 0,
  //     description:
  //       "Given an array of integers `nums` and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
  //   },
  //   {
  //     title: "Longest Substring Without Repeating Characters",
  //     fees: 10,
  //     description:
  //       "Given a string `s`, find the length of the longest substring without repeating characters."
  //   },
  //   {
  //     title: "Reverse Integer",
  //     fees: 0,
  //     description:
  //       "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return 0."
  //   },
  //   {
  //     title: "Merge Two Sorted Lists",
  //     fees: 0,
  //     description:
  //       "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists."
  //   },
  //   {
  //     title: "Container With Most Water",
  //     fees: 20,
  //     description:
  //       "Given n non-negative integers `a1, a2, ..., an` where each represents a point at coordinate `(i, ai)`. n vertical lines are drawn such that the two endpoints of the line `i` is at `(i, ai)` and `(i, 0)`. Find two lines, which, together with the x-axis forms a container, such that the container contains the most water."
  //   },
  //   {
  //     title: "Palindrome Number",
  //     fees: 0,
  //     description:
  //       "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward."
  //   },
  //   {
  //     title: "Longest Common Prefix",
  //     fees: 0,
  //     description:
  //       "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string."
  //   },
  //   {
  //     title: "Valid Parentheses",
  //     fees: 0,
  //     description:
  //       "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order."
  //   },
  //   {
  //     title: "Roman to Integer",
  //     fees: 0,
  //     description:
  //       "Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999."
  //   },
  //   {
  //     title: "Remove Nth Node From End of List",
  //     fees: 15,
  //     description:
  //       "Given the head of a linked list, remove the nth node from the end of the list and return its head."
  //   }
  // ]);
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
      setProblems(questions);
    };
    getQuestions();
  }, [ABI_Bank]);
  const isAnyOpen = activeIndex !== null;

  return (
    <main className="relative flex-1 p-2">
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
