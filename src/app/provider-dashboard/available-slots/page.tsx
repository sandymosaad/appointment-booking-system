import SlotsBasedOnStatus from "../../_components/SlotsBasedOnStatusProvider/SlotsBasedOnStatus"
export default function Available() {
  return (
    <SlotsBasedOnStatus 
    status={"available"}
    header={'Available Slots'}
    para= {'There ara no Available slots'}
    />
  );
}