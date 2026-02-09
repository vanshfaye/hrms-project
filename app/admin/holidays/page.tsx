"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHolidaysCalendar from "./adminHolidaysCalendar";
import AdminHolidaysChart from "./adminHolidaysChart";
import AdminHolidaysTable from "./holidaysTable";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function AdminHolidaysPage() {
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
           {/* Top Row: Calendar and Chart side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-4">
              <AdminHolidaysCalendar />
            </div>
            <div className="bg-white rounded-2xl shadow p-4">
              <AdminHolidaysChart />
            </div>
          </div>

          {/* Bottom Row: Table */}
          <div className="bg-white rounded-2xl shadow p-4">
            <AdminHolidaysTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
