import type { TimeCellProps } from "../types";

export const TimeCell = ({ time }: TimeCellProps) => {
  return (
    <td
      className="w-24 h-16 border-r border-b border-gray-200 text-xs text-gray-600 text-center
     align-center pt-1 bg-white  font-medium"
    >
      {time}
    </td>
  );
};
