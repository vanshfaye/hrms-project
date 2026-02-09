// app/my-payslip/page.tsx
import Payslip from "./payslip";  
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  const employee = {
    name: "John Doe",
    id: "EMP001",
    designation: "Software Engineer",
    department: "IT",
    joiningDate: "15/06/2023",
  };

  const earnings = [
    { type: "Basic Salary", amount: 50000 },
    { type: "HRA", amount: 20000 },
    { type: "Bonus", amount: 5000 },
  ];

  const deductions = [
    { type: "Tax", amount: 10000 },
    { type: "Provident Fund", amount: 5000 },
  ];

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
        <div className="flex flex-1 flex-col p-6">
          <Payslip employee={employee} earnings={earnings} deductions={deductions} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
