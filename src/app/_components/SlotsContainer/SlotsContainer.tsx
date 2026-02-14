import { Box, Typography } from "@mui/material";
import { getProviderSlots, getLoggedInUser } from "../../lib/data-service";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import SlotCard from "../SlotCard/SlotCard";

type Slot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
};
type SlotStatus = "available" | "booked" | "all";

export default function SlotsContainer({ header, status }: { header: string, status?: SlotStatus }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const user = await getLoggedInUser();
        
        if (!user?.id) {
          setLoading(false);
          return;
        }
        const slotsData = await getProviderSlots(user.id, status);
        setSlots(slotsData);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        console.log(slots)
        setLoading(false);
      }
    };

    fetchSlots();
  }, [status]);

  const getEmptyMessage = () => {
    switch (status) {
      case "available":
        return "No available slots.";
      case "booked":
        return "No upcoming appointments.";
      default:
        return "You have not created any slots yet.";
    }
  };

  return (
    <Box sx={{mt: 2 }} >
      <Typography
        variant="h2"
        sx={{ mb: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }}
      >
        {header}
      </Typography>

      {loading && (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && slots.length === 0 && (
        <Typography variant="body1" sx={{ color: "text.secondary"  ,
          backgroundColor: "#ffffff",
          padding: 2,
          borderRadius: 1,
         fontSize: { xs: "1rem", sm: "1.5rem" }}}>
          {getEmptyMessage()}
        </Typography>
      )}

      {slots.length > 0 && !loading && (       
      <Box sx={{ display:"grid", gap:2, gridTemplateColumns:{xs:"1fr", sm:"1fr 1fr"}}}>
        {slots.map((slot) => (
            <SlotCard key={slot.id} slot={slot} />
        ))}
      </Box>
      )}
    </Box>
  );
}
