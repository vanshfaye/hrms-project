"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Users, Menu } from "lucide-react";
import Link from "next/link";

interface Employee {
  id: number;
  name: string;
  role: string;
  managerId?: number | null;
}

interface Department {
  id: number;
  name: string;
  location?: string;
  costCenter?: string;
  employees: Employee[];
}

const initialData: Department[] = [
  {
    id: 1,
    name: "HR Department",
    location: "New York",
    costCenter: "HR001",
    employees: [
      { id: 1, name: "Alice Johnson", role: "HR Manager" },
      { id: 2, name: "Bob Smith", role: "HR Executive", managerId: 1 },
    ],
  },
  {
    id: 2,
    name: "Finance Department",
    location: "Chicago",
    costCenter: "FIN002",
    employees: [
      { id: 3, name: "Charlie Brown", role: "Finance Manager" },
      { id: 4, name: "David Lee", role: "Accountant", managerId: 3 },
    ],
  },
  {
    id: 3,
    name: "IT Department",
    location: "San Francisco",
    costCenter: "IT003",
    employees: [
      { id: 5, name: "Eve Adams", role: "IT Manager" },
      { id: 6, name: "Frank Wright", role: "Developer", managerId: 5 },
    ],
  },
];

const OrganizationStructure = () => {
  const [departments, setDepartments] = useState<Department[]>(initialData);
  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    managerId?: number | null;
  }>({ name: "", role: "", managerId: null });

  // Select Department
  const handleSelectDept = (deptId: number) => {
    setSelectedDeptId(deptId);
    setSelectedEmpId(null);
    setFormMode(null);
    setFormData({ name: "", role: "", managerId: null });
    setSidebarOpen(false);
  };

  // Select Employee
  const handleSelectEmp = (empId: number, deptId: number) => {
    setSelectedDeptId(deptId);
    setSelectedEmpId(empId);
    setFormMode(null);
    const dept = departments.find((d) => d.id === deptId)!;
    const emp = dept.employees.find((e) => e.id === empId)!;
    setFormData({ name: emp.name, role: emp.role, managerId: emp.managerId || null });
    setSidebarOpen(false);
  };

  // Add, Edit, Delete, Save
  const handleAdd = () => {
    if (selectedDeptId === null) return alert("Select a department first");
    setFormMode("add");
    setFormData({ name: "", role: "", managerId: null });
  };

  const handleEdit = () => {
    if (selectedEmpId === null) return;
    setFormMode("edit");
  };

  const handleDelete = () => {
    if (selectedEmpId === null || selectedDeptId === null) return;
    if (!confirm("Are you sure you want to delete this employee?")) return;
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === selectedDeptId
          ? { ...d, employees: d.employees.filter((e) => e.id !== selectedEmpId) }
          : d
      )
    );
    setSelectedEmpId(null);
    setFormMode(null);
    setFormData({ name: "", role: "", managerId: null });
  };

  const handleSave = () => {
    if (!formData.name || !formData.role) return alert("Please fill all fields");

    if (formMode === "add" && selectedDeptId !== null) {
      const newId =
        Math.max(...departments.flatMap((d) => d.employees.map((e) => e.id)), 0) + 1;
      const newEmp: Employee = { id: newId, ...formData };
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === selectedDeptId ? { ...d, employees: [...d.employees, newEmp] } : d
        )
      );
    } else if (formMode === "edit" && selectedDeptId && selectedEmpId) {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === selectedDeptId
            ? {
                ...d,
                employees: d.employees.map((e) =>
                  e.id === selectedEmpId ? { ...e, ...formData } : e
                ),
              }
            : d
        )
      );
    }
    setFormMode(null);
    setFormData({ name: "", role: "", managerId: null });
  };

  // Employee tree
  const renderEmployees = (emps: Employee[], managerId?: number | null, level = 0) =>
    emps
      .filter((e) => e.managerId === managerId)
      .map((e) => (
        <div key={e.id}>
          <div
            onClick={() => handleSelectEmp(e.id, selectedDeptId!)}
            className={`cursor-pointer px-2 py-1 rounded text-sm flex justify-between items-center hover:bg-gray-100 ${
              selectedEmpId === e.id ? "bg-blue-200 font-semibold" : ""
            }`}
            style={{ marginLeft: level * 16 }}
          >
            <span>{e.name}</span>
            <span className="text-gray-400 text-xs">{e.role}</span>
          </div>
          {renderEmployees(emps, e.id, level + 1)}
        </div>
      ));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm sm:text-base text-gray-600 bg-white px-4 py-2 rounded-lg shadow mb-4">
        <Link href="/hrms" className="font-medium hover:text-blue-600">
          HRMS
        </Link>
        <span className="mx-1 text-gray-400">/</span>
        <Link href="/hrms/admin" className="font-medium hover:text-blue-600">
          Admin
        </Link>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Organization Structure</span>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white p-4 shadow-lg transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:w-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Users size={18} />
              <span>Departments</span>
            </h2>
            <button
              className="md:hidden text-gray-500"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)] pr-2">
            {departments.map((dept) => (
              <div key={dept.id} className="mb-3">
                <div
                  onClick={() => handleSelectDept(dept.id)}
                  className={`cursor-pointer px-3 py-2 rounded font-medium flex items-center justify-between ${
                    selectedDeptId === dept.id && selectedEmpId === null
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{dept.name}</span>
                  <span className="text-gray-400">{dept.employees.length}</span>
                </div>
                {selectedDeptId === dept.id && (
                  <div className="pl-3 mt-1 space-y-1">
                    {renderEmployees(dept.employees)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden flex items-center px-3 py-2 bg-blue-600 text-white rounded mb-4 w-fit"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={16} className="mr-2" /> Departments
        </button>

        {/* Details Panel */}
        <div className="col-span-2 bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-lg font-semibold">
              {formMode === "edit"
                ? "Edit Employee"
                : formMode === "add"
                ? "Add Employee"
                : selectedEmpId
                ? "Employee Details"
                : "Select Employee"}
            </h3>
            <button
              onClick={handleAdd}
              className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 space-x-1"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>

          {(formMode || selectedEmpId) && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  disabled={!formMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role / Position
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  disabled={!formMode}
                />
              </div>
              {selectedDeptId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manager
                  </label>
                  <select
                    value={formData.managerId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        managerId: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                    disabled={!formMode}
                  >
                    <option value="">No Manager</option>
                    {departments
                      .find((d) => d.id === selectedDeptId)!
                      .employees.filter((e) => e.id !== selectedEmpId)
                      .map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 pt-3">
                {formMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setFormMode(null)}
                      className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </>
                ) : selectedEmpId ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex-1 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      <Edit size={16} className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
                    >
                      <Trash2 size={16} className="inline mr-1" /> Delete
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationStructure;
