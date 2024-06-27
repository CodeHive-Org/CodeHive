import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";
import QuestionProgress from "./ui/QuestionProgress";



export default function ProblemForum({ data }) {
  const [formSelector, setFormSelector] = useState(0);
  const [difficulty, setDifficulty] = useState();
  const [bountyValue, setBountyValue] = useState();
  //not so imp consts...
  const [ loading, setLoading ] = useState(false);
  const [In, setIn] = useState("");
  const [Out, setOut] = useState("");
  const [Exp, setExp] = useState("");
  const [Cons, setCons] = useState("");
  const [ isChecked, setChecked ] = useState(false);
  //consts ends...
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    defaultCode: "",
    compileFunctionName: "",
    tags: [],
    examples: [],
    constraints: [],
    testcases: [],
  });
  //deployment stuff...
  const { DEPLOY, deployed, deployAddress, error } = data;

  useEffect(()=>{
    if(deployAddress!= "" && deployed){
      toast.success("Contract deployed, will be added soon to dashboard after a review!");
    }
  },[deployed, deployAddress, error])
  const [showAlert, setShowAlert] = useState(false);
  const checkFormInvalid = ()=>{
    //checking all the input vales sir.... 
    if(!formData.name){
      toast({
        description: "The name is required!!",
      });
      setFormSelector(0);
      return true;
    }
    if(!formData.description){
      toast({
        description: "The description is required!!",
      });
      setFormSelector(0);
      return true;
    }
    if(!formData.examples){
      toast({
        description: "The examples are required!!",
      });
      setFormSelector(1);
      return true;
    }
    if(formData.examples?.length > 0){
      formData.examples.forEach((example)=>{
        if(!example.input || !example.output || !example.explanation){
          toast({
            description: "The examples are not valid!!",
          });
          setFormSelector(1);
          return true;
        }
      })
    }
    if(!formData.testcases){
      toast({
        description: "The testcases are required!!",
      });
      setFormSelector(2);
      return true;
    }
    if(formData.testcases?.length > 0){
      formData.testcases.forEach((testcase)=>{
        if(!testcase.input || !testcase.output){
          toast({
            description: "The testcases are not valid!!",
          });
          setFormSelector(2);
          return true;
        }
      })
    }
    if(!formData.defaultCode){
      toast({
        description: "The default code is required!!",
      });
      setFormSelector(4);
      return true;
    }
    if(!bountyValue){
      toast({
        description: "The bounty value is required!!",
      });
      setFormSelector(5);
      return true;
    }
    if(typeof parseInt(difficulty) != "number"){
      toast({
        description: "The bounty value is not valid!!",
      });
      setFormSelector(5);
      return true;
    }
    if(!difficulty){
      toast({
        description: "The difficulty is required!!",
      });
      setFormSelector(5);
      return true;
    }
    if(typeof parseInt(difficulty) != "number"){
      toast({
        description: "The difficulty is not valid!!",
      });
      setFormSelector(5);
      return true;
    }
    if(!formData.compileFunctionName){
      toast({
        description: "The compile function name is required!!",
      });
      setFormSelector(4);
      return true;
    }
    if(!formData.defaultCode){
      toast({
        description: "The default code is required!!",
      });
      setFormSelector(4);
      return true;
    }
    return false;
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    const handleSubmit = async (e) => {
        if(checkFormInvalid())return;

        DEPLOY(difficulty, formData, bountyValue);
    };

  return (
    <div className="flex relative h-full flex-col items-center justify-start">
      {/* <QuestionProgress  /> */}
      <div className="flex h-[500px] w-[60%] flex-col items-center pt-[30px]">
        {formSelector == 0 && (
          <div className="w-full">
            <label
              htmlFor="question_title"
              className="block text-[24px] text-gray-200"
            >
              Question Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border bg-black/40 p-2"
              required
            />
            <label
              htmlFor="question_title"
              className="mt-2 block text-gray-200"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border bg-black/40 p-2"
              required
            />
          </div>
        )}
        {formSelector == 1 && (
          <div className="w-full">
            <label htmlFor="none" className="block text-[24px] text-gray-200">
              Examples
            </label>
            <br />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="w-full">
                  <label className="block text-gray-200">Input</label>
                  <input
                    type="text"
                    placeholder="Input"
                    className="mt-1 w-full rounded-md border bg-black/40 p-2"
                    onChange={(e) => setIn(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-200">Output</label>
                  <input
                    type="text"
                    placeholder="Output"
                    className="mt-1 w-full rounded-md border bg-black/40 p-2"
                    onChange={(e) => setOut(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block pt-[10px] text-gray-200">
                  Explanation
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Explanation"
                    className="mt-1 w-full rounded-md border bg-black/40 p-2"
                    onChange={(e) => setExp(e.target.value)}
                  />
                  <button
                    className="mt-1 rounded-[7px] border border-white p-2 px-4"
                    onClick={() => {
                      //function to add a example
                      const dataEntry = {
                        input: In,
                        output: Out,
                        explanation: Exp,
                      };
                      setFormData({
                        ...formData,
                        examples: [...formData.examples, dataEntry],
                      });
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 h-[220px] overflow-y-scroll">
              {formData.examples.map((example, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 border-b border-white py-2 pl-[7px]"
                >
                  <div className="flex gap-[10px]">
                    <h1>In: {example.input}</h1>
                    <h1>Out: {example.output}</h1>
                  </div>
                  Exp : {example.explanation}
                </div>
              ))}
            </div>
          </div>
        )}
        {formSelector == 2 && (
          <div className="w-full">
            <label htmlFor="none" className="block text-[24px] text-gray-200">
              Testcases
            </label>
            <br />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="w-full">
                  <label className="block text-gray-200">Input</label>
                  <textarea
                    type="text"
                    placeholder="Input"
                    className="mt-1 h-[100px] w-full rounded-md border bg-black/40 p-2"
                    onChange={(e) => setIn(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-200">Output</label>
                  <textarea
                    type="text"
                    placeholder="Output"
                    className="mt-1 h-[100px] w-full rounded-md border bg-black/40 p-2"
                    onChange={(e) => setOut(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="radio" name="radio" value="sample" checked={isChecked} onChange={(e)=>setChecked(e.target.checked)}/>
                    <label className="block text-gray-200">Hide this testcase</label>
                  </div>
                  <button
                    className="mt-1 rounded-[7px] border border-white p-2 px-4"
                    onClick={() => {
                      //function to add a example
                      const dataEntry = {
                        id: formData.testcases.length,
                        input: In,
                        output: Out,
                        hidden: isChecked,
                      };
                      setFormData({
                        ...formData,
                        testcases: [...formData.testcases, dataEntry],
                      });
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-1 h-[200px] overflow-y-scroll">
              {formData.testcases.map((testcase, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 border-b border-white py-2 pl-[7px]"
                >
                  <div className="flex gap-[10px]">
                    <h1>In: {testcase.input}</h1>
                    <h1>Out: {testcase.output}</h1>
                    <h1 className="text-[#b24343]">{(testcase.hidden)?"Hidden!!":""}</h1>
                  </div>
                  ID : {testcase.id}
                </div>
              ))}
            </div>
          </div>
        )}
        {formSelector == 3 && (
          <div className="w-full">
            <label htmlFor="none" className="block text-[24px] text-gray-200">
              Constraints
            </label>
            <br />
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="Input"
                  className="mt-1 w-full rounded-md border bg-black/40 p-2"
                  onChange={(e) => setCons(e.target.value)}
                />
                <button
                  className="mt-1 rounded-[7px] border border-white p-2 px-4"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      constraints: [...formData.constraints, Cons],
                    });
                  }}
                >
                  Add
                </button>
              </div>
              <div>
                <div className="mt-1 h-[110px] overflow-y-scroll">
                  {formData.constraints.map((cons, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 border-b border-white py-2 pl-[7px]"
                    >
                      <h1>⁜ {cons}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {formSelector == 4 && (
          <div className="w-full">
            <label htmlFor="none" className="block text-[24px] text-gray-200">
              Minor paramerters:
            </label>
            <br />
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <label className="block text-gray-200">Function Name</label>
                <input
                  type="text"
                  placeholder="This function will be called...."
                  className="mt-1 w-full rounded-md border bg-black/40 p-2"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      compileFunctionName: e.target.value,
                    });
                  }}
                  value={(formData?.compileFunctionName)?formData.compileFunctionName:""}
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-200">
                  Tags {"(comma separated)"}
                </label>
                <input
                  type="text"
                  placeholder="Hard,Array, ...."
                  className="mt-1 w-full rounded-md border bg-black/40 p-2"
                  onChange={(e) => {
                    //compling the fields....
                    const arr = e.target.value.split(",");
                    setFormData({ ...formData, tags: arr });
                  }}
                  value={formData.tags.map((val)=>{
                    return val;
                  })}
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-200">
                  Default Code
                </label>
                <textarea
                  type="text"
                  placeholder={`/*\nhello default code here\n basic info\n*/`}
                  className="mt-1 h-[120px] w-full rounded-md border bg-black/40 p-2"
                  onChange={(e) => {
                    setFormData({ ...formData, defaultCode: e.target.value });
                  }}
                  value={(formData.compileFunctionName)?`const ${formData?.compileFunctionName} = (data)=>{\n\t/*\n\t\thello your code goes here\n\t*/\n}`:""}
                />
              </div>
            </div>
          </div>
        )}
        {formSelector == 5 && (
          <div className="w-full">
            <label htmlFor="none" className="block text-[24px] text-gray-200">
              Minor paramerters:
            </label>
            <br />
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <label className="block text-gray-200">Difficulty</label>
                <input
                  type="number"
                  placeholder="a ranging value betweeen 1000 - 1000000, that defines the difficulty."
                  className="mt-1 w-full rounded-md border bg-black/40 p-2"
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-200">Bounty Value</label>
                <input
                  type="number"
                  placeholder="Value in TRX, starting value being  1000."
                  className="mt-1 w-full rounded-md border bg-black/40 p-2"
                  onChange={(e) => {
                    setBountyValue(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-[60%] justify-between">
        <button
          onClick={() => {if(parseInt(formSelector) == 0)return; setFormSelector(parseInt(formSelector) - 1)}}
          className={`${formSelector == 0 ? "pointer-events-none cursor-none opacity-50" : ""} rounded-[7px] border-[3px] border-white p-2 px-4`}
        >
          Prev
        </button>
        {formSelector == 5 ? (
          <Sheet>
          <SheetTrigger className="rounded-[7px] border-[3px] bg-white p-2 px-4 font-bold text-black hover:bg-black hover:text-white">
              Submit
          </SheetTrigger>
          <SheetContent className="bg-black">
            <SheetHeader>
              <SheetTitle className="text-[#b74646] font-bold">Deploying &quot;{formData.name}&quot;</SheetTitle>
              <SheetDescription>
                This is the final step to deploy the question. Please review the details before deploying.
              </SheetDescription>
            </SheetHeader>
              <div className="flex flex-col justify-between h-full my-[10px]">
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="space-y-2 mt-[40px]">
                      <div className="flex items-center gap-2 w-full text-white">
                        <h1 className="text-white">Deployed</h1>
                          {deployed?(
                            error?
                            <>{error}</>:
                            <>SucessFully Deployed!!</>
                          ):(
                            <Skeleton className="h-4 w-full" />
                          )}
                      </div>
                      <div className="flex items-center gap-2 w-full text-white">
                        <h1 className="text-white">At: </h1>
                          {deployed?(
                              <>{deployAddress}</>
                            ):(
                              <Skeleton className="h-4 w-full" />
                            )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    <button 
                      className={`w-[130px] rounded-[7px] border-[3px] bg-white p-2 px-4 font-bold text-black hover:bg-black hover:text-white mb-[60px]`}
                      onClick={()=>{
                        setLoading(true);
                        setTimeout(()=>{setLoading(false)},3000);
                        handleSubmit();}
                      }
                      >
                      Deploy
                      {!deployed && <Loader className="animate-spin"/>}
                    </button>
                  </div>
                </div>
              </div>
          </SheetContent>
        </Sheet>
        ) : (
          <button
            onClick={() => setFormSelector((val) => parseInt(val) + 1)}
            className="rounded-[7px] border-[3px] border-white p-2 px-4"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
