import { Box, TextField, Typography } from "@mui/material";

export default function DateInput({ label = "Select Date" }: { label?: string }) {
  const today = new globalThis.Date().toISOString().split("T")[0];

  return (
    <Box>
      <Typography variant="body2" fontSize={14} sx={{ mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        type="date"
        size="medium"
        inputProps={{
          min: today,
        }}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          "& fieldset": { border: "none" },
        }}
      />
    </Box>
  );
}
