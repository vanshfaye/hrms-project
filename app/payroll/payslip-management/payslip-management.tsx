"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link"
const payslips = [
  { id: 1, name: "John Doe", month: "May 2025", status: "Generated", basic: 40000, hra: 15000, allowance: 5000, total: 60000 },
  { id: 2, name: "Jane Smith", month: "May 2025", status: "Pending", basic: 35000, hra: 12000, allowance: 4000, total: 51000 },
];

export default function PayslipManagementPage() {
  const [selectedPayslip, setSelectedPayslip] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
         Payroll
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Payslip Management</span>
      </div>
 
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Payslip Management</h1>
            <p className="text-gray-500">View and manage employee payslips easily.</p>
          </div>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Generate New Payslip</Button>
        </div>

        {/* Payslip Table */}
        <Card className="shadow-md border border-gray-200 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg font-semibold text-gray-700">Employee Payslips</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3">Month</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {payslips.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
                    <td className="px-5 py-3 text-gray-600">{p.month}</td>
                    <td>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          p.status === "Generated"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedPayslip(p)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Payslip Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedPayslip(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Payslip for {selectedPayslip.name}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Month:</strong> {selectedPayslip.month}
              </p>
              <p>
                <strong>Status:</strong> {selectedPayslip.status}
              </p>
              <hr className="my-3" />
              <p>
                <strong>Basic:</strong> ${selectedPayslip.basic.toLocaleString()}
              </p>
              <p>
                <strong>HRA:</strong> ${selectedPayslip.hra.toLocaleString()}
              </p>
              <p>
                <strong>Allowance:</strong> ${selectedPayslip.allowance.toLocaleString()}
              </p>
              <hr className="my-3" />
              <p className="text-lg font-semibold text-gray-800">
                Total Salary: ${selectedPayslip.total.toLocaleString()}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => {
                  alert("Payslip downloaded successfully!");
                  setSelectedPayslip(null);
                }}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
