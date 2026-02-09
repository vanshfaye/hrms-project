"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const dummyLeaveData = [
  {
    id: 1,
    employee: "Amit Sharma",
    department: "HR",
    leaveType: "Casual Leave",
    from: "2025-10-05",
    to: "2025-10-06",
    status: "Approved",
  },
  {
    id: 2,
    employee: "Neha Patel",
    department: "Engineering",
    leaveType: "Sick Leave",
    from: "2025-10-08",
    to: "2025-10-09",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Rajesh Kumar",
    department: "Finance",
    leaveType: "Earned Leave",
    from: "2025-10-02",
    to: "2025-10-04",
    status: "Rejected",
  },
];

export default function AdminLeaveTable() {
  return (
    <Card className="shadow-md rounded-2xl bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle>Recent Leave Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Leave Type</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyLeaveData.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3">{leave.employee}</td>
                  <td className="p-3">{leave.department}</td>
                  <td className="p-3">{leave.leaveType}</td>
                  <td className="p-3">{leave.from}</td>
                  <td className="p-3">{leave.to}</td>
                  <td
                    className={`p-3 font-semibold ${
                      leave.status === "Approved"
                        ? "text-green-600"
                        : leave.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {leave.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
