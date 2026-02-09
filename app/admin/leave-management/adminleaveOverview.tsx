"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"
const dummyOverviewData = [
  { title: "Total Leaves This Month", value: 128 },
  { title: "Approved Leaves", value: 97 },
  { title: "Pending Approvals", value: 21 },
  { title: "Rejected Leaves", value: 10 },
];

export default function AdminLeaveOverview() {
  return (
<div className="bg-gray-50 p-8 rounded-lg">

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
        <span className="text-foreground font-semibold">Leave management</span>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {dummyOverviewData.map((item, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl"
        >
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 text-sm font-medium">{item.title}</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {item.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
}
