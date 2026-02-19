"use client"
import { useState, useEffect } from "react";
import { Container, Box, Grid, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "sonner";

// Internal Components
import DashboardCard from "../_components/DashboardCard/DashboardCard";
import CreateSlotModal from "../_components/CreateSlotModal/CreateSlotModal";
import SlotsContainer from "../_components/SlotsContainer/SlotsContainer";

// Data & Services
import { topCardsData, filterSlotsData, importantInfoData } from "../_staticData/dashboardData";
import { getProviderSlots, getLoggedInUser, deleteSlot } from "../lib/data-service";

export default function ProviderDashboard() {
    // 1. Unified State
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("all");
    const [header, setHeader] = useState(filterSlotsData[0].title); 
    const [displayCreateSlotModal, setDisplayCreateSlotModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // 2. Fetch Logic
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const user = await getLoggedInUser();
        if (!user?.id) return;
        
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
      } catch (error) {
        // Rollback if database fails
        setSlots(previousSlots); 
        toast.error("Failed to delete slot on server");
      }
    };

    return (
      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        {/* Statistics Cards */}
        <Grid  spacing={2}  sx={{  display: "flex", flexWrap: "wrap", justifyContent: "space-between" , flexDirection: { xs: "column", md: "row" },  gap: 2 }}>
          {topCardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{  display: "flex",  justifyContent: "center" }}>
              <DashboardCard card={card} />
            </Grid>
          ))}
        </Grid>

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

        {/* Filter Tabs */}
        <Box sx={{ 
          mt: 4, display: "flex", gap: 1, flexWrap: "wrap", 
          backgroundColor: "#e7e7e7", p: 1, borderRadius: 2, width: "fit-content" 
        }}>
          {filterSlotsData.map((item, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: "1.5rem",
                p: { xs: 1, sm: 1.5 },
                borderRadius: 2,
                cursor: "pointer",
                backgroundColor: activeIndex === index ? "#ffffff" : "transparent",
                boxShadow: activeIndex === index ? "0px 2px 4px rgba(0,0,0,0.1)" : "none",
                fontWeight: activeIndex === index ? 600 : 400,
                transition: "all 0.2s",
                "&:hover": { backgroundColor: activeIndex === index ? "#ffffff" : "#f5f5f5" },
              }}
              onClick={() => {
                setActiveIndex(index);
                setStatus(item.status); 
                setHeader(item.title); 
              }}
            >
              {item.title}
            </Typography>
          ))}
        </Box>

        {/* Slots List Section - Now fully reactive to page state */}
        <SlotsContainer 
          header={header} 
          slots={slots} 
          onDelete={handleDeleteSlot} 
          loading={loading} 
        />

        {/* Important Info Footer */}
        <Box sx={{ mt: 5, backgroundColor: "#ffffff", p: 3, borderRadius: 2, border: "1px solid #eee" }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Important Information
          </Typography>
          {importantInfoData.map((info, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ mt: 1, fontSize: { xs: "1.5rem", sm: "2rem" }, color: 'text.secondary' }}
            >
              • {info.title}
            </Typography>
          ))}
        </Box>
      </Container>
    );
}