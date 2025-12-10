import { Box, Tab, Tabs } from "@mui/material";
import type { WeekTabsProps } from "../types";



export const WeekTabs = ({ weekDays, selectedDay, onTabChange }: WeekTabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
      <Tabs
        value={selectedDay}
        onChange={(event, newValue) => onTabChange(event,newValue)} 
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTab-root": {
            minWidth: 100,
            textTransform: "none",
            fontSize: "0.95rem",
            color: "black",
          },
          "& .Mui-selected": {
            backgroundColor: "rgb(106,114,130)",
            color: "white !important",
          },
        }}
      >
        {weekDays.map((day) => (
          <Tab
            key={day.id}
            label={
              <div className="flex flex-col items-center py-1">
                <span className="text-xl font-semibold">{day?.dayName}</span>
                <span className="text-2xl font-semibold">Date: {day?.fullDate}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};