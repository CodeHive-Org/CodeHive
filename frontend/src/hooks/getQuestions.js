import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useGetQuestions = async () => {
  const [questions, setQuestions] = useState([
    {
      title: "Two Sum",
      fees: 0,
      description:
        "Given an array of integers `nums` and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
    },
    {
      title: "Longest Substring Without Repeating Characters",
      fees: 10,
      description:
        "Given a string `s`, find the length of the longest substring without repeating characters."
    },
    {
      title: "Reverse Integer",
      fees: 0,
      description:
        "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return 0."
    },
    {
      title: "Merge Two Sorted Lists",
      fees: 0,
      description:
        "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists."
    }
  ]);

  const questionsHandler = async () => {
    // try {
    //   const response = await axios.get(
    //     `http://localhost:8000/api/get_question/0/${encodeURIComponent(
    //       " "
    //     )}/0/${encodeURIComponent(" ")}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       }
    //     }
    //   );
    //   console.log("Response:", response.data);

    //   setQuestions(response.data);

    //   if ("Err" in response.data) {
    //     toast.error(`Error while fetching questions !`);
    //   } else {
    //     toast.success("questions fetched succesfully !");
    //   }
    // } catch (error) {
    //   console.log("errro : ", error);
    //   toast.error("fetching of questions failed !");
    // }
  };

  useEffect(() => {
    questionsHandler();
  }, []);

  return questions;
};
