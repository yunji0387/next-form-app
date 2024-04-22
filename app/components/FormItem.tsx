import React from "react";

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
  return (
    <div className="flex flex-col bg-gray-100 w-full p-2 m-2">
      <p className="text-sm">Form ID: {formId}</p>
      <p className="text-sm">Job Name: {jobName}</p>
      <p className="text-sm">Customer Name: {customerName}</p>
      <p className="text-sm">Material IDs: {materialID.join(", ")}</p>
      <p className="text-sm">Material Names: {materialName.join(", ")}</p>
      <p className="text-sm">Print Type: {printType}</p>
      <p className="text-sm">
        Print Customer Name: {printCustomerName ? "Yes" : "No"}
      </p>
      <p className="text-sm">
        Print Custom Text: {printCustomText ? "Yes" : "No"}
      </p>
      <p className="text-sm">Custom Text: {customText}</p>
      <p className="text-sm">Design Notes: {designNotes}</p>
    </div>
  );
}
