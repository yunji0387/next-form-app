// "use client";
// import React, { useState } from 'react';

// // Define a type for the customer data if needed
// type Customer = {
//     id: number;
//     name: string;
// };

// const Form: React.FC = () => {
//     const [jobName, setJobName] = useState<string>('');
//     const [customerName, setCustomerName] = useState<string>('');

//     // Replace this with real data and adjust the type accordingly
//     const customers: Customer[] = [
//         { id: 1, name: 'Customer 1' },
//         { id: 2, name: 'Customer 2' },
//         { id: 3, name: 'Customer 3' }
//     ];

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // Handle your form submission logic here
//         console.log({ jobName, customerName });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="jobName">Job Name:</label>
//                 <input
//                     type="text"
//                     id="jobName"
//                     value={jobName}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobName(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="customerName">Customer Name:</label>
//                 <select
//                     id="customerName"
//                     value={customerName}
//                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomerName(e.target.value)}
//                 >
//                     {customers.map(customer => (
//                         <option key={customer.id} value={customer.name}>
//                             {customer.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default Form;

"use client";
import React from "react";
import JobInfoForm from "./JobInfoForm";

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
        <button className="w-80 p-2 bg-dark-blue text-white rounded-lg">Next</button>
      </div>
    </div>
  );
};

export default Form;
