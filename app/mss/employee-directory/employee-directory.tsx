"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

/* ----------------------------- Types ----------------------------- */
interface FamilyMember {
  name: string;
  relation: string;
  contact: string;
  address: string;
}

interface Employee {
  id: number;
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

/* --------------------------- Component --------------------------- */
export default function EmployeePersonalDetails() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
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

  /* ------------------------- Handlers ------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setNewEmployee((prev) => ({ ...prev, document: file.name }));
  };

  const handleFamilyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFamilyMember((prev) => ({ ...prev, [name]: value }));
  };

  const addFamilyMember = () => {
    if (!familyMember.name || !familyMember.relation)
      return alert("Please enter family member name and relation.");
    setNewEmployee((prev) => ({
      ...prev,
      family: [...prev.family, familyMember],
    }));
    setFamilyMember({ name: "", relation: "", contact: "", address: "" });
  };

  const removeFamilyMember = (index: number) => {
    setNewEmployee((prev) => ({
      ...prev,
      family: prev.family.filter((_, i) => i !== index),
    }));
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name) return alert("Please fill in employee name!");
    setEmployees((prev) => [...prev, { id: Date.now(), ...newEmployee }]);
    setOpen(false);
    setNewEmployee({
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
  };

  /* -------------------------- Render -------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ✅ Breadcrumb Section */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link
          href="/hrms"
          className="font-medium hover:text-primary transition-colors"
        >
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link
          href="/hrms/ess"
          className="font-medium hover:text-primary transition-colors"
        >
          Mss
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">
          Employee
        </span>
      </div>

      {/* ✅ Main Content */}
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Employee Personal Details
          </CardTitle>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Add Employee
              </Button>
            </DialogTrigger>

            {/* --- Dialog Form --- */}
            <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh] p-6 rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  Add New Employee
                </DialogTitle>
              </DialogHeader>

              {/* Your form sections remain unchanged */}
              {/* ... */}
            </DialogContent>
          </Dialog>
        </CardHeader>

        {/* --- Employee Table --- */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Joining Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>{emp.contact}</TableCell>
                  <TableCell>{emp.joiningDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------- Expandable Section Component -------------------- */
const AccordionSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
        <span className="text-gray-500 text-xl">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <div className="p-4 border-t border-gray-200">{children}</div>}
    </div>
  );
};

/* -------------------- Reusable Form Components -------------------- */
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
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
    />
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
    <Textarea
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
    />
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
