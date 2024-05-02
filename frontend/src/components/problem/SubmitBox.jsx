import { ChevronUp } from "lucide-react";
import React from "react";

const SubmitBox = ({ handleSubmit, handleRun }) => {
  return (
    <div className="absolute bottom-1 right-3 z-10 flex w-full">
      <div className="mx-5 my-[10px] flex w-full justify-between">
        <div className="ml-auto flex items-center space-x-4">
          <button
            className="text-dark-label-2 inline-flex items-center whitespace-nowrap rounded-lg bg-gray-500/50 px-5 py-1.5 text-sm font-medium  transition-all hover:bg-black focus:outline-none"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            className="inline-flex items-center rounded-lg bg-green-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-rose-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitBox;
