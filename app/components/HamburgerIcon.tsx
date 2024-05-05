type HamburgerIconProps = {
  isOpen: boolean;
  handleClick: () => void;
};

export function HamburgerIcon({ isOpen, handleClick }: HamburgerIconProps) {
  return (
    <button
      onClick={handleClick}
      className="flex flex-col justify-center items-center w-12 h-12 border-2 border-[#4d2800] dark:border-white rounded-md"
    >
      <span
        className={`bg-[#4d2800] dark:bg-white bg-steel-500 block transition-all duration-300 ease-out
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                      }`}
      ></span>
      <span
        className={`bg-[#4d2800] dark:bg-white bg-steel-500 block transition-all duration-300 ease-out
                      h-0.5 w-6 rounded-sm my-0.5 ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
      ></span>
      <span
        className={`bg-[#4d2800] dark:bg-white bg-steel-500 block transition-all duration-300 ease-out
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                      }`}
      ></span>
    </button>
  );
}
