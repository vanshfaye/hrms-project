"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Wallet,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const payrollData = [
  { name: "Jan", amount: 48000 },
  { name: "Feb", amount: 52000 },
  { name: "Mar", amount: 49000 },
  { name: "Apr", amount: 56000 },
  { name: "May", amount: 60000 },
];

const deductionData = [
  { name: "Tax", value: 40 },
  { name: "PF", value: 25 },
  { name: "ESI", value: 15 },
  { name: "Other", value: 20 },
];

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

export default function PayrollDashboard() {
  const router = useRouter();

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
          Payroll
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">
          Dashboard
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* <h1 className="text-3xl font-bold text-gray-800">Payroll Dashboard</h1> */}
          <p className="text-gray-600">
            {/* Overview of payroll operations and key insights. */}
          </p>
        </div>
        {/* <Button
          size="lg"
          onClick={() => router.push("/payroll/generate-payroll")}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Generate Payroll
        </Button> */}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <KPI
          title="Total Payroll"
          value="$248,000"
          subtext="This month"
          icon={<Wallet className="text-indigo-600" />}
        />
        <KPI
          title="Employees Paid"
          value="128"
          subtext="Out of 132"
          icon={<Users className="text-green-600" />}
        />
        <KPI
          title="Pending Approvals"
          value="5"
          subtext="Awaiting review"
          icon={<FileText className="text-yellow-600" />}
        />
        <KPI
          title="Payroll Growth"
          value="+8%"
          subtext="vs last month"
          icon={<TrendingUp className="text-rose-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card className="border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Monthly Payroll Expense</CardTitle>
            <CardDescription>Last 5 months overview</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={payrollData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Deductions Breakdown</CardTitle>
            <CardDescription>Percentage split by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={deductionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {deductionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <ActionCard
            title="Payslips"
            desc="Manage and issue employee payslips"
            onClick={() => router.push("/payroll/payslip-management")}
          />
          <ActionCard
            title="Salary Adjustments"
            desc="Apply incentives or deductions"
            onClick={() => router.push("/payroll/salary-adjustment")}
          />
          <ActionCard
            title="Tax & Deductions"
            desc="Configure and review statutory deductions"
            onClick={() => router.push("/payroll/tax-deductions")}
          />
        </div>
      </div>
    </div>
  );
}

/* KPI Component */
function KPI({
  title,
  value,
  subtext,
  icon,
}: {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="p-2 rounded-full bg-gray-100">{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>
    </div>
  );
}

/* Quick Action Cards */
function ActionCard({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-800">{title}</p>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
