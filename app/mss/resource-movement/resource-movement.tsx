"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, Clock, FileCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link"
interface Employee {
  id: string;
  employeeId: string;
  name: string;
  currentProject: string;
  currentManager: string;
  status: string;
  selected: boolean;
}

export default function ResourceMovement() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      employeeId: "EMP001",
      name: "Sarah Johnson",
      currentProject: "Digital Transformation",
      currentManager: "Michael Chen",
      status: "Active",
      selected: false,
    },
    {
      id: "2",
      employeeId: "EMP002",
      name: "Robert Martinez",
      currentProject: "Cloud Migration",
      currentManager: "Michael Chen",
      status: "Active",
      selected: false,
    },
    {
      id: "3",
      employeeId: "EMP003",
      name: "Emily Davis",
      currentProject: "Mobile App Development",
      currentManager: "Michael Chen",
      status: "Active",
      selected: false,
    },
    {
      id: "4",
      employeeId: "EMP004",
      name: "James Wilson",
      currentProject: "Digital Transformation",
      currentManager: "Michael Chen",
      status: "Active",
      selected: false,
    },
  ]);

  const [newProject, setNewProject] = useState("");
  const [newManager, setNewManager] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const toggleEmployee = (id: string) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, selected: !emp.selected } : emp
      )
    );
  };

  const toggleAll = () => {
    const allSelected = employees.every((emp) => emp.selected);
    setEmployees(employees.map((emp) => ({ ...emp, selected: !allSelected })));
  };

  const handleSubmit = () => {
    const selectedEmployees = employees.filter((emp) => emp.selected);
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee");
      return;
    }
    if (!newProject || !newManager || !effectiveDate || !reason) {
      alert("Please fill all required fields");
      return;
    }
    alert("Submitted for approval");
  };

  const handleSaveDraft = () => {
    alert("Saved as draft");
  };

  const handleCancel = () => {
    setNewProject("");
    setNewManager("");
    setEffectiveDate("");
    setReason("");
    setRemarks("");
    setEmployees(employees.map((emp) => ({ ...emp, selected: false })));
  };

  const allSelected = employees.every((emp) => emp.selected);
  const someSelected = employees.some((emp) => emp.selected);

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
        <span className="text-foreground font-semibold">resource-movement</span>
      </div>
 
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-[1400px] p-6">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            <h1 className="text-3xl font-bold text-slate-800">Resource Movement</h1>
          </div>
          <p className="text-slate-600 text-sm font-medium">
            Manager Self-Service (MSS)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Select Employees
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Choose employees to move to a new project or department
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="px-6 py-4 text-left">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={toggleAll}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Employee ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Current Project
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Current Manager
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {employees.map((employee) => (
                      <tr
                        key={employee.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          employee.selected ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <Checkbox
                            checked={employee.selected}
                            onCheckedChange={() => toggleEmployee(employee.id)}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {employee.employeeId}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {employee.currentProject}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {employee.currentManager}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {employee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Movement Details
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Specify new project assignment and reporting manager
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project" className="text-sm font-medium text-slate-700">
                      New Project / Department <span className="text-red-500">*</span>
                    </Label>
                    <Select value={newProject} onValueChange={setNewProject}>
                      <SelectTrigger
                        id="project"
                        className="w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <SelectValue placeholder="Select project or department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-platform">AI Platform Development</SelectItem>
                        <SelectItem value="cloud-infra">Cloud Infrastructure</SelectItem>
                        <SelectItem value="mobile-dev">Mobile App Development</SelectItem>
                        <SelectItem value="digital-transform">Digital Transformation</SelectItem>
                        <SelectItem value="data-analytics">Data Analytics</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manager" className="text-sm font-medium text-slate-700">
                      New Manager <span className="text-red-500">*</span>
                    </Label>
                    <Select value={newManager} onValueChange={setNewManager}>
                      <SelectTrigger
                        id="manager"
                        className="w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <SelectValue placeholder="Select new reporting manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-smith">John Smith</SelectItem>
                        <SelectItem value="lisa-anderson">Lisa Anderson</SelectItem>
                        <SelectItem value="david-brown">David Brown</SelectItem>
                        <SelectItem value="jennifer-taylor">Jennifer Taylor</SelectItem>
                        <SelectItem value="robert-lee">Robert Lee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium text-slate-700">
                      Effective Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        className="w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-sm font-medium text-slate-700">
                      Reason for Movement <span className="text-red-500">*</span>
                    </Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger
                        id="reason"
                        className="w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project-completion">Project Completion</SelectItem>
                        <SelectItem value="skill-requirement">Skill Requirement</SelectItem>
                        <SelectItem value="career-growth">Career Growth</SelectItem>
                        <SelectItem value="department-restructure">Department Restructure</SelectItem>
                        <SelectItem value="employee-request">Employee Request</SelectItem>
                        <SelectItem value="business-need">Business Need</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks" className="text-sm font-medium text-slate-700">
                    Remarks
                  </Label>
                  <Textarea
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add any additional comments or notes..."
                    rows={4}
                    className="w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button
                    onClick={handleSaveDraft}
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <FileCheck className="mr-2 h-4 w-4" />
                    Save as Draft
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Submit for Approval
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 sticky top-6">
              <div className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">
                  Approval Workflow
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Track approval progress
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-600">
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="mt-2 h-full w-0.5 bg-slate-200"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="text-sm font-semibold text-slate-800">
                        Draft
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Form is being prepared
                      </p>
                      <p className="text-xs text-blue-600 font-medium mt-2">
                        Current Step
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border-2 border-slate-300">
                        <Clock className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="mt-2 h-full w-0.5 bg-slate-200"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="text-sm font-semibold text-slate-500">
                        Pending Manager Approval
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Awaiting manager review
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border-2 border-slate-300">
                        <Clock className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="mt-2 h-full w-0.5 bg-slate-200"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="text-sm font-semibold text-slate-500">
                        Pending HR Approval
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        HR department review
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border-2 border-slate-300">
                        <CheckCircle2 className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-500">
                        Approved
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Movement completed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Important Notes
                  </h4>
                  <ul className="text-xs text-blue-800 space-y-1.5">
                    <li className="flex gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Selected employees will be notified upon submission</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Movement will be effective from the specified date</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Approval process typically takes 2-3 business days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
