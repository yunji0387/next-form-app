export function NotesForm() {
    return (
        <div className="flex flex-col justify-center items-center bg-cyan-200 p-5 pt-2 space-y-2">
        <h2 className="text-black text-center font-bold text-xl p-1">Notes</h2>
    
        <div className="w-80 flex flex-col justify-center">
            <label htmlFor="designNotes" className="text-black text-left w-full">
            Design Notes:
            </label>
            <textarea
            id="designNotes"
            //   value={}
            //   onChange={}
            className="w-80 border border-black bg-light-gray text-black p-1 pl-2"
            />
        </div>
        </div>
    );
}