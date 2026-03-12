import { Box, TextField, Typography } from "@mui/material";

type TimeProps = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string;
};

export default function Time({
  label,
  value,
  onChange,
  name,
  error,
}: TimeProps) {
  const minTime = "08:00";
  const maxTime = "23:00";

  const isInvalid =
    value && (value < minTime || value > maxTime);

  return (
    <Box>
      <Typography variant="body2" fontSize={14} sx={{ mb: 1 }}>
        {label}
      </Typography>

      <TextField
        fullWidth
        type="time"
        size="medium"
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          "& fieldset": { border: "none" },
        }}
      />
      {isInvalid && (
        <Typography variant="body2" color="error" fontSize={12} sx={{ mt: 1 }}>
          Time must be between 08:00 and 23:00
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error" fontSize={12} sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
