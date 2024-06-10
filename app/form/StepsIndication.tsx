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
      <div className="flex flex-row sm:hidden">
        <p className="text-gray-700 dark:text-gray-200 font-bold">Step</p>
        <p className="ml-2 text-gray-600 dark:text-gray-300">
          {currentStep} of {totalSteps}
        </p>
      </div>

      <div className="flex flex-row justify-center items-center w-[85%] h-full">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          let bgColor = "";
          let stepFont = "font-normal text-gray-800 dark:text-gray-400";
          let formNameFont = "font-normal text-gray-800 dark:text-gray-400 text-sm md:text-base";

          let isComplete = isStepComplete(index);
          if(isComplete) {
            bgColor = "border-b-green-500 hover:border-b-green-600 dark:border-b-green-500 dark:hover:border-b-green-300";
          }
          if (stepNumber === currentStep) {
            // current step
            bgColor = "border-b-blue-800 dark:border-b-blue-600";
            stepFont = "font-extrabold text-gray-900 dark:text-gray-300 ";
            formNameFont = "font-extrabold text-gray-900 dark:text-gray-300 text-sm md:text-base";
          }
          let isClickable = isComplete || isStepComplete(index - 1);

          return (
            <div
              key={stepNumber}
              onClick={(isClickable) ? () => goToStep(index) : undefined}
              className={`flex flex-col justify-center items-center w-[20%] h-12 sm:h-16 ${bgColor} border-gray-300 dark:border-gray-400 border-b-4 select-none ${isClickable ? "cursor-pointer" : ""}`}
            >
              <p className={`${stepFont}`}>{stepNumber}</p>
              <div className="hidden sm:flex">
                <p className={`${formNameFont}`}>{getFormNameByStep(index)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}