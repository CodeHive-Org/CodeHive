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
import { useTheContext } from "@/context";

const AddQuestion = () => {
  const { Pinata } = useTheContext(); 
  //not so imp consts...
  const [In,setIn]=useState("");
  const [Out,setOut]=useState("");
  const [Exp,setExp]=useState("");
  const [Cons,setCons]=useState("");
  //consts ends...
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    defaultCode: "",
    compileFunctionName: "",
    tags:[],
    examples: [],
    constraints: [],
    testcases: [],
  });
  const [formSelector, setFormSelector ] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // setLoading(true);
    const re = confirm("you sure doing this...");
    if(!re) return;

    //creating a ipfs deploy getting the hash ccode for that... then deploying the contract from here....
    const res = await Pinata.pinJSONToIPFS(formData);
    console.log(res);
    //working man

  };

  return (  
    <main className="bg-[black] h-screen">
      <Nav />
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <div className="w-[60%] pt-[30px] h-[500px] flex flex-col items-center">
          {formSelector==0 &&
            <div className="w-full">
              <label htmlFor="question_title" className="block text-[24px] text-gray-200">
                Question Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
              <label htmlFor="question_title" className="block mt-2 text-gray-200">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                required
              />
            </div>  
          }
          { formSelector==1 &&
            <div className="w-full">
              <label htmlFor="none" className="block text-[24px] text-gray-200">
                Examples
              </label>
              <br />
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="w-full">
                    <label className="block text-gray-200">Input</label>
                    <input type="text" placeholder="Input" className="mt-1 p-2 border bg-black/40 rounded-md w-full" onChange={(e)=>setIn(e.target.value)}/>
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-200">Output</label>
                    <input type="text" placeholder="Output" className="mt-1 p-2 border bg-black/40 rounded-md w-full" onChange={(e)=>setOut(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <label className="pt-[10px] block text-gray-200">Explanation</label>
                  <div className="flex gap-2 items-center">
                    <input type="text" placeholder="Explanation" className="mt-1 p-2 border bg-black/40 rounded-md w-full" onChange={(e)=>setExp(e.target.value)}/>
                    <button className="rounded-[7px] border border-white p-2 mt-1 px-4" onClick={()=>{
                      //function to add a example
                      const dataEntry = { "input": In, "output": Out, "explanation": Exp }
                      setFormData({...formData, examples: [...formData.examples, dataEntry]})
                    }}>Add</button>
                  </div>
                </div>
              </div>
              <div className="overflow-y-scroll h-[220px] mt-2">
                { formData.examples.map((example, index) => (
                  <div key={index} className="pl-[7px] py-2 border-b flex flex-col gap-1 border-white">
                    <div className="flex gap-[10px]">
                      <h1>In: {example.input}</h1>
                      <h1>Out: {example.output}</h1>
                    </div>
                    Exp : {example.explanation}
                  </div>
                ))
                }
              </div>
            </div> 
          }
          { formSelector==2 &&
            <div className="w-full">
              <label htmlFor="none" className="block text-[24px] text-gray-200">
                Testcases
              </label>
              <br />
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="w-full">
                    <label className="block text-gray-200">Input</label>
                    <textarea type="text" placeholder="Input" className="mt-1 p-2 border bg-black/40 rounded-md w-full h-[200px]" onChange={(e)=>setIn(e.target.value)}/>
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-200">Output</label>
                    <textarea type="text" placeholder="Output" className="mt-1 p-2 border bg-black/40 rounded-md w-full h-[200px]" onChange={(e)=>setOut(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 items-center justify-end">
                    <button className="rounded-[7px] border border-white p-2 mt-1 px-4" onClick={()=>{
                      //function to add a example
                      const dataEntry = { "id":formData.testcases.length , "input": In, "output": Out }
                      setFormData({...formData, testcases: [...formData.testcases, dataEntry]})
                    }}>Add</button>
                  </div>
                </div>
              </div>
              <div className="mt-1 overflow-y-scroll h-[110px]">
                { formData.testcases.map((testcase, index) => (
                  <div key={index} className="pl-[7px] py-2 border-b flex flex-col gap-1 border-white">
                    <div className="flex gap-[10px]">
                      <h1>In: {testcase.input}</h1>
                      <h1>Out: {testcase.output}</h1>
                    </div>
                    ID : {testcase.id}
                  </div>
                ))
                }
              </div>
            </div> 
          }
          { formSelector==3 &&
            <div className="w-full">
              <label htmlFor="none" className="block text-[24px] text-gray-200">
                Constraints
              </label>
              <br />
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <input type="text" placeholder="Input" className="mt-1 p-2 border bg-black/40 rounded-md w-full" onChange={(e)=>setCons(e.target.value)}/>
                  <button className="rounded-[7px] border border-white p-2 mt-1 px-4" onClick={()=>{
                      setFormData({...formData, constraints: [...formData.constraints, Cons]})
                    }}>Add</button>
                </div>
                <div>
                  <div className="mt-1 overflow-y-scroll h-[110px]">
                    { formData.constraints.map((cons, index) => (
                      <div key={index} className="pl-[7px] py-2 border-b flex flex-col gap-1 border-white">
                          <h1>⁜ {cons}</h1>
                      </div>
                    ))
                    }
                  </div>
                </div> 
              </div>
            </div>
          }
          { formSelector==4 &&
            <div className="w-full">
              <label htmlFor="none" className="block text-[24px] text-gray-200">
                Minor paramerters:
              </label>
              <br />
              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <label className="block text-gray-200">Function Name</label>
                  <input type="text" placeholder="This function will be called...." className="mt-1 p-2 border bg-black/40 rounded-md w-full"
                    onChange={(e)=>{
                      setFormData({...formData, compileFunctionName: e.target.value})
                    }}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-200">Tags {"(comma separated)"}</label>
                  <input type="text" placeholder="Hard,Array, ...." className="mt-1 p-2 border bg-black/40 rounded-md w-full" 
                    onChange={(e)=>{
                      //compling the fields....
                      const arr = e.target.value.split(",");
                      setFormData({...formData, tags:arr});
                    }}/>
                </div>
                <div className="w-full">
                  <label className="block text-gray-200">Default Code {"(comma separated)"}</label>
                  <textarea type="text" placeholder={`/*\nhello default code here\n basic info\n*/`} className="h-[120px] mt-1 p-2 border bg-black/40 rounded-md w-full" 
                    onChange={(e)=>{
                      setFormData({...formData, defaultCode:e.target.value});
                    }}/>
                </div>
              </div>
            </div> 
          }
        </div>
        <div className="flex justify-between w-[60%]">
          <button onClick={()=>setFormSelector(parseInt(formSelector)-1)} className={`${formSelector==0?"pointer-events-none opacity-50 cursor-none":""} rounded-[7px] border-[3px] border-white p-2 px-4`}>
            Prev
          </button>
          {
            formSelector == 4?
            <button onClick={()=>{handleSubmit()}} className="rounded-[7px] font-bold border-[3px] text-black bg-white p-2 px-4 hover:bg-black hover:text-white"> 
                Submit
              </button>
                :
              <button onClick={()=>setFormSelector(val=>parseInt(val)+1)} className="rounded-[7px] border-[3px] border-white p-2 px-4">Next</button>
          }
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default AddQuestion;
