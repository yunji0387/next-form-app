import React from "react";

type JobInfoData = {
  jobName: string;
  customerName: string;
};

type JobInfoFormProps = JobInfoData & {
  updateForm: (fields: Partial<JobInfoData>) => void;
  setIsFormValid: (isValid: boolean) => void;
};

export function JobInfoForm({
  jobName,
  customerName,
  updateForm,
  setIsFormValid,
}: JobInfoFormProps) {
  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">Job Info</h2>

      <div className="w-80 flex flex-col justify-center">
        <label htmlFor="jobName" className="text-black text-left w-full">
          Job Name:
        </label>
        <input
          type="text"
          id="jobName"
          value={jobName}
          onChange={(e) => updateForm({ jobName: e.target.value })}
          placeholder="Enter job name..."
          className="custom-form-text-field"
        />
      </div>

      <div className="w-80 flex flex-col justify-center">
        <label htmlFor="customerName" className="text-black text-left w-full">
          Customer Name:
        </label>
        <select
          id="customerName"
          value={customerName}
          onChange={(e) => updateForm({ customerName: e.target.value })}
          className="custom-form-text-field"
        >
          <option value="emptyCustomer">Please select an option.</option>
          <option value="customer1">Customer 1</option>
          <option value="customer2">Customer 2</option>
          <option value="customer3">Customer 3</option>
        </select>
      </div>
    </div>
  );
}
