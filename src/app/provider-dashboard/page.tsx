"use client"
import { useState, useEffect } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "sonner";

// Internal Components
import CreateSlotModal from "../_components/CreateSlotModal/CreateSlotModal";
import SlotsContainer from "../_components/SlotsContainer/SlotsContainer";
import DashboardTopCardsContainer from "../_components/DashboardTopCardsContainer/DashboardTopCardsContainer"
import FilterTabsContainer from "../_components/FilterTabsContainer/FilterTabsContainer"
import StaticDataContainer from "../_components/StaticDataContainer/StaticDataContainer"

// Data & Services
import { filterSlotsData, importantInfoData } from "../_staticData/providerDashboardData";
import { getProviderSlots, getLoggedInUser, deleteSlot } from "../lib/data-service";

export default function ProviderDashboard() {
    // 1. Unified State
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("all");
    const [header, setHeader] = useState(filterSlotsData[0].title); 
    const [displayCreateSlotModal, setDisplayCreateSlotModal] = useState(false);
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
        toast.success("Slot canceled");
        fetchSlots()
      } catch (error) {
        // Rollback if database fails
        setSlots(previousSlots); 
        toast.error("Failed to delete slot on server");
      }
    };
    const todayDate = new Date().toISOString().slice(0, 10);
   
    const todaySlotsNum = allProviderSlots.filter(
      (slot) => slot.date === todayDate
    ).length;
    
    const availableSlotsNum = allProviderSlots.filter(
      (slot)=> slot.status ==="available"
    ).length;
    
    const bookedSlotsNum = allProviderSlots.filter(
      (slot)=> slot.status ==="booked"
    ).length;

    const topCardsData=[
        {title:"Today's Appointments", body:todaySlotsNum},
        {title:"Available Slots", body:availableSlotsNum},
        {title:"Upcoming Bookings", body:bookedSlotsNum},
    ]

    function filterTabOnClick (item){
      setStatus(item.status); 
      setHeader(item.title); 
    }
    return (
      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        <DashboardTopCardsContainer topCardsData={topCardsData} loading={loading} />
        {/* Action Button */}
        <Button 
          variant="contained"
          color="primary" 
          sx={{ mt: 3, fontSize: 16, py: 1.5, px: 3 }}
          onClick={() => setDisplayCreateSlotModal(prev => !prev)}
        >
          <AddIcon sx={{ mr: 1 }} />
          {displayCreateSlotModal ? "Close Form" : "Create New Slot"}
        </Button>
        {/* Modal/Form Section */}
        {displayCreateSlotModal && (
          <CreateSlotModal 
            slots={slots}
            onRefresh={fetchSlots} 
            onClose={() => setDisplayCreateSlotModal(false)}
          />
        )}

        <FilterTabsContainer
          filterSlotsData={filterSlotsData}
          filterTabOnClick={filterTabOnClick}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setStatus={setStatus}
        />

        <SlotsContainer 
          header={header} 
          slots={slots} 
          onDelete={handleDeleteSlot} 
          loading={loading}
          isClient={false} 
        />

        {/* Important Info Footer */}
        <StaticDataContainer mainTitle="Important Information" data={importantInfoData} />
      </Container>
    );
}