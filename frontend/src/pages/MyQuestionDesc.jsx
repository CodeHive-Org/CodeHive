import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import Nav from "@/components/problems/Nav";
import { ABI } from "@/utils/problems";
import { useParams } from "react-router-dom";
import { SkeletonPage } from "@/components/SkeletonPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useTheContext } from "@/context";

export default function MyQuestionDesc() {
  let { pid } = useParams();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState();
  const [claimer, setClaimer] = useState();
  const [bounty, setBounty] = useState();
  const [difficulty, setDiff] = useState();
  const [winnerCode, setWinnerCode] = useState();
  const { tronWeb } = useTheContext();
  const [submissions, setSubmissions] = useState([]);

  const [contract, setContract] = useState();

  useEffect(() => {
    const getProblem = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/problems/${pid}`,
        );
        console.log("respnse : ", response.data);
        setSubmissions(
          response.data.submissions.filter((s) => s.statusDesc == "Accepted"),
        );
        setProblem(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProblem();
  }, []);

  if (loading) {
    return (
      <main className=" min-h-screen w-full bg-background">
        {/* <Nav /> */}
        <Navbar className={"wrapper"} dropdown={true} />

        <main className="mt-20 flex h-full w-full flex-col items-center justify-center space-y-4">
          <h3 className="text-gray-300">Questions Loading ...</h3>

          <div role="status">
            <svg
              aria-hidden="true"
              className="inline h-[150px] w-[100px] animate-spin fill-red-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </main>
      </main>
    );
  }

  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Navbar className={"wrapper"} dropdown={true} />

      <MaxWidthWrapper className="relative flex h-full flex-col items-center justify-center py-[40px]">
        <div className="flex w-[80%] flex-col items-center gap-3 py-[10px]">
          <div className="flex w-full items-center justify-between border-b border-gray-500">
            <p className="flex gap-2 text-[34px] font-bold text-gray-100">
              {problem?.name}
              <span className="align-top text-[1rem]">
                {problem?.bountyStatus === "CLAIMED" ? (
                  <p
                    className="float-right w-max rounded-[4px] border border-gray-900 p-[2px] 
                  text-primary"
                  >
                    claimed ✅
                  </p>
                ) : (
                  ""
                )}
              </span>
            </p>
            <p className="text-[18px] font-bold text-[#3c3c3c]">{pid}</p>
          </div>
          <div className="w-[90%] text-[#b4b0b0]">{problem?.description}</div>
        </div>
        <div className="flex w-[70%] flex-col items-center gap-3 py-[10px]">
          {/* {problem?.bountyStatus === "CLAIMED" && (
            <Accordion type="single" collapsible className="w-full px-[20px]">
              <AccordionItem value="69">
                <AccordionTrigger className="text-[1.2rem] font-bold text-primary xl:text-[1.4rem]">
                  Winner Code
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative whitespace-pre-wrap rounded-[5px] border p-2">
                    {winnerCode}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )} */}
        </div>
        <div className="flex w-[60%] flex-col items-center gap-3 py-[10px] pt-[30px]">
          <p className="w-full text-[20px] font-bold text-primary">
            Code Submissions:
          </p>
          <Accordion type="single" collapsible className="w-full px-[20px]">
            {submissions.length > 0 &&
              submissions.map((submission, index) => (
                <CodeSegment
                  contract={contract}
                  submission={submission}
                  key={index}
                  index={index}
                  claimed={problem.bountyStatus}
                  bounty={Math.round(problem.bounty)}
                />
              ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

function CodeSegment({ submission, index, claimed, bounty }) {
  const [loading, setLoading] = useState(true);
  const { tronWeb } = useTheContext();
  const fundAcc = async () => {
    const winner = submission.user.walletAddress;
    const amount = bounty * 1000000;
    const res = await tronWeb.trx.sendTrx(winner, amount);

    // api call to update the question data on db
    console.log("res : ", res);
  };

  return (
    <>
      <AccordionItem value={index.toString()}>
        <AccordionTrigger className="text-[1.2rem] xl:text-[1.4rem]">
          <div className="flex items-end">
            <p className="text-[1.3rem] font-medium">
              {submission.user?.username}
            </p>
            <p className="text-sm text-gray-400">
              (
              {submission.user.walletAddress.slice(0, 2) +
                "..." +
                submission.user.walletAddress.slice(-6)}
              )
            </p>
          </div>

          {/* {submission.by.} */}
        </AccordionTrigger>
        <AccordionContent>
          <div className="relative whitespace-pre-wrap rounded-[5px] border p-2">
            {submission.code}
            {claimed == "UNCLAIMED" && (
              <button
                className="absolute right-[10px] top-[10px] rounded-[5px] border border-primary px-[3px] py-[2px] pt-[4px] text-[12px] font-bold text-primary hover:bg-primary hover:text-black"
                onClick={() => fundAcc()}
              >
                Fund This
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>
              Memory:{" "}
              <span className="font-semibold text-primary">
                {submission.memoryUsage}b
              </span>
            </p>{" "}
            {/* number placed from index 4 to onwards are memory. */}
            <p>
              Run Time:{" "}
              <span className="font-semibold text-primary">
                {submission.runtime}ms
              </span>
            </p>{" "}
            {/* number placed as 0 to 3 index is the runtime of the code. */}
            <p>
              Post Time:{" "}
              <span className="font-semibold text-primary">
                {" "}
                {new Date(submission.createdAt).toDateString()}
              </span>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
