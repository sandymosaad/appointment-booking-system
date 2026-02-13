import { Box , Button, TextField, Typography} from "@mui/material";
import Time from "../Time/Time";
import Date from "../Date/Date";
import DateInput from "../Date/Date";

export default function CreateSlotModal() {
  return <>

<Box
  sx={{
    mt: 2,
    backgroundColor: "#ffffff",
    p: 4,
    borderRadius: 2,
  }}
>
  <Typography variant="h5" fontWeight={700} fontSize={20}sx={{ mb: 1 }}>
    Create New Availability Slot
  </Typography>

  <Typography
    variant="body1"
    fontSize={14}
    sx={{
      mb: 4,
      color: "text.secondary",
    }}
  >
    Set your available time slots for appointments
  </Typography>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr  1fr" },
      gap: 4,
      mb: 4,
    }}
  >
    <DateInput label="Date" />
    <Time label="Start Time" />
    <Time label="End Time" />
  </Box>

  <Box sx={{ display: "flex", gap: 2 }}>
    <Button variant="contained" sx={{ mt: 3  , fontSize: 16 }}>Create Slot</Button>
    <Button variant="outlined" sx={{ mt: 3  , fontSize: 16 }}>Cancel</Button>
  </Box>
</Box>
</>
}
