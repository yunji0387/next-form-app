import React from "react";

type DeleteFormPopUpProps = {
  formId: number;
  onClose: () => void;
  setIsDeleted: (deleted: boolean) => void;
};

const deleteForm = async (formId: number, onClose: () => void, setIsDeleted: (deleted: boolean) => void) => {
  const endpoint = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL + '/' + formId;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Failed to delete form: ${response.statusText}`);
    }

    alert('Form deleted successfully.');
    setIsDeleted(true);
    onClose(); // Close the popup after successful deletion
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to delete the form, please try again.');
  }
};

export default function DeleteFormPopUp({ formId, onClose, setIsDeleted  }: DeleteFormPopUpProps) {
  return (
    <div className="bg-white flex flex-col justify-center items-center m-3 p-3 cursor-auto select-none">
      <p>Confirm Deletion (Form ID: {formId})</p>
      <p>Are you sure you want to delete this form?</p>
      <div className="flex w-3/4 items-center justify-around p-3">
        <button
          onClick={onClose}
          className="w-1/4 bg-gray-100 hover:bg-gray-50 border border-gray-700 rounded"
        >
          Cancel
        </button>
        <button
          className="w-1/4 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={() => deleteForm(formId, onClose, setIsDeleted)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}