
import  { useEffect, useState } from "react";
import { WeekTabs } from "./WeekTabs";
import { ScheduleTable } from "./ScheduleTable";
import { initialSchedule, venues } from "../data";

import ScheduleModal from "./ScheduleModal";

const ScheduleView = () => {
  const generateWeekDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        id: i,
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
        date: date.getDate(),
        fullDate: date.toISOString().split("T")[0],
      });
    }
    return days;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const [selectedDay, setSelectedDay] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("scheduleEvents");
    return saved ? JSON.parse(saved) : initialSchedule;
  });

  const weekDays = generateWeekDays();
  const timeSlots = generateTimeSlots();

  const handleTabChange = ( newValue: any) => {
    setSelectedDay(newValue);
  };

  const getEventsForDayAndVenue = (venueId: number) => {
    const selectedDayName = weekDays[selectedDay].dayName;
    return events.filter(
      (event: any) =>
        event.day === selectedDayName && event.venueIds.includes(venueId)
    );
  };

  const getEventAtTimeSlot = (venueId: number, timeSlot: string) => {
    const venueEvents = getEventsForDayAndVenue(venueId);
    return venueEvents.find(
      (event: any) => timeSlot >= event.startTime && timeSlot < event.endTime
    );
  };

  const isEventStart = (event: any, timeSlot: string) => {
    return event.startTime === timeSlot;
  };

  const calculateRowSpan = (event: any) => {
    const startIndex = timeSlots.indexOf(event.startTime);
    const endIndex = timeSlots.indexOf(event.endTime);
    return endIndex - startIndex;
  };

  const handleCellClick = (venueId: number, timeSlot: string) => {
    console.log("hello");

    // Check if time slot is already occupied
    const isOccupied = events.some((event: any) => {
      const dayMatches = event.day === weekDays[selectedDay].dayName;
      const venueMatches = event.venueIds.includes(venueId);
      const timeOverlaps =
        timeSlot >= event.startTime && timeSlot < event.endTime;
      return dayMatches && venueMatches && timeOverlaps;
    });

    if (isOccupied) {
      alert(
        "This time slot is already occupied. Please select another time slot."
      );
      return;
    }

    setSelectedVenue(venueId);
    setSelectedTimeSlot(timeSlot);
    setModalOpen(true);
  };

  const handleAddEvent = (newEvent: any) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    localStorage.setItem("scheduleEvents", JSON.stringify(updatedEvents));

    setModalOpen(false);

    setSelectedVenue(null);
    setSelectedTimeSlot(null);

    console.log("Event added successfully:", newEvent);
  };
  useEffect(() => {
    localStorage.setItem("scheduleEvents", JSON.stringify(events));
  }, [events]);

  return (
    <>
   
      <div className="flex justify-center bg-gray-50 min-h-screen py-6">
        <div className="flex flex-col max-w-[1200px] w-full h-[600px] bg-white shadow rounded-lg overflow-hidden">
          <WeekTabs
            weekDays={weekDays}
            selectedDay={selectedDay}
            onTabChange={handleTabChange}
          />

          <ScheduleTable
            venues={venues}
            timeSlots={timeSlots}
            getEventAtTimeSlot={getEventAtTimeSlot}
            isEventStart={isEventStart}
            calculateRowSpan={calculateRowSpan}
            selectedDate={weekDays[selectedDay].fullDate}
            handleCellClick={handleCellClick}
          />
          <ScheduleModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            selectedVenue={selectedVenue}
            selectedDay={weekDays[selectedDay]}
            selectedTimeSlot={selectedTimeSlot}
            venues={venues}
            onSubmit={handleAddEvent}
          />
        </div>
      </div>
    </>
  );
};

export default ScheduleView;
