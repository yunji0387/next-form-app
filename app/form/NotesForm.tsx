type DesignNotesData = {
  designNotes: string;
};

type DesignNotesFormProps = DesignNotesData & {
  updateForm: (fields: Partial<DesignNotesData>) => void;
};

export function NotesForm({ designNotes, updateForm }: DesignNotesFormProps) {
  return (
    <div className="custom-form-container">
      <h2 className="text-center font-bold text-xl p-1">Notes</h2>

      <div className="w-full flex flex-col justify-center">
        <label htmlFor="designNotes" className="text-left w-full">
          Design Notes <span className="text-sm text-gray-600 dark:text-gray-300">(optional)</span>:
        </label>

        <div className="w-full max-h-[22rem] overflow-auto pr-1">
          <textarea
            id="designNotes"
            value={designNotes}
            onChange={e => updateForm({designNotes :  e.target.value})}
            placeholder="Write your design notes here..."
            className="custom-form-text-area"
          />
        </div>
      </div>
    </div>
  );
}
