  import { Box, Typography, Chip, Button } from "@mui/material";
  import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
  import AccessTimeIcon from "@mui/icons-material/AccessTime";
  import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
  import SlotTimer from "../SlotTimer/SlotTimer"

  type SlotType = {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    status: string;
  };
  interface SlotCardProps {
    slot: SlotType;
    onDelete?: (id: string) => void;
    onReserved?: (id: string) => void;
    onBook?:(id: string) => void;
    onCancelReserved?:(id: string) => void;
    isClient?: boolean;
    setNumReservedSlots?: (value: number) => void;
    refresh?: () => void;

  }
  export default function SlotCard(
    { slot, onDelete ,isClient ,
    onReserved ,onBook, setNumReservedSlots ,
    refresh , onCancelReserved}: SlotCardProps) {
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
    
  const slotDate = new Date(slot.date)
  const now = new Date()
  const diffHours = (slotDate.getTime() - now.getTime()) / (1000 * 60 * 60)


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
              ? "#ffebee" 
              : slot.status === "reserved"
              ? "#fff3e0"
              : slot.status === "past"
              ?"#ececec"
              :"#f59c9c",
          border:
            slot.status === "available"
              ? "1px solid #26c6da"
              : slot.status === "booked"
              ? "1px solid #f44336"
              : slot.status === "reserved"
              ? "1px solid #ffa726"
              :slot.status === "past"
              ?"1px solid #7a7979"
              :"1px solid #f50303",
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
        {!isClient && slot.status!== "available" &&
          <Typography sx={{ mt: 1, fontWeight: 500  ,
            alignItems:"center", display:"flex", fontSize: { xs: "1rem", sm: "1.5rem" }}}>
            <PersonOutlineIcon fontSize="medium" sx={{mx:1}}/>
            {`Client: ${slot['client_name'] }`}
          </Typography>}
        {isClient &&
        <Typography sx={{ mt: 1, fontWeight: 500  ,
          alignItems:"center", display:"flex", fontSize: { xs: "1rem", sm: "1.5rem" }}}>
          <PersonOutlineIcon fontSize="medium" sx={{mx:1}}/>
          {`Provider: Dr.${slot['provider_name'] }`}
        </Typography>
        }
        {isClient && slot.status === "reserved" &&
            <SlotTimer id={slot.id} 
            setNumReservedSlots={setNumReservedSlots}
            refresh= {refresh}/>   
          }
        {slot.status === "available" && !isClient && (
          <Button
            variant="contained"
            sx={{
              m: 1,
              mt:3,
              color: "white",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
            onClick={() => onDelete(slot.id)}
            >
            Cancel Slot
          </Button>
        )}
        {isClient && slot.status !== "reserved" && slot.status !== "booked"  && slot.status !== "past"   &&   
        <Button
            variant="contained"
            sx={{
              mx:1,
              mt:3,        
              color: "white",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
            onClick={()=>onReserved(slot.id)}
            >
            Reserve Slot
          </Button>    
          }
        {isClient && slot.status !== "booked"  && slot.status !== "past" && 
         <Button
            variant="contained"
            sx={{
              mt:3,
              mx:1,
              color: "white",
              fontSize: { xs: "1rem", sm: "1.5rem" },
              ...(slot.status === "reserved" && { width: 1 }),
            }}
            onClick={()=>onBook(slot.id)}
            >
            Book Now
          </Button>}

          { slot.status === "booked" && <>
          {diffHours <24 ?
          <Typography sx={{fontSize: { xs: "1rem", sm: "1.5rem" }, p:2, color:"gray"}}>
            Cannot cancel (less than 24h before appointment)
          </Typography>:
          <Button
          variant="contained"
            sx={{
              m: 1,
              mt:3,
              color: "white",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
            onClick={() => onCancelReserved(slot.id)}
            >
            Cancel Slot
          </Button>}
          </>}
      </Box>
    );
  }
