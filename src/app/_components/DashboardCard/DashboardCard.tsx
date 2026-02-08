import { Card, CardContent, Typography } from "@mui/material";

export default function DashboardCard({ card }) {
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        minWidth: 375,
        width: "100%",
        height: "100%" ,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
      }}
    >
      <CardContent>
        <Typography variant="h4">
          {card.title}
        </Typography>

        <Typography variant="h3" color="text.secondary">
          {card.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

