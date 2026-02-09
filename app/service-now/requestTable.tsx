"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface Request {
  category: string;
  subject: string;
  description: string;
  status: string;
  date: string;
}

interface Props {
  requests: Request[];
}

export default function RequestTable({ requests }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm mt-3">
        <thead>
          <tr className="bg-[hsl(170.6,76.9%,64.3%)] text-white">
            <th className="py-2 px-3 text-left">Category</th>
            <th className="py-2 px-3 text-left">Subject</th>
            <th className="py-2 px-3 text-left">Description</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition-all">
              <td className="py-2 px-3">{req.category}</td>
              <td className="py-2 px-3">{req.subject}</td>
              <td className="py-2 px-3">{req.description}</td>
              <td className="py-2 px-3">
                <Badge
                  className={`${
                    req.status === "Resolved"
                      ? "bg-green-500"
                      : req.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-[hsl(170.6,76.9%,64.3%)]"
                  } text-white`}
                >
                  {req.status}
                </Badge>
              </td>
              <td className="py-2 px-3">{req.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
