type FinalFormDataProps = {
  jobName: string;
  customerName: string;
  materialID: string[];
  materialName: string[];
  printType: string;
  printCustomerName: boolean;
  printCustomText: boolean;
  customText: string;
  designNotes: string;
};

export function FinalCheckForm(props: FinalFormDataProps) {
  // Convert the props object into an array of key-value pairs
  const formDataEntries = Object.entries(props);

  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">
        Form Final Check
      </h2>

      <div className="w-full bg-gray-100 flex flex-col max-h-[22rem] overflow-auto pr-1">
        {formDataEntries.map(([key, value], index) => {
          // Check if the value is an array to handle it differently
          let displayValue = Array.isArray(value)
            ? value.join(", ")
            : value.toString();

          // Replace camelCase keys with space-separated words for display
          let displayKey = key
            .replace(/(?<![A-Z])([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

          return (
            <div key={index} className="flex flex-row justify-between items-center p-2">
              <p className="w-[40%] text-sm">{displayKey}:</p>
              <div className="w-[60%] p-3 bg-gray-200 rounded-md">
                <p className="text-sm text-justify">
                  {displayValue}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export function FinalCheckForm({
//   jobName,
//   customerName,
//   materialID,
//   materialName,
//   printType,
//   printCustomerName,
//   printCustomText,
//   customText,
//   designNotes,
// }: FinalFormDataProps) {
//   return (
//     <div className="custom-form-container">
//       <h2 className="text-black text-center font-bold text-xl p-1">
//         Form Final Check
//       </h2>

//       <div className="w-full bg-gray-100 flex flex-col">
//         <div className="flex flex-row justify-between">
//              {/* map function here */}
//           <p className="bg-cyan-100">Job Name</p>
//           <p className="bg-pink-100">{jobName}</p>
//         </div>
//         {/* <p>Customer Name: {customerName}</p>
//         <p>Material ID: {materialID}</p>
//         <p>Material Name: {materialName}</p>
//         <p>Print Type: {printType}</p>
//         <p>Print Customer Name: {printCustomerName}</p>
//         <p>Print Custom Text: {printCustomText}</p>
//         <p>Custom Text: {customText}</p>
//         <p>Design Notes: {designNotes}</p> */}
//       </div>
//     </div>
//   );
// }
