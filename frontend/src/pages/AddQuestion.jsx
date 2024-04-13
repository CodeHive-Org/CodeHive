import React, { useState } from "react";
import axios from "axios";
import Nav from "@/components/problems/Nav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    rival_id: 31,
    question_title: "",
    question_body: "",
    deadline: "",
    question_status: 0,
    daredevil: 0,
    category: "Rust",
    reward: 0,
    entrance_fee: 0,
    executable_solution: "",
    solution_executer: "",
    test_inputs: "",
    test_outputs: "",
    status: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   await axios.post("http://localhost:8000/api/add_question", formData, {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   });
    //   // Reset form after successful submission
    //   setFormData({
    //     rival_id: 0,
    //     question_title: "",
    //     question_body: "",
    //     deadline: "",
    //     question_status: 0,
    //     daredevil: 0,
    //     category: "Rust",
    //     reward: 0,
    //     entrance_fee: 0,
    //     executable_solution: "",
    //     solution_executer: "",
    //     test_inputs: "",
    //     test_outputs: ""
    //   });
    //   // Handle success or redirect user
    // } catch (error) {
    //   // Handle error
    //   console.error("Error adding question:", error);
    // }
  };

  return (
    <main className="bg-[black]">
      <Nav />
      <MaxWidthWrapper>
        <div className="mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-white">Add Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="question_title" className="block text-gray-200">
                Question Title
              </label>
              <input
                type="text"
                id="question_title"
                name="question_title"
                value={formData.question_title}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="question_body" className="block text-gray-200">
                Question Desciption
              </label>
              <input
                type="text"
                id="question_body"
                name="question_body"
                value={formData.question_body}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deadline" className="block text-gray-200">
                Deadline to solve the question
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-second"> (See Example)</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{`"2015-09-05 23:56:04"`}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <input
                type="text"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-200">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reward" className="block text-gray-200">
                Reward if someone solves the questions (please insert value in
                Trx)
              </label>
              <input
                type="text"
                id="reward"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="entrance_fee" className="block text-gray-200">
                Entry Fee (please insert value in Trx)
              </label>
              <input
                type="text"
                id="entrance_fee"
                name="entrance_fee"
                value={formData.entrance_fee}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="executable_solution"
                className="block text-gray-200"
              >
                Executable Solution
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-second"> (See Example)</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {`mod executable;
                        use executable::hello;
                        fn main(){
                            hello();
                            println!("true")
                        }`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <input
                type="text"
                id="executable_solution"
                name="executable_solution"
                value={formData.executable_solution}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="solution_executer"
                className="block text-gray-200"
              >
                Solution Executor
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-second"> (See Example)</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {`pub fn hello () {
                            println!("hello from postman")
                        }`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <input
                type="text"
                id="solution_executer"
                name="solution_executer"
                value={formData.solution_executer}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="test_inputs" className="block text-gray-200">
                Test Inputs
              </label>
              <input
                type="text"
                id="test_inputs"
                name="test_inputs"
                value={formData.test_inputs}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="test_outputs" className="block text-gray-200">
                Test Outputs
              </label>
              <input
                type="text"
                id="test_outputs"
                name="test_outputs"
                value={formData.test_outputs}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>
            {/* Add other input fields for other parameters similarly */}
            <div className="mt-4">
              <button
                type="submit"
                className="bg-primary px-10 mt-0 text-black py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default AddQuestion;
