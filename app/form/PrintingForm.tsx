import React, { useState } from "react";

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
  const [isCustomTextEnabled, setIsCustomTextEnabled] = useState(printCustomText);
  const [customTextField, setCustomTextField] = useState(customText);

  // Handle change for the 'Print Customer Name' checkbox
  const handlePrintCustomerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ printCustomerName: event.target.checked });
  };

  // Handle change for the 'Print Custom Text' checkbox
  const handleCustomTextCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsCustomTextEnabled(checked);
    updateForm({ printCustomText: checked });
    // If the checkbox is unchecked, also clear the custom text field
    if (!checked) {
      setCustomTextField('');
      updateForm({ customText: '' });
    }
  };

  // Handle change for the custom text input field
  const handleCustomTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setCustomTextField(text);
    updateForm({ customText: text });
  };

  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">Printing</h2>
      <div className="w-80 flex flex-col justify-center gap-5">
        <label htmlFor="printType" className="text-black text-left w-full">
          Print Type:
          <select
            id="printType"
            value={printType}
            onChange={(e) => updateForm({ printType: e.target.value })}
            className="custom-form-text-field"
          >
            <option value="emptyCustomer">Please select an option.</option>
            <option value="printType1">Print Type 1</option>
            <option value="printType2">Print Type 2</option>
            <option value="printType3">Print Type 3</option>
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

        <label htmlFor="printCustomText" className="text-black text-left w-full">
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
            className={`w-80 p-1 pl-2 border ${isCustomTextEnabled ? "custom-form-text-field" : "bg-gray-200"} text-black`}
            disabled={!isCustomTextEnabled}
          />
        </label>
      </div>
    </div>
  );
}
