// type StepsIndicationProps = {
//     currentStep: number;
//     totalSteps: number;
// };

// export function StepsIndication({ currentStep, totalSteps }: StepsIndicationProps) {
//   return (
//     <div className="flex flex-col justify-center items-center w-full h-full">
//       <div className="flex flex-row lg:hidden">
//         <p className="text-gray-600 font-bold">Step</p>
//         <p className="ml-2 text-gray-500">
//           {currentStep} of {totalSteps}
//         </p>
//       </div>

//       <div className="flex flex-row justify-center items-center w-[85%] h-full">
//       {Array.from({ length: totalSteps }, (_, index) => {
//         const step = index + 1;
//         let bgColor = "bg-gray-200"; // default for future steps
//         if (step < currentStep) bgColor = "bg-green-50 border-b-green-800"; // completed steps
//         if (step === currentStep) bgColor = "bg-blue-50 border-b-blue-800"; // current step

//         return (
//           <div key={step} className={`flex flex-col justify-center items-center w-[20%] h-12 lg:h-16 ${bgColor} border border-gray-400 border-b-8`}>
//             <p className="text-gray-600 font-bold">{step}</p>
//             <div className="hidden lg:flex">
//               <p className="ml-2 text-gray-500">Form</p>
//             </div>
//           </div>
//         );
//       })}
//       </div>
//     </div>
//   );
// }

type StepsIndicationProps = {
  currentStep: number;
  totalSteps: number;
  getFormNameByStep: (step: number) => string;
};

export function StepsIndication({ currentStep, totalSteps, getFormNameByStep }: StepsIndicationProps) {
return (
  <div className="flex flex-col justify-center items-center w-full h-full">
    <div className="flex flex-row lg:hidden">
      <p className="text-gray-600 font-bold">Step</p>
      <p className="ml-2 text-gray-500">
        {currentStep} of {totalSteps}
      </p>
    </div>

    <div className="flex flex-row justify-center items-center w-[85%] h-full">
    {Array.from({ length: totalSteps }, (_, index) => {
      const step = index + 1;
      let bgColor = "bg-gray-200"; // default for future steps
      let stepFont = "font-normal";
      let formNameFont = "font-normal text-gray-500";
      if (step < currentStep){ // completed steps
        bgColor = "bg-green-50 border-b-green-800";
      }
      if (step === currentStep){ // current step
        bgColor = "bg-blue-50 border-b-blue-800";
        stepFont = "font-extrabold";
        formNameFont = "font-extrabold text-gray-600";
      }
      const formName = getFormNameByStep(index);

      return (
        <div key={step} className={`flex flex-col justify-center items-center w-[20%] h-12 lg:h-16 ${bgColor} border border-gray-400 border-b-8`}>
          <p className={`text-gray-800 ${stepFont}`}>{step}</p>
          <div className="hidden lg:flex">
            <p className={`ml-2 ${formNameFont}`}>{formName}</p>
          </div>
        </div>
      );
    })}
    </div>
  </div>
);
}