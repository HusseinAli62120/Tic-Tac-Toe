const Square = ({
  value,
  onClick,
  isWinningSquare,
}: {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}) => {
  return (
    <button
      className={`
        w-20 h-20 sm:w-32 sm:h-32 
        border-2 border-gray-700 rounded-xl
        text-5xl sm:text-6xl font-bold flex items-center justify-center
        transition-all duration-200 ease-in-out
        ${value === "X" ? "text-rose-400" : "text-blue-400"}
        ${!value && "hover:bg-gray-800"}
        ${
          isWinningSquare
            ? "bg-green-900/30 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            : "bg-gray-800/50"
        }
      `}
      onClick={onClick}
    >
      <span
        className={`transform transition-transform duration-300 ${
          value ? "scale-100" : "scale-0"
        }`}
      >
        {value}
      </span>
    </button>
  );
};

export default Square;
