import { ReactElement, useState } from "react";

export function useMultiStepForm(
  steps: { name: string; component: ReactElement; }[]
) {
  const [currStep, setCurrStep] = useState<number>(0);
  const [completionStatuses, setCompletionStatuses] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );

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

  const isStepComplete = (step: number): boolean => {
    return step >= 0 && step < completionStatuses.length && completionStatuses[step];
  };

  const setStepComplete = (step: number) => {
    if (step >= 0 && step < steps.length) {
      const newCompletionStatuses = [...completionStatuses];
      newCompletionStatuses[step] = true;
      setCompletionStatuses(newCompletionStatuses);
    }
  };

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
    isStepComplete,
    setStepComplete,
  };
}