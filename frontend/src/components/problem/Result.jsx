import { resultAtom } from "@/atoms/userAtom";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Result = () => {
  const [loading, setLoading] = useState(true);
  const resultState = useRecoilValue(resultAtom);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (resultState) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  if (loading) {
    return (
      <h1 className="mx-auto text-center py-5 text-xl">
        waiting for Your Output ...
      </h1>
    );
  }

  if (!resultState) {
    setLoading(true)
    return (
      <h1 className="mx-auto text-center py-5 text-xl">
        Waiting for your code submission !
      </h1>
    );
  }

  return (
    <main className="w-full overflow-auto h-full relative bg-third">
      <nav>
        <div className="flex w-full items-center bg-secondary text-white overflow-x-hidden border-b border-gray-500">
          <div
            className={
              "rounded-t-[5px] px-5 py-[10px] flex items-center text-sm cursor-pointer"
            }
          >
            <Check className="text-green-500 mr-3" /> Result
          </div>
        </div>
      </nav>
      <h2 className="text-red-400 text-[1.4rem] px-2 py-4">
        {"Wrong Output :( "}
      </h2>
      <p className="pl-3 text-red-300">Hello there !</p>
      <div className="flex flex-col p-3 text-gray-300 gap-4">
        <h1 className="text-[1rem] border-b border-gray-400 text-white font-semibold">
          Expected Result :{" "}
        </h1>
        <p>Hello world !</p>
      </div>
    </main>
  );
};

export default Result;
