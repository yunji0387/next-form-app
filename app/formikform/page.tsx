"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { JobInfoForm } from "./JobInfoForm";
import { MaterialForm } from "./MaterialForm";
import { PrintingForm } from "./PrintingForm";
import { NotesForm } from "./NotesForm";
import { useMultiStepForm } from "../hooks/useMutiStepForm";

type FormData = {
  jobName: string;
  customerName: string;
  materialID: string[];
  materialName: string[];
  printType: string;
  printCustomerName: boolean;
  printCustomText: boolean;
  customText: string;
  designNotes: string;
  finalCheck: boolean;
};

const INITIAL_FORM_DATA: FormData = {
  jobName: "",
  customerName: "",
  materialID: [""],
  materialName: [""],
  printType: "",
  printCustomerName: false,
  printCustomText: false,
  customText: "",
  designNotes: "",
  finalCheck: false,
};

export default function BoxDesignForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState<boolean>(false);

  //------------------
  // Add a new state to keep track of the validation status of the current form
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Function to be called by the child component to update validation status
  const handleValidationUpdate = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  // Modify the onSubmit function
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormValid) {
      alert("Please fill in the form correctly before proceeding.");
      return;
    }

    if (!isLastStep) {
      nextStep();
    } else {
      // Final submission logic
      alert("Successfully Account Creation.");
    }
  }
  //------------------

  const { steps, currStep, step, isFirstStep, isLastStep, prevStep, nextStep } =
    useMultiStepForm([
      <JobInfoForm key="jobInfoForm" {...formData} updateForm={updateForm} onValidate={handleValidationUpdate} />,
      <MaterialForm key="materialForm" {...formData} updateForm={updateForm} />,
      <PrintingForm key="printingForm" {...formData} updateForm={updateForm} />,
      <NotesForm key="notesForm" {...formData} updateForm={updateForm} />,
    ]);

  const formik = useFormik({
    initialValues: {
      jobName: formData.jobName,
      customerName: formData.customerName,
      materialID: formData.materialID,
      materialName: formData.materialName,
      printType: formData.printType,
      printCustomerName: formData.printCustomerName,
      printCustomText: formData.printCustomText,
      customText: formData.customText,
      designNotes: formData.designNotes,
      finalCheck: formData.finalCheck,
    },
    validationSchema: Yup.object({
      jobName: Yup.string()
        .required("Job Name is required")
        .min(3, "Job Name must be at least 3 characters"),
      customerName: Yup.string().required("Customer Name is required"),
      printType: Yup.string().required("Print Type is required"),
    }),
    onSubmit: (values) => {
      updateForm(values);
    },
  });

  function updateForm(fields: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  // function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   if (!isLastStep) return nextStep();
  //   alert("Successfully Account Creation.");
  //   if (isLastStep) {
  //     // Form submission logic here
  //     alert("Successfully Account Creation.");
  //   } else {
  //     if (isCurrentFormValid) {
  //       nextStep();
  //     } else {
  //       alert("Please fill in the form correctly before proceeding.");
  //     }
  //   }
  // }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-around bg-white w-[25rem] min-h-[30rem] max-h-[45rem] h-auto rounded-lg p-2">
        <h1 className="w-full text-black text-center font-bold text-3xl bg-lime-100 p-2">
          Box Design Form
        </h1>
        <p className="w-full text-black text-md p-3 text-justify bg-pink-100">
          Please complete the form below and move to next step.
        </p>
        <form onSubmit={onSubmit}>
          <div className="text-center bg-cyan-100 w-full p-2">
            {currStep + 1} / {steps.length}
          </div>
          {step}
          <div className="w-96 flex flex-row justify-around items-center mt-2">
            {!isFirstStep && (
              <button
                type="button"
                onClick={prevStep}
                className="w-40 p-2 bg-dark-blue text-white rounded-lg"
              >
                Prev
              </button>
            )}
            <button
              type="submit"
              className="w-40 p-2 bg-dark-blue text-white rounded-lg"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { JobInfoForm } from "./JobInfoForm";
// import { MaterialForm } from "./MaterialForm";
// import { PrintingForm } from "./PrintingForm";
// import { NotesForm } from "./NotesForm";
// import { useMultiStepForm } from "../hooks/useMutiStepForm";

// type FormData = {
//   jobName: string;
//   customerName: string;
//   materialID: string[];
//   materialName: string[];
//   printType: string;
//   printCustomerName: boolean;
//   printCustomText: boolean;
//   customText: string;
//   designNotes: string;
//   finalCheck: boolean;
// };

// const INITIAL_FORM_DATA: FormData = {
//   jobName: "",
//   customerName: "",
//   materialID: [""],
//   materialName: [""],
//   printType: "",
//   printCustomerName: false,
//   printCustomText: false,
//   customText: "",
//   designNotes: "",
//   finalCheck: false,
// };

// export default function BoxDesignForm() {
//   const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
//   const [isCurrentFormValid, setIsCurrentFormValid] = useState<boolean>(false);
//   const { steps, currStep, step, isFirstStep, isLastStep, prevStep, nextStep } =
//     useMultiStepForm([
//       <JobInfoForm key="jobInfoForm" {...formData} updateForm={updateForm} />,
//       <MaterialForm key="materialForm" {...formData} updateForm={updateForm} />,
//       <PrintingForm key="printingForm" {...formData} updateForm={updateForm} />,
//       <NotesForm key="notesForm" {...formData} updateForm={updateForm} />,
//     ]);

//   const formik = useFormik({
//     initialValues: {
//       jobName: formData.jobName,
//       customerName: formData.customerName,
//       materialID: formData.materialID,
//       materialName: formData.materialName,
//       printType: formData.printType,
//       printCustomerName: formData.printCustomerName,
//       printCustomText: formData.printCustomText,
//       customText: formData.customText,
//       designNotes: formData.designNotes,
//       finalCheck: formData.finalCheck,
//     },
//     validationSchema: Yup.object({
//       jobName: Yup.string()
//         .required("Job Name is required")
//         .min(3, "Job Name must be at least 3 characters"),
//       customerName: Yup.string().required("Customer Name is required"),
//       printType: Yup.string().required("Print Type is required"),
//     }),
//     onSubmit: (values) => {
//       updateForm(values);
//     },
//   });

//   function updateForm(fields: Partial<FormData>) {
//     setFormData((prev) => ({ ...prev, ...fields }));
//   }

//   function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     if (!isLastStep) return nextStep();
//     alert("Successfully Account Creation.");
//     if (isLastStep) {
//       // Form submission logic here
//       alert("Successfully Account Creation.");
//     } else {
//       if (isCurrentFormValid) {
//         nextStep();
//       } else {
//         alert("Please fill in the form correctly before proceeding.");
//       }
//     }
//   }
//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="flex flex-col items-center justify-around bg-white w-[25rem] min-h-[30rem] max-h-[45rem] h-auto rounded-lg p-2">
//         <h1 className="w-full text-black text-center font-bold text-3xl bg-lime-100 p-2">
//           Box Design Form
//         </h1>
//         <p className="w-full text-black text-md p-3 text-justify bg-pink-100">
//           Please complete the form below and move to next step.
//         </p>
//         <form onSubmit={onSubmit}>
//           <div className="text-center bg-cyan-100 w-full p-2">
//             {currStep + 1} / {steps.length}
//           </div>
//           {step}
//           <div className="w-96 flex flex-row justify-around items-center mt-2">
//             {!isFirstStep && (
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="w-40 p-2 bg-dark-blue text-white rounded-lg"
//               >
//                 Prev
//               </button>
//             )}
//             <button
//               type="submit"
//               className="w-40 p-2 bg-dark-blue text-white rounded-lg"
//             >
//               {isLastStep ? "Finish" : "Next"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
