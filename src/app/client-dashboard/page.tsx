"use client"
import { Container, Box, Typography } from "@mui/material";
import { useState } from "react";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
// Internal Components
import DashboardTopCardsContainer from "../_components/DashboardTopCardsContainer/DashboardTopCardsContainer"
import FilterTabsContainer from "../_components/FilterTabsContainer/FilterTabsContainer"
import StaticDataContainer from "../_components/StaticDataContainer/StaticDataContainer"
import SlotsContainer from "../_components/SlotsContainer/SlotsContainer"
// Data & Services
import { filterSlotsData,stepsToBook, edgeCases } from "../_staticData/clientDashboardData";
import { useClientSlots } from "./useClientSlots";

export default function ClientDashboard() {
      // 1. Unified State
    const {slots, activeIndex, showWarning, numReservedSlots, setStatus, setActiveIndex,setNumReservedSlots, fetchSlots, handleCancellationSlot, handleReserveSlot, handleBookSlot, loading, setLoading} = useClientSlots('available');     
    const [header, setHeader] = useState(filterSlotsData[0].title); 
    const topCardsData=[
        {title:"Upcoming Bookings", body:"3" , path:'client-dashboard/upcoming-bookings'},
        {title:"Reserved (Pending)", body:"2", path:'client-dashboard/reserved-slots'},
        {title:"Available Slots", body:"2" , path:'client-dashboard/available-slots'},
    ]
    function filterTabOnClick (item){
      setStatus(item.status); 
      setHeader(item.title); 
    }
   
  return <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        <DashboardTopCardsContainer topCardsData={topCardsData} loading={false} />
        {showWarning && numReservedSlots>0 &&
        <Box
          sx={{
            backgroundColor: "warning.light",
            p: 2,
            mt: 2,
            borderRadius: 2,
            color: "warning.contrastText",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "2rem", display: "flex", alignItems: "center" }}>
            <NewReleasesIcon sx={{ mr: 1 }} />
            You have {numReservedSlots} reserved slot(s)
          </Typography>

          <Typography sx={{ fontSize: "1.5rem" }}>
            Please confirm your booking within 5 minutes or the reservation will expire.
          </Typography>
        </Box>}
        <FilterTabsContainer
          filterSlotsData={filterSlotsData}
          filterTabOnClick={filterTabOnClick}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setStatus ={setStatus}
        />

       <SlotsContainer 
          header={header}
          slots={slots}
          isClient ={true}
          onDelete={()=>{}}
          onReserved={handleReserveSlot}
          onBook = {handleBookSlot}
          onCancelReserved={handleCancellationSlot}
          loading={loading} 
          setNumReservedSlots={setNumReservedSlots}
          refresh={fetchSlots}
        />
        <StaticDataContainer mainTitle="How to Book an Appointment" data={stepsToBook} />
        <StaticDataContainer mainTitle=" Edge Cases Handled" data={edgeCases} />

    </Container>  
}

