"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
export function ExpenseFormModal({
  open,
  onOpenChange,
  setExpenses,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  setExpenses: React.Dispatch<React.SetStateAction<any[]>>
}) {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...formData,
        status: "Pending",
      },
    ])
    onOpenChange(false)
    setFormData({ date: "", category: "", amount: "", description: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-teal-600">Add New Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Input
              placeholder="e.g. Travel, Meals"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div>
            <Label>Amount (₹)</Label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Add a brief note"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[hsl(170.6,76.9%,64.3%)] hover:bg-teal-500 text-white rounded-xl"
          >
            Submit Expense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
