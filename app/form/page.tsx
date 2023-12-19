"use client";
import React, { useState } from "react";
import { JobInfoForm } from "./JobInfoForm";
import { MaterialForm } from "./MaterialForm";
import { PrintingForm } from "./PrintingForm";
import { NotesForm } from "./NotesForm";
import { FinalCheckForm } from "./FinalCheckForm";
import { useMultiStepForm } from "../hooks/useMutiStepForm";
import { LoadingScreen } from "../components/LoadingScreen";

type FormData = {
  jobName: string;
  customerName: string;
  materialID: string[];
  materialName: string[];
  printType: string;
  printCustomerName: boolean;
  printCustomText: boolean;
  customText: string;
  designNotes: string;
};

const INITIAL_FORM_DATA: FormData = {
  jobName: "",
  customerName: "",
  materialID: [],
  materialName: [],
  printType: "",
  printCustomerName: false,
  printCustomText: false,
  customText: "",
  designNotes: "",
};

export default function BoxDesignForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { steps, currStep, step, isFirstStep, isLastStep, prevStep, nextStep } =
    useMultiStepForm([
      <JobInfoForm
        key="jobInfoForm"
        {...formData}
        updateForm={updateForm}
        setIsFormValid={setIsCurrentFormValid}
      />,
      <MaterialForm key="materialForm" {...formData} updateForm={updateForm} />,
      <PrintingForm key="printingForm" {...formData} updateForm={updateForm} />,
      <NotesForm key="notesForm" {...formData} updateForm={updateForm} />,
      <FinalCheckForm key="finalCheckForm" {...formData} />,
    ]);

  function updateForm(fields: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLastStep) return nextStep();

    if (isLastStep) {
      setIsLoading(true);

      const endpoint =
        "https://next-form-app-backend-26d460c2dfaa.herokuapp.com/submit-form";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit data");
        }

        // On success, reset form (optional) and redirect to home
        setFormData(INITIAL_FORM_DATA);
        setIsLoading(false);
        window.location.href = "/"; // Redirect to home page
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
        alert("Form data submission failed, please try again.");
      }
    } else {
      if (isCurrentFormValid) {
        nextStep();
      } else {
        alert("Please fill in the form correctly before proceeding.");
      }
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-white border border-black border-2 w-[25rem] min-h-[30rem] max-h-[45rem] h-auto rounded-lg p-2">
        <h1 className="w-full text-black text-center font-bold text-3xl p-2">
          Box Design Form
        </h1>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <p className="bg-gray-100 rounded-md w-80 text-gray-500 text-md p-3 text-justify">
              {isLastStep ? "Please make sure you have enter the correct information." : "Please complete the form below and move to next step." }
            </p>
            <form onSubmit={onSubmit}>
              <div className="text-center w-full p-2">
                Page {currStep + 1} of {steps.length}
              </div>
              {step}
              <div className="w-full flex flex-row justify-around items-center mt-2 mb-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-40 p-2 m-2 bg-dark-blue text-white rounded-lg hover:bg-blue-700"
                  >
                    Prev
                  </button>
                )}
                <button
                  type="submit"
                  className="w-40 p-2 m-2 bg-dark-blue text-white rounded-lg hover:bg-blue-700"
                >
                  {isLastStep ? "Finish" : "Next"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
