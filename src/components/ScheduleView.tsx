import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

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

  const venues = [
    { id: 1, name: "Venue 1" },
    { id: 2, name: "Venue 2" },
    { id: 3, name: "Venue 3" },
    { id: 4, name: "Venue 4" },
    { id: 5, name: "Venue 5" },
    { id: 6, name: "Venue 6" },
  ];

  const [selectedDay, setSelectedDay] = useState(0);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Meeting",
      day: "Wednesday",
      startTime: "09:00",
      endTime: "09:30",
      venueIds: [1],
    },
    {
      id: 2,
      title: "Event 2",
      day: "Wednesday",
      startTime: "10:00",
      endTime: "10:30",
      venueIds: [1, 2],
    },
    {
      id: 3,
      title: "Workshop",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "15:30",
      venueIds: [3],
    },
    {
      id: 4,
      title: "Workshop",
      day: "Thursday",
      startTime: "14:00",
      endTime: "15:30",
      venueIds: [3],
    },
  ]);

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
      <div className="flex flex-col max-w-[1400px] w-full h-[600px] bg-white shadow rounded-lg overflow-hidden">
        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
          <Tabs
            value={selectedDay}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                minWidth: 100,
                textTransform: "none",
                fontSize: "0.95rem",
              },
            }}
          >
            {weekDays.map((day) => (
              <Tab
                key={day.id}
                label={
                  <div className="flex flex-col items-center py-1">
                    <span className="font-semibold">{day.dayName}</span>
                    <span className="text-2xl font-bold">{day.date}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </Box>

        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-white shadow-sm">
              <tr>
                <th className="w-24 h-14 border-r border-b border-gray-300 bg-gray-50 font-semibold text-sm sticky left-0 z-20">
                  Time
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
              {timeSlots.map((time, index) => (
                <tr key={time}>
                  <td className="w-24 h-16 border-r border-b border-gray-200 text-xs text-gray-600 text-center align-top pt-1 bg-white sticky left-0 z-10 font-medium">
                    {time}
                  </td>
                  {venues.map((venue) => {
                    const event = getEventAtTimeSlot(venue.id, time);

                    if (event && isEventStart(event, time)) {
                      const isFirstVenue = event.venueIds[0] === venue.id;
                      if (!isFirstVenue) {
                        return null; // Skip rendering for subsequent venues
                      }
                      if (isFirstVenue) {
                        const rowSpan = calculateRowSpan(event);
                        const colspan = event.venueIds.length;
                        return (
                          <td
                            key={`${venue.id}-${time}`}
                            rowSpan={rowSpan}
                            colSpan={colspan}
                            className="min-w-[200px]  border-b border-gray-200 bg-gray-600 cursor-pointer p-0"
                          >
                            <div
                              className={`h-full w-full bg-gray-600 rounded-none p-3 text-white text-sm font-medium transition-all flex flex-col justify-center`}
                            >
                              <span className="font-semibold">
                                {event.title}
                              </span>
                              <span className="text-xs mt-1 opacity-90">
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>
                          </td>
                        );
                      }
                    } else if (event && !isEventStart(event, time)) {
                      return null;
                    } else {
                      return (
                        <td
                          key={`${venue.id}-${time}`}
                          className="min-w-[200px] h-16 border-r border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => {
                            console.log(
                              `Clicked: ${venue.name} at ${time} on ${weekDays[selectedDay].fullDate}`
                            );
                          }}
                        />
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
