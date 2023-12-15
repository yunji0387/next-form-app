import React, { useState } from 'react';

export function PrintingForm() {
  const [isCustomTextEnabled, setIsCustomTextEnabled] = useState(false);
  const [customText, setCustomText] = useState('');

  const handleCustomTextCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomTextEnabled(event.target.checked);
  };

  const handleCustomTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomText(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-cyan-200 p-5 pt-2 space-y-2">
      <h2 className="text-black text-center font-bold text-xl p-1">Printing</h2>
      <div className="w-80 h-80 flex flex-col justify-center gap-5">
        <label htmlFor="printType" className="text-black text-left w-full">
          Print Type:
        {/* </label> */}
        <select
          id="customerName"
          //   value={}
          //   onChange={}
          className="w-80 p-1 border border-black bg-light-gray text-black"
        >
          <option value="printType1">Print Type 1</option>
          <option value="printType2">Print Type 2</option>
          <option value="printType3">Print Type 3</option>
        </select>
        </label>

        <label
          htmlFor="printCustomerName"
          className="text-black text-left w-full"
        >
          <input
            type="checkbox"
            id="printCustomerName"
            // value={}
            //   onChange={}
            className="mr-2 border border-blue bg-light-gray text-black p-1 pl-2"
          />
          Print Customer Name:
        </label>

        <label htmlFor="printCustomText" className="text-black text-left w-full">
          <input
            type="checkbox"
            id="printCustomText"
            checked={isCustomTextEnabled}
            onChange={handleCustomTextCheckboxChange}
            className="mr-2 border border-blue bg-light-gray text-black p-1 pl-2"
          />
          Print Custom Text:
        </label>
        {isCustomTextEnabled && (
          <input
            type="text"
            value={customText}
            onChange={handleCustomTextInputChange}
            placeholder="Enter custom text"
            className="w-80 p-1 border border-black bg-light-gray text-black"
          />
        )}
      </div>
    </div>
  );
}
