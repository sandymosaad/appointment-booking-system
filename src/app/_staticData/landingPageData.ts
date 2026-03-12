   
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import EventIcon from "@mui/icons-material/Event";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckIcon from "@mui/icons-material/Check";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HowToRegIcon from "@mui/icons-material/HowToReg";

   const keyFeatures=[
            {
                icon:AccessTimeIcon,
                title:"Real-Time Availability",
                body:"See available slots instantly. No double bookings, no conflicts. What you see is what you get.",
                iconColor:"rgb(41, 1, 78)"
            },
            {
                icon:FlashOnIcon,
                title:"Quick Booking",
                body:"Book appointments in seconds. Reserve slots to think, or book instantly. Your choice.",
                iconColor:"warning"
            },
            {
                icon:SecurityIcon,
                title:"Smart Protection",
                body:"Automatic reservation timeouts, cancellation policies, and conflict prevention built-in.",
                iconColor:"success"

            },
        ]
    const serviceProviders =[
      {
        title:"Create Availability Slots",
        body:"Set your available times and let clients book",
      },
      {
        title:"Manage Your Schedule",
        body:"View daily, weekly appointments at a glance",
      },
      {
        title:"Prevent Conflicts",
        body:"Automatic overlap detection ensures no scheduling mistakes",
      },
      {
        title:"Cancel or Reschedule",
        body:"Flexibility to manage your appointments",
      }
    ]
    const serviceProvidersCards =[
      { 
        icon:CalendarMonthIcon,
        cardBackgroundColor: ' rgb(247, 209, 250)',
        iconColor:'rgb(41, 1, 78)',
        iconBackground:"rgb(216, 179, 250)",
        title:"Create Slots",
        body:"Set your availability",
      },
      {
        cardBackgroundColor: '  rgb(221, 252, 215)',
        iconColor:' rgb(2, 44, 24)',
        iconBackground:"rgb(165, 252, 162)",
        icon:HowToRegIcon,
        title:"Clients Book",
        body:"Receive bookings automatically",
      },
      {
        cardBackgroundColor: 'rgb(248, 244, 227)',
        iconColor:'rgba(34, 26, 7, 0.48)',
        iconBackground:"rgb(252, 245, 189)",
        icon:CheckIcon,
        title:"Manage Schedule",
        body:"Track all appointments",
      }
    ]
    
    const serviceClients =[
      {
        title:"Find Available Slots",
        body:"Browse all available appointment times",
      },
      {
        title:"Reserve Before Booking",
        body:"Hold a slot for 5 minutes while you decide",
      },
      {
        title:"Instant Booking",
        body:"Or book immediately without waiting",
      },
      {
        title:"Flexible Cancellation",
        body:"Cancel up to 24 hours before appointment",
      }
    ]
    const serviceClientsCards =[
      { 
        icon:CalendarMonthIcon,
        cardBackgroundColor: ' rgb(247, 209, 250)',
        iconColor:'rgb(41, 1, 78)',
        iconBackground:"rgb(216, 179, 250)",
        title:"Browse Slots",
        body:"View available times",
      },
      {
        cardBackgroundColor: '  rgb(221, 252, 215)',
        iconColor:' rgb(2, 44, 24)',
        iconBackground:"rgb(165, 252, 162)",
        icon:HowToRegIcon,
        title:"Reserve or Book",
        body:"Hold a slot or book instantly",
      },
      {
        cardBackgroundColor: 'rgb(248, 244, 227)',
        iconColor:'rgba(34, 26, 7, 0.48)',
        iconBackground:"rgb(252, 245, 189)",
        icon:CheckIcon,
        title:"Confirmed!",
        body:"Get your appointment",
      }
    ]
    const stepsToWork=[
            {
                step:1,
                title:"Sign Up",
                body:"Choose your role: Provider or Client",
                stepColor:"rgb(41, 1, 78)",
                stepBackgroundColor:"rgb(216, 179, 250)",
            },
            {
                step:2,
                title:"Set Up",
                body:"Providers create slots, Clients browse",
                stepColor:'rgba(34, 26, 7, 0.48)',
                stepBackgroundColor:"rgb(252, 245, 189)",
            },
            {
                step:3,
                title:"Book",
                body:"Reserve or book appointments instantly",
                stepColor:' rgb(2, 44, 24)',
                stepBackgroundColor:"rgb(165, 252, 162)",

            },
            {
                step:4,
                title:"Manage",
                body:"Track and manage all your appointments",
                stepColor:'rgba(34, 26, 7, 0.48)',
                stepBackgroundColor:"rgb(252, 245, 189)",

            },
        ]


export {keyFeatures,serviceProviders,serviceProvidersCards,serviceClients,serviceClientsCards,stepsToWork }