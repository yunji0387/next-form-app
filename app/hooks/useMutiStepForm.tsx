import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
    const [currStep, setCurrStep] = useState<number>(0);

    function nextStep() {
        setCurrStep(i => {
            if(i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function prevStep() {
        setCurrStep(i => {
            if(i <= 0) return i;
            return i - 1;
        });
    }

    function goToStep(step: number) {
        setCurrStep(step);
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
    }
}