"use client"
import { useState } from "react";
import { Container, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Internal Components
import CreateSlotModal from "../_components/CreateSlotModal/CreateSlotModal";
import SlotsContainer from "../_components/SlotsContainer/SlotsContainer";
import DashboardTopCardsContainer from "../_components/DashboardTopCardsContainer/DashboardTopCardsContainer"
import FilterTabsContainer from "../_components/FilterTabsContainer/FilterTabsContainer"
import StaticDataContainer from "../_components/StaticDataContainer/StaticDataContainer"

// Data & Services
import { filterSlotsData, importantInfoData } from "../_staticData/providerDashboardData";

import {useProviderSlots} from "./useProviderSlots"
export default function ProviderDashboard() {
    const {
      slots, activeIndex, setStatus, setActiveIndex,
      fetchSlots, loading, handleDeleteSlot,
      availableSlotsNum, bookedSlotsNum, todaySlotsNum
      } = useProviderSlots('all')

    const [header, setHeader] = useState(filterSlotsData[0].title); 
    const [displayCreateSlotModal, setDisplayCreateSlotModal] = useState(false);
   
    const topCardsData=[
        {title:"Today's Appointments", body:todaySlotsNum ,path:"/provider-dashboard/today-slots"},
        {title:"Available Slots", body:availableSlotsNum, path:"/provider-dashboard/available-slots"},
        {title:"Upcoming Bookings", body:bookedSlotsNum, path:"/provider-dashboard/booked-slots"},
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