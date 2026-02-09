"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Edit, Trash2, Download } from "lucide-react";
import Link from "next/link"
// Attendance data
const attendanceData = [
  { id: 1, name: "Alice", department: "Finance", location: "NY", status: "Present", checkIn: "09:05", checkOut: "17:00" },
  { id: 2, name: "Bob", department: "HR", location: "LA", status: "Absent", checkIn: "-", checkOut: "-" },
  { id: 3, name: "Charlie", department: "IT", location: "NY", status: "Present", checkIn: "09:15", checkOut: "17:10" },
];

// Leave data
const leaveData = [
  { id: 1, name: "Diana", department: "Finance", leaveType: "Vacation", startDate: "2025-10-25", endDate: "2025-10-30", status: "Pending" },
  { id: 2, name: "Evan", department: "HR", leaveType: "Sick", startDate: "2025-10-20", endDate: "2025-10-22", status: "Approved" },
];

// Payroll data
const payrollData = [
  { id: 1, name: "Alice", department: "Finance", salary: "$5000", bonus: "$500", status: "Paid" },
  { id: 2, name: "Bob", department: "HR", salary: "$4500", bonus: "$300", status: "Pending" },
];

// Categories and Departments
const categories = ["Attendance", "Leave", "Payroll"];
const departments = ["All Departments", "HR", "Finance", "IT"];

const HRMSReports = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Attendance");
  const [selectedDept, setSelectedDept] = useState<string>("All Departments");
  const [viewChart, setViewChart] = useState(false);
  const [search, setSearch] = useState("");

  // Select data based on category
  const getTableData = () => {
    let data: any[] = [];
    if (selectedCategory === "Attendance") data = attendanceData;
    if (selectedCategory === "Leave") data = leaveData;
    if (selectedCategory === "Payroll") data = payrollData;

    // Filter by department
    data = data.filter(d => selectedDept === "All Departments" || d.department === selectedDept);

    // Filter by search
    data = data.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.department.toLowerCase().includes(search.toLowerCase())
    );

    return data;
  };

  const tableData = getTableData();

  // Chart data: count per department
  const chartData = tableData.reduce<Record<string, number>>((acc, d) => {
    acc[d.department] = (acc[d.department] || 0) + 1;
    return acc;
  }, {});
  const chartArray = Object.entries(chartData).map(([department, count]) => ({ department, count }));

  // Action handlers
  const handleView = (row: any) => alert(`View details of ${row.name}`);
  const handleEdit = (row: any) => alert(`Edit ${row.name}`);
  const handleDelete = (row: any) => alert(`Delete ${row.name}`);

  return (

    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
          Admin
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Reports</span>
      </div>
 
    <div className="min-h-screen bg-gray-100 p-6 flex gap-6">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-lg shadow p-4 h-fit">
        <h2 className="text-lg font-semibold mb-4">Report Categories</h2>
        <ul className="space-y-2 text-gray-700">
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => { setSelectedCategory(cat); setViewChart(false); }}
              className={`cursor-pointer px-2 py-1 rounded hover:bg-blue-100 ${
                selectedCategory === cat ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{selectedCategory} Report</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewChart(!viewChart)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {viewChart ? "Table View" : "Chart View"}
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 gap-2">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <input
            type="text"
            placeholder="Search by name or department"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/3 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {departments.map(dept => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Table or Chart */}
        {!viewChart ? (
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto p-4">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100">
                  {selectedCategory === "Attendance" && (
                    <>
                      <th className="p-3 border">Name</th>
                      <th className="p-3 border">Department</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Check-In</th>
                      <th className="p-3 border">Check-Out</th>
                      <th className="p-3 border">Actions</th>
                    </>
                  )}
                  {selectedCategory === "Leave" && (
                    <>
                      <th className="p-3 border">Name</th>
                      <th className="p-3 border">Department</th>
                      <th className="p-3 border">Leave Type</th>
                      <th className="p-3 border">Start Date</th>
                      <th className="p-3 border">End Date</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Actions</th>
                    </>
                  )}
                  {selectedCategory === "Payroll" && (
                    <>
                      <th className="p-3 border">Name</th>
                      <th className="p-3 border">Department</th>
                      <th className="p-3 border">Salary</th>
                      <th className="p-3 border">Bonus</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {selectedCategory === "Attendance" && (
                      <>
                        <td className="p-3 border">{row.name}</td>
                        <td className="p-3 border">{row.department}</td>
                        <td className="p-3 border">{row.status}</td>
                        <td className="p-3 border">{row.checkIn}</td>
                        <td className="p-3 border">{row.checkOut}</td>
                        <td className="p-3 border flex gap-2">
                          <button onClick={() => handleView(row)} className="p-2 bg-blue-100 rounded hover:bg-blue-200"><FileText size={16} /></button>
                        </td>
                      </>
                    )}
                    {selectedCategory === "Leave" && (
                      <>
                        <td className="p-3 border">{row.name}</td>
                        <td className="p-3 border">{row.department}</td>
                        <td className="p-3 border">{row.leaveType}</td>
                        <td className="p-3 border">{row.startDate}</td>
                        <td className="p-3 border">{row.endDate}</td>
                        <td className="p-3 border">
                          <span className={`px-3 py-1 rounded-full text-white text-sm ${row.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}`}>{row.status}</span>
                        </td>
                        <td className="p-3 border flex gap-2">
                          <button onClick={() => handleView(row)} className="p-2 bg-blue-100 rounded hover:bg-blue-200"><FileText size={16} /></button>
                          <button onClick={() => handleEdit(row)} className="p-2 bg-yellow-100 rounded hover:bg-yellow-200"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(row)} className="p-2 bg-red-100 rounded hover:bg-red-200"><Trash2 size={16} /></button>
                        </td>
                      </>
                    )}
                    {selectedCategory === "Payroll" && (
                      <>
                        <td className="p-3 border">{row.name}</td>
                        <td className="p-3 border">{row.department}</td>
                        <td className="p-3 border">{row.salary}</td>
                        <td className="p-3 border">{row.bonus}</td>
                        <td className="p-3 border">
                          <span className={`px-3 py-1 rounded-full text-white text-sm ${row.status === "Paid" ? "bg-green-500" : "bg-yellow-500"}`}>{row.status}</span>
                        </td>
                        <td className="p-3 border flex gap-2">
                          <button onClick={() => handleView(row)} className="p-2 bg-blue-100 rounded hover:bg-blue-200"><FileText size={16} /></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartArray}>
                <XAxis dataKey={selectedCategory === "Payroll" ? "department" : "department"} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default HRMSReports;
