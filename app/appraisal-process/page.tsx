import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import AppraisalDashboard from "./appraisalDashboard";


const AppraisalPage = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* Left Sidebar */}
      <AppSidebar variant="inset" />

      {/* Main Content Area */}
      <SidebarInset>
        <SiteHeader />

        <div className="container mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Appraisal Process
          </h1>

          {/* Dashboard Cards */}
          <AppraisalDashboard />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppraisalPage;
