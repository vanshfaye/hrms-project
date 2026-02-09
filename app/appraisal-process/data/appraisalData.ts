import { Appraisal } from "../types/appraisal-data";

export const appraisalList: Appraisal[] = [
  {
    employee: {
      id: "E001",
      name: "Manish Bisen",
      department: "HR",
      designation: "Manager",
      appraisalPeriod: "Jan 2025 - Dec 2025",
      status: "Pending",
    },
    kpis: [
      { id: "K001", goal: "Increase recruitment efficiency", target: "95%", achieved: "90%", rating: 4, comments: "Good performance" },
      { id: "K002", goal: "Employee satisfaction score", target: "80%", achieved: "85%", rating: 5 },
    ],
    overallRating: 4.5,
    hrComments: "Excellent work this year",
  },
  {
    employee: {
      id: "E002",
      name: "Ramesh Kumar",
      department: "Finance",
      designation: "Accountant",
      appraisalPeriod: "Jan 2025 - Dec 2025",
      status: "Completed",
    },
    kpis: [
      { id: "K003", goal: "Budget management", target: "100%", achieved: "95%", rating: 4 },
    ],
    overallRating: 4,
  },
];
