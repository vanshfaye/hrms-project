"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"
const deductions = [
  { name: "Provident Fund", rate: "12%" },
  { name: "ESI", rate: "3.25%" },
  { name: "TDS", rate: "10%" },
];

export default function TaxDeductionsPage() {
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
        <span className="text-foreground font-semibold">Tax Deduction</span>
      </div>
 
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Tax & Deductions
          </h1>
          <p className="text-gray-500">
            Overview of all statutory deductions and current rates.
          </p>
        </div>

        {/* Deduction Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {deductions.map((d) => (
            <Card
              key={d.name}
              className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              <CardHeader className="border-b bg-gray-50 rounded-t-2xl p-4">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  {d.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-indigo-600">{d.rate}</p>
                <p className="text-sm text-gray-500 mt-1">Current Rate</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
