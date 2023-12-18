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
  const onSelectInvalid = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value === "") {
      event.currentTarget.setCustomValidity("Please select a customer name");
    } else {
      event.currentTarget.setCustomValidity("");
    }
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.setCustomValidity("");
    updateForm({ customerName: event.target.value });

    // Ensure the form is not null before calling checkValidity
    if (event.currentTarget.form) {
      setIsFormValid(event.currentTarget.form.checkValidity());
    }
  };

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
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className="w-80 flex flex-col justify-center">
        <label htmlFor="customerName" className="text-black text-left w-full">
          Customer Name:
        </label>
        <select
          id="customerName"
          value={customerName}
          onChange={onSelectChange}
          onInvalid={onSelectInvalid}
          className="custom-form-text-field"
          required
        >
          <option value="">Please select an option.</option>
          <option value="customer1">Customer 1</option>
          <option value="customer2">Customer 2</option>
          <option value="customer3">Customer 3</option>
        </select>
      </div>
    </div>
  );
}
