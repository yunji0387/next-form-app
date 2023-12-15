"use client";
import React, { useEffect, useState } from "react";
import { JobInfoForm } from "./JobInfoForm";
import { MaterialForm } from "./MaterialForm";
import { useMultiStepForm } from "../hooks/useMutiStepForm";

// interface FormProps {
//   // Define your component props here
// }

// const Form: React.FC<FormProps> = ({}) => {
export default function BoxDesignForm() {
  //const [currStep, setCurrStep] = useState<number>(1);

  // const initialFormData = {
  //     jobName: '',
  //     customerName: '',
  //     materialID: [],
  //     materialName: [''],
  //     printType: '',
  //     printCustomerName: false,
  //     printCustomText: '',
  //     designNotes: '',
  //     agreeToTerms: false
  // };
  // const [formData, setFormData] = useState(initialFormData);

  // const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const fieldName = event.target.name;
  //     let fieldValue : string | boolean;
  //     if (fieldName === 'agreeToTerms'){
  //         fieldValue = event.target.checked;
  //     } else {
  //         fieldValue = event.target.value;
  //     }
  //     setFormData({
  //         ...formData,
  //         [fieldName]: fieldValue
  //     });
  // };

  // const handleSubmitFormData = () => {
  //     if (!formData.agreeToTerms){
  //         alert('Please agree to terms');
  //     }else {
  //         //setStep(step + 1);
  //     }
  // };

  // useEffect(() => {
  //     console.log(formData);
  // }, [formData]);

  const { steps, currStep, step, isFirstStep, isLastStep, prevStep, nextStep } =
    useMultiStepForm([
      <JobInfoForm key="jobInfoForm" />,
      <MaterialForm key="materialForm" />,
    ]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-around bg-white w-[25rem] min-h-[30rem] h-auto rounded-lg p-5">
        <h1 className="w-96 text-black text-center font-bold text-3xl bg-lime-100 rounded-lg p-2">
          Box Design Form
        </h1>
        <p className="w-90 text-black text-md p-3 text-justify bg-pink-100">
          Please complete the form below and move to next step.
        </p>
        <div className="text-black">
          {currStep + 1} / {steps.length}
        </div>
        {step}
        {/* <JobInfoForm /> */}
        {/* <MaterialForm /> */}
        <div className="w-96 flex flex-row justify-around items-center">
          {!isFirstStep && (
            <button
              type="button"
              onClick={prevStep}
              className="w-40 p-2 bg-dark-blue text-white rounded-lg"
            >
              Prev
            </button>
          )}
          <button
            type="button"
            onClick={nextStep}
            className="w-40 p-2 bg-dark-blue text-white rounded-lg"
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
