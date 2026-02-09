'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calendar, Edit2, Loader2 } from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar';
import Link from "next/link";

// --- Types ---
type LeaveType = 'Annual' | 'Sick' | 'Compensatory' | 'Unpaid';

interface LeavePlan {
  id: string;
  employee: string;
  startDate: string;
  endDate: string;
  type: LeaveType;
  status: 'Pending' | 'Approved' | 'Rejected';
  days: number;
}

// --- Mock Data ---
const initialLeavePlans: LeavePlan[] = [
  { id: '1', employee: 'Alice Johnson', startDate: '2025-11-01', endDate: '2025-11-05', type: 'Annual', status: 'Pending', days: 5 },
  { id: '2', employee: 'Bob Smith', startDate: '2025-10-20', endDate: '2025-10-20', type: 'Sick', status: 'Approved', days: 1 },
  { id: '3', employee: 'Charlie Brown', startDate: '2025-12-24', endDate: '2025-12-31', type: 'Unpaid', status: 'Approved', days: 8 },
  { id: '4', employee: 'Diana Prince', startDate: '2025-10-25', endDate: '2025-10-26', type: 'Compensatory', status: 'Rejected', days: 2 },
];

// --- Simplified UI Components ---
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'destructive' | 'outline', size?: 'default' | 'icon' }> = ({ children, className, variant = 'primary', size = 'default', ...props }) => {
  let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  if (variant === 'primary') {
    baseClasses += ' bg-slate-900 text-slate-50 shadow hover:bg-slate-700';
  } else if (variant === 'outline') {
    baseClasses += ' border border-slate-200 bg-white shadow-sm hover:bg-slate-50';
  } else if (variant === 'destructive') {
    baseClasses += ' bg-red-600 text-white shadow-sm hover:bg-red-700';
  }

  if (size === 'default') baseClasses += ' h-10 px-4 py-2';
  else if (size === 'icon') baseClasses += ' h-9 w-9';

  return <button className={`${baseClasses} ${className}`} {...props}>{children}</button>;
};

const Card: React.FC<{ title: string, className?: string, children: React.ReactNode }> = ({ title, className, children }) => (
  <div className={`rounded-xl border bg-white text-slate-950 shadow-lg ${className}`}>
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="p-6 pt-0">{children}</div>
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
);

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label className={`text-sm font-medium ${className}`} {...props} />
);

const Select: React.FC<{ children: React.ReactNode, value: string, onChange: (value: string) => void, name?: string }> = ({ children, value, onChange, name }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name={name}
    className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
  >
    {children}
  </select>
);

// --- Main Component ---
const LeavePlanPage: React.FC = () => {
  const [leavePlans, setLeavePlans] = useState<LeavePlan[]>(initialLeavePlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({ employee: '', startDate: '', endDate: '', type: 'Annual' as LeaveType });
  const [loading, setLoading] = useState(false);

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate > endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.employee || !newPlan.startDate || !newPlan.endDate) return;
    const days = calculateDays(newPlan.startDate, newPlan.endDate);
    if (days <= 0) return;
    setLoading(true);

    setTimeout(() => {
      const newLeave: LeavePlan = {
        id: crypto.randomUUID(),
        ...newPlan,
        days,
        status: 'Pending',
      };
      setLeavePlans([newLeave, ...leavePlans]);
      setNewPlan({ employee: '', startDate: '', endDate: '', type: 'Annual' });
      setIsDialogOpen(false);
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      setLeavePlans(leavePlans.filter(plan => plan.id !== id));
    }
  };

  const getStatusClasses = (status: LeavePlan['status']) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 border border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border border-red-200';
    }
  };

  const totalPlannedDays = useMemo(() =>
    leavePlans.filter(p => p.status === 'Approved' || p.status === 'Pending').reduce((sum, p) => sum + p.days, 0),
    [leavePlans]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
          Admin
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Leave Plan</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        {/* <h1 className="text-3xl font-bold text-slate-900">Leave Plans</h1> */}
        <Button onClick={() => setIsDialogOpen(true)} variant="primary" className="shadow-lg w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" /> New Leave Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Total Planned Days">
          <p className="text-3xl font-extrabold">{totalPlannedDays}</p>
          <p className="text-sm text-slate-500 mt-1">Approved & Pending Leave</p>
        </Card>
        <Card title="Pending Requests">
          <p className="text-3xl font-extrabold text-yellow-500">{leavePlans.filter(p => p.status === 'Pending').length}</p>
          <p className="text-sm text-slate-500 mt-1">Awaiting manager approval</p>
        </Card>
        <Card title="Approved Requests">
          <p className="text-3xl font-extrabold text-green-500">{leavePlans.filter(p => p.status === 'Approved').length}</p>
          <p className="text-sm text-slate-500 mt-1">Scheduled and confirmed</p>
        </Card>
      </div>

      {/* Leave Plan Table */}
      <Card title="All Leave Requests">
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Start</th>
                <th className="px-6 py-3">End</th>
                <th className="px-6 py-3">Days</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leavePlans.map(plan => (
                <tr key={plan.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{plan.employee}</td>
                  <td className="px-6 py-4">{plan.startDate}</td>
                  <td className="px-6 py-4">{plan.endDate}</td>
                  <td className="px-6 py-4 font-semibold">{plan.days}</td>
                  <td className="px-6 py-4">{plan.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClasses(plan.status)}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <Button size="icon" variant="outline" title="Edit" className="h-8 w-8">
                      <Edit2 className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => handleDelete(plan.id)} title="Delete" className="h-8 w-8">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add New Leave Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">New Leave Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="employee">Employee Name</Label>
                <Input id="employee" name="employee" value={newPlan.employee} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="type">Leave Type</Label>
                <Select name="type" value={newPlan.type} onChange={(v) => setNewPlan({ ...newPlan, type: v as LeaveType })}>
                  {(['Annual', 'Sick', 'Compensatory', 'Unpaid'] as LeaveType[]).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="date" value={newPlan.startDate} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" type="date" value={newPlan.endDate} onChange={handleInputChange} min={newPlan.startDate} required />
                </div>
              </div>

              <p className="text-sm text-slate-600 pt-2">
                Planned duration: <span className="font-semibold">{calculateDays(newPlan.startDate, newPlan.endDate)} days</span>
              </p>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>Cancel</Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Calendar className="w-4 h-4 mr-2" />} Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavePlanPage;

