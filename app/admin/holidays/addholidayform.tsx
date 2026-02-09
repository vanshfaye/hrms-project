"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { holidays as HolidayType } from "./data/holidays";

interface Props {
  holidays: typeof HolidayType;
  setHolidays: React.Dispatch<React.SetStateAction<typeof HolidayType>>;
}

export default function AddHolidayForm({ holidays, setHolidays }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Public");
  const [scope, setScope] = useState("Company");
  const [isPaid, setIsPaid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHoliday = {
      id: String(Date.now()),
      name,
      date,
      type,
      scope,
      isPaid,
      addedBy: "Admin",
    };
    setHolidays([...holidays, newHoliday]);
    setName(""); setDate(""); setType("Public"); setScope("Company"); setIsPaid(true);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1">Holiday Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1">Date</label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1">Type</label>
        <select className="w-full p-2 border rounded" value={type} onChange={e => setType(e.target.value)}>
          <option value="Public">Public</option>
          <option value="Optional">Optional</option>
          <option value="Company">Company</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Scope</label>
        <Input value={scope} onChange={e => setScope(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1">Paid?</label>
        <input type="checkbox" checked={isPaid} onChange={e => setIsPaid(e.target.checked)} />
      </div>
      <Button type="submit">Add Holiday</Button>
    </form>
  );
}
