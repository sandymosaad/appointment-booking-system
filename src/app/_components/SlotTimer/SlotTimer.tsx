"use client"
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { updateSlotStatus, getSlot } from "../../lib/data-service";

export default function SlotTimer({ id , setNumReservedSlots , refresh}) {
  const [seconds, setSeconds] = useState<number | null>(null);

  // Fetch expiration time
  useEffect(() => {
    async function fetchSlot() {
      const data = await getSlot(id);

      if (!data?.expires_at) return;

      const expiresAt = new Date(data.expires_at).getTime();
      const now = Date.now();

      const remainingSeconds = Math.floor((expiresAt - now) / 1000);

      if (remainingSeconds > 0) {
        setSeconds(remainingSeconds);
      } else {
        setSeconds(0);
      }
    }

    fetchSlot();
  }, [id]);

  //  Countdown
    useEffect(() => {
    if (seconds === null || seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);


  useEffect(() => {
    if (seconds === 0) {
      const expireSlot = async () => {
        await updateSlotStatus(id, "available");
        setNumReservedSlots?.((prev) => prev - 1);
        await refresh?.();
      };

      expireSlot();
    }
  }, [seconds, id, refresh, setNumReservedSlots]);
  if (seconds === null) return null;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (!seconds) return null;
  
return (
  <Typography
      sx={{
        border: "1px solid red",
        color: "red",
        textAlign: "center",
        fontSize: "1.5rem",
        p: 1,
        mt: 1,
        borderRadius: 2,
      }}
    >
      Reservation expires in: {minutes}:
      {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
    </Typography>
  )
}