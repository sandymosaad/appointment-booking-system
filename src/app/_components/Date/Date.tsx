import { Box, TextField, Typography } from "@mui/material";

type DateInputProps = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string;
};

export default function DateInput({
  label,
  value,
  onChange,
  name,
  error,
}: DateInputProps) {
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
        name={name}
        value={value}
        onChange={onChange}
        inputProps={{
          min: today,
        }}
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
