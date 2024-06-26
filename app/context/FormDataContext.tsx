"use client";
// context/FormDataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { FormData } from "../types/FormDataTypes";

type FormDataContextType = {
  currentFormData: FormData | null;
  setCurrentFormData: (formData: FormData | null) => void;
};

const defaultState: FormDataContextType = {
  currentFormData: null,
  setCurrentFormData: () => {},
};

const FormDataContext = createContext<FormDataContextType>(defaultState);

type FormDataProviderProps = {
  children: ReactNode;
};

export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [currentFormData, setCurrentFormData] = useState<null | FormData>(null);
  return (
    <FormDataContext.Provider value={{ currentFormData, setCurrentFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);