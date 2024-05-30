type StepsIndicationProps = {
  currentStep: number;
  totalSteps: number;
  getFormNameByStep: (step: number) => string;
  goToStep: (step: number) => void;
  isStepComplete: (step: number) => boolean;
  setStepComplete: (step: number) => void;
};

export function StepsIndication({
  currentStep,
  totalSteps,
  getFormNameByStep,
  goToStep,
  isStepComplete,
}: StepsIndicationProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-row lg:hidden">
        <p className="text-gray-600 dark:text-gray-200 font-bold">Step</p>
        <p className="ml-2 text-gray-500 dark:text-gray-300">
          {currentStep} of {totalSteps}
        </p>
      </div>

      <div className="flex flex-row justify-center items-center w-[85%] h-full">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          let bgColor = "";
          let stepFont = "font-normal";
          let formNameFont = "font-normal text-gray-500 dark:text-gray-300";

          let isComplete = isStepComplete(index);
          if(isComplete) {
            bgColor = "border-b-green-800 dark:hover:border-b-green-500";
          }
          if (stepNumber === currentStep) {
            // current step
            bgColor = "border-b-blue-800";
            stepFont = "font-extrabold";
            formNameFont = "font-extrabold text-gray-600 dark:text-gray-300";
          }
          let isClickable = isComplete || isStepComplete(index - 1);

          return (
            <div
              key={stepNumber}
              onClick={(isClickable) ? () => goToStep(index) : undefined}
              className={`flex flex-col justify-center items-center w-[20%] h-12 lg:h-16 ${bgColor} border-gray-400 border-b-4 select-none ${isClickable ? "cursor-pointer" : ""}`}
            >
              <p className={`${stepFont}`}>{stepNumber}</p>
              <div className="hidden lg:flex">
                <p className={`${formNameFont}`}>{getFormNameByStep(index)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export function StepsIndication({
//   currentStep,
//   totalSteps,
//   getFormNameByStep,
//   goToStep,
//   isStepComplete,
// }: StepsIndicationProps) {
//   return (
//     <div className="flex flex-col justify-center items-center w-full h-full">
//       <div className="flex flex-row lg:hidden">
//         <p className="text-gray-600 dark:text-gray-200 font-bold">Step</p>
//         <p className="ml-2 text-gray-500 dark:text-gray-300">
//           {currentStep} of {totalSteps}
//         </p>
//       </div>

//       <div className="flex flex-row justify-center items-center w-[85%] h-full">
//         {Array.from({ length: totalSteps }, (_, index) => {
//           const stepNumber = index + 1;
//           let bgColor = "bg-gray-200";
//           let stepFont = "font-normal";
//           let formNameFont = "font-normal text-gray-500";

//           let isComplete = isStepComplete(index);
//           if(isComplete) {
//             bgColor = "bg-green-50 border-b-green-800 hover:bg-green-100";
//           }
//           if (stepNumber === currentStep) {
//             // current step
//             bgColor = "bg-blue-50 border-b-blue-800";
//             stepFont = "font-extrabold";
//             formNameFont = "font-extrabold text-gray-600";
//           }
//           let isClickable = isComplete || isStepComplete(index - 1);

//           return (
//             <div
//               key={stepNumber}
//               onClick={(isClickable) ? () => goToStep(index) : undefined}
//               className={`flex flex-col justify-center items-center w-[20%] h-12 lg:h-16 ${bgColor} border border-gray-400 border-b-8 select-none ${isClickable ? "cursor-pointer" : ""}`}
//             >
//               <p className={`text-gray-800 ${stepFont}`}>{stepNumber}</p>
//               <div className="hidden lg:flex">
//                 <p className={`${formNameFont}`}>{getFormNameByStep(index)}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }