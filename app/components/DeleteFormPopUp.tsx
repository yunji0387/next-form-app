import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DeleteFormPopUpProps = {
  formId: number;
  onClose: () => void;
  setIsDeleted: (deleted: boolean) => void;
};

const deleteForm = async (
  formId: number,
  onClose: () => void,
  setIsDeleted: (deleted: boolean) => void
) => {
  const endpoint = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL + "/" + formId;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete form: ${response.statusText}`);
    }
    toast.success("Form deleted successfully.");
    setIsDeleted(true);
    onClose(); // Close the popup after successful deletion
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to delete the form, please try again.");
  }
};

export default function DeleteFormPopUp({
  formId,
  onClose,
  setIsDeleted,
}: DeleteFormPopUpProps) {
  return (
    <div className="bg-white dark:bg-gray-600 flex flex-col justify-center items-center mt-3 p-3 cursor-auto select-none rounded">
      <p className="text-sm sm:text-base font-medium">Confirm Deletion</p>
      <p className="text-sm sm:text-base font-bold">Form ID: {formId}</p>
      <p className="text-sm sm:text-base">
        Are you sure you want to delete this form?
      </p>
      <div className="flex gap-2 w-full max-w-[20rem] items-center justify-around p-3">
        <button
          onClick={onClose}
          className="w-[5rem] font-semibold text-indigo-800 dark:text-emerald-50 bg-indigo-200 hover:bg-indigo-300 dark:bg-emerald-500 dark:hover:bg-emerald-400 rounded"
        >
          Cancel
        </button>
        <button
          className="w-[5rem] font-semibold bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={() => deleteForm(formId, onClose, setIsDeleted)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
