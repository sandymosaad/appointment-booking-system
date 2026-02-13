import { Box, Typography } from "@mui/material";

export default function SlotsContainer({header}: {header: string }) {
  return (
    <Box sx={{
      mt: 2,
      backgroundColor: "#ffffff",
      p: 4,
      borderRadius: 2,
    }}>
      <Typography variant="h2" sx={{ mb: 2 , fontSize: { xs: "1.5rem", sm: "2rem" } }}>{header}</Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16 }}>
        {header === "Available Slots" ? "These are no available slots at the moment. Please check back later." : ""}
        {header === "Upcoming Appointments" ? "These are no upcoming bookings at the moment." : ""}
        {header === "Today's Schedule" ? "You have no scheduled appointments for today." : ""}
        {header === "All Slots" ? "You have not created any slots yet. Click on 'Create New Slot' to add your availability." : ""}
      </Typography>
    </Box>
  )
}

