"use client";
import React from "react";
import JobInfoForm from "./JobInfoForm";
import MaterialForm from "./MaterialForm";

interface FormProps {
  // Define your component props here
}

const Form: React.FC<FormProps> = ({}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-around bg-white w-[25rem] min-h-[30rem] h-auto rounded-lg p-5">
        <h1 className="w-96 text-black text-center font-bold text-3xl bg-lime-100 rounded-lg p-2">
          Box Design Form
        </h1>
        <p className="w-90 text-black text-md p-3 text-justify bg-pink-100">
          Please complete the form below and move to next step.
        </p>
        <JobInfoForm />
        <MaterialForm />
        <button className="w-80 p-2 bg-dark-blue text-white rounded-lg">Next</button>
      </div>
    </div>
  );
};

export default Form;
