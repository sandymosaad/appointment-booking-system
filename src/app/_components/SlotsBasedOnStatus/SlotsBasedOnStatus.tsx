"use client"
import { useClientSlots } from "../../client-dashboard/useClientSlots";
import SlotCard from "../../_components/SlotCard/SlotCard";
import { Box, CircularProgress, Container, Typography, IconButton } from "@mui/material";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function SlotsBasedOnStatus({status,header,para}) {
  const { slots, handleBookSlot, handleReserveSlot, handleCancellationSlot, fetchSlots, loading } = useClientSlots(status);
  const router = useRouter();

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => router.push("/client-dashboard")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">{header}</Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : slots.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "#ece9e9",
            width: "100%",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            color: "gray",
            fontSize:'2rem'
          }}
        >
          {para}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          {slots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              isClient={true}
              onReserved={handleReserveSlot}
              onBook={handleBookSlot}
              onCancelReserved={handleCancellationSlot}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}