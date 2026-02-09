"use client";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const dummyChartData = [
  { department: "HR", leaves: 25 },
  { department: "Engineering", leaves: 40 },
  { department: "Finance", leaves: 20 },
  { department: "Marketing", leaves: 30 },
];

export default function AdminLeaveChart() {
  return (
    <Card className="shadow-md rounded-2xl bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle>Department-wise Leave Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dummyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leaves" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
