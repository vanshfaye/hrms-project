"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, XCircle, Wallet } from "lucide-react"
import Link from "next/link"
export function ExpenseSummaryCards() {
  const data = [
    { title: "Pending", value: 3, icon: Clock, color: "text-yellow-500" },
    { title: "Approved", value: 7, icon: CheckCircle2, color: "text-green-600" },
    { title: "Rejected", value: 1, icon: XCircle, color: "text-red-500" },
    { title: "Reimbursed", value: 4, icon: Wallet, color: "text-[hsl(170.6,76.9%,64.3%)]" },
  ]

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
        <span className="text-foreground font-semibold">Organization Structure</span>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((card) => (
        <Card
          key={card.title}
          className="rounded-2xl shadow-sm border border-teal-100 hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="p-5 flex items-center gap-4">
            <card.icon className={`h-8 w-8 ${card.color}`} />
            <div>
              <p className="text-gray-600 text-sm">{card.title}</p>
              <h3 className="text-xl font-semibold">{card.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  )
}
