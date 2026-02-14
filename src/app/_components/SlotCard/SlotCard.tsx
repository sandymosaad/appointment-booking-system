import { Box, Typography, Chip, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


type SlotType = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
};

export default function SlotCard({ slot }: { slot: SlotType }) {
  const formattedDate = new Date(slot.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const statusColor = {
    available: "success", 
    booked: "warning",    
    cancelled: "error",   
  } as const;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor:
          slot.status === "available"
            ? "#e0f7fa" 
            : slot.status === "booked"
            ? "#fff3e0" 
            : "#ffebee", 
        border:
          slot.status === "available"
            ? "1px solid #26c6da"
            : slot.status === "booked"
            ? "1px solid #ffa726"
            : "1px solid #f44336",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" }, alignItems:"center", display:"flex", }}>
           <CalendarTodayIcon fontSize="small" sx={{mx:1}}/>{formattedDate}
        </Typography>

        <Chip
          label={slot.status.toUpperCase()}
          color={statusColor[slot.status]}
          size="medium"
            sx={{ fontSize: { xs: "1rem", sm: "1.5rem" }, height: "32px" }}
        />
      </Box>

      <Typography sx={{ mt: 1, fontWeight: 500  ,
         alignItems:"center", display:"flex", fontSize: { xs: "1rem", sm: "1.5rem" }}}>
         <AccessTimeIcon fontSize="medium" sx={{mx:1}}/>
        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
      </Typography>

      {slot.status === "available" && (
        <Button
          sx={{
            m: 1,
            backgroundColor: "#26c6da",
            color: "white",
            fontSize: { xs: "1rem", sm: "1.5rem" },
            "&:hover": {
              backgroundColor: "#00acc1",
            },
          }}
        >
          Cancel Slot
        </Button>
      )}
    </Box>
  );
}
