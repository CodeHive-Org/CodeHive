import { ChevronUp, Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const SubmitBox = ({ handleSubmit, handleRun, loading }) => {
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
          {loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <button
              className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-rose-700 focus:outline-none"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitBox;
