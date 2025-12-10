import { Tooltip } from "@mui/material";
import type { EmptyCellProps } from "../types";

export const EmptyCell = ({
  onClick,
}: EmptyCellProps) => {
  return (
    <Tooltip title="Click to add event" arrow>
      <td
        className="min-w-[200px] h-16 border-r border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
        onClick={onClick}
      />
    </Tooltip>
  );
};
