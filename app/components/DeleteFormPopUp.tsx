import React from "react";

type DeleteFormPopUpProps = {
  formId: number;
  onClose: () => void;
};

export default function DeleteFormPopUp({
  formId,
  onClose,
}: DeleteFormPopUpProps) {
  return (
    <div className="bg-white w-full flex flex-col justify-center items-center m-3 p-3 cursor-auto">
      <p>Confirm Deletion (Form ID: {formId})</p>
      <p>Are you sure you want to delete this form?</p>
      <div className="flex w-3/4 items-center justify-around p-3">
        <button
          onClick={onClose}
          className="w-1/4 bg-gray-100 border border-gray-700 rounded"
        >
          Cancel
        </button>
        <button
          className="w-1/4 bg-red-500 text-white rounded"
          onClick={() => {
            // Assuming delete logic or function call here
            console.log(`Deleting form with ID ${formId}`);
            onClose(); // close the popup after deletion
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
