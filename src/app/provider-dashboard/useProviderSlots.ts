// hooks/useClientSlots.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

import {getSlots, getProviderSlots, getLoggedInUser, deleteSlot } from "../lib/data-service";

// Data & Services
import { filterSlotsData } from "../_staticData/providerDashboardData";

export function useProviderSlots(initialStatus = "all") {
     // 1. Unified State
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(initialStatus);
    const [activeIndex, setActiveIndex] = useState(0);
    const [allProviderSlots, setAllProviderSlots] = useState<any[]>([]);

    // 2. Fetch Logic
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const user = await getLoggedInUser();
        if (!user?.id) return;

        const allSlots = await getProviderSlots(user.id); 
        setAllProviderSlots(allSlots || []);

        const slotsData = await getProviderSlots(user.id, status);
        setSlots(slotsData || []); 
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load slots");
      } finally {
        setLoading(false);
      }
    };

    // Re-run fetch when filter (status) changes
    useEffect(() => {
      fetchSlots();
    }, [status]);

    // 3. Instant (Optimistic) Deletion
    const handleDeleteSlot = async (id) => {
      const previousSlots = [...slots];
      
      // Update UI immediately
      setSlots(slots.filter(s => s.id !== id));
      
      try {
        await deleteSlot(id);
        fetchSlots()
        toast.success("Slot canceled");
      } catch (error) {
        // Rollback if database fails
        setSlots(previousSlots); 
        toast.error("Failed to delete slot on server");
      }
    };
    const todayDate = new Date().toISOString().slice(0, 10);
   
    const todaySlots = allProviderSlots.filter(
      (slot) => slot.date === todayDate
    );
    const todaySlotsNum =todaySlots.length;
    const availableSlotsNum = allProviderSlots.filter(
      (slot)=> slot.status ==="available"
    ).length;
    
    const bookedSlotsNum = allProviderSlots.filter(
      (slot)=> slot.status ==="booked"
    ).length;

  return {
    slots,
    status,
    activeIndex,
    setStatus,
    setActiveIndex,
    setSlots,
    fetchSlots,
    loading,
    setLoading,
    handleDeleteSlot,
    availableSlotsNum,
    bookedSlotsNum,
    todaySlotsNum,
    todaySlots
  };
}