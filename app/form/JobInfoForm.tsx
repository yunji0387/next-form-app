import React from "react";

const customerNames = [
  "Acme Corporation",
  "Globex Industries",
  "Soylent Corp",
  "Initech",
  "Vandelay Industries",
];


type JobInfoData = {
  jobName: string;
  customerName: string;
};

type JobInfoFormProps = JobInfoData & {
  updateForm: (fields: Partial<JobInfoData>) => void;
};

export function JobInfoForm({
  jobName,
  customerName,
  updateForm,
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
  };

  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">Job Info</h2>

      <div className="w-full flex flex-col justify-center">
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

      <div className="w-full flex flex-col justify-center">
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
          {customerNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
