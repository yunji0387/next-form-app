import React, { useState } from "react";
import { useForm } from "react-hook-form";

const JobInfoForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // console.log(JSON.stringify(data));
    console.log(data);
  };

  // const [jobName, setJobName] = useState('');
  // const [customerName, setCustomerName] = useState('');

  // const handleJobNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setJobName(event.target.value);
  // };

  // const handleCustomerNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     setCustomerName(event.target.value);
  // };

  // const handleSubmit = () => {
  //     const formData = {
  //         jobName: jobName,
  //         customerName: customerName
  //     };
  //     console.log(JSON.stringify(formData));
  // };

  return (
    <div className="flex flex-col justify-center items-center bg-cyan-200 p-5 pt-2 space-y-2">
      <p className="text-black text-md">
        Please complete the form below and move to next step.
      </p>
      <h2 className="text-black text-center font-bold text-xl p-1">Job Info</h2>

      {/* <div className="w-80 flex flex-col justify-center">
                <label htmlFor="jobName" className='text-black text-left w-full'>Job Name:</label>
                <input type="text" id="jobName" value={jobName} onChange={handleJobNameChange} className='w-80 border border-black bg-light-gray text-black p-1 pl-2' />
            </div> */}
      <div className="w-80 flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="jobName" className="text-black text-left w-full">
            Job Name:
          </label>
          <input
            {...register("jobName", { required: true })}
            type="text"
            id="jobName"
            className="w-80 border border-black bg-light-gray text-black p-1 pl-2"
          />
          {errors.jobName && <p>This field is required</p>}
          {/* Add other form fields similarly */}
          {/* <input type="submit" /> */}

          <label htmlFor="customerName" className="text-black text-left w-full">
            Customer Name:
          </label>
          <select
            id="customerName"
            // value={customerName}
            // onChange={handleCustomerNameChange}
            className="w-80 p-1 border border-black bg-light-gray text-black"
          >
            <option value="customer1">Customer 1</option>
            <option value="customer2">Customer 2</option>
            <option value="customer3">Customer 3</option>
          </select>

          <button type="submit" className="w-80 p-2 bg-blue-500 text-white">
            Submit
          </button>
        </form>
      </div>

      {/* <div className="w-80 flex flex-col justify-center">
                <label htmlFor="customerName" className='text-black text-left w-full'>Customer Name:</label>
                <select id="customerName" value={customerName} onChange={handleCustomerNameChange} className='w-80 p-1 border border-black bg-light-gray text-black'>
                    <option value="customer1">Customer 1</option>
                    <option value="customer2">Customer 2</option>
                    <option value="customer3">Customer 3</option>
                </select>
            </div> */}

      {/* <button onClick={handleSubmit} className='w-80 p-2 bg-blue-500 text-white'>Submit</button> */}
    </div>
  );
};

export default JobInfoForm;
