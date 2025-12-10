  export const venues = [
    { id: 1, name: "Venue 1" },
    { id: 2, name: "Venue 2" },
    { id: 3, name: "Venue 3" },
    { id: 4, name: "Venue 4" },
    { id: 5, name: "Venue 5" },
    { id: 6, name: "Venue 6" },
  ];

  export const initialSchedule=[
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
  ]