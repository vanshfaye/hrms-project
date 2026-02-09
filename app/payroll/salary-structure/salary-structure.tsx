"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link"
type Employee = {
  id: number;
  name: string;
  basic: number;
  hra: number;
  allowance: number;
  total: number;
};

const formatNumber = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function EmployeeSalaryStructure() {
  const [salaryData, setSalaryData] = useState<Employee[]>([
    { id: 1, name: "John Doe", basic: 40000, hra: 15000, allowance: 5000, total: 60000 },
    { id: 2, name: "Jane Smith", basic: 35000, hra: 12000, allowance: 4000, total: 51000 },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [form, setForm] = useState({
    name: "",
    basic: 0,
    hra: 0,
    allowance: 0,
  });

  const totalPayroll = salaryData.reduce((acc, emp) => acc + emp.total, 0);

  const resetForm = () => {
    setForm({ name: "", basic: 0, hra: 0, allowance: 0 });
    setEditingEmployee(null);
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (emp: Employee) => {
    setEditingEmployee(emp);
    setForm({
      name: emp.name,
      basic: emp.basic,
      hra: emp.hra,
      allowance: emp.allowance,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setSalaryData((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleSubmit = () => {
    const total = form.basic + form.hra + form.allowance;

    if (!form.name) {
      alert("Please enter employee name");
      return;
    }

    if (editingEmployee) {
      // Update
      setSalaryData((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id ? { ...form, id: emp.id, total } : emp
        )
      );
    } else {
      // Add
      const newEmployee: Employee = {
        id: salaryData.length ? salaryData[salaryData.length - 1].id + 1 : 1,
        name: form.name,
        basic: form.basic,
        hra: form.hra,
        allowance: form.allowance,
        total,
      };
      setSalaryData((prev) => [...prev, newEmployee]);
    }

    setDialogOpen(false);
    resetForm();
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
        <span className="text-foreground font-semibold">salary Structure</span>
      </div>
 
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Employee Salary Structure
        </h1>
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
          onClick={openAddDialog}
        >
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>

      {/* Salary Table */}
      <Card className="shadow-md border border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Salary Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase border-b text-left">
              <tr>
                <th className="px-5 py-3">Employee</th>
                <th className="px-5 py-3">Basic</th>
                <th className="px-5 py-3">HRA</th>
                <th className="px-5 py-3">Allowance</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {salaryData.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-medium text-gray-800">{emp.name}</td>
                  <td className="px-5 py-3">${formatNumber(emp.basic)}</td>
                  <td className="px-5 py-3">${formatNumber(emp.hra)}</td>
                  <td className="px-5 py-3">${formatNumber(emp.allowance)}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900">
                    ${formatNumber(emp.total)}
                  </td>
                  <td className="px-5 py-3 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(emp)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-semibold text-gray-800">
              <tr>
                <td className="px-5 py-3 text-right" colSpan={4}>
                  Total Payroll
                </td>
                <td className="px-5 py-3">${formatNumber(totalPayroll)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Employee Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Basic</Label>
              <Input
                type="number"
                value={form.basic}
                onChange={(e) => setForm({ ...form, basic: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>HRA</Label>
              <Input
                type="number"
                value={form.hra}
                onChange={(e) => setForm({ ...form, hra: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Allowance</Label>
              <Input
                type="number"
                value={form.allowance}
                onChange={(e) =>
                  setForm({ ...form, allowance: Number(e.target.value) })
                }
              />
            </div>
            <div className="border-t pt-3">
              <p className="text-gray-700 font-medium">
                Total:{" "}
                <span className="text-indigo-600 font-semibold">
                  ${form.basic + form.hra + form.allowance}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 text-white" onClick={handleSubmit}>
              {editingEmployee ? "Update" : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}
