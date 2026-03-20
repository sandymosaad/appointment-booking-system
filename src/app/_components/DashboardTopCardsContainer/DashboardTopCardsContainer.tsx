import { Grid } from "@mui/material"; 
import DashboardCard from "../DashboardCard/DashboardCard";

export default function DashboardTopCardsContainer({ topCardsData, loading }) {
  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ justifyContent: "space-between" }}
    >
      {topCardsData.map((card, index) => (
        <Grid 
          key={index} 
          size={{ xs: 12, sm: 6, md: 4 }} 
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <DashboardCard card={card} loading={loading} />
        </Grid>
      ))}
    </Grid>
  );
}