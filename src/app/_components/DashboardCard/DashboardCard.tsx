// import { Card, CardContent, Typography } from "@mui/material";

// export default function DashboardCard({ card }) {
//   return (
//     <Card
//       sx={{
//         p: 2,
//         borderRadius: 2,
//         boxShadow: 2,
//         width: "100%",
//         height: "100%",
//         minWidth: { xs: "100%", md: 500 },
//         transition: "0.3s",
//            display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//         "&:hover": {
//           boxShadow: 6,
//           transform: "translateY(-5px)",
//         },
//       }}
//     >

//       <CardContent>
//         <Typography variant="h4">
//           {card.title}
//         </Typography>

//         <Typography variant="h3" color="text.secondary">
//           {card.body}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, Typography } from "@mui/material";

export default function DashboardCard({ card }) {
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
        },
      }}
    >
      <CardContent sx={{ p: 0, textAlign: "center" }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{fontSize:"2rem"}}>
          {card.title}
        </Typography>

        <Typography variant="h4" sx={{ mt: 1 }}>
          {card.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
