type DesignNotesData = {
  designNotes: string;
};

type DesignNotesFormProps = DesignNotesData & {
  updateForm: (fields: Partial<DesignNotesData>) => void;
};

export function NotesForm({ designNotes, updateForm }: DesignNotesFormProps) {
  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">Notes</h2>

      <div className="w-80 flex flex-col justify-center">
        <label htmlFor="designNotes" className="text-black text-left w-full">
          Design Notes:
        </label>

        <div className="w-80 max-h-[22rem] overflow-auto pr-1">
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
