"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ExpenseSummaryCards } from "./expenseSummaryCards"
import { ExpenseTable } from "./expenseTable"
import { ExpenseFormModal } from "./expenseFormModal"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"


export default function MyExpensesPage() {
    const [open, setOpen] = useState(false)
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            date: "2025-10-10",
            category: "Travel",
            amount: 3200,
            status: "Approved",
            description: "Client meeting trip to Pune",
        },
        {
            id: 2,
            date: "2025-10-12",
            category: "Meals",
            amount: 450,
            status: "Pending",
            description: "Lunch with client",
        },
    ])

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />

                <div className="p-6 space-y-6">
                    {/* Header + New Expense Button */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-teal-600">My Expenses</h1>
                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-[hsl(170.6,76.9%,64.3%)] hover:bg-teal-500 text-white rounded-xl shadow-md"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New Expense
                        </Button>
                    </div>

                    {/* Summary Cards */}
                    <ExpenseSummaryCards />

                    {/* Expense Table */}
                    <ExpenseTable data={expenses} />

                    {/* Modal for New Expense */}
                    <ExpenseFormModal open={open} onOpenChange={setOpen} setExpenses={setExpenses} />
                </div>
            </SidebarInset>
        </SidebarProvider>

    )
}
