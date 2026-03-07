import SlotsBasedOnStatus from "../../_components/SlotsBasedOnStatusProvider/SlotsBasedOnStatus"
export default function UpcomingBookings() {
  return (
    <SlotsBasedOnStatus 
    status={"booked"}
    header={'Upcoming Bookings'}
    para= {'You have no upcoming bookings'}
    />
  );
}