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
    <div className="flex flex-col bg-gray-100 p-3 m-2">
      <p className="text-sm"><span className="font-bold">Form ID:</span> {formId}</p>
      <p className="text-sm"><span className="font-bold">Job Name:</span> {jobName}</p>
      <p className="text-sm"><span className="font-bold">Customer Name:</span> {customerName}</p>
      <p className="text-sm"><span className="font-bold">Material IDs:</span> {materialID.join(", ")}</p>
      <p className="text-sm"><span className="font-bold">Material Names:</span> {materialName.join(", ")}</p>
      <p className="text-sm"><span className="font-bold">Print Type:</span> {printType}</p>
      <p className="text-sm">
      <span className="font-bold">Print Customer Name:</span> {printCustomerName ? "Yes" : "No"}
      </p>
      <p className="text-sm">
      <span className="font-bold">Print Custom Text:</span> {printCustomText ? "Yes" : "No"}
      </p>
      <p className="text-sm"><span className="font-bold">Custom Text:</span> {customText}</p>
      <p className="text-sm"><span className="font-bold">Design Notes:</span> {designNotes}</p>
    </div>
  );
}
