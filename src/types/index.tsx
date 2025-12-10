export interface WeekTabsProps {
  weekDays: Array<{
    id: number;
    dayName: string;
    date: number;
    fullDate: string;
  }>;
  selectedDay: number;
  onTabChange: (event: any, newValue: any) => void;
}
export interface TimeCellProps {
  time: string;
}
export interface EventProps {
  event: {
    title: string;
    startTime: string;
    endTime: string;
  };
  rowSpan: number;
  colSpan: number;
}

export interface EmptyCellProps {
  venueName: string;
  time: string;
  date: string;
  onClick: () => void;
}

export interface VenueCellProps {
  venue: { id: number; name: string };
  time: string;
  event: any;
  isEventStart: (event: any, time: string) => boolean;
  calculateRowSpan: (event: any) => number;
  selectedDate: string;
}

export interface ScheduleTableProps {
  venues: Array<{ id: number; name: string }>;
  timeSlots: string[];
  getEventAtTimeSlot: (venueId: number, timeSlot: string) => any;
  isEventStart: (event: any, timeSlot: string) => boolean;
  calculateRowSpan: (event: any) => number;
  selectedDate: string;
}