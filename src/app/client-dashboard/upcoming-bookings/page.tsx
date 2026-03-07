import SlotsBasedOnStatus from "../../_components/SlotsBasedOnStatus/SlotsBasedOnStatus"
export default function UpcomingBookings() {
  return (
    <SlotsBasedOnStatus 
    status={"booked"}
    header={'Upcoming Bookings'}
    para= {'You have no upcoming bookings'}
    />
  );
}