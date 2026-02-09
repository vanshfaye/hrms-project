"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

/* ---------------------------- Types ---------------------------- */
interface CertificationInfo {
  name: string;
  authority: string;
  dateIssued: string;
  validUntil: string;
  file: File | null;
}

interface Skill {
  id: number;
  skillName: string;
  category: string;
  proficiency: string;
  experience: string;
  lastUsed: string;
  description: string;
  certification: CertificationInfo;
}

/* ---------------------------- Component ---------------------------- */
export default function Skillfolio() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [open, setOpen] = useState(false);

  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    skillName: "",
    category: "",
    proficiency: "",
    experience: "",
    lastUsed: "",
    description: "",
    certification: {
      name: "",
      authority: "",
      dateIssued: "",
      validUntil: "",
      file: null,
    },
  });

  /* -------------------------- Handlers -------------------------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof Skill, value: string) => {
    setNewSkill((prev) => ({ ...prev, [field]: value }));
  };

  const handleCertificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({
      ...prev,
      certification: { ...prev.certification, [name]: value },
    }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setNewSkill((prev) => ({
      ...prev,
      certification: { ...prev.certification, file },
    }));
  };

  const handleAddSkill = () => {
    if (!newSkill.skillName) return alert("Please enter Skill Name!");
    setSkills((prev) => [...prev, { id: Date.now(), ...newSkill }]);
    setNewSkill({
      skillName: "",
      category: "",
      proficiency: "",
      experience: "",
      lastUsed: "",
      description: "",
      certification: {
        name: "",
        authority: "",
        dateIssued: "",
        validUntil: "",
        file: null,
      },
    });
    setOpen(false);
  };

  /* -------------------------- Render -------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
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
          Ess
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">
          Skillfolio
        </span>
      </div>

      {/* Skillfolio Section */}
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader className="flex justify-between items-center border-b pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Skillfolio Management
          </CardTitle>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                + Add Skill
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh] p-6 rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">
                  Add New Skill
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Skill Information */}
                <section className="bg-white p-4 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 text-gray-700">
                    Skill Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Skill Name"
                      name="skillName"
                      value={newSkill.skillName}
                      onChange={handleChange}
                      placeholder="e.g., React.js, SQL"
                    />
                    <SelectField
                      label="Category"
                      name="category"
                      value={newSkill.category}
                      onChange={(v: any) =>
                        handleSelectChange("category", v)
                      }
                      options={[
                        "Technical",
                        "Soft Skill",
                        "Management",
                        "Other",
                      ]}
                    />
                    <SelectField
                      label="Proficiency"
                      name="proficiency"
                      value={newSkill.proficiency}
                      onChange={(v: any) =>
                        handleSelectChange("proficiency", v)
                      }
                      options={[
                        "Beginner",
                        "Intermediate",
                        "Advanced",
                        "Expert",
                      ]}
                    />
                    <InputField
                      label="Experience (Years)"
                      name="experience"
                      value={newSkill.experience}
                      onChange={handleChange}
                      type="number"
                      placeholder="e.g. 3"
                    />
                    <InputField
                      label="Last Used Date"
                      name="lastUsed"
                      value={newSkill.lastUsed}
                      onChange={handleChange}
                      type="date"
                    />
                    <TextareaField
                      label="Description / Remarks"
                      name="description"
                      value={newSkill.description}
                      onChange={handleChange}
                      placeholder="Short summary of skill usage"
                    />
                  </div>
                </section>

                {/* Certification Info */}
                <section className="bg-white p-4 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 text-gray-700">
                    Certification / Training Details (Optional)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Certification Name"
                      name="name"
                      value={newSkill.certification.name}
                      onChange={handleCertificationChange}
                      placeholder="e.g., AWS Certified Developer"
                    />
                    <InputField
                      label="Issuing Authority"
                      name="authority"
                      value={newSkill.certification.authority}
                      onChange={handleCertificationChange}
                      placeholder="e.g., Amazon, Coursera"
                    />
                    <InputField
                      label="Date Issued"
                      name="dateIssued"
                      value={newSkill.certification.dateIssued}
                      onChange={handleCertificationChange}
                      type="date"
                    />
                    <InputField
                      label="Valid Until"
                      name="validUntil"
                      value={newSkill.certification.validUntil}
                      onChange={handleCertificationChange}
                      type="date"
                    />
                    <div className="col-span-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Upload Certificate
                      </Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={handleFileUpload}
                      />
                      {newSkill.certification.file && (
                        <p className="text-xs text-gray-500 mt-1">
                          Uploaded: {newSkill.certification.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleAddSkill}
                  >
                    Save Skill
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        {/* Table */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Proficiency</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Certification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.skillName}</TableCell>
                  <TableCell>{s.category}</TableCell>
                  <TableCell>{s.proficiency}</TableCell>
                  <TableCell>{s.experience}</TableCell>
                  <TableCell>{s.lastUsed}</TableCell>
                  <TableCell>
                    {s.certification.name
                      ? `${s.certification.name} (${s.certification.authority})`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------------- Reusable Fields ---------------------- */
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: any) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-gray-600">{label}</Label>
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder }: any) => (
  <div className="space-y-1 col-span-2">
    <Label className="text-sm font-medium text-gray-600">{label}</Label>
    <Textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }: any) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-gray-600">{label}</Label>
    <Select value={value} onValueChange={(v) => onChange(v)}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt: string) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
