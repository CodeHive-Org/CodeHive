import { ChevronUp } from "lucide-react";
import React from "react";

const SubmitBox = ({ handleSubmit }) => {
  return (
    <div className="bg-dark-layer-1 absolute bottom-6 z-10 flex w-full">
      <div className="mx-5 my-[10px] flex w-full justify-between">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button className="bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 inline-flex items-center rounded-lg px-3 py-1.5 pl-3 pr-2 text-sm font-medium transition-all">
            Console
            <div className="ml-1 flex transform items-center transition">
              <ChevronUp className="fill-gray-6 fill-dark-gray-6 mx-1" />
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button
            className="bg-gray-500 hover:bg-dark-fill-2 text-dark-label-2 inline-flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm  font-medium transition-all focus:outline-none"
            onClick={handleSubmit}
          >
            Run
          </button>
          <button
            className="bg-green-500 hover:bg-green-3 inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-all focus:outline-none"
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
