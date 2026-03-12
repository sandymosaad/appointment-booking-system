"use client"
import { useProviderSlots } from "../../provider-dashboard/useProviderSlots";
import SlotCard from "../SlotCard/SlotCard";
import { Box, CircularProgress, Container, Typography, IconButton } from "@mui/material";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function SlotsBasedOnStatus({status,header,para }) {
  const {    
    slots,
    fetchSlots,
    loading,
    handleDeleteSlot,
    todaySlots,
  } = useProviderSlots(status);
  const router = useRouter();

  useEffect(() => {
    fetchSlots();
  }, []);

  const displayedSlots = status === "all" ? todaySlots : slots;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => router.push("/provider-dashboard")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">{header}</Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : displayedSlots.length === 0 ? (
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
          {displayedSlots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}             
              onDelete={handleDeleteSlot}

            />
          ))}
        </Box>
      )}
    </Container>
  );
}