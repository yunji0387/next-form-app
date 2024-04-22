import React, { useState } from "react";

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
  } = formData;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="flex mx-2 p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="w-[80%] flex flex-col pr-2">
        <p className="text-sm">
          <span className="font-bold">Form ID:</span> {formId}
        </p>
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
      <div className="hidden group-hover:flex w-1/4 justify-end">
        <button
          className="bg-gray-100 hover:bg-white w-[50%] h-6 text-xs text-gray-800 border border-gray-700 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        {/* <button
          className="bg-gray-100 hover:bg-white w-[30%] h-6 text-xs text-gray-800 border border-gray-700 rounded"
          onClick={(e) => {
            e.stopPropagation();
            // onEdit(formId);
          }}
        >
          Edit
        </button>
        <button
          className="bg-gray-100 hover:bg-white w-[30%] h-6 text-xs text-gray-800 border border-gray-700 rounded"
          onClick={(e) => {
            e.stopPropagation();
            // onDelete(formId);
          }}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
}