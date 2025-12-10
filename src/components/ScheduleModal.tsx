import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Stack,
  IconButton,
} from "@mui/material";
import { X } from "lucide-react";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  selectedVenue: number | null;
  selectedDay: {
    id: number;
    dayName: string;
    date: number;
    fullDate: string;
  } | null;
  selectedTimeSlot: string | null;
  venues: { id: number; name: string }[];
  onSubmit: (event: any) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  open,
  onClose,
  selectedVenue,
  selectedDay,
  selectedTimeSlot,
  venues,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [selectedDayName, setSelectedDayName] = useState(
    selectedDay?.dayName || ""
  );
  const [startTime, setStartTime] = useState(selectedTimeSlot || "09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [selectedVenues, setSelectedVenues] = useState<number[]>(
    selectedVenue ? [selectedVenue] : []
  );

  // Generate time slots for dropdown
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Generate days of the week for dropdown
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (selectedVenue && !selectedVenues.includes(selectedVenue)) {
      setSelectedVenues([selectedVenue]);
    }
    if (selectedDay) {
      setSelectedDayName(selectedDay.dayName);
    }
    if (selectedTimeSlot) {
      setStartTime(selectedTimeSlot);
      // Set default end time 30 minutes later
      const [hours, minutes] = selectedTimeSlot.split(":").map(Number);
      const endDate = new Date();
      endDate.setHours(hours, minutes + 30);
      const endTimeStr = `${endDate.getHours().toString().padStart(2, "0")}:${endDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setEndTime(endTimeStr);
    }
  }, [selectedVenue, selectedDay, selectedTimeSlot]);

  const handleVenueToggle = (venueId: number) => {
    setSelectedVenues((prev) =>
      prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedDayName || !startTime || !endTime || selectedVenues.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    const newEvent = {
      id: Date.now(), // Simple ID generation
      title,
      day: selectedDayName,
      startTime,
      endTime,
      venueIds: selectedVenues,
    };

    onSubmit(newEvent);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setSelectedDayName(selectedDay?.dayName || "");
    setStartTime(selectedTimeSlot || "09:00");
    setEndTime("10:00");
    setSelectedVenues(selectedVenue ? [selectedVenue] : []);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Create New Schedule
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <X size={20} />
          </IconButton>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}> */}
              <TextField
                fullWidth
                label="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                variant="outlined"
              />
            {/* </Grid> */}

            {/* <Grid item xs={12}> */}
              <FormControl fullWidth required>
                <InputLabel>Day</InputLabel>
                <Select
                  value={selectedDayName}
                  label="Day"
                  onChange={(e) => setSelectedDayName(e.target.value)}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            {/* </Grid> */}

            {/* <Grid item xs={6}> */}
              <FormControl fullWidth required>
                <InputLabel>Start Time</InputLabel>
                <Select
                  value={startTime}
                  label="Start Time"
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {timeOptions.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            {/* </Grid> */}

            {/* <Grid item xs={6}> */}
              <FormControl fullWidth required>
                <InputLabel>End Time</InputLabel>
                <Select
                  value={endTime}
                  label="End Time"
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {timeOptions.map((time) => (
                    <MenuItem key={time} value={time} disabled={time <= startTime}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            {/* </Grid> */}

            {/* <Grid item xs={12}> */}
              <Typography variant="subtitle1" gutterBottom>
                Select Venues
              </Typography>
              <FormGroup>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {venues.map((venue) => (
                    <Chip
                      key={venue.id}
                      label={venue.name}
                      onClick={() => handleVenueToggle(venue.id)}
                      color={selectedVenues.includes(venue.id) ? "primary" : "default"}
                      variant={selectedVenues.includes(venue.id) ? "filled" : "outlined"}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </FormGroup>
              {selectedVenue && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  * Venue {venues.find(v => v.id === selectedVenue)?.name} is pre-selected
                </Typography>
              )}
            {/* </Grid> */}

            {/* <Grid item xs={12}> */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Create Schedule
                </Button>
              </Box>
            {/* </Grid> */}
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default ScheduleModal;