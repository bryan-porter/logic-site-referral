import { createContext, useContext, useState, ReactNode } from "react";

interface FormValues {
  name: string;
  email: string;
  currentRole: string;
  region: string;
  relationships: string;
  focus: string;
  availability: string;
}

const defaultValues: FormValues = {
  name: "",
  email: "",
  currentRole: "",
  region: "",
  relationships: "",
  focus: "",
  availability: "",
};

interface FormStateContextType {
  formValues: FormValues;
  setFormValues: (values: FormValues) => void;
  updateField: (field: keyof FormValues, value: string) => void;
  clearForm: () => void;
}

const FormStateContext = createContext<FormStateContextType | undefined>(undefined);

interface FormStateProviderProps {
  children: ReactNode;
}

/**
 * Provider to persist form state across takeover open/close.
 * Form data is preserved when user closes the takeover and restored when they reopen it.
 */
export function FormStateProvider({ children }: FormStateProviderProps) {
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);

  const updateField = (field: keyof FormValues, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormValues(defaultValues);
  };

  return (
    <FormStateContext.Provider value={{ formValues, setFormValues, updateField, clearForm }}>
      {children}
    </FormStateContext.Provider>
  );
}

export function useFormState() {
  const context = useContext(FormStateContext);
  if (context === undefined) {
    throw new Error("useFormState must be used within a FormStateProvider");
  }
  return context;
}
