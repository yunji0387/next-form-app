import React, { useState } from "react";

type JobInfoData = {
  jobName: string;
  customerName: string;
};

type JobInfoFormProps = JobInfoData & {
  updateForm: (fields: Partial<JobInfoData>) => void;
  onValidate: (isValid: boolean) => void;
};

export function JobInfoForm({
  jobName,
  customerName,
  updateForm,
  onValidate,
}: JobInfoFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    jobName: null,
    customerName: null,
  });

  const validate = () => {
    let newErrors = { ...errors };
    if (!jobName) {
      newErrors.jobName = "Job Name is required";
    } else {
      newErrors.jobName = null;
    }

    if (!customerName) {
      newErrors.customerName = "Customer Name is required";
    } else {
      newErrors.customerName = null;
    }

    setErrors(newErrors);

    // Call the onValidate prop with the validation result
    onValidate(!Object.values(newErrors).some((error) => error != null));

    // Return true if there are no errors
    // return !Object.values(newErrors).some((error) => error != null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateForm({ [e.target.name]: e.target.value });
    // Optionally validate on change
    validate();
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
          name="jobName"
          value={jobName}
          onChange={handleInputChange}
          placeholder="Enter job name..."
          className={`custom-form-text-field ${errors.jobName ? "border-red-500" : ""}`}
        />
        {errors.jobName && <p className="text-red-500">{errors.jobName}</p>}
      </div>

      <div className="w-80 flex flex-col justify-center">
        <label htmlFor="customerName" className="text-black text-left w-full">
          Customer Name:
        </label>
        <select
          id="customerName"
          name="customerName"
          value={customerName}
          onChange={handleInputChange}
          className={`custom-form-text-field ${errors.customerName ? "border-red-500" : ""}`}
        >
          <option value="">Please select an option.</option>
          <option value="customer1">Customer 1</option>
          <option value="customer2">Customer 2</option>
          <option value="customer3">Customer 3</option>
        </select>
        {errors.customerName && <p className="text-red-500">{errors.customerName}</p>}
      </div>
    </div>
  );
}


// // JobInfoForm.tsx
// import React from "react";

// type JobInfoData = {
//   jobName: string;
//   customerName: string;
// };

// type JobInfoFormProps = JobInfoData & {
//   updateForm: (fields: Partial<JobInfoData>) => void;
// };

// export function JobInfoForm({
//   jobName,
//   customerName,
//   updateForm,
// }: JobInfoFormProps) {
//   return (
//     <div className="custom-form-container">
//       <h2 className="text-black text-center font-bold text-xl p-1">Job Info</h2>

//       <div className="w-80 flex flex-col justify-center">
//         <label htmlFor="jobName" className="text-black text-left w-full">
//           Job Name:
//         </label>
//         <input
//           type="text"
//           id="jobName"
//           name="jobName"
//           value={jobName}
//           onChange={(e) => updateForm({ jobName: e.target.value })}
//           placeholder="Enter job name..."
//           className="custom-form-text-field"
//         />
//       </div>

//       <div className="w-80 flex flex-col justify-center">
//         <label htmlFor="customerName" className="text-black text-left w-full">
//           Customer Name:
//         </label>
//         <select
//           id="customerName"
//           name="customerName"
//           value={customerName}
//           onChange={(e) => updateForm({ customerName: e.target.value })}
//           className="custom-form-text-field"
//         >
//           <option value="">Please select an option.</option>
//           <option value="customer1">Customer 1</option>
//           <option value="customer2">Customer 2</option>
//           <option value="customer3">Customer 3</option>
//         </select>
//       </div>
//     </div>
//   );
// }