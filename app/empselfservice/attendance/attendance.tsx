"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function EmployeeAttendance() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  // Demo attendance data – normally fetched from API
  const attendance = [
    { date: "2025-11-01", status: "Present", checkIn: "09:10 AM", checkOut: "06:15 PM" },
    { date: "2025-11-02", status: "Absent", checkIn: "-", checkOut: "-" },
    { date: "2025-11-03", status: "Leave", checkIn: "-", checkOut: "-" },
    { date: "2025-11-04", status: "Present", checkIn: "09:00 AM", checkOut: "06:10 PM" },
  ];

  const formattedDate = selected ? format(selected, "yyyy-MM-dd") : "";
  const todayRecord = attendance.find((a) => a.date === formattedDate);

  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const absentCount = attendance.filter((a) => a.status === "Absent").length;
  const leaveCount = attendance.filter((a) => a.status === "Leave").length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ✅ Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
          ESS
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Attendance</span>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Calendar Section */}
          <Card className="shadow-md border rounded-2xl">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> Attendance Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col items-center">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={(day) => setSelected(day)}
                required={false}
                modifiers={{
                  present: attendance
                    .filter((a) => a.status === "Present")
                    .map((a) => new Date(a.date)),
                  absent: attendance
                    .filter((a) => a.status === "Absent")
                    .map((a) => new Date(a.date)),
                  leave: attendance
                    .filter((a) => a.status === "Leave")
                    .map((a) => new Date(a.date)),
                  today: new Date(),
                }}
                modifiersClassNames={{
                  present: "bg-green-100 text-green-700 rounded-md",
                  absent: "bg-red-100 text-red-700 rounded-md",
                  leave: "bg-yellow-100 text-yellow-700 rounded-md",
                  today: "border border-blue-500 rounded-md",
                }}
                className="rounded-lg p-2"
              />

              <div className="flex gap-4 mt-4 text-sm text-gray-700">
                <span>🟩 Present</span>
                <span>🟥 Absent</span>
                <span>🟨 Leave</span>
              </div>
            </CardContent>
          </Card>

          {/* Daily Detail */}
          <Card className="shadow-md border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Daily Attendance Detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayRecord ? (
                <div className="space-y-3 text-gray-700">
                  <p><strong>Date:</strong> {formattedDate}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        todayRecord.status === "Present"
                          ? "text-green-600"
                          : todayRecord.status === "Absent"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {todayRecord.status}
                    </span>
                  </p>
                  <p><strong>Check-In:</strong> {todayRecord.checkIn}</p>
                  <p><strong>Check-Out:</strong> {todayRecord.checkOut}</p>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No attendance record found for this date.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="shadow-md border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Monthly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-gray-700 mb-4">
              <p>✅ Present: <strong>{presentCount}</strong></p>
              <p>❌ Absent: <strong>{absentCount}</strong></p>
              <p>🏖️ Leave: <strong>{leaveCount}</strong></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border-b">Date</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Check-In</th>
                    <th className="px-4 py-2 border-b">Check-Out</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record.date} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{record.date}</td>
                      <td
                        className={`px-4 py-2 border-b font-medium ${
                          record.status === "Present"
                            ? "text-green-600"
                            : record.status === "Absent"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {record.status}
                      </td>
                      <td className="px-4 py-2 border-b">{record.checkIn}</td>
                      <td className="px-4 py-2 border-b">{record.checkOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
