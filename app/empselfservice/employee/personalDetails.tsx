"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

/* ---------------- Types ---------------- */
interface FamilyMember {
  name: string;
  relation: string;
  contact: string;
  address: string;
}

interface Employee {
  name: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  nationality: string;
  contact: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  aadhaar: string;
  pan: string;
  passport: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  family: FamilyMember[];
  healthInfo: string;
  insurance: string;
  education: string;
  qualification: string;
  employmentType: string;
  designation: string;
  joiningDate: string;
  document: string;
}

/* ---------------- Main Component ---------------- */
export default function EmployeePersonalDetails() {
  const [employee, setEmployee] = useState<Employee>({
    name: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    nationality: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    aadhaar: "",
    pan: "",
    passport: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    family: [],
    healthInfo: "",
    insurance: "",
    education: "",
    qualification: "",
    employmentType: "",
    designation: "",
    joiningDate: "",
    document: "",
  });

  const [familyMember, setFamilyMember] = useState<FamilyMember>({
    name: "",
    relation: "",
    contact: "",
    address: "",
  });

  const [openSection, setOpenSection] = useState<string | null>("basic");

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setEmployee((prev) => ({ ...prev, document: file.name }));
  };

  const handleFamilyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFamilyMember((prev) => ({ ...prev, [name]: value }));
  };

  const addFamilyMember = () => {
    if (!familyMember.name || !familyMember.relation) return;
    setEmployee((prev) => ({ ...prev, family: [...prev.family, familyMember] }));
    setFamilyMember({ name: "", relation: "", contact: "", address: "" });
  };

  const removeFamilyMember = (index: number) => {
    setEmployee((prev) => ({
      ...prev,
      family: prev.family.filter((_, i) => i !== index),
    }));
  };

  const handleCancelSection = (section: string) => {
    const resetMap: Record<string, Partial<Employee>> = {
      basic: { name: "", dob: "", gender: "", maritalStatus: "", bloodGroup: "", nationality: "" },
      contact: { contact: "", email: "", address: "", city: "", state: "", country: "" },
      identification: { aadhaar: "", pan: "", passport: "" },
      bank: { bankName: "", accountNumber: "", ifsc: "" },
      family: { family: [] },
      health: { healthInfo: "", insurance: "" },
      education: { qualification: "", education: "" },
      employment: { employmentType: "", designation: "", joiningDate: "" },
      documents: { document: "" },
    };
    setEmployee((prev) => ({ ...prev, ...resetMap[section] }));
    if (section === "family") setFamilyMember({ name: "", relation: "", contact: "", address: "" });
  };

  const handleSubmitSection = (section: string) => {
    alert(`Section "${section}" submitted!`);
  };

  /* ---------------- UI ---------------- */
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
        <span className="text-foreground font-semibold">Personal Details</span>
      </div>

      <Card className="shadow-lg rounded-2xl">
        <CardContent className="space-y-4">
          {/* Basic Information */}
          <AccordionSection
            title="Basic Information"
            isOpen={openSection === "basic"}
            onToggle={() => toggleSection("basic")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" name="name" value={employee.name} onChange={handleChange} />
              <InputField label="Date of Birth" type="date" name="dob" value={employee.dob} onChange={handleChange} />
              <SelectField label="Gender" value={employee.gender} onChange={(v) => handleSelectChange("gender", v)} options={["Male", "Female", "Other"]} />
              <SelectField label="Marital Status" value={employee.maritalStatus} onChange={(v) => handleSelectChange("maritalStatus", v)} options={["Single", "Married", "Divorced", "Widowed"]} />
              <InputField label="Blood Group" name="bloodGroup" value={employee.bloodGroup} onChange={handleChange} />
              <InputField label="Nationality" name="nationality" value={employee.nationality} onChange={handleChange} />
            </div>
            <FormButtons onCancel={() => handleCancelSection("basic")} onSubmit={() => handleSubmitSection("Basic Information")} />
          </AccordionSection>

          {/* Contact Information */}
          <AccordionSection
            title="Contact Information"
            isOpen={openSection === "contact"}
            onToggle={() => toggleSection("contact")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Contact Number" name="contact" value={employee.contact} onChange={handleChange} />
              <InputField label="Email Address" name="email" value={employee.email} onChange={handleChange} />
              <TextareaField label="Address" name="address" value={employee.address} onChange={handleChange} />
              <InputField label="City" name="city" value={employee.city} onChange={handleChange} />
              <InputField label="State" name="state" value={employee.state} onChange={handleChange} />
              <InputField label="Country" name="country" value={employee.country} onChange={handleChange} />
            </div>
            <FormButtons onCancel={() => handleCancelSection("contact")} onSubmit={() => handleSubmitSection("Contact Information")} />
          </AccordionSection>

          {/* Identification Details */}
          <AccordionSection
            title="Identification Details"
            isOpen={openSection === "identification"}
            onToggle={() => toggleSection("identification")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Aadhaar Number" name="aadhaar" value={employee.aadhaar} onChange={handleChange} />
              <InputField label="PAN Number" name="pan" value={employee.pan} onChange={handleChange} />
              <InputField label="Passport Number" name="passport" value={employee.passport} onChange={handleChange} />
            </div>
            <FormButtons onCancel={() => handleCancelSection("identification")} onSubmit={() => handleSubmitSection("Identification Details")} />
          </AccordionSection>

          {/* Bank Details */}
          <AccordionSection
            title="Bank Details"
            isOpen={openSection === "bank"}
            onToggle={() => toggleSection("bank")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Bank Name" name="bankName" value={employee.bankName} onChange={handleChange} />
              <InputField label="Account Number" name="accountNumber" value={employee.accountNumber} onChange={handleChange} />
              <InputField label="IFSC Code" name="ifsc" value={employee.ifsc} onChange={handleChange} />
            </div>
            <FormButtons onCancel={() => handleCancelSection("bank")} onSubmit={() => handleSubmitSection("Bank Details")} />
          </AccordionSection>

          {/* Family Details */}
          <AccordionSection
            title="Family Details"
            isOpen={openSection === "family"}
            onToggle={() => toggleSection("family")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Name" name="name" value={familyMember.name} onChange={handleFamilyChange} />
              <InputField label="Relation" name="relation" value={familyMember.relation} onChange={handleFamilyChange} />
              <InputField label="Contact" name="contact" value={familyMember.contact} onChange={handleFamilyChange} />
              <InputField label="Address" name="address" value={familyMember.address} onChange={handleFamilyChange} />
            </div>
            <div className="flex justify-end mt-3">
              <Button onClick={addFamilyMember}>Add Family Member</Button>
            </div>
            <ul className="mt-3 space-y-2">
              {employee.family.map((member, index) => (
                <li key={index} className="border rounded-lg p-3 flex justify-between items-center">
                  <span>{member.name} - {member.relation}</span>
                  <Button variant="outline" size="sm" onClick={() => removeFamilyMember(index)}>Remove</Button>
                </li>
              ))}
            </ul>
            <FormButtons onCancel={() => handleCancelSection("family")} onSubmit={() => handleSubmitSection("Family Details")} />
          </AccordionSection>

          {/* Health Information */}
          <AccordionSection
            title="Health & Insurance"
            isOpen={openSection === "health"}
            onToggle={() => toggleSection("health")}
          >
            <TextareaField label="Health Information" name="healthInfo" value={employee.healthInfo} onChange={handleChange} />
            <InputField label="Insurance Details" name="insurance" value={employee.insurance} onChange={handleChange} />
            <FormButtons onCancel={() => handleCancelSection("health")} onSubmit={() => handleSubmitSection("Health & Insurance")} />
          </AccordionSection>

          {/* Education */}
          <AccordionSection
            title="Education & Qualification"
            isOpen={openSection === "education"}
            onToggle={() => toggleSection("education")}
          >
            <InputField label="Highest Qualification" name="qualification" value={employee.qualification} onChange={handleChange} />
            <TextareaField label="Education Details" name="education" value={employee.education} onChange={handleChange} />
            <FormButtons onCancel={() => handleCancelSection("education")} onSubmit={() => handleSubmitSection("Education & Qualification")} />
          </AccordionSection>

          {/* Employment */}
          <AccordionSection
            title="Employment Details"
            isOpen={openSection === "employment"}
            onToggle={() => toggleSection("employment")}
          >
            <SelectField label="Employment Type" value={employee.employmentType} onChange={(v) => handleSelectChange("employmentType", v)} options={["Full-Time", "Part-Time", "Contract", "Intern"]} />
            <InputField label="Designation" name="designation" value={employee.designation} onChange={handleChange} />
            <InputField label="Joining Date" type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} />
            <FormButtons onCancel={() => handleCancelSection("employment")} onSubmit={() => handleSubmitSection("Employment Details")} />
          </AccordionSection>

          {/* Documents */}
          <AccordionSection
            title="Documents"
            isOpen={openSection === "documents"}
            onToggle={() => toggleSection("documents")}
          >
            <Label>Upload Document</Label>
            <Input type="file" onChange={handleFileChange} />
            {employee.document && <p className="mt-2 text-sm text-gray-600">Uploaded: {employee.document}</p>}
            <FormButtons onCancel={() => handleCancelSection("documents")} onSubmit={() => handleSubmitSection("Documents")} />
          </AccordionSection>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */
const AccordionSection = ({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50" onClick={onToggle}>
      <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
      <ChevronDown
        className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        size={20}
      />
    </div>
    {isOpen && <div className="p-4 border-t border-gray-200">{children}</div>}
  </div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-gray-600">{label}</Label>
    <Input name={name} type={type} value={value} onChange={onChange} />
  </div>
);

const TextareaField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-gray-600">{label}</Label>
    <Textarea name={name} value={value} onChange={onChange} />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-gray-600">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const FormButtons = ({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) => (
  <div className="flex justify-end gap-3 mt-4">
    <Button variant="outline" onClick={onCancel}>
      Cancel
    </Button>
    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onSubmit}>
      Submit
    </Button>
  </div>
);
