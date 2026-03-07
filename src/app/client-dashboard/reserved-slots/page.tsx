import SlotsBasedOnStatus from "../../_components/SlotsBasedOnStatus/SlotsBasedOnStatus"
export default function Reserved() {
  return (
    <SlotsBasedOnStatus 
    status={"reserved"}
    header={'Reserved Slots'}
    para= {'There ara no reserved slots'}
    />
  );
}