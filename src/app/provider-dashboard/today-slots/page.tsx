import SlotsBasedOnStatus from "../../_components/SlotsBasedOnStatusProvider/SlotsBasedOnStatus"
export default function TodaySlots() {
  return (
    <SlotsBasedOnStatus 
    status={"all"}
    header={'Today Slots'}
    para= {'There ara no slots today'}
    />
  );
}