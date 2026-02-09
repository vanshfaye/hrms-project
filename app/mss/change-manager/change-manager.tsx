'use client';

import { useState, useEffect } from 'react';
import { IconCheck, IconChevronDown, IconCalendar, IconUser, IconBuilding, IconClipboardText } from '@tabler/icons-react';
import Link from "next/link"
interface Employee {
  id: string;
  employeeId: string;
  name: string;
  currentManager: string;
  department: string;
}

interface WorkflowStep {
  label: string;
  status: 'completed' | 'active' | 'pending';
}

export default function ChangeManagerPage() {
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [newManager, setNewManager] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [reason, setReason] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showManagerDropdown, setShowManagerDropdown] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const employees: Employee[] = [
    { id: '1', employeeId: 'EMP001', name: 'Sarah Johnson', currentManager: 'Michael Chen', department: 'Engineering' },
    { id: '2', employeeId: 'EMP002', name: 'David Martinez', currentManager: 'Michael Chen', department: 'Engineering' },
    { id: '3', employeeId: 'EMP003', name: 'Emily Roberts', currentManager: 'Michael Chen', department: 'Engineering' },
    { id: '4', employeeId: 'EMP004', name: 'James Wilson', currentManager: 'Lisa Anderson', department: 'Product' },
    { id: '5', employeeId: 'EMP005', name: 'Anna Thompson', currentManager: 'Lisa Anderson', department: 'Product' },
  ];

  const managers = [
    { id: 'm1', name: 'Michael Chen' },
    { id: 'm2', name: 'Lisa Anderson' },
    { id: 'm3', name: 'Robert Taylor' },
    { id: 'm4', name: 'Jennifer Brown' },
    { id: 'm5', name: 'Christopher Davis' },
  ];

  const reasons = [
    'Organizational Restructuring',
    'Manager Resignation',
    'Department Transfer',
    'Performance Management',
    'Career Development',
    'Other',
  ];

  const workflowSteps: WorkflowStep[] = [
    { label: 'Submitted', status: 'pending' },
    { label: 'Pending HR Approval', status: 'pending' },
    { label: 'Approved', status: 'pending' },
  ];

  const toggleEmployee = (id: string) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEmployees(newSelected);
  };

  const toggleAll = () => {
    if (selectedEmployees.size === employees.length) {
      setSelectedEmployees(new Set());
    } else {
      setSelectedEmployees(new Set(employees.map(e => e.id)));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Submit clicked');

    if (selectedEmployees.size === 0 || !newManager || !effectiveDate || !reason) {
      alert('Please fill in all required fields and select at least one employee.');
      return;
    }

    const selectedEmployeesList = employees.filter(emp => selectedEmployees.has(emp.id));

    alert(`Manager change submitted!\n\nSelected Employees: ${selectedEmployeesList.map(e => e.name).join(', ')}\nNew Manager: ${newManager}\nEffective Date: ${effectiveDate}\nReason: ${reason}`);

    clearForm();
  };

  const handleSaveDraft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Save draft clicked');

    if (selectedEmployees.size === 0) {
      alert('Please select at least one employee to save as draft.');
      return;
    }

    alert('Changes saved as draft successfully!');
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Cancel clicked');

    if (selectedEmployees.size > 0 || newManager || effectiveDate || reason || remarks) {
      if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        clearForm();
      }
    }
  };

  const clearForm = () => {
    setSelectedEmployees(new Set());
    setNewManager('');
    setEffectiveDate('');
    setReason('');
    setRemarks('');
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
         Mss
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">change-manager</span>
      </div>
 
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <span>Manager Self-Service (MSS)</span>
              </div>
              <h1 className="text-3xl font-semibold text-slate-800">Change Manager</h1>
            </div>

            {/* Employee Selection Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800">Select Employees</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.size === employees.length}
                          onChange={toggleAll}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Employee ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Current Manager
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Department
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {employees.map((employee) => (
                      <tr
                        key={employee.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          selectedEmployees.has(employee.id) ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedEmployees.has(employee.id)}
                            onChange={() => toggleEmployee(employee.id)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">{employee.employeeId}</td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">{employee.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{employee.currentManager}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{employee.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assignment Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800">Assign New Manager</h2>
              </div>
              <div className="p-6 space-y-5">
                {/* New Manager Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New Manager <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowManagerDropdown(!showManagerDropdown)}
                      className="w-full px-4 py-2.5 text-left bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <IconUser size={18} className="text-slate-500" />
                        <span className={newManager ? 'text-slate-900' : 'text-slate-500'}>
                          {newManager || 'Select new manager'}
                        </span>
                      </span>
                      <IconChevronDown size={18} className="text-slate-400" />
                    </button>
                    {showManagerDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {managers.map((manager) => (
                          <button
                            key={manager.id}
                            type="button"
                            onClick={() => {
                              setNewManager(manager.name);
                              setShowManagerDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-sm text-slate-900"
                          >
                            {manager.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Effective Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Effective Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      className="w-full px-4 py-2.5 pl-10 bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <IconCalendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>

                {/* Reason for Change */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reason for Change <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowReasonDropdown(!showReasonDropdown)}
                      className="w-full px-4 py-2.5 pl-10 text-left bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between"
                    >
                      <span className={reason ? 'text-slate-900' : 'text-slate-500'}>
                        {reason || 'Select reason'}
                      </span>
                      <IconChevronDown size={18} className="text-slate-400" />
                    </button>
                    <IconClipboardText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    {showReasonDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {reasons.map((reasonOption) => (
                          <button
                            key={reasonOption}
                            type="button"
                            onClick={() => {
                              setReason(reasonOption);
                              setShowReasonDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-sm text-slate-900"
                          >
                            {reasonOption}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Remarks
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={4}
                    placeholder="Add any additional comments or notes..."
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={selectedEmployees.size === 0 || !newManager || !effectiveDate || !reason}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Submit for Approval
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Sidebar - Approval Workflow */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 sticky top-8">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800">Approval Workflow</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {workflowSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            step.status === 'completed'
                              ? 'bg-green-500 border-green-500'
                              : step.status === 'active'
                              ? 'bg-blue-600 border-blue-600'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {step.status === 'completed' ? (
                            <IconCheck size={20} className="text-white" />
                          ) : (
                            <span
                              className={`text-sm font-semibold ${
                                step.status === 'active' ? 'text-white' : 'text-slate-400'
                              }`}
                            >
                              {index + 1}
                            </span>
                          )}
                        </div>
                        {index < workflowSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-12 mt-2 ${
                              step.status === 'completed' ? 'bg-green-500' : 'bg-slate-200'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <p
                          className={`font-medium ${
                            step.status === 'pending' ? 'text-slate-500' : 'text-slate-800'
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {step.status === 'completed'
                            ? 'Completed'
                            : step.status === 'active'
                            ? 'In Progress'
                            : 'Awaiting'}
                        </p>
                      </div>
                    </div>
                  ))}
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
