"use client"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

type LeaveStatus = "Pending" | "Approved" | "Rejected"
type LeaveType =
  | "All"
  | "Vacation"
  | "Sick"
  | "Maternity"
  | "Personal"
  | "Work From Home"

type LeaveRequest = {
  employeeName: string
  employeeId: string
  role: string
  leaveType: Exclude<LeaveType, "All">
  startDate: string
  endDate: string
  totalDays: number
  status: LeaveStatus
  appliedOn: string
  managerNotes?: string
}

// Sample Data
const initialData: LeaveRequest[] = [
  {
    employeeName: "Alice Johnson",
    employeeId: "E1023",
    role: "Software Engineer",
    leaveType: "Vacation",
    startDate: "2025-05-12",
    endDate: "2025-05-16",
    totalDays: 5,
    status: "Approved",
    appliedOn: "2025-04-28",
    managerNotes: "Enjoy your time off",
  },
  {
    employeeName: "Brian Smith",
    employeeId: "E1044",
    role: "Product Manager",
    leaveType: "Sick",
    startDate: "2025-05-02",
    endDate: "2025-05-03",
    totalDays: 2,
    status: "Pending",
    appliedOn: "2025-05-01",
  },
  {
    employeeName: "Carla Mendes",
    employeeId: "E1011",
    role: "UX Designer",
    leaveType: "Personal",
    startDate: "2025-05-20",
    endDate: "2025-05-20",
    totalDays: 1,
    status: "Rejected",
    appliedOn: "2025-05-10",
    managerNotes: "Project deadline approaching",
  },
  {
    employeeName: "Daniel Lee",
    employeeId: "E1099",
    role: "QA Engineer",
    leaveType: "Vacation",
    startDate: "2025-06-01",
    endDate: "2025-06-05",
    totalDays: 5,
    status: "Approved",
    appliedOn: "2025-05-05",
  },
  {
    employeeName: "Eva Chen",
    employeeId: "E1105",
    role: "HR Specialist",
    leaveType: "Sick",
    startDate: "2025-05-08",
    endDate: "2025-05-09",
    totalDays: 2,
    status: "Approved",
    appliedOn: "2025-05-07",
    managerNotes: "Medical certificate provided",
  },
  // ... more rows as needed
]

// Helper Functions
function formatDate(d: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d
  const dt = new Date(d)
  return isNaN(dt.getTime()) ? d : dt.toISOString().slice(0, 10)
}

