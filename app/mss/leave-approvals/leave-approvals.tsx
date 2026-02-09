"use client";

import * as React from "react";
import {
  format,
  isWithinInterval,
  addDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import {
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Search,
  MoreHorizontal,
  Calendar,
  FileDown,
  ShieldCheck,
  Paperclip,
  ListChecks,
} from "lucide-react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

type Status = "Pending" | "Approved" | "Rejected";
type LeaveType = "Annual" | "Sick" | "Casual" | "Unpaid" | "Work From Home";

type Employee = {
  name: string;
  role: string;
  avatar?: string;
};

type LeaveRequest = {
  id: string;
  employee: Employee;
  leaveType: LeaveType;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: Status;
  appliedOn: string;
  managerNote?: string;
  attachments?: { name: string; url?: string }[];
  leaveBalance?: { annual: number; sick: number; casual: number };
};

const initialData: LeaveRequest[] = [
  {
    id: "LR-2025-0001",
    employee: { name: "Aarav Sharma", role: "Software Engineer" },
    leaveType: "Annual",
    from: new Date().toISOString(),
    to: addDays(new Date(), 4).toISOString(),
    days: 5,
    reason: "Family travel planned in advance.",
    status: "Pending",
    appliedOn: addDays(new Date(), -2).toISOString(),
    attachments: [{ name: "itinerary.pdf" }, { name: "leave-form.pdf" }],
    leaveBalance: { annual: 12, sick: 6, casual: 3 },
  },
  {
    id: "LR-2025-0002",
    employee: { name: "Priya Patel", role: "Product Manager" },
    leaveType: "Sick",
    from: addDays(new Date(), -1).toISOString(),
    to: addDays(new Date(), 1).toISOString(),
    days: 3,
    reason: "Flu and rest per doctor advice.",
    status: "Pending",
    appliedOn: addDays(new Date(), -1).toISOString(),
  },
  {
    id: "LR-2025-0003",
    employee: { name: "Rahul Verma", role: "QA Analyst" },
    leaveType: "Casual",
    from: addDays(new Date(), 10).toISOString(),
    to: addDays(new Date(), 10).toISOString(),
    days: 1,
    reason: "Personal errand.",
    status: "Approved",
    appliedOn: addDays(new Date(), -7).toISOString(),
  },
];

function StatusBadge({ status }: { status: Status }) {
  const map = {
    Pending: "bg-amber-50 text-amber-700 border-amber-300",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-300",
    Rejected: "text-primary border-primary/50 bg-primary/10",
  };
  return <Badge variant="outline" className={map[status]}>{status}</Badge>;
}

function initials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function MSSLeaveApprovalPage() {
  const [requests, setRequests] = React.useState(initialData);
  const [search, setSearch] = React.useState("");
  const [statusTab, setStatusTab] = React.useState<Status | "All">("Pending");
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  const filtered = requests.filter(r =>
    (statusTab === "All" || r.status === statusTab) &&
    (r.employee.name.toLowerCase().includes(search.toLowerCase()) ||
      r.reason.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleOne = (id: string, checked: boolean) => {
    setSelected(prev => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ✅ Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/admin" className="font-medium hover:text-primary transition-colors">
          Admin
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Leave Management</span>
      </div>

      {/* ✅ Page Header */}
      <main className="mx-auto max-w-7xl p-6">
        <header className="mb-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Manager Self-Service — Leave Approvals
            </h1>
          </div>
          <p className="text-muted-foreground">
            Review, approve, or reject employee leave requests.
          </p>
        </header>

        {/* ✅ Search + Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-3">
              <Search className="text-muted-foreground size-4" />
              <Input
                placeholder="Search employee or reason..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Tabs value={statusTab} onValueChange={(v) => setStatusTab(v as any)}>
              <TabsList>
                <TabsTrigger value="Pending">Pending</TabsTrigger>
                <TabsTrigger value="Approved">Approved</TabsTrigger>
                <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                <TabsTrigger value="All">All</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <table className="w-full border-collapse">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left">Employee</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Dates</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={r.employee.avatar || ""} alt="" />
                        <AvatarFallback>{initials(r.employee.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{r.employee.name}</div>
                        <div className="text-xs text-muted-foreground">{r.employee.role}</div>
                      </div>
                    </td>
                    <td className="p-3">{r.leaveType}</td>
                    <td className="p-3">
                      {format(new Date(r.from), "MMM d")} - {format(new Date(r.to), "MMM d")}
                    </td>
                    <td className="p-3">{r.reason}</td>
                    <td className="p-3"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-muted-foreground">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
