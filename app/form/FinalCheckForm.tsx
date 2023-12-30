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

  // Function to render Material IDs as a list
  const renderMaterialIDsList = (materialIDs: string[]) => {
    return (
      <ul className="list-disc list-inside">
        {materialIDs.map((id, index) => (
          <li key={index} className="text-sm">
            {id}
          </li>
        ))}
      </ul>
    );
  };

  // Function to render the Material Names as a list
  const renderMaterialNamesList = (materialNames: string[]) => {
    return (
      <ul className="list-disc list-inside">
        {materialNames.map((name, index) => (
          <li key={index} className="text-sm">
            {name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">
        Final Check
      </h2>

      <div className="w-80 bg-gray-100 flex flex-col max-h-[20rem] overflow-auto">
      {formDataEntries.map(([key, value], index) => {
          // Determine how to display the value based on its type
          const displayElement = Array.isArray(value)
            ? (key === 'materialName'
              ? renderMaterialNamesList(value) // Returns JSX.Element for names
              : renderMaterialIDsList(value))  // Returns JSX.Element for IDs
            : (typeof value === 'boolean' ? (value ? "Yes" : "No") : value.toString());
          // Replace camelCase keys with space-separated words for display
          let displayKey = key
            .replace(/(?<![A-Z])([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

          return (
            <div
              key={index}
              className="flex flex-row justify-between items-center p-2"
            >
              <p className="w-[40%] text-sm">{displayKey}:</p>
              <div className="w-[60%] p-3 bg-gray-200 rounded-md overflow-y-auto horizontal-scrollbar">
                {typeof displayElement === 'string'
                  ? <p className="text-sm text-justify">{displayElement}</p>
                  : displayElement // This will be the JSX element for the list
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
