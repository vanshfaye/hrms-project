"use client";

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface EventData {
  date: string;
  type: string;
  description: string;
  location: string;
  status: string;
}

const HrmsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [calendarName, setCalendarName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [location, setLocation] = useState("");
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [events, setEvents] = useState<EventData[]>([
    {
      date: "2025-01-01",
      type: "Holiday",
      description: "New Year",
      location: "All",
      status: "Active",
    },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const workingDayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const resetForm = () => {
    setCalendarName("");
    setYear(new Date().getFullYear());
    setLocation("");
    setWorkingDays([]);
    setSelectedDate(undefined);
    setEditingIndex(null);
  };

  const handleSave = () => {
    // ✅ Validation (with clearer logic)
    if (calendarName.trim() === "" || !selectedDate || location.trim() === "") {
      alert("Please fill Calendar Name, Date, and Location");
      return;
    }

    const newEvent: EventData = {
      date: selectedDate.toISOString().split("T")[0],
      type: "Holiday",
      description: calendarName.trim(),
      location: location.trim(),
      status: "Active",
    };

    if (editingIndex !== null) {
      const updated = [...events];
      updated[editingIndex] = newEvent;
      setEvents(updated);
    } else {
      setEvents([...events, newEvent]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const event = events[index];
    setCalendarName(event.description);
    setYear(new Date(event.date).getFullYear());
    setLocation(event.location);
    setSelectedDate(new Date(event.date)); // ✅ Fix: ensure selectedDate is set correctly
    setEditingIndex(index);
    setShowForm(true); // ✅ Show form properly
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((_, i) => i !== index));
    }
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text("HRMS Calendar Events", 14, 10);
    autoTable(doc, {
      head: [["Date", "Type", "Description", "Location", "Status"]],
      body: events.map((e) => [e.date, e.type, e.description, e.location, e.status]),
    });
    doc.save("calendar_events.pdf");
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-4">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-600 bg-white px-4 py-2 rounded-lg shadow mb-4">
        <Link href="/hrms" className="font-medium hover:text-blue-600">
          HRMS
        </Link>
        <span className="mx-1 text-gray-400">/</span>
        <Link href="/hrms/admin" className="font-medium hover:text-blue-600">
          Admin
        </Link>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Calendar</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white px-4 py-3 rounded-lg shadow mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Calendar Management
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAddNew}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + Add Calendar
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            Export Calendar
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className={`flex flex-col space-y-4 ${showForm ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <div className="bg-white rounded-lg border p-3">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-3">
            <h3 className="text-base font-semibold mb-2">Holiday / Events List</h3>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm min-w-[600px]">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Location</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-2 border">{row.date}</td>
                      <td className="p-2 border">{row.type}</td>
                      <td className="p-2 border">{row.description}</td>
                      <td className="p-2 border">{row.location}</td>
                      <td className="p-2 border">{row.status}</td>
                      <td className="p-2 border text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(idx)}
                            className="p-1 bg-yellow-100 rounded hover:bg-yellow-200"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(idx)}
                            className="p-1 bg-red-100 rounded hover:bg-red-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
     {showForm && (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">
      {editingIndex !== null ? "Edit Calendar" : "New Calendar"}
    </h3>

    {/* Calendar Name */}
    <div className="space-y-2">
      <label className="text-gray-700 font-medium text-sm">Calendar Name</label>
      <input
        type="text"
        value={calendarName}
        onChange={(e) => setCalendarName(e.target.value)}
        className="w-full border rounded px-2 py-1 text-sm"
        placeholder="Enter calendar name"
      />
    </div>

    {/* Date Picker Field */}
    <div className="space-y-2">
      <label className="text-gray-700 font-medium text-sm">Select Date</label>
      <input
        type="date"
        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        className="w-full border rounded px-2 py-1 text-sm"
      />
    </div>

    {/* Year */}
    {/* <div className="space-y-2">
      <label className="text-gray-700 font-medium text-sm">Year</label>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-full border rounded px-2 py-1 text-sm"
      />
    </div> */}

    {/* Location */}
    <div className="space-y-2">
      <label className="text-gray-700 font-medium text-sm">Location / Branch</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border rounded px-2 py-1 text-sm"
        placeholder="Enter location"
      />
    </div>

    {/* Working Days */}
    <div>
      <span className="block text-gray-700 font-medium mb-1 text-sm">
        Working Days
      </span>
      <div className="flex flex-wrap gap-2">
        {workingDayOptions.map((day) => (
          <label key={day} className="flex items-center space-x-1 text-sm">
            <input
              type="checkbox"
              checked={workingDays.includes(day)}
              onChange={() =>
                setWorkingDays((prev) =>
                  prev.includes(day)
                    ? prev.filter((d) => d !== day)
                    : [...prev, day]
                )
              }
            />
            <span>{day}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Buttons */}
    <div className="flex space-x-2 pt-3">
      <button
        onClick={handleSave}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        Save
      </button>
      <button
        onClick={handleCancel}
        className="flex-1 px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300"
      >
        Cancel
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default HrmsCalendar;
