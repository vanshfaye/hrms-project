"use client"

import { useState } from "react"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
// ✅ HRMS-specific schema
const DomesticTransferSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  employeeName: z.string().min(2, "Employee name is required"),
  currentDepartment: z.string().min(2, "Current department required"),
  newDepartment: z.string().min(2, "New department required"),
  currentLocation: z.string().min(2, "Current location required"),
  newLocation: z.string().min(2, "New location required"),
  effectiveDate: z.string().min(1, "Effective date required"),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  remarks: z.string().optional().nullable(),
})

type DomesticTransferValues = z.infer<typeof DomesticTransferSchema>

// Sample dropdowns for HR context
const departments = ["HR", "Finance", "IT", "Sales", "Operations"]
const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"]

export default function DomesticTransferPage() {
  const [form, setForm] = useState<DomesticTransferValues>({
    employeeId: "",
    employeeName: "",
    currentDepartment: "",
    newDepartment: "",
    currentLocation: "",
    newLocation: "",
    effectiveDate: "",
    reason: "",
    remarks: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState<"form" | "review" | "success">("form")
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange<K extends keyof DomesticTransferValues>(key: K, value: DomesticTransferValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate() {
    const res = DomesticTransferSchema.safeParse(form)
    if (!res.success) {
      const map: Record<string, string> = {}
      for (const issue of res.error.issues) map[issue.path.join(".")] = issue.message
      setErrors(map)
      return false
    }
    setErrors({})
    return true
  }

  async function submitForm() {
    if (!validate()) return
    setLoading(true)
    setServerError("")

    // Simulate API call or server action
    await new Promise((r) => setTimeout(r, 1000))

    setLoading(false)
    setStep("review")
  }

  async function confirmTransfer() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setStep("success")
  }

  function resetForm() {
    setForm({
      employeeId: "",
      employeeName: "",
      currentDepartment: "",
      newDepartment: "",
      currentLocation: "",
      newLocation: "",
      effectiveDate: "",
      reason: "",
      remarks: "",
    })
    setErrors({})
    setServerError("")
    setStep("form")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
         Ess
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Domestic Transfer</span>
      </div>
    <main className="mx-auto w-full max-w-3xl p-4 md:p-6">
      <header className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-600">Employee Domestic Transfer</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Initiate and manage employee transfers between departments or locations within the country.
        </p>
      </header>

      {serverError && (
        <div className="bg-red-100 border border-red-400 text-red-800 p-3 rounded mb-4">
          <strong>Error:</strong> {serverError}
        </div>
      )}

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Domestic Transfer Form</CardTitle>
          <CardDescription>Fill out the required details to initiate a domestic transfer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === "form" && (
            <div className="space-y-4">
              {/* Employee Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Employee ID</Label>
                  <Input value={form.employeeId} onChange={(e) => handleChange("employeeId", e.target.value)} />
                  {errors.employeeId && <p className="text-red-600 text-xs">{errors.employeeId}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Employee Name</Label>
                  <Input value={form.employeeName} onChange={(e) => handleChange("employeeName", e.target.value)} />
                  {errors.employeeName && <p className="text-red-600 text-xs">{errors.employeeName}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Current Department</Label>
                  <Select value={form.currentDepartment} onValueChange={(v) => handleChange("currentDepartment", v)}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.currentDepartment && <p className="text-red-600 text-xs">{errors.currentDepartment}</p>}
                </div>

                <div className="space-y-2">
                  <Label>New Department</Label>
                  <Select value={form.newDepartment} onValueChange={(v) => handleChange("newDepartment", v)}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.newDepartment && <p className="text-red-600 text-xs">{errors.newDepartment}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Current Location</Label>
                  <Select value={form.currentLocation} onValueChange={(v) => handleChange("currentLocation", v)}>
                    <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.currentLocation && <p className="text-red-600 text-xs">{errors.currentLocation}</p>}
                </div>

                <div className="space-y-2">
                  <Label>New Location</Label>
                  <Select value={form.newLocation} onValueChange={(v) => handleChange("newLocation", v)}>
                    <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.newLocation && <p className="text-red-600 text-xs">{errors.newLocation}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Effective Date</Label>
                  <Input type="date" value={form.effectiveDate} onChange={(e) => handleChange("effectiveDate", e.target.value)} />
                  {errors.effectiveDate && <p className="text-red-600 text-xs">{errors.effectiveDate}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason for Transfer</Label>
                <Textarea rows={3} value={form.reason} onChange={(e) => handleChange("reason", e.target.value)} />
                {errors.reason && <p className="text-red-600 text-xs">{errors.reason}</p>}
              </div>

              <div className="space-y-2">
                <Label>Remarks (optional)</Label>
                <Textarea rows={2} value={form.remarks || ""} onChange={(e) => handleChange("remarks", e.target.value)} />
              </div>

              <div className="flex gap-2">
                <Button onClick={submitForm} disabled={loading}>
                  {loading ? "Processing..." : "Review Transfer"}
                </Button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-4">
              <h3 className="font-medium">Review Transfer Details</h3>
              <div className="border rounded-md p-4 space-y-1">
                <p><strong>Employee:</strong> {form.employeeName} ({form.employeeId})</p>
                <p><strong>From:</strong> {form.currentDepartment}, {form.currentLocation}</p>
                <p><strong>To:</strong> {form.newDepartment}, {form.newLocation}</p>
                <p><strong>Effective Date:</strong> {form.effectiveDate}</p>
                <p><strong>Reason:</strong> {form.reason}</p>
                {form.remarks && <p><strong>Remarks:</strong> {form.remarks}</p>}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setStep("form")}>Edit</Button>
                <Button onClick={confirmTransfer} disabled={loading}>
                  {loading ? "Submitting..." : "Confirm Transfer"}
                </Button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-800 p-3 rounded mt-4">
              <strong>Transfer Submitted Successfully!</strong>
              <p>The employee transfer request has been recorded for HR approval.</p>
              <Button className="mt-3" onClick={resetForm}>Start New Transfer</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
    </div>
  )
}
