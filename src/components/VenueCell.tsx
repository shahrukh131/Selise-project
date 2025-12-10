import { Event } from "./Event";
import { EmptyCell } from "./EmptyCell";
import type { VenueCellProps } from "../types";



export const VenueCell = ({
  venue,
  time,
  event,
  isEventStart,
  calculateRowSpan,
  selectedDate,
  handleCellClick
}: VenueCellProps) => {
  if (event && isEventStart(event, time)) {
    const isFirstVenue = event.venueIds[0] === venue.id;
    if (!isFirstVenue) {
      return null;
    }
    const rowSpan = calculateRowSpan(event);
    const colSpan = event.venueIds.length;
    return <Event event={event} rowSpan={rowSpan} colSpan={colSpan} />;
  } else if (event && !isEventStart(event, time)) {
    return null;
  } else {
    return (
      <EmptyCell
        venueName={venue.name}
        time={time}
        date={selectedDate}
        // onClick={() => {
        //   console.log(`Clicked: ${venue.name} at ${time} on ${selectedDate}`);
        // }}
         onClick={() => handleCellClick(venue.id, time)}
      />
    );
  }
};