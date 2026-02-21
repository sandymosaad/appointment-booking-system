"use client"
import { Container, Box, Grid, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Internal Components
import DashboardTopCardsContainer from "../_components/DashboardTopCardsContainer/DashboardTopCardsContainer"
import FilterTabsContainer from "../_components/FilterTabsContainer/FilterTabsContainer"
import StaticDataContainer from "../_components/StaticDataContainer/StaticDataContainer"
import SlotsContainer from "../_components/SlotsContainer/SlotsContainer"
// Data & Services
import { filterSlotsData,stepsToBook, edgeCases } from "../_staticData/clientDashboardData";
import { getSlots } from "../lib/data-service";

export default function ClientDashboard() {
      // 1. Unified State
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("all");
    const [header, setHeader] = useState(filterSlotsData[0].title); 
    const [activeIndex, setActiveIndex] = useState(0);

    // 2. Fetch Logic
    const fetchSlots = async () => {
      try {
        setLoading(true);
        
        const slotsData = await getSlots(status);
        setSlots(slotsData || []); 
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load slots");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchSlots();
    }, [status]);

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

       <SlotsContainer 
          header={header} 
          slots={slots}
          isClient ={true}
          onDelete={()=>{}}
          loading={loading} 
        />
        <StaticDataContainer mainTitle="How to Book an Appointment" data={stepsToBook} />
        <StaticDataContainer mainTitle=" Edge Cases Handled" data={edgeCases} />

    </Container>
    
}

