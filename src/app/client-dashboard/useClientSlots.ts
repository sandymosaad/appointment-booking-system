// hooks/useClientSlots.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { getSlots, getLoggedInUser, cancelSlotByClient, reserveSlot, bookSlot 
} from "../lib/data-service";

export function useClientSlots(initialStatus = "available") {
  const [slots, setSlots] = useState<any[]>([]);
  const [status, setStatus] = useState(initialStatus);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [numReservedSlots, setNumReservedSlots] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [userId, setUserId]= useState(null)
  const pathname = usePathname();
  const [allUserSlots, setAllUserSlots] = useState<any[]>([]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
       const user = await getLoggedInUser();
      setUserId(user.id)
      const allSlots = await getSlots(); 
      setAllUserSlots(allSlots || []);

      const slotsData = await getSlots(status);
      setSlots(slotsData || []);
      return slotsData || [];
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch slots");
      return [];
    }finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    const loadData = async () => {
      const slotsData = await fetchSlots();

      const slotsReserved = await getSlots("reserved");
     
      const reservedCount = slotsReserved.filter(
        (slot) => slot.client_id === userId && slot.status === "reserved"
      );

      if (reservedCount.length > 0) {
        setShowWarning(true);
        setNumReservedSlots(reservedCount.length);
      } else {
        setShowWarning(false);
        setNumReservedSlots(0);
      }
    };

    loadData();
  }, [status]);

  // Cancel Slot
  const handleCancellationSlot = async (id: string) => {
    const slot = slots.find((slot) => slot.id === id);
    if (!slot) return;

    try {
      await cancelSlotByClient(id);
      await fetchSlots();
      
      if (pathname === "/client-dashboard") {
      setStatus("available");
      setActiveIndex(0);
      }
      toast.success("Slot canceled successfully.");

    } catch (error) {
      console.error(error);
    }
  };

  // Reserve Slot
  const handleReserveSlot = async (id: string) => {
    const slot = slots.find((slot) => slot.id === id);
   

    const today = new Date().toISOString().slice(0, 10);
    if (slot.date < today) {
      toast.warning("You cannot reserve a past slot.");
      return;
    }

    try {
      await reserveSlot(id, "reserved");
      await fetchSlots();

      if (pathname === "/client-dashboard") {
        setStatus("reserved");
        setActiveIndex(2);
        setShowWarning(true);
      }
    toast.success("Slot reserved successfully.");

    } catch (error) {
      toast.error("This slot is no longer available.");
      console.error(error);
      await fetchSlots();
    }
  };

  // Book Slot
  const handleBookSlot = async (id: string) => {
    const slot = slots.find((slot) => slot.id === id);

    const today = new Date().toISOString().slice(0, 10);
    if (slot.date < today) {
      toast.warning("You cannot book a past slot.");
      return;
    }

    try {
      //await fetchSlots();
      await bookSlot(id, "booked");
      await fetchSlots();
      if (pathname === "/client-dashboard") {
        setStatus("booked");
        setActiveIndex(1);
      }
      toast.success("Slot booked successfully.");

    } catch (error) {
      toast.error("This slot is no longer available.");

      console.error(error);
      await fetchSlots();
    }
  };

  const availableSlotsNum = allUserSlots.filter(
    (slot)=> slot.status ==="available").length;
    
  const bookedSlotsNum = allUserSlots.filter(
      (slot)=> slot.status ==="booked"&&
    slot.client_id === userId 
    ).length;

  const reservedSlotsNum = allUserSlots.filter(
      (slot)=> slot.status ==="reserved" &&
    slot.client_id === userId 
    ).length;

  return {
    slots,
    status,
    activeIndex,
    showWarning,
    numReservedSlots,
    setStatus,
    setActiveIndex,
    setSlots,
    setShowWarning,
    setNumReservedSlots,
    fetchSlots,
    handleCancellationSlot,
    handleReserveSlot,
    handleBookSlot,
    loading,
    setLoading,
    availableSlotsNum,
    bookedSlotsNum,
    reservedSlotsNum
  };
}