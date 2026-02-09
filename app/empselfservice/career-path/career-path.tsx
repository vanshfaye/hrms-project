"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import Link from "next/link"
// -----------------------------
// Schema for career path input
// -----------------------------
const CareerPathSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  employeeName: z.string().min(2, "Employee name is required"),
  currentRole: z.string().min(1, "Current role is required"),
  department: z.string().min(1, "Department is required"),
})

type CareerPathValues = z.infer<typeof CareerPathSchema>

// -----------------------------
// Sample Data
// -----------------------------
const roles = ["Junior Developer", "Developer", "Senior Developer", "Team Lead", "Manager", "Director"]
const departments = ["HR", "Finance", "IT", "Sales", "Operations"]

type CareerPathStep = {
  role: string
  skills: string[]
  training: string[]
}

// Add index signature for TypeScript
const careerPaths: { [key: string]: CareerPathStep[] } = {
  "Junior Developer": [{ role: "Developer", skills: ["JavaScript", "Git"], training: ["Advanced JS Course"] }],
  "Developer": [
    { role: "Senior Developer", skills: ["System Design", "React"], training: ["System Design Workshop"] },
    { role: "Team Lead", skills: ["Leadership", "Code Review"], training: ["Leadership Program"] },
  ],
  "Senior Developer": [
    { role: "Team Lead", skills: ["Team Management", "Agile"], training: ["Agile Leadership"] },
    { role: "Manager", skills: ["Project Management"], training: ["PMP Certification"] },
  ],
  "Team Lead": [{ role: "Manager", skills: ["Strategy", "Budgeting"], training: ["Management Workshop"] }],
  "Manager": [{ role: "Director", skills: ["Leadership", "Vision"], training: ["Executive Program"] }],
  "Director": [],
}

// -----------------------------
// Component
// -----------------------------
export default function CareerPathPage() {
  const [form, setForm] = useState<CareerPathValues>({
    employeeId: "",
    employeeName: "",
    currentRole: "",
    department: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [nextRoles, setNextRoles] = useState<CareerPathStep[]>([])

  function handleChange<K extends keyof CareerPathValues>(key: K, value: CareerPathValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate() {
    const res = CareerPathSchema.safeParse(form)
    if (!res.success) {
      const map: Record<string, string> = {}
      for (const issue of res.error.issues) map[issue.path.join(".")] = issue.message
      setErrors(map)
      return false
    }
    setErrors({})
    return true
  }

  function showNextRoles() {
    if (!validate()) return
    const paths: CareerPathStep[] = careerPaths[form.currentRole] || []
    setNextRoles(paths)
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
        <span className="text-foreground font-semibold">Career Path</span>
      </div>
    <main className="mx-auto w-full max-w-4xl p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-600">Employee Career Path</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Plan employee growth with next roles, required skills, and recommended training.
        </p>
      </header>

      {/* Employee Form */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
          <CardDescription>Enter employee info to see career growth opportunities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                className="input"
                value={form.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
              />
              {errors.employeeId && <p className="text-red-600 text-xs">{errors.employeeId}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Employee Name</label>
              <input
                className="input"
                value={form.employeeName}
                onChange={(e) => handleChange("employeeName", e.target.value)}
              />
              {errors.employeeName && <p className="text-red-600 text-xs">{errors.employeeName}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Current Role</label>
              <Select value={form.currentRole} onValueChange={(v) => handleChange("currentRole", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currentRole && <p className="text-red-600 text-xs">{errors.currentRole}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Department</label>
              <Select value={form.department} onValueChange={(v) => handleChange("department", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-600 text-xs">{errors.department}</p>}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button onClick={showNextRoles}>Show Career Path</Button>
          </div>
        </CardContent>
      </Card>

      {/* Career Ladder Visualization */}
      {nextRoles.length > 0 && (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Next Career Steps</CardTitle>
            <CardDescription>Skills and training required for progression.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              {nextRoles.map((roleStep: CareerPathStep) => (
                <div key={roleStep.role} className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-semibold text-lg">{roleStep.role}</h3>
                  <p className="text-sm text-gray-700">
                    <strong>Skills required:</strong> {roleStep.skills.join(", ")}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Recommended Training:</strong> {roleStep.training.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {nextRoles.length === 0 && form.currentRole && (
        <p className="mt-4 text-gray-600">No further roles available for this position.</p>
      )}
    </main>
    </div>
  )
}
