"use client";

import PayrollDashboard from "./dashboard"; // renamed for clarity
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function PayrollDashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <AppSidebar variant="inset" />

      {/* Main Area */}
      <SidebarInset>
        {/* Header */}
        <SiteHeader />

        {/* Page Content */}
        <main className="flex flex-1 flex-col overflow-y-auto bg-background p-6">
          <PayrollDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
