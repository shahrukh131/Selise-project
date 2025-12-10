import type { EmptyCellProps } from "../types";

export const EmptyCell = ({
  venueName,
  time,
  date,
  onClick,
}: EmptyCellProps) => {
  return (
    <td
      className="min-w-[200px] h-16 border-r border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
      onClick={onClick}
    />
  );
};
