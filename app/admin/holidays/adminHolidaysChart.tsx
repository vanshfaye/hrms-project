"use client";
import { holidays } from "./data/holidays";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminHolidaysChart() {
  // Count holidays by type
  const holidayTypeCount = holidays.reduce((acc: any, h) => {
    acc[h.type] = (acc[h.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(holidayTypeCount).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Holiday Distribution by Type</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
