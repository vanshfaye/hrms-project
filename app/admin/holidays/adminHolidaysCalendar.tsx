"use client";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { holidays } from "./data/holidays";

export default function AdminHolidaysCalendar() {
  const holidayDates = holidays.map((h : any) => new Date(h.date));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
      <DayPicker
        mode="multiple"
        selected={holidayDates}
        disabled={{ before: new Date(2026, 0, 1), after: new Date(2026, 11, 31) }}
        modifiers={{
          holiday: holidayDates,
        }}
        modifiersClassNames={{
          holiday: "bg-red-200 text-red-800 rounded-full",
        }}
      />
      <p className="mt-2 text-sm text-gray-500">Red dates indicate holidays.</p>
    </div>
  );
}
