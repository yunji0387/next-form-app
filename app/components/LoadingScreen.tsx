import ClipLoader from "react-spinners/ClipLoader";

export function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full p-5 flex flex-col items-center">
        <p className="text-lg font-bold mb-5">Submitting Form...</p>

        <ClipLoader
        //   color={color}
        //   loading={loading}
        //   cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
