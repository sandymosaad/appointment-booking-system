import { Card, CardContent, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DashboardCard({ card  , loading}) {
  const router =useRouter(  )
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        minWidth: { xs: "100%", md: 370 },
        // mx: "auto",               
        height: 140,              
        transition: "0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-5px)",
          cursor:"pointer"
        },
      }}
      onClick={() => router.push(card.path)}
    >
      <CardContent sx={{ p: 0, textAlign: "center" }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{fontSize:"2rem"}}>
          {card.title}
        </Typography>

        <Typography variant="h4" sx={{ mt: 1 }}>
          {loading  ? <CircularProgress /> :card.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
