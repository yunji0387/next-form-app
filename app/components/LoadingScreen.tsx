import ClipLoader from "react-spinners/ClipLoader";

type LoadingScreenProps = {
  text: string;
};

export function LoadingScreen({ text }: LoadingScreenProps) {
  return (
    <div className="w-full h-[25rem] p-5 flex flex-col items-center justify-center">
      <p className="text-2xl font-extrabold mb-5">{text}</p>
      <ClipLoader
        size={150}
        color={"#123abc"} // You can also pass color as a prop if needed
        loading={true} // Ensure to pass the loading state if needed
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}