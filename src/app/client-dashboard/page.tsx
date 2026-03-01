"use client"
import { Container, Box, Grid, Button, Typography } from "@mui/material";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
// Internal Components
import DashboardTopCardsContainer from "../_components/DashboardTopCardsContainer/DashboardTopCardsContainer"
import FilterTabsContainer from "../_components/FilterTabsContainer/FilterTabsContainer"
import StaticDataContainer from "../_components/StaticDataContainer/StaticDataContainer"
import SlotsContainer from "../_components/SlotsContainer/SlotsContainer"
// Data & Services
import { filterSlotsData,stepsToBook, edgeCases } from "../_staticData/clientDashboardData";
import { getSlots, getLoggedInUser , cancelSlotByClient,reserveSlot, bookSlot} from "../lib/data-service";

export default function ClientDashboard() {
      // 1. Unified State
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [status, setStatus] = useState("available");
    const [header, setHeader] = useState(filterSlotsData[0].title); 
    const [activeIndex, setActiveIndex] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [numReservedSlots, setNumReservedSlots] = useState(0);

    const topCardsData=[
        {title:"Upcoming Bookings", body:"3"},
        {title:"Reserved (Pending)", body:"2"},
        {title:"Available Slots", body:"2"},
    ]
    // 2. Fetch Logic
    const fetchSlots = async () => {
          let slotsData: any[] = [];
      try {
        setLoading(true);
        slotsData = await getSlots(status);
        setSlots(slotsData || []); 
        console.log(slotsData)
        // const user = await getLoggedInUser();

        // const reservedCount = slotsData.filter((slot) => {
        //   return (
        //     slot.client_id === user.id && slot.status ==="reserved"
        //   );
        // });

        // setNumReservedSlots(reservedCount.length)
        // if (reservedCount.length >0){
        //       setShowWarning(true);
        // }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load slots");
      } finally {
        setLoading(false);
      }
      return slotsData;
    };
    useEffect(() => {
      const loadData = async () => {
        const slots = await fetchSlots();

        // const slotsReserved = await getSlots("reserved");

        // if (slotsReserved.length > 0) {
        //   setShowWarning(true);
        //   setNumReservedSlots(slotsReserved.length)
        // }
        const user = await getLoggedInUser();
        const reservedCount = slots.filter((slot) => {
          return (
            slot.client_id === user.id && slot.status ==="reserved"
          );
        });
        if (reservedCount.length > 0) {
          setShowWarning(true);
          setNumReservedSlots(reservedCount.length)
        }
      };

      loadData();
    }, [status]);

    function filterTabOnClick (item){
      setStatus(item.status); 
      setHeader(item.title); 
    }
    // Handle Reserve Slot
    const handleReserveSlot = async (id: string) => {
      const slot = slots.find((slot) => slot.id === id);

      if (!slot) return;

      const today = new Date().toISOString().slice(0, 10);

      if (slot.date < today) {
        toast.warning("You cannot reserve a past slot.");
        return;
      }

      try {
        await reserveSlot(id, "reserved");
        fetchSlots();

        // const user = await getLoggedInUser();
        // const updatedSlots = await getSlots();
        // const reservedCount = updatedSlots.filter((slot) => {
        //   return (
        //     slot.client_id === user.id
        //   );
        // });

        // setNumReservedSlots(reservedCount.length)
        setShowWarning(true);
      } catch (error) {
        console.error(error);
      }
    };
    // Handle Book Slot
    const handleBookSlot = async (id: string) => {
      const slot = slots.find((slot) => slot.id === id);

      if (!slot) return;

      const today = new Date().toISOString().slice(0, 10);

      if (slot.date < today) {
        toast.warning("You cannot book a past slot.");
        return;
      }

      try {
        await bookSlot(id, "booked");

        fetchSlots();
      } catch (error) {
        console.error(error);
      }
    };
    // Handle cancellation click
  const handleCancellationSlot = async (id: string) =>{
     const slot = slots.find((slot) => slot.id === id);
      if (!slot) return;
      try {
        await cancelSlotByClient(id);
        fetchSlots();
      } catch (error) {
        console.error(error);
      }
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

