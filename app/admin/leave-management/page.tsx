"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import AdminLeaveOverview from "./adminleaveOverview";
import AdminLeaveChart from "./adminleaveChart";
import AdminLeaveTable from "./adminLeaveTable";
import AdminLeaveBalanceTable from "./adminleaveBalanceTable";


export default function AdminLeavePage() {
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
        <div className="container mx-auto p-4 space-y-8">
          {/* Overview Cards */}
          <AdminLeaveOverview />

          {/* Chart + Table Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AdminLeaveChart />
            <AdminLeaveTable />
          </div>
          <AdminLeaveBalanceTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
