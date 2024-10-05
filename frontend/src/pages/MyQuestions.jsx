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
import { useTheContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function MyQuestions() {
  const user = useRecoilValue(userState);
  const questions = user.myProblems;

  console.log(questions);

  const { tronWeb } = useTheContext();
  const Navigate = useNavigate();

  const fundAcc = async () => {
    const winner = "TQymTayyt9pPbSUFZjisyuanAsePL76VyG";
    const amount = 1000000;
    const res = await tronWeb.trx.sendTrx(winner, amount);

    console.log("res : ", res);
  };

  return (
    <main className=" min-h-screen w-full bg-background">
      {/* right side */}
      <Navbar className={"wrapper"} dropdown={true} />

      <MaxWidthWrapper className="mt-10 flex flex-col justify-center">
        <div className="flex flex-col gap-3 py-[10px]">
          <p className="flex gap-2 border-b border-gray-600 text-[2.0rem] font-bold text-rose-500">
            Your Questions
          </p>
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
                  className="border-gray-600"
                  onClick={() => {
                    Navigate("/myquestion/" + question.id);
                  }}
                >
                  <Question key={index} i={index} question={question} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </MaxWidthWrapper>
    </main>
  );
}

function Question({ question, i }) {
  console.log("question : ", question.name);

  return (
    <>
      <TableCell>{i}</TableCell>
      <TableCell>{question?.name}</TableCell>
      <TableCell>{question.status}</TableCell>
      <TableCell>{question?.submissions?.length || 0}</TableCell>
    </>
  );
}
