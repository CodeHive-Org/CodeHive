import React, { useEffect, useRef, useState } from "react";
import { TiTick } from "react-icons/ti";
const QuestionProgress = ({ status }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const steps = [
    {
      name: "Question Deployment",
      Component: () => <div>please sign in the question deploy contract</div>,
    },
    {
      name: "Signin to the bank address",
    //   Component: () => <div></div>,
    },
    {
      name: "Question Deployed Succesfully",
      Component: () => <div>0xksdfsd8dsksdksfs</div>,
    },
  ];

  const stepRef = useRef([]);

  //   console.log(
  //     "stepRef.current[0].offsetWidth / 2 : " +
  //       stepRef.current[0].offsetWidth / 2,
  //   );
  console.log(
    "stepRef.current[0].offsetWidth / 2 : " +
      stepRef.current[0] +
      " " +
      stepRef.current[steps.length - 1],
  );

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[steps.length - 1].offsetWidth / 2,
    });
  }, [status, stepRef, steps.length]);

  if (!steps.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === steps.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarHeight = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  const ActiveComponent = steps[currentStep - 1]?.Component;

  return (
    <>
      <main className="absolute inset-0 z-10 flex justify-center bg-white/10 py-8 backdrop-blur-lg">
        <section className="relative z-30 m-10 mt-24 flex h-max">
          <div className="relative flex flex-col justify-start space-y-20">
            {steps.map((step, index) => {
              return (
                <div
                  key={step.name}
                  ref={(el) => (stepRef.current[index] = el)}
                  className={`z-30 flex items-center justify-start space-x-8 ${
                    currentStep > index + 1 || isComplete ? "complete" : ""
                  } ${currentStep === index + 1 ? "active" : ""} `}
                >
                  <div className="step-number  text-2xl ">
                    {currentStep > index + 1 || isComplete ? (
                      <span>&#10003;</span>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="font-sans text-[1.8rem] font-semibold">
                    {step.name}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="absolute left-6 z-20 mt-2 w-[4px] bg-gray-500"
            style={{
              // width: `${calculateProgressBarHeight()}%`,
              width: "2px",
              height: `calc(100% - 20px)`,
              //   height: `calc(100% - ${margins.marginTop + margins.marginBottom}px)100%`,
              //   marginTop: margins.marginTop,
              //   marginBottom: margins.marginBottom,
            }}
          >
            <div
              className="progress"
              style={{ height: `${calculateProgressBarHeight()}%` }}
            ></div>
          </div>
        </section>

        {/* <ActiveComponent /> */}

        {/* {!isComplete && (
          <button className="btn" onClick={handleNext}>
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        )} */}
      </main>
    </>
  );
};

export default QuestionProgress;
