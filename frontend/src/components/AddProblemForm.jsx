import { useEffect, useState } from "react";

export default function ProblemForum({ DEPLOY }) {
  const [formSelector, setFormSelector] = useState(0);
  const [difficulty, setDifficulty] = useState();
  const [bountyValue, setBountyValue] = useState();
  //not so imp consts...
  const [In, setIn] = useState("");
  const [Out, setOut] = useState("");
  const [Exp, setExp] = useState("");
  const [Cons, setCons] = useState("");
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

  const [showAlert, setShowAlert] = useState(false);

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
        // setLoading(true);
        const re = confirm("you sure doing this...");
        if(!re) return;
        //define bounty value and difficulty here..... man bounty in trx... make sure of that...
        DEPLOY(difficulty, formData, bountyValue);
        //working man

    };

  return (
    <div className="flex flex-col items-center justify-center">

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
            <input
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
                    className="mt-1 h-[200px] w-full rounded-md border bg-black/40 p-2"
                    onChange={(e) => setIn(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-200">Output</label>
                  <textarea
                    type="text"
                    placeholder="Output"
                    className="mt-1 h-[200px] w-full rounded-md border bg-black/40 p-2"
                    onChange={(e) => setOut(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="mt-1 rounded-[7px] border border-white p-2 px-4"
                    onClick={() => {
                      //function to add a example
                      const dataEntry = {
                        id: formData.testcases.length,
                        input: In,
                        output: Out,
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
            <div className="mt-1 h-[110px] overflow-y-scroll">
              {formData.testcases.map((testcase, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 border-b border-white py-2 pl-[7px]"
                >
                  <div className="flex gap-[10px]">
                    <h1>In: {testcase.input}</h1>
                    <h1>Out: {testcase.output}</h1>
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
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-200">
                  Default Code {"(comma separated)"}
                </label>
                <textarea
                  type="text"
                  placeholder={`/*\nhello default code here\n basic info\n*/`}
                  className="mt-1 h-[120px] w-full rounded-md border bg-black/40 p-2"
                  onChange={(e) => {
                    setFormData({ ...formData, defaultCode: e.target.value });
                  }}
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
          onClick={() => setFormSelector(parseInt(formSelector) - 1)}
          className={`${formSelector == 0 ? "pointer-events-none cursor-none opacity-50" : ""} rounded-[7px] border-[3px] border-white p-2 px-4`}
        >
          Prev
        </button>
        {formSelector == 5 ? (
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="rounded-[7px] border-[3px] bg-white p-2 px-4 font-bold text-black hover:bg-black hover:text-white"
          >
            Submit
          </button>
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
