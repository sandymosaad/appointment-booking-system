import { Box, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import SlotCard from "../SlotCard/SlotCard";


export default function SlotsContainer(
  { header, slots = [], onDelete, loading }) {
  
  return (
    <Box>
     <Box sx={{ mt: 2 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>{header}</Typography>

      {loading ? (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : slots.length === 0 ? (
        <Typography
          sx={{ color: "text.secondary"  ,
          backgroundColor: "#e9e9e9",
          padding: 2,
          borderRadius: 1,
         fontSize: { xs: "1rem", sm: "1.5rem" }}}>No slots found.</Typography>
      ) : (
        <Box sx={{ display:"grid", gap:2, gridTemplateColumns:{xs:"1fr", sm:"1fr 1fr"}}}>
          {slots.map((slot) => (
             <SlotCard key={slot.id} slot={slot} onDelete={onDelete} />
          ))}
        </Box>
      )}
    </Box>
    </Box>
  );
}