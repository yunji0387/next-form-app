import ClipLoader from "react-spinners/ClipLoader";

type LoadingScreenProps = {
  text: string;
  color?: string;
};

export function LoadingScreen({ text, color }: LoadingScreenProps) {
  return (
    <div className="w-full h-[25rem] p-5 flex flex-col items-center justify-center">
      <p className="text-2xl font-extrabold mb-5">{text}</p>
      <ClipLoader
        size={150}
        color={ color ? color : "#123abc"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}