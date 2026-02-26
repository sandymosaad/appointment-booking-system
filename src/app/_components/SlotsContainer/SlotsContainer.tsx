import { Box, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import SlotCard from "../SlotCard/SlotCard";


interface SlotsContainerProps {
  header: string;
  slots?: any[];
  onDelete?: (id: string) => void;
  onReserved?: (id: string) => void;
  onBook?: (id: string) => void;
  onCancelReserved?: (id: string) => void;
  loading?: boolean;
  isClient?: boolean;
  setNumReservedSlots?: (value: number) => void;
  refresh?: () => Promise<any[]>;

}

export default function SlotsContainer({
  header,
  slots = [],
  onDelete,
  onReserved,
  onBook,
  onCancelReserved,
  loading,
  isClient,
  setNumReservedSlots,
  refresh
}: SlotsContainerProps) {

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
         fontSize: { xs: "1rem", sm: "1.5rem" }}}>
          {header ==="My Upcoming Bookings" 
          ? "No Upcoming Bookings Found " 
          :header ==="All Slots"
          ?"No Slots Found"
          :`No ${header} Found.`
          } 
          
          </Typography>
      ) : (
        <Box sx={{ display:"grid", gap:2, gridTemplateColumns:{xs:"1fr", sm:"1fr 1fr"}}}>
          {slots.map((slot) => (
             <SlotCard key={slot.id}
              slot={slot}
               onReserved={onReserved} 
               onDelete={onDelete}
               onBook={onBook} 
               onCancelReserved={onCancelReserved}
               isClient={isClient}
               setNumReservedSlots={setNumReservedSlots}
               refresh={refresh}
               />
          ))}
        </Box>
      )}
    </Box>
    </Box>
  );
}