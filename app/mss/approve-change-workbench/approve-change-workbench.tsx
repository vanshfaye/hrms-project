"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
type ChangeRequest = {
  id: string
  selected: boolean
  empId: string
  name: string
  changeType: string
  currentValue: string
  proposedValue: string
  effectiveDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
}

export default function ApproveChangeWorkbench() {
  const { toast } = useToast()

  const [requests, setRequests] = useState<ChangeRequest[]>([
    {
      id: crypto.randomUUID(),
      selected: false,
      empId: "EMP001",
      name: "Rahul Singh",
      changeType: "Manager Change",
      currentValue: "Amit Kumar",
      proposedValue: "Neha Sharma",
      effectiveDate: "2025-11-01",
      reason: "Department Restructure",
      status: "Pending",
    },
    {
      id: crypto.randomUUID(),
      selected: false,
      empId: "EMP002",
      name: "Priya Sharma",
      changeType: "Resource Movement",
      currentValue: "Project Alpha",
      proposedValue: "Project Beta",
      effectiveDate: "2025-10-20",
      reason: "Project Completion",
      status: "Pending",
    },
  ])

  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")

  const filteredRequests = requests.filter(
    (r) =>
      (filter ? r.changeType === filter : true) &&
      (search
        ? r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.empId.includes(search)
        : true)
  )

  const handleAction = (id: string, action: "Approve" | "Reject") => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: action === "Approve" ? "Approved" : "Rejected" }
          : r
      )
    )

    toast({
      title: `Request ${action}ed`,
      description: `The change request has been ${action.toLowerCase()}ed successfully.`,
    })
  }

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
        <span className="text-foreground font-semibold">approve-change-workbench</span>
      </div>
 
    <main className="mx-auto w-full max-w-7xl px-8 py-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-blue-600">
          Approve Change Workbench
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manager Self-Service (MSS)</p>
      </div>

      {/* Filters */}
      <Card className="mb-8 border border-gray-200 shadow-sm">
        <CardContent className="grid grid-cols-1 gap-6 py-6 md:grid-cols-3">
          <div>
            <Label className="mb-2 block text-sm font-medium text-gray-700">
              Filter by Change Type
            </Label>
            <Select value={filter} onValueChange={(value) => setFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select change type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manager Change">Manager Change</SelectItem>
                <SelectItem value="Resource Movement">Resource Movement</SelectItem>
                <SelectItem value="Promotion">Promotion</SelectItem>
                <SelectItem value="Salary Change">Salary Change</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label className="mb-2 block text-sm font-medium text-gray-700">
              Search Employee
            </Label>
            <Input
              placeholder="Search by name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-gray-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-gray-200 shadow-md">
        <CardHeader className="border-b border-gray-100 bg-gray-50">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Pending Change Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      aria-label="Select all"
                      checked={
                        filteredRequests.length > 0 &&
                        filteredRequests.every((r) => r.selected)
                      }
                      onCheckedChange={(checked) =>
                        setRequests((prev) =>
                          prev.map((r) => ({ ...r, selected: !!checked }))
                        )
                      }
                    />
                  </TableHead>
                  <TableHead>Emp. ID</TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Change Type</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Proposed Value</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-8">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="py-8 text-center text-gray-400"
                    >
                      No change requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((req, index) => (
                    <TableRow
                      key={req.id}
                      className={
                        index % 2 === 0
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <TableCell>
                        <Checkbox
                          checked={req.selected}
                          onCheckedChange={(checked) =>
                            setRequests((prev) =>
                              prev.map((r) =>
                                r.id === req.id ? { ...r, selected: !!checked } : r
                              )
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{req.empId}</TableCell>
                      <TableCell>{req.name}</TableCell>
                      <TableCell>{req.changeType}</TableCell>
                      <TableCell>{req.currentValue}</TableCell>
                      <TableCell>{req.proposedValue}</TableCell>
                      <TableCell>{req.effectiveDate}</TableCell>
                      <TableCell>{req.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            req.status === "Approved"
                              ? "default"
                              : req.status === "Rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {req.status}
                        </Badge>
                      </TableCell>

                      {/* Action Cell as Dropdown */}
                     <TableCell className="text-right pr-4">
  {req.status === "Pending" && (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 hover:bg-gray-100"
        >
           ▼
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem onClick={() => handleAction(req.id, "Approve")}>
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction(req.id, "Reject")}>
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )}
</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
    </div>
  )
}
