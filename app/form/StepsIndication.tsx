type StepsIndicationProps = {
    currentStep: number;
    totalSteps: number;
};

export function StepsIndication({ currentStep, totalSteps }: StepsIndicationProps) {

  // return (
  //   <div className="flex flex-row justify-center items-center w-full h-full">
  //     <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 mr-3">
  //       <p className="text-gray-600 font-bold">{currentStep}</p>
  //     </div>
  //     <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 mr-3">
  //       <p className="text-gray-600 font-bold">{currentStep}</p>
  //     </div>
  //     <div className="flex flex-col">
  //       <p className="text-gray-600 font-bold">Step</p>
  //       <p className="text-gray-400">
  //         {currentStep} of {totalSteps}
  //       </p>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-row">
        <p className="text-gray-600 font-bold">Step</p>
        <p className="ml-2 text-gray-400">
          {currentStep} of {totalSteps}
        </p>
      </div>
      
      <div className="flex flex-row justify-center items-center w-[85%] h-full">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        let bgColor = "bg-gray-200"; // default for future steps
        if (step < currentStep) bgColor = "bg-green-50 border-b-green-800"; // completed steps
        if (step === currentStep) bgColor = "bg-blue-50 border-b-blue-800"; // current step

        return (
          <div key={step} className={`flex justify-center items-center w-[20%] h-12 ${bgColor} border border-gray-400 border-b-8`}>
            <p className="text-gray-600 font-bold">{step}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
}