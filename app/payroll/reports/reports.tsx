"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import Link from "next/link"
const data = [
  { month: "Jan", payroll: 45000 },
  { month: "Feb", payroll: 48000 },
  { month: "Mar", payroll: 52000 },
  { month: "Apr", payroll: 60000 },
  { month: "May", payroll: 62000 },
];

export default function ReportsPage() {
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
        <span className="text-foreground font-semibold">Report</span>
      </div>
 
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Payroll Reports</h1>
      <Card>
        <CardHeader><CardTitle>Payroll Cost Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="payroll" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
