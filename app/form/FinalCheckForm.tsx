type FinalFormCheckProps = FormData & {
  updateForm: (fields: Partial<FormData>) => void;
};

export function FinalCheckForm({
  jobName,
  customerName,
  materialID,
  materialName,
  printType,
  printCustomerName,
  printCustomText,
  customText,
  designNotes,
  updateForm,
}: FinalFormCheckProps) {
  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">
        Form Final Check
      </h2>
    </div>
  );
}
