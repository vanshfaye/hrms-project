"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link"
export default function SalaryAdjustmentPage() {
  const [form, setForm] = useState({
    employee: "",
    amount: "",
    reason: "",
  });

  const handleSubmit = () => {
    if (!form.employee || !form.amount || !form.reason) {
      alert("Please fill all fields before submitting.");
      return;
    }
    alert(`Salary adjustment submitted for ${form.employee}`);
    setForm({ employee: "", amount: "", reason: "" });
  };

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
        <span className="text-foreground font-semibold">Salary Adjustment</span>
      </div>
 
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Salary Adjustments
          </h1>
          <p className="text-gray-500">
            Add or update employee salary adjustments easily.
          </p>
        </div>

        {/* Adjustment Form */}
        <Card className="shadow-lg border border-gray-200 rounded-2xl bg-white">
          <CardHeader className="border-b bg-gray-50 rounded-t-2xl">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Add Adjustment
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label className="text-gray-700 font-medium">Employee Name</Label>
              <Input
                placeholder="John Doe"
                value={form.employee}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, employee: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Amount</Label>
              <Input
                type="number"
                placeholder="5000"
                value={form.amount}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, amount: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-gray-700 font-medium">Reason</Label>
              <Input
                placeholder="Performance Bonus"
                value={form.reason}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, reason: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 font-medium rounded-lg shadow-md"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
