const filterSlotsData=[
    {
        title:"Available Slots",
        status:"available"
    },
    {
        title:"My Upcoming Bookings",
        status:"booked"
    },
    {
        title:"Reserved Slots",
        status:"reserved"
    },
    {
        title:"Past Bookings",
        status:"past"
    },

]

const stepsToBook =[
    {
     title:"Option 1 - Quick Booking:",
     body:'Click "Book Now" to immediately book a slot'
    },
    {
     title:"Option 2 - Reserve First:",
     body:' Click "Reserve Slot" to hold it for 5 minutes while you decide, then confirm'
    },
    {
     body:'• You can cancel bookings up to 24 hours before the appointment'
    },
    {
     body:'• Reserved slots expire after 5 minutes if not confirmed'
    },
    {
     body:"• If someone else books a slot while you're viewing it, you'll see an error message"
    },
]

const edgeCases =[
    {
     title:"✓ Double Booking Prevention:",
     body:'If two users try to book the same slot, only the first succeeds'
    },
    {
     title:"✓ Reservation Timeout:",
     body:'Reserved slots automatically become available after 5 minutes'
    },
    {
     title:"✓ Page Refresh:",
     body:'Your reservations and bookings persist (in this demo, state is in-memory)'
    },
    {
     title:"✓ Provider Cancellation:",
     body:" If a provider deletes your booked slot, you'll see it as cancelled"
    }
]

export { filterSlotsData , stepsToBook ,edgeCases}