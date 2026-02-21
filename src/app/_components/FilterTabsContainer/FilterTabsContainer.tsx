import { Box, Typography } from "@mui/material";

export default function FilterTabsContainer({filterSlotsData ,activeIndex,setActiveIndex , filterTabOnClick}) {
  
  return (
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
                filterTabOnClick(item);
              }}
            >
              {item.title}
            </Typography>
          ))}
        </Box>
  )
}
