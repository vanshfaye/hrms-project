"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const dummyBalanceData = [
  { employee: "Neha Patel", casual: 3, sick: 2, earned: 5, total: 10 },
  { employee: "Amit Sharma", casual: 4, sick: 1, earned: 6, total: 11 },
  { employee: "Rajesh Kumar", casual: 2, sick: 3, earned: 4, total: 9 },
  { employee: "Sneha Verma", casual: 5, sick: 2, earned: 5, total: 12 },
];

export default function AdminLeaveBalanceTable() {
  return (
    <Card className="shadow-md rounded-2xl bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle>Employee Leave Balance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Casual</th>
                <th className="p-3">Sick</th>
                <th className="p-3">Earned</th>
                <th className="p-3">Total Remaining</th>
              </tr>
            </thead>
            <tbody>
              {dummyBalanceData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3 font-medium">{item.employee}</td>
                  <td className="p-3">{item.casual}</td>
                  <td className="p-3">{item.sick}</td>
                  <td className="p-3">{item.earned}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    {item.total}
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
