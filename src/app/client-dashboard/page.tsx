"use client"
import { Container, Box, Grid, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "sonner";
import { useState } from "react";

// Internal Components
import DashboardTopCardsContainer from "../_components/DashboardTopCardsContainer/DashboardTopCardsContainer"
import FilterTabsContainer from "../_components/FilterTabsContainer/FilterTabsContainer"
import StaticDataContainer from "../_components/StaticDataContainer/StaticDataContainer"
// Data & Services
import { filterSlotsData,stepsToBook, edgeCases } from "../_staticData/clientDashboardData";

export default function ClientDashboard() {
      // 1. Unified State
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("all");
    const [header, setHeader] = useState(filterSlotsData[0].title); 
    const [activeIndex, setActiveIndex] = useState(0);

    const topCardsData=[
        {title:"Upcoming Bookings", body:"3"},
        {title:"Reserved (Pending)", body:"2"},
        {title:"Available Slots", body:"2"},
    ]

    function filterTabOnClick (item){
      setStatus(item.status); 
      setHeader(item.title); 
    }
  return <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        <DashboardTopCardsContainer topCardsData={topCardsData} loading={false} />
        
        <FilterTabsContainer
          filterSlotsData={filterSlotsData}
          filterTabOnClick={filterTabOnClick}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />


        <StaticDataContainer mainTitle="How to Book an Appointment" data={stepsToBook} />
        <StaticDataContainer mainTitle=" Edge Cases Handled" data={edgeCases} />

    </Container>
    
}

