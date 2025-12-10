import type { EventProps } from "../types";


export const Event = ({ event, rowSpan, colSpan }: EventProps) => {
  return (
    <td
      rowSpan={rowSpan}
      colSpan={colSpan}
      className="min-w-[200px] border-b border-gray-200 bg-gray-500 cursor-pointer p-0"
    >
      <div className="h-full w-full bg-gray-500 rounded-none p-3 text-white text-sm font-medium transition-all flex flex-col justify-center items-center">
        <span className="font-semibold">{event.title}</span>
        <span className="text-xs mt-1 opacity-90">
          {event.startTime} - {event.endTime}
        </span>
      </div>
    </td>
  );
};