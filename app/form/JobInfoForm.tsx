export function JobInfoForm() {
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
          //   value={}
          //   onChange={}
          className="w-80 border border-black bg-light-gray text-black p-1 pl-2"
        />
      </div>

      <div className="w-80 flex flex-col justify-center">
        <label htmlFor="customerName" className="text-black text-left w-full">
          Customer Name:
        </label>
        <select
          id="customerName"
          //   value={}
          //   onChange={}
          className="w-80 p-1 border border-black bg-light-gray text-black"
        >
          <option value="customer1">Customer 1</option>
          <option value="customer2">Customer 2</option>
          <option value="customer3">Customer 3</option>
        </select>
      </div>
    </div>
  );
}
