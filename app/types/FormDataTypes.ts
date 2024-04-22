// types/FormDataTypes.ts
export type FormData = {
    jobName: string;
    customerName: string;
    materialID: string[];
    materialName: string[];
    printType: string;
    printCustomerName: boolean;
    printCustomText: boolean;
    customText: string;
    designNotes: string;
    formId: number;
  };