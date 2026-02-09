"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link"
interface EmployeeData {
  id: number;
  name: string;
  email: string;
  status: "Pending" | "Validated" | "Error";
}

export default function GlobalMigration() {
  const [data, setData] = useState<EmployeeData[]>([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Pending" },
  ]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Simulate file processing
    setTimeout(() => {
      // In real implementation, parse the CSV/XLSX file and generate data
      const uploadedData: EmployeeData[] = [
        { id: 4, name: "Alice Williams", email: "alice@example.com", status: "Pending" },
        { id: 5, name: "Michael Brown", email: "michael@example.com", status: "Pending" },
        { id: 6, name: "Emily Davis", email: "emily@example.com", status: "Pending" },
      ];
      setData(uploadedData);
      setIsUploading(false);
      alert(`Uploaded ${files[0].name} successfully!`);
    }, 1500);
  };

  // Handle individual validation
  const handleValidate = (id: number) => {
    setData((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: "Validated" } : emp))
    );
  };

  // Calculate migration progress
  const progress =
    data.length === 0
      ? 0
      : (data.filter((d) => d.status === "Validated").length / data.length) * 100;

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
        <span className="text-foreground font-semibold">global-migration-service</span>
      </div>
 
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Global Migration Service</h1>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            accept=".csv, .xlsx"
            id="upload"
            className="hidden"
            onChange={handleUpload}
          />
          <label htmlFor="upload">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading && (
                <Loader2 className="animate-spin mr-2 h-4 w-4 text-white" />
              )}
              {isUploading ? "Uploading..." : "Upload Data"}
            </button>
          </label>
        </div>
      </div>

      {/* Employee Table */}
      {data.length > 0 && (
        <div className="overflow-x-auto border rounded-md shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {data.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-4 py-2">{emp.id}</td>
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        emp.status === "Validated"
                          ? "bg-green-100 text-green-800"
                          : emp.status === "Error"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {emp.status === "Pending" && (
                      <button
                        onClick={() => handleValidate(emp.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm transition-colors"
                      >
                        Validate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Migration Progress */}
      {data.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Migration Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{Math.round(progress)}% Completed</p>
        </div>
      )}
    </div>
    </div>
  );
}
