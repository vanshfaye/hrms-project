export interface Employee {
  id: string;
  name: string;
  department: string;
  designation: string;
  appraisalPeriod: string;
  status: 'Pending' | 'Completed' | 'In Progress';
}

export interface KPI {
  id: string;
  goal: string;
  target: string;
  achieved: string;
  rating: number;
  comments?: string;
}

export interface Appraisal {
  employee: Employee;
  kpis: KPI[];
  overallRating: number;
  hrComments?: string;
}
