"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

export function ExpenseTable({ data }: { data: any[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-teal-50 text-gray-700 uppercase">
          <tr>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Amount (₹)</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t hover:bg-teal-50/30 transition">
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4 font-semibold">{item.amount}</td>
              <td className="px-6 py-4">
                <Badge className={`${getStatusColor(item.status)} px-3 py-1 rounded-full`}>
                  {item.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <button className="text-[hsl(170.6,76.9%,64.3%)] hover:underline flex items-center gap-1">
                  <Eye className="h-4 w-4" /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
