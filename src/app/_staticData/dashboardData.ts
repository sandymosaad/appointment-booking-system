
const topCardsData=[
    {title:"Today's Appointments", body:"3"},
    {title:"Available Slots", body:"0"},
    {title:"Upcoming Bookings", body:"2"},
]
const filterSlotsData=[
    {
        title:"All Slots",
        status:"all"
    },
    {
        title:"Upcoming Appointments",
        status:"booked"
    },
    {
        title:"Available Slots",
        status:"available"
    },
    // {title:"Today's Schedule"},
  

]

const importantInfoData=[
    {title:" When you cancel a slot that has a booking, the client's booking will be automatically cancelled"},
    {title:"You cannot create overlapping slots"},
    {title:" Slots cannot be created in the past"},
    {title:"End time must be after start time"},

]
export {topCardsData, filterSlotsData, importantInfoData}