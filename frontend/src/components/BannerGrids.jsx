import { DollarSign, HelpCircle, Play, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";


const BannerGrids = () => {
  const Navigate = useNavigate();
  return (
    <main className="flex w-full flex-col items-center justify-center border-b border-secondary p-5 py-20">
      <div className="mx-auto flex flex-col items-center pb-20">
        <h1 className="text-[3rem] font-semibold">
          For Challengers and Hackers !
        </h1>
      </div>
      <div
        className="mx-auto
            grid max-w-[1500px] grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2"
      >
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <HelpCircle
              size={50}
              className="mr-3 rounded-full  text-primary "
            />
            <h2 className="mb-2 text-2xl font-bold">Questions</h2>
          </div>
          <p className="mb-4">
            Providing coding questions witha tint of blockchain, this utilises blockchain to post questions on the platforn and reap the reward for that. 
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 " onClick={()=>Navigate("/problems")}>
            Questions
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <Users size={50} className="mr-3 rounded-full  text-primary " />
            <h2 className="mb-2 text-2xl font-bold">Communities</h2>
          </div>
          <p className="mb-4">
            Creating a well verse community around tron ecosystem and the coding culture around DSA/CP questions.          
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 " onClick={()=>{window.open("https://forum.trondao.org/t/codehive-crack-the-code-reap-the-rewards/23646","_blank")}}>
            Visit Community
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <Play size={50} className="mr-3 rounded-full  text-primary " />
            <h2 className="mb-2 text-2xl font-bold">Contest</h2>
          </div>
          <p className="mb-4">
            Currently a Idea, making the platform more interactive and engaging by hosting contests and hackathons. look for updates on twitter for this.
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 " onClick={()=>{window.open("https://twitter.com/Codehive01","_blank")}}>
            Check for Updates
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <DollarSign
              size={50}
              className="mr-3 rounded-full  text-primary "
            />
            <h2 className="mb-2 text-2xl font-bold">Rewards</h2>
          </div>
          <p className="mb-4">
            The rewards are equvialent to the difficulty of the question and the number of people who have solved it. The rewards are in TRX and TRC20 tokens and are been designated by the question creator itself.
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 " onClick={()=>{window.open("https://forum.trondao.org/t/codehive-crack-the-code-reap-the-rewards/23646","_blank")}}>
            INTRESTING , Check Forum for Dicussion?
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BannerGrids;
