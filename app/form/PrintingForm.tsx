import React, { useState } from "react";

const printTypes = [
  "Offset Lithography",
  "Flexography",
  "Digital Printing",
  "Screen Printing",
  "Gravure Printing",
];

type PrintingData = {
  printType: string;
  printCustomerName: boolean;
  printCustomText: boolean;
  customText: string;
};

type PrintingFormProps = PrintingData & {
  updateForm: (fields: Partial<PrintingData>) => void;
};

export function PrintingForm({
  printType,
  printCustomerName,
  printCustomText,
  customText,
  updateForm,
}: PrintingFormProps) {
  const [isCustomTextEnabled, setIsCustomTextEnabled] =
    useState(printCustomText);
  const [customTextField, setCustomTextField] = useState(customText);

  // Handle change for the 'Print Customer Name' checkbox
  const handlePrintCustomerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateForm({ printCustomerName: event.target.checked });
  };

  // Handle change for the 'Print Custom Text' checkbox
  const handleCustomTextCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setIsCustomTextEnabled(checked);
    updateForm({ printCustomText: checked });
    // If the checkbox is unchecked, also clear the custom text field
    if (!checked) {
      setCustomTextField("");
      updateForm({ customText: "" });
    }
  };

  // Handler for Print Type dropdown
  const handlePrintTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.target.setCustomValidity("");
    updateForm({ printType: event.target.value });
  };

  const handleSelectInvalid = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value === "") {
      event.currentTarget.setCustomValidity("Please select a print type");
    } else {
      event.currentTarget.setCustomValidity("");
    }
  };

  // Handle change for the custom text input field
  const handleCustomTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;
    setCustomTextField(text);
    updateForm({ customText: text });
  };

  return (
    <div className="custom-form-container">
      <h2 className="text-center font-bold text-xl p-1">Printing</h2>
      <div className="w-full flex flex-col justify-center gap-5">
        <label htmlFor="printType" className="text-left w-full">
          Print Type:
          <select
            id="printType"
            value={printType}
            onChange={handlePrintTypeChange}
            onInvalid={handleSelectInvalid}
            className="custom-form-text-field"
            required
          >
            <option value="">Please select an option.</option>
            {printTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="printCustomerName" className="w-full">
          <input
            type="checkbox"
            id="printCustomerName"
            checked={printCustomerName}
            onChange={handlePrintCustomerNameChange}
            className="custom-form-checkbox mr-2"
          />
          Print Customer Name
        </label>

        <label
          htmlFor="printCustomText"
          className="text-left w-full"
        >
          <input
            type="checkbox"
            id="printCustomText"
            checked={isCustomTextEnabled}
            onChange={handleCustomTextCheckboxChange}
            className="custom-form-checkbox mr-2"
          />
          Print Custom Text:
          <input
            type="text"
            value={customTextField}
            onChange={handleCustomTextInputChange}
            placeholder={isCustomTextEnabled ? "Enter custom text..." : ""}
            className={`w-full p-1 pl-2 ${
              isCustomTextEnabled ? "custom-form-text-field" : ""
            }`}
            disabled={!isCustomTextEnabled}
          />
        </label>
      </div>
    </div>
  );
}
