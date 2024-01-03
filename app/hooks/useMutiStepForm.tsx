// import { ReactElement, useState } from "react";

// export function useMultiStepForm(steps: ReactElement[]) {
//     const [currStep, setCurrStep] = useState<number>(0);

//     function nextStep() {
//         setCurrStep(i => {
//             if(i >= steps.length - 1) return i;
//             return i + 1;
//         });
//     }

//     function prevStep() {
//         setCurrStep(i => {
//             if(i <= 0) return i;
//             return i - 1;
//         });
//     }

//     function goToStep(step: number) {
//         setCurrStep(step);
//     }

//     return {
//         currStep,
//         step: steps[currStep],
//         goToStep,
//         nextStep,
//         prevStep,
//         steps,
//         isFirstStep: currStep === 0,
//         isLastStep: currStep === steps.length - 1,
//     }
// }

import { ReactElement, useState } from "react";

export function useMultiStepForm(
  steps: { name: string; component: ReactElement }[]
) {
  const [currStep, setCurrStep] = useState<number>(0);

  function nextStep() {
    setCurrStep((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function prevStep() {
    setCurrStep((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goToStep(step: number) {
    setCurrStep(step);
  }

  function getFormNameByStep(step: number): string {
    if (step < 0 || step >= steps.length) {
      return "Invalid step"; // Or handle this case as you see fit
    }
    return steps[step].name;
  }

  return {
    currStep,
    step: steps[currStep],
    goToStep,
    nextStep,
    prevStep,
    steps,
    isFirstStep: currStep === 0,
    isLastStep: currStep === steps.length - 1,
    getFormNameByStep,
  };
}
