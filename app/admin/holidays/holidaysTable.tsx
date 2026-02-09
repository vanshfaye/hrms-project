"use client";
import { holidays as dummyHolidays } from "./data/holidays"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminHolidaysTable() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Holidays Overview</h2>
        <Button variant="outline">Export CSV</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Scope</TableCell>
            <TableCell>Paid?</TableCell>
            <TableCell>Added By</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyHolidays.map((holiday) => (
            <TableRow key={holiday.id}>
              <TableCell>{holiday.name}</TableCell>
              <TableCell>{holiday.date}</TableCell>
              <TableCell>{holiday.type}</TableCell>
              <TableCell>{holiday.scope}</TableCell>
              <TableCell>{holiday.isPaid ? "Yes" : "No"}</TableCell>
              <TableCell>{holiday.addedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
