"use client";

interface Props {
  max: number;
  count: number;
  onCountChange: (count: number) => void;
  id : string
}

export default function ProductCounter({ id , max, count, onCountChange }: Props) {



  return (
    <div className="flex items-center border border-[#919191] rounded-[8px]">
      <button
        onClick={() => onCountChange(Math.max(1, count - 1))}
        className="w-13 h-12 flex items-center justify-center bg-transparent hover:bg-homeGreen/10 active:scale-95 text-homeGreen transition-colors"
      >
        −
      </button>
      <div className="min-w-12 h-12 flex items-center justify-center text-base font-medium text-homeGreen">
        {count}
      </div>
      <button
        onClick={() => onCountChange(Math.min(max, count + 1))}
        className="w-13 h-12 flex items-center justify-center bg-transparent hover:bg-homeGreen/10 active:scale-95 text-homeGreen transition-colors"
      >
        +
      </button>
    </div>
  );
}