function download(filename: string, text: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function exportCSV(rows: LeaveRequest[]) {
  const headers = [
    "Employee Name",
    "ID",
    "Role",
    "Leave Type",
    "Start Date",
    "End Date",
    "Total Days",
    "Status",
    "Applied On",
    "Manager Notes",
  ]
  const escapeCsv = (val: string | number | undefined) => {
    if (val === undefined) return ""
    const s = String(val)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const lines = rows.map((r) =>
    [
      r.employeeName,
      r.employeeId,
      r.role,
      r.leaveType,
      formatDate(r.startDate),
      formatDate(r.endDate),
      r.totalDays,
      r.status,
      formatDate(r.appliedOn),
      r.managerNotes ?? "",
    ]
      .map(escapeCsv)
      .join(",")
  )
  const csv = [headers.join(","), ...lines].join("\n")
  download(`leave-report-${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv;charset=utf-8")
}

function exportPDF(rows: LeaveRequest[]) {
  const w = window.open("", "_blank", "width=1200,height=800")
  if (!w) return
  const style = `
    <style>
      body{ font-family: ui-sans-serif, system-ui; padding: 24px; }
      h1{ margin-bottom:16px; font-size:20px; }
      table{ border-collapse: collapse; width: 100%; font-size:12px; }
      th, td{ border:1px solid #ddd; padding:8px; text-align:left; }
      th{ background:#f3f3f3; }
    </style>`
  const header = `<h1>HRMS Leave Report</h1>`
  const headRow = `<tr>
    <th>Employee Name</th><th>ID</th><th>Role</th><th>Leave Type</th>
    <th>Start Date</th><th>End Date</th><th>Total Days</th><th>Status</th>
    <th>Applied On</th><th>Manager Notes</th>
  </tr>`
  const rowsHtml = rows
    .map(
      (r) => `<tr>
        <td>${r.employeeName}</td>
        <td>${r.employeeId}</td>
        <td>${r.role}</td>
        <td>${r.leaveType}</td>
        <td>${formatDate(r.startDate)}</td>
        <td>${formatDate(r.endDate)}</td>
        <td>${r.totalDays}</td>
        <td>${r.status}</td>
        <td>${formatDate(r.appliedOn)}</td>
        <td>${r.managerNotes ?? ""}</td>
      </tr>`
    )
    .join("")
  w.document.write(`<!doctype html><html><head><meta charset="utf-8">${style}</head><body>${header}<table>${headRow}${rowsHtml}</table></body></html>`)
  w.document.close()
  w.focus()
  setTimeout(() => w.print(), 250)
}

// Components

function StatusBadge({ status }: { status: LeaveStatus }) {
  const classes =
    status === "Approved"
      ? "bg-green-100 text-green-800"
      : status === "Rejected"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800"
  return (
    
    <Badge className={cn("font-medium px-2 py-1 rounded-full", classes)}>
      {status}
    </Badge>
  )
}

function SummaryCards({ counts }: { counts: { pending: number; approved: number; rejected: number } }) {
  const items = [
    { label: "Pending", value: counts.pending, icon: "⏳", bg: "bg-yellow-50" },
    { label: "Approved", value: counts.approved, icon: "✅", bg: "bg-green-50" },
    { label: "Rejected", value: counts.rejected, icon: "❌", bg: "bg-red-50" },
  ]
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((it) => (
        <Card key={it.label} className={cn("p-4 flex items-center gap-3 shadow-lg rounded-xl", it.bg)}>
          <div className="text-3xl">{it.icon}</div>
          <div>
            <div className="text-sm text-gray-600">{it.label}</div>
            <div className="text-2xl font-semibold">{it.value}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function FiltersBar(props: {
  search: string
  setSearch: (v: string) => void
  leaveType: LeaveType
  setLeaveType: (v: LeaveType) => void
  tab: "All" | LeaveStatus
  setTab: (v: "All" | LeaveStatus) => void
  dateFrom: string | undefined
  dateTo: string | undefined
  setDateFrom: (v: string | undefined) => void
  setDateTo: (v: string | undefined) => void
  onExportCSV: () => void
  onExportPDF: () => void
}) {
  const { search, setSearch, leaveType, setLeaveType, tab, setTab, dateFrom, dateTo, setDateFrom, setDateTo, onExportCSV, onExportPDF } = props
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-col md:flex-row gap-3 flex-1">
          <Input placeholder="Search by name or ID" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select value={leaveType} onValueChange={(v: LeaveType) => setLeaveType(v)}>
            <SelectTrigger className="min-w-[160px]"><SelectValue placeholder="Leave Type" /></SelectTrigger>
            <SelectContent>
              {(["All","Vacation","Sick","Maternity","Personal","Work From Home"] as LeaveType[]).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="date" value={dateFrom ?? ""} onChange={e => setDateFrom(e.target.value || undefined)} className="md:w-auto" />
          <Input type="date" value={dateTo ?? ""} onChange={e => setDateTo(e.target.value || undefined)} className="md:w-auto" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onExportCSV}>CSV</Button>
          <Button variant="outline" onClick={onExportPDF}>PDF</Button>
        </div>
      </div>
      <Tabs value={tab} onValueChange={v => setTab(v as any)}>
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Pending">Pending</TabsTrigger>
          <TabsTrigger value="Approved">Approved</TabsTrigger>
          <TabsTrigger value="Rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

function LeaveTable({ rows, page, pageSize, setPage }: { rows: LeaveRequest[], page: number, pageSize: number, setPage: (n: number) => void }) {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const start = (page - 1) * pageSize
  const visible = rows.slice(start, start + pageSize)
  return (
    <Card className="shadow-lg rounded-xl overflow-x-auto">
      <CardHeader>
        <CardTitle>Leave Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="table-auto w-full border-collapse">
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Total Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Manager Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length ? visible.map((r, idx) => (
              <TableRow key={r.employeeId+r.appliedOn+idx} className="hover:bg-gray-100">
                <TableCell>{r.employeeName}</TableCell>
                <TableCell>{r.employeeId}</TableCell>
                <TableCell>{r.role}</TableCell>
                <TableCell>{r.leaveType}</TableCell>
                <TableCell>{formatDate(r.startDate)}</TableCell>
                <TableCell>{formatDate(r.endDate)}</TableCell>
                <TableCell>{r.totalDays}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell>{formatDate(r.appliedOn)}</TableCell>
                <TableCell className="truncate max-w-[200px]" title={r.managerNotes ?? "-"}>{r.managerNotes ?? "-"}</TableCell>
              </TableRow>
            )) : <TableRow><TableCell colSpan={10} className="text-center text-gray-400">No records found.</TableCell></TableRow>}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing {rows.length===0?0:start+1} to {Math.min(rows.length,start+pageSize)} of {rows.length} entries</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled={page<=1} onClick={()=>setPage(1)}>{"<<"}</Button>
            <Button variant="outline" disabled={page<=1} onClick={()=>setPage(page-1)}>{"<"}</Button>
            <span>Page {page} of {totalPages}</span>
            <Button variant="outline" disabled={page>=totalPages} onClick={()=>setPage(page+1)}>{">"}</Button>
            <Button variant="outline" disabled={page>=totalPages} onClick={()=>setPage(totalPages)}>{">>"}</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChartsSection({ rows }: { rows: LeaveRequest[] }) {
  const dist = useMemo(() => {
    const counts = new Map<string, number>()
    rows.forEach(r => counts.set(r.leaveType, (counts.get(r.leaveType) || 0) + 1))
    return Array.from(counts.entries()).map(([type, count]) => ({ type, count }))
  }, [rows])

  const perMonth = useMemo(() => {
    const counts = new Map<string, number>()
    rows.forEach(r => {
      const m = r.appliedOn.slice(0, 7)
      counts.set(m, (counts.get(m) || 0) + 1)
    })
    return Array.from(counts.entries()).sort(([a], [b]) => (a < b ? -1 : 1)).map(([month, count]) => ({ month, count }))
  }, [rows])

  const COLORS = ["#4f46e5", "#14b8a6", "#f59e0b", "#ef4444", "#10b981"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Pie Chart */}
      <Card className="shadow-sm">
        <CardHeader><CardTitle>Leave Types Distribution</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={{ count: { label: "Count", color: "hsl(var(--chart-1))" } }} className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dist} dataKey="count" nameKey="type" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {dist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="shadow-lg rounded-xl">
        <CardHeader><CardTitle>Leaves Applied Per Month</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ count: { label: "Count", color: "hsl(var(--chart-1))" } }} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perMonth}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis allowDecimals={false}/>
                <Bar dataKey="count" fill="#4f46e5" radius={[6,6,0,0]}/>
                <Legend/>
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Component
export default function LeaveReportDashboard() {
  const [search, setSearch] = useState("")
  const [leaveType, setLeaveType] = useState<LeaveType>("All")
  const [tab, setTab] = useState<"All"|LeaveStatus>("All")
  const [dateFrom, setDateFrom] = useState<string|undefined>(undefined)
  const [dateTo, setDateTo] = useState<string|undefined>(undefined)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const filtered = useMemo(() => {
    return initialData.filter(r => {
      if (tab !== "All" && r.status !== tab) return false
      if (leaveType !== "All" && r.leaveType !== leaveType) return false
      if (search && ![r.employeeName, r.employeeId, r.role].some(f => f.toLowerCase().includes(search.toLowerCase()))) return false
      if (dateFrom && r.appliedOn < dateFrom) return false
      if (dateTo && r.appliedOn > dateTo) return false
      return true
    })
  }, [tab, leaveType, search, dateFrom, dateTo])

  const counts = useMemo(() => {
    const pending = filtered.filter(r => r.status === "Pending").length
    const approved = filtered.filter(r => r.status === "Approved").length
    const rejected = filtered.filter(r => r.status === "Rejected").length
    return { pending, approved, rejected }
  }, [filtered])

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">HRMS Leave Report</h1>
      <SummaryCards counts={counts} />
      <FiltersBar
        search={search} setSearch={setSearch}
        leaveType={leaveType} setLeaveType={setLeaveType}
        tab={tab} setTab={setTab}
        dateFrom={dateFrom} setDateFrom={setDateFrom}
        dateTo={dateTo} setDateTo={setDateTo}
        onExportCSV={() => exportCSV(filtered)}
        onExportPDF={() => exportPDF(filtered)}
      />
      <LeaveTable rows={filtered} page={page} pageSize={pageSize} setPage={setPage} />
      <ChartsSection rows={filtered} /> 
    </div>
  )
}
