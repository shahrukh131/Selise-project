import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { WeekTabs } from "./WeekTabs";
import { ScheduleTable } from "./ScheduleTable";
import { initialSchedule, venues } from "../data";

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
  const [events, setEvents] = useState(initialSchedule);

  const weekDays = generateWeekDays();
  const timeSlots = generateTimeSlots();

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedDay(newValue);
  };

  const getEventsForDayAndVenue = (venueId: number) => {
    const selectedDayName = weekDays[selectedDay].dayName;
    return events.filter(
      (event) =>
        event.day === selectedDayName && event.venueIds.includes(venueId)
    );
  };

  const getEventAtTimeSlot = (venueId: number, timeSlot: string) => {
    const venueEvents = getEventsForDayAndVenue(venueId);
    return venueEvents.find(
      (event) => timeSlot >= event.startTime && timeSlot < event.endTime
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

  return (
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
        />
      </div>
    </div>
  );
};

export default ScheduleView;
