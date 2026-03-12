import {  Box, Typography } from "@mui/material";

export default function StaticDataContainer({mainTitle , data}) {
  return (
    
  <Box sx={{ mt: 5, backgroundColor: "#ffffff", p: 3, borderRadius: 2, border: "1px solid #eee" }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
           {mainTitle}
          </Typography>
          {data.map((step, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ mt: 1, fontSize: { xs: "1.5rem", sm: "2rem" }, color: 'text.secondary' }}
            >
            {step.title && 
              <Typography
                component="span"
                sx={{ fontWeight: 700, fontSize: "2rem", mr: 1 }}
                >
                {step.title}
              </Typography>
            }
               {step.body}
            </Typography>
          ))}
    </Box>
  )
}

