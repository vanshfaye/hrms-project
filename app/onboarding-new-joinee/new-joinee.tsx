"use client";

import React, { useState } from "react";
import { User, Home, FileText, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link"
const steps = [
  { title: "Personal Info", icon: User },
  { title: "Employment & Payroll", icon: Briefcase },
  { title: "Compliance", icon: FileText },
  { title: "Confirmation", icon: CheckCircle2 },
];

export default function ProfessionalOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    personalEmail: "",
    phoneNumber: "",
    startDate: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    jobTitle: "",
    department: "",
    bankName: "",
    accountNumber: "",
    eSignature: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };
  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (

    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
       Other
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Onboarding New Joinee</span>
      </div>
 
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r shadow-sm p-6 flex md:flex-col flex-row md:items-start items-center md:space-y-6 space-x-4 md:space-x-0 overflow-x-auto md:overflow-visible">
        <h2 className="text-xl font-bold mb-4 text-indigo-600 hidden md:block">
          Onboarding Steps
        </h2>
        <nav className="flex md:flex-col gap-3 w-full justify-between md:justify-start">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            return (
              <div
                key={s.title}
                onClick={() => setStep(i)}
                className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-2 text-sm transition-all ${
                  active ? "bg-indigo-100 text-indigo-700 font-semibold" : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{s.title}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-6 bg-white shadow-sm flex flex-col gap-2 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{steps[step].title}</h1>
            <span className="text-sm text-gray-500">
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-indigo-200" />
        </header>

        {/* Form Section */}
        <section className="flex-1 p-6 md:p-10 bg-gray-50">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-6">
            {step === 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="personalEmail">Email *</Label>
                  <Input
                    id="personalEmail"
                    type="email"
                    value={form.personalEmail}
                    onChange={(e) => handleChange("personalEmail", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address1">Address Line 1 *</Label>
                  <Input
                    id="address1"
                    value={form.address1}
                    onChange={(e) => handleChange("address1", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    value={form.address2}
                    onChange={(e) => handleChange("address2", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">Zip Code *</Label>
                  <Input
                    id="zip"
                    value={form.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={form.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={form.department}
                    onValueChange={(v) => handleChange("department", v)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    value={form.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={form.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-indigo-600">
                    Compliance & Policies
                  </h2>
                  <p>
                    <a href="#" className="underline text-indigo-600">
                      Employee Handbook (PDF)
                    </a>
                  </p>
                  <p>
                    <a href="#" className="underline text-indigo-600">
                      IT Security Policy
                    </a>
                  </p>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={form.eSignature}
                      onCheckedChange={(v) => handleChange("eSignature", !!v)}
                    />
                    <Label>I electronically sign and confirm all data is accurate *</Label>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-20">
                <CheckCircle2 size={80} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800">Onboarding Complete!</h2>
                <p className="text-gray-500 mt-2">
                  Thank you for completing your onboarding process.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer Navigation */}
        {step < steps.length - 1 && (
          <footer className="flex justify-between items-center bg-white border-t p-6 sticky bottom-0">
            <Button variant="outline" disabled={step === 0} onClick={handlePrev}>
              Back
            </Button>
            <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {step === steps.length - 2 ? "Submit" : "Next"}
            </Button>
          </footer>
        )}
      </main>
    </div>
    </div>
  );
}
