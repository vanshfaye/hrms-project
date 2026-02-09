"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { useState } from "react";
import ServiceRequestForm from "./serviceRequestForm";
import RequestTable from "./requestTable";
import { Card } from "@/components/ui/card";

export default function ServiceNowPage() {
  const [requests, setRequests] = useState([
    {
      category: "IT Support",
      subject: "Laptop not starting",
      description: "My laptop is not booting since morning.",
      status: "Pending",
      date: "2025-10-15",
    },
    {
      category: "HR Query",
      subject: "Leave Balance Clarification",
      description: "Need clarification about remaining paid leaves.",
      status: "Resolved",
      date: "2025-10-12",
    },
  ]);

  const handleAddRequest = (newRequest: any) => {
    setRequests((prev) => [newRequest, ...prev]);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="container mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Service Now</h1>
            <ServiceRequestForm onAdd={handleAddRequest} />
          </div>

          <Card className="p-4 shadow-sm border border-gray-200">
            <RequestTable requests={requests} />
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
