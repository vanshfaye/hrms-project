"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link"
export default function GeneratePayrollPage() {
  const [payPeriod, setPayPeriod] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [payrollGenerated, setPayrollGenerated] = useState(false);

  const handleRunPayroll = () => {
    if (!payPeriod) {
      alert("Please select a pay period before running payroll.");
      return;
    }

    setIsLoading(true);
    setPayrollGenerated(false);

    setTimeout(() => {
      setIsLoading(false);
      setPayrollGenerated(true);
    }, 2000);
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
        <span className="text-foreground font-semibold">Genrate Payroll</span>
      </div>
 
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Generate Payroll
          </h1>
          <p className="text-gray-500">
            Run payroll for a specific pay period and department with one click.
          </p>
        </div>

        <Card className="shadow-lg border border-gray-200 rounded-2xl bg-white">
          <CardHeader className="border-b bg-gray-50/50 rounded-t-2xl">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Payroll Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label className="text-gray-700 font-medium">Pay Period</Label>
                <Input
                  type="month"
                  value={payPeriod}
                  onChange={(e) => setPayPeriod(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-gray-700 font-medium">Department</Label>
                <Input
                  placeholder="All Departments"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleRunPayroll}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 font-medium rounded-lg shadow-sm flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Run Payroll"
                )}
              </Button>
            </div>

            {payrollGenerated && (
              <div className="mt-6 flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-xl shadow-sm transition-all duration-300">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-green-700 font-semibold">
                    Payroll Generated Successfully
                  </p>
                  <p className="text-sm text-green-700 mt-0.5">
                    Payroll for{" "}
                    <span className="font-medium">{payPeriod}</span>{" "}
                    {department && (
                      <span className="text-green-600">({department})</span>
                    )}{" "}
                    has been processed.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
