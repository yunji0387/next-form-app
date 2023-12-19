// Props type for SubmissionErrorContent
type SubmissionErrorProps = {
  onRetry: () => void;
  headerText: string;
  contentText: string;
};

export const SubmissionErrorContent = ({ onRetry, headerText, contentText }: SubmissionErrorProps) => (
  <div className="w-full h-[25rem] flex items-center justify-center">
    <div className="w-full h-full p-5 flex flex-col items-center justify-around">
      <h2 className="text-red-500 text-center font-bold text-2xl p-2">
        {headerText}
      </h2>
      <p className="text-gray-500 text-center text-md p-3">
        {contentText}
      </p>
      <button
        onClick={onRetry}
        className="w-40 p-2 m-2 bg-dark-blue text-white rounded-lg hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  </div>
);
