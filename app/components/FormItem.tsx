"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteFormPopUp from "./DeleteFormPopUp";
import { useFormData } from "../context/FormDataContext";

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
  formId: number;
  _id?: string;
  __v?: number;
};

type FormItemProps = {
  formData: FormData;
};

export default function FormItem({ formData }: FormItemProps) {
  const {
    jobName,
    customerName,
    materialID,
    materialName,
    printType,
    printCustomerName,
    printCustomText,
    customText,
    designNotes,
    formId,
    _id,
    __v,
  } = formData;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { currentFormData, setCurrentFormData } = useFormData();
  const router = useRouter();

  const handleEdit = () => {
    // console.log(
    //   "Before setting current form data (FormItem):",
    //   formData
    // );
    // setCurrentFormData(formData); // Set the current form data to be edited
    // console.log("After setting current form data (FormItem):", currentFormData);

    const { _id, __v, ...rest } = formData; // Destructure to exclude _id and __v
    setCurrentFormData(rest);
  }

  useEffect(() => {
    // console.log(
    //   "Checking if currentFormData is set in useEffect",
    //   currentFormData
    // );
    if (currentFormData?.formId === formData.formId) {
      // console.log("Current form data exists, navigating to /form");
      router.push("/form"); // Perform navigation once the context data is updated
    }
  }, [currentFormData, router]);

  return (
    <div className={`${isDeleted ? "hidden" : "flex flex-col"} w-full`}>
      <div
        className="w-full flex flex-col bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between h-6">
          <p className="w-1/2 text-sm">
            <span className="font-bold">Form ID:</span> {formId}
          </p>
          <div className="hidden group-hover:flex w-1/3 justify-end gap-2 select-none">
            <button
              className="bg-gray-100 hover:bg-white w-[40%] min-w-fit max-w-[4rem] h-6 text-xs text-gray-800 border border-gray-700 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              Edit
            </button>
            <button
              className="bg-gray-100 hover:bg-white w-[40%] min-w-fit max-w-[4rem] h-6 text-xs text-gray-800 border border-gray-700 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
            <button
              className="bg-gray-100 hover:bg-white w-[40%] min-w-fit max-w-[4rem] h-6 text-xs text-gray-800 border border-gray-700 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeletePopup(true);
                setIsExpanded(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-sm">
          <span className="font-bold">Job Name:</span> {jobName}
        </p>
        <p className="text-sm">
          <span className="font-bold">Customer Name:</span> {customerName}
        </p>

        {isExpanded && (
          <>
            <p className="text-sm">
              <span className="font-bold">Material IDs:</span>{" "}
              {materialID.join(", ")}
            </p>
            <p className="text-sm">
              <span className="font-bold">Material Names:</span>{" "}
              {materialName.join(", ")}
            </p>
            <p className="text-sm">
              <span className="font-bold">Print Type:</span> {printType}
            </p>
            <p className="text-sm">
              <span className="font-bold">Print Customer Name:</span>{" "}
              {printCustomerName ? "Yes" : "No"}
            </p>
            <p className="text-sm">
              <span className="font-bold">Print Custom Text:</span>{" "}
              {printCustomText ? "Yes" : "No"}
            </p>
            <p className="text-sm">
              <span className="font-bold">Custom Text:</span> {customText}
            </p>
            <p className="text-sm">
              <span className="font-bold">Design Notes:</span> {designNotes}
            </p>
          </>
        )}
      </div>
      <div className="w-full bg-gray-100 p-1">
        {showDeletePopup && (
          <DeleteFormPopUp
            formId={formData.formId}
            onClose={() => setShowDeletePopup(false)}
            setIsDeleted={setIsDeleted}
          />
        )}
      </div>
    </div>
  );
}
