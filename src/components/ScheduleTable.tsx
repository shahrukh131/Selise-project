import type { ScheduleTableProps } from "../types";
import { TimeCell } from "./TimeCell";
import { VenueCell } from "./VenueCell";

export const ScheduleTable = ({
  venues,
  timeSlots,
  getEventAtTimeSlot,
  isEventStart,
  calculateRowSpan,
  selectedDate,
  handleCellClick
}: ScheduleTableProps) => {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse table-fixed">
        <thead className="sticky top-0 z-10 bg-white shadow-sm">
          <tr>
            <th className="w-24 h-14 border-r border-b border-gray-300 bg-gray-50 font-semibold text-sm sticky left-0 top-0 z-20">
              
            </th>
            {venues.map((venue) => (
              <th
                key={venue.id}
                className="min-w-[200px] h-14 border-r border-b border-gray-300 bg-gray-50 font-semibold text-sm px-2"
              >
                {venue.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <TimeCell time={time} />
              {venues.map((venue) => {
                const event = getEventAtTimeSlot(venue.id, time);
                return (
                  <VenueCell
                    key={`${venue.id}-${time}`}
                    venue={venue}
                    time={time}
                    event={event}
                    isEventStart={isEventStart}
                    calculateRowSpan={calculateRowSpan}
                    selectedDate={selectedDate}
                    handleCellClick={handleCellClick}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
