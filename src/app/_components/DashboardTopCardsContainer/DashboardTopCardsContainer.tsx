import { Grid} from "@mui/material";
import DashboardCard from "../DashboardCard/DashboardCard";

export default function DashboardTopCardsContainer({topCardsData,loading}) {
  return (
    <Grid  spacing={2}  sx={{  display: "flex", flexWrap: "wrap", justifyContent: "space-between" , flexDirection: { xs: "column", md: "row" },  gap: 2 }}>
        {topCardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{  display: "flex",  justifyContent: "center" }}>
            <DashboardCard card={card} loading={loading} />
            </Grid>
        ))}
    </Grid>
  )
}

