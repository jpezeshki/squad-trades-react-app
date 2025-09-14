import { title } from "@/components/primitives";
import { Calendar } from "@heroui/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function EarningsCalendarPage() {
  return (
    <div>
      <h1 className={title()}>Earnings Calendar</h1>
    </div>
  );
}





// Calendar example
{/* <Calendar isReadOnly aria-label="Date (Read Only)" value={today(getLocalTimeZone())} />; */}


// Min date example
// <Calendar
//   aria-label="Date (Min Date Value)"
//   defaultValue={today(getLocalTimeZone())}
//   minValue={today(getLocalTimeZone())}
// />

// Max date example
// <Calendar
//   aria-label="Date (Max Date Value)"
//   defaultValue={today(getLocalTimeZone())}
//   maxValue={today(getLocalTimeZone())}
// />
