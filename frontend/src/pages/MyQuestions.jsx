import { userState } from "@/atoms/userAtom";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function MyQuestions() {
  const user = useRecoilValue(userState);
  const questions = user.myProblems;

  console.log(user);

  const Navigate = useNavigate();

  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Navbar className={"wrapper"} dropdown={true} />

      <MaxWidthWrapper className="mt-10 flex flex-col justify-center">
        <div className="flex items-center  justify-between gap-3 border-b border-gray-600 py-[10px]">
          <p className="flex gap-2  text-[2.0rem] font-bold text-rose-500">
            Your Questions
          </p>
          <Link
            to="/problems"
            className="flex cursor-pointer items-center text-gray-300 space-x-2 self-end hover:text-primary"
          >
            <ArrowLeft className="text-inherit" />
            <h2 className="text-inherit">Problems</h2>
          </Link>
        </div>

        {/* <button onClick={() => fundAcc()}>Testtt</button> */}
        <Table className="mt-4 w-full border border-gray-900 p-10">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submissions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {questions &&
              questions.length > 0 &&
              questions.map((question, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer border-gray-600 hover:text-primary"
                  onClick={() => {
                    Navigate("/myquestion/" + question.id);
                  }}
                >
                  <Question key={index} i={index + 1} question={question} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </MaxWidthWrapper>
    </main>
  );
}

function Question({ question, i }) {
  return (
    <>
      <TableCell>{i}</TableCell>
      <TableCell>{question?.name}</TableCell>
      <TableCell>{question.status}</TableCell>
      <TableCell>{question?.submissions?.length || 0}</TableCell>
    </>
  );
}
