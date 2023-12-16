export function NotesForm() {
    return (
        <div className="custom-form-container">
            <h2 className="text-black text-center font-bold text-xl p-1">Notes</h2>

            <div className="w-80 flex flex-col justify-center">
                <label htmlFor="designNotes" className="text-black text-left w-full">
                    Design Notes:
                </label>

                <div className="w-80 border border-black bg-light-gray text-black p-1 max-h-[25rem] overflow-auto">
                    <textarea
                        id="designNotes"
                        //   value={}
                        //   onChange={}
                        placeholder="Write your design notes here..."
                        className="w-full h-full p-2 mt-1"
                    />
                </div>
            </div>
        </div>
    );
}
