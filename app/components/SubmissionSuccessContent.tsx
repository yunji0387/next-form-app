// Props type for SubmissionSuccessContent
type SubmissionSuccessProps = {
    onBackToHome: () => void;
    headerText: string;
    contentText: string;
  };

  export const SubmissionSuccessContent = ({ onBackToHome, headerText, contentText }: SubmissionSuccessProps) => (
    <div className="w-full h-[25rem] flex items-center justify-center">
      <div className="w-full h-full p-5 flex flex-col items-center justify-around">
        <h2 className="text-green-700 text-center font-bold text-2xl">
          {headerText}
        </h2>
        <p className="text-gray-500 text-center text-md p-5">
          {contentText}
        </p>
        <button
          onClick={onBackToHome}
          className="w-40 p-2 m-2 bg-dark-blue text-white rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
  