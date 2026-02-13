import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Time({ label }: { label: string }) {
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const minTime = "08:00";
  const maxTime = "23:00";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTime(value);

    if (value < minTime || value > maxTime) {
      setError(`Time must be between ${minTime} and ${maxTime}`);
    } else {
      setError("");
    }
  };

  return (
    <Box>
      <Typography variant="body2" fontSize={14} sx={{ mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        type="time"
        size="medium"
        value={time}
        onChange={handleChange}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          "& fieldset": { border: "none" },
        }}
      />
      {error && (
        <Typography variant="body2" color="error" fontSize={12} sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
