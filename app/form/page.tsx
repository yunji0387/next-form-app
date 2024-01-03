"use client";
import React, { useState } from "react";
import { JobInfoForm } from "./JobInfoForm";
import { MaterialForm } from "./MaterialForm";
import { PrintingForm } from "./PrintingForm";
import { NotesForm } from "./NotesForm";
import { FinalCheckForm } from "./FinalCheckForm";
import { useMultiStepForm } from "../hooks/useMutiStepForm";
import { LoadingScreen } from "../components/LoadingScreen";
import { SubmissionErrorContent } from "../components/SubmissionErrorContent";
import { SubmissionSuccessContent } from "../components/SubmissionSuccessContent";
import { StepsIndication } from "./StepsIndication";

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
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

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

  const backToHomePage = () => {
    window.location.href = "/";
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLastStep) return nextStep();

    if (isLastStep) {
      setIsEditing(false);
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

        setFormData(INITIAL_FORM_DATA); //reset form data
        setIsLoading(false);
        setSubmitSuccess(true);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
        setSubmitError(true);
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
      <div className="flex flex-col items-center bg-white border-black border-2 w-[25rem] md:w-[35rem] min-h-[30rem] max-h-[45rem] h-auto rounded-lg p-2">
        <h1 className="w-full text-black text-center font-extrabold text-3xl p-2">
          Box Design Form
        </h1>
        {isEditing && (
          <>
            <StepsIndication
              currentStep={currStep + 1}
              totalSteps={steps.length}
            />
            <p className="bg-gray-100 rounded-md text-gray-500 text-sm md:text-base mt-2 p-2 text-center w-[85%]">
              {isLastStep
                ? "Please make sure you have enter the correct information."
                : "Please complete the form below and move to next step."}
            </p>
            <form className="flex flex-col justify-center items-center w-full" onSubmit={onSubmit}>
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
        {isLoading && <LoadingScreen text="Submitting Form..." />}
        {submitError && (
          <SubmissionErrorContent
            headerText="Submission Error"
            contentText="An error occurred while submitting your form data. Please try again."
            onRetry={() => {
              setSubmitError(false);
              setIsEditing(true);
            }}
          />
        )}
        {submitSuccess && (
          <SubmissionSuccessContent
            headerText="Submission Successful!"
            contentText="Your form data has been successfully submitted."
            onBackToHome={backToHomePage}
          />
        )}
      </div>
    </div>
  );
}
