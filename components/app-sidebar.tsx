"use client"

import * as React from "react"
import {
  AudioWaveform,
  Banknote,
  BarChart2,
  BookOpen,
  Bot,
  Calculator,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  CloudSnow,
  Command,
  CreditCard,
  FileChartColumn,
  Frame,
  GalleryVerticalEnd,
  Globe,
  GraduationCap,
  HandCoins,
  Headset,
  LayoutDashboard,
  LucideIcon,
  Map,
  MoveRight,
  Network,
  Percent,
  PieChart,
  Receipt,
  RefreshCcw,
  Settings2,
  SquareTerminal,
  Star,
  Sun,
  Timer,
  TimerIcon,
  UserCheck,
  UserCog,
  UserMinus,
  UserPlus,
  
  
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Icon } from "@radix-ui/react-select"
import { NavMainOthers } from "./nav-mainothers"

// This is sample data.
const data = {
  user: {
    name: "HRMS",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "HRMS",
      logo: GalleryVerticalEnd,
      // plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Admin",
      url: "#",
      icon: SquareTerminal,
      // isActive: true,
      items: [
         { title: "Calender", icon: CalendarDays, url: "/admin/calender" },
        { title: "Organization Structure", icon: Network, url: "/admin/organization-structure" },
        { title: "Holidays", icon: Sun, url: "/admin/holidays" },
        { title: "Leave Management", icon: CalendarCheck, url: "/admin/leave-management" },
        { title: "Skillfolio", icon: GraduationCap, url: "/admin/skillfolio" },
        { title: "Reportss", icon: FileChartColumn, url: "/admin/reportss" },
      ],
    },
    {
      title: "ESS",
      url: "#",
      icon: Bot,
      items: [
        { title: "Personal Details", url: "/empselfservice/employee" },
        { title: "HR- Letters", url: "/empselfservice/hr-letters" },
        { title: "Skillfolio", url: "/empselfservice/skillfolio" },
        { title: "Domestic Transfer", url: "/empselfservice/domestic-transfer" },
        { title: "Resignation", url: "/empselfservice/my-resignation" },
        { title: "My Payslip", url: "/empselfservice/my-payslip" },
        { title: "Employee Separation Checklist", url: "/empselfservice/employee-separation-checklist" },
        { title: "My project", url: "/empselfservice/my-project" },
        { title: "My Team", url: "/empselfservice/my-team" },
        { title: "Career Path", url: "/empselfservice/career-path" },
        { title: "Leave Plan", icon: CalendarRange, url: "/empselfservice/leave-plan" },
        { title: "Appraisal Process", icon: CheckCircle2, url: "/empselfservice/appraisal-process" },
        { title: "Attendance", icon: CheckCircle2, url: "/empselfservice/attendance" },

        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    {
      title: "MSS",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Employee Directory", icon: UserCog, url: "/mss/employee-directory" },
        { title: "Leave Approvals", icon:ClipboardCheck, url: "/mss/leave-approvals" },
        { title: "Leave Report", icon: BarChart2, url: "/mss/leave-report" },
        { title: "Manpower Release Plan", icon: UserMinus, url: "/mss/manpower-release-plan" },
        { title: "Change Manager", icon:RefreshCcw, url: "/mss/change-manager" },
        { title: "Resource Movement", icon: MoveRight, url: "/mss/resource-movement" },
        { title: "Approve Change Workbench", icon: CheckCircle2, url: "/mss/approve-change-workbench" },
        
      ],
    },

    {
      title: "Payroll",
      url: "#",
      icon: BookOpen,
      items: [
          { title: "Dashboard", icon: LayoutDashboard, url: "/payroll/dashboard" },
        { title: "Employee Salary Structure", icon: Banknote, url: "/payroll/salary-structure" },
        { title: "Generate Payroll", icon: Calculator, url: "/payroll/generate-payroll" },
        { title: "Payslip Management", icon: Receipt, url: "/payroll/payslip-management" },
        { title: "Salary Adjustment", icon: Settings2, url: "/payroll/salary-adjustment" },
        { title: "Tax & Deductions", icon: Percent, url: "/payroll/tax-deductions" },
        { title: "Reports", icon: FileChartColumn, url: "/payroll/reports" },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],

  others: [
   { title: "Leave Plan", icon: CalendarRange, url: "/leave-plan" },
    { title: "TimeLog", icon: Clock, url: "/time-log" },
    { title: "Attendance", icon: ClipboardCheck, url: "/attendance" },
    // { title: "My Payroll", icon: HandCoins, url: "/my-payroll" },
    { title: "Service Now", icon: Headset, url: "/service-now" },
    { title: "My Expenses", icon: CreditCard, url: "/myexpenses" },
    { title: "Global Migration Service (GMS)", icon: Globe, url: "/global-migration-service" },
    { title: "Appraisal Process", icon: Star, url: "/appraisal-process" },
    { title: "Recruitment Process", icon: UserPlus, url: "/recruitment-process" },
    { title: "Onboarding New Joinee", icon: UserCheck, url: "/onboarding-new-joinee" },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavMainOthers items={data.others} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <div className="mt-4 border-muted-foreground/20 pt-2">
        
          <span className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase">
            Others
          </span>
          <ul className="flex flex-col gap-1">
            {data.others.map((items, index) => 
              <li key={index}>
              <a
                href={items.url}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                
                {<items.icon className="w-4 h-4" />}
                {items.name}
              </a>
            </li>
            
            )}
          </ul>
        </div> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
