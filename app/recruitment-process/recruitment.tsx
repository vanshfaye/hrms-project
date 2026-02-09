"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link"
// ---------------- Types ----------------
type JobStatus = "Draft" | "Published" | "Closed";
type ApplicantStatus = "Applied" | "Shortlisted" | "Rejected" | "Interview Scheduled" | "Hired";

interface Job {
  id: number;
  title: string;
  department: string;
  jobType: string;
  location: string;
  openings: number;
  status: JobStatus;
  description: string;
}

interface Applicant {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resume: string;
  status: ApplicantStatus;
  appliedAt: Date;
}

// ---------------- Badge Helper ----------------
function getBadgeVariant(status: string): "default" | "destructive" | "outline" | "secondary" {
  switch(status) {
    case "Applied": return "secondary";
    case "Shortlisted": return "default";
    case "Rejected": return "destructive";
    case "Interview Scheduled": return "outline";
    case "Hired": return "default";
    case "Draft": return "secondary";
    case "Published": return "default";
    case "Closed": return "destructive";
    default: return "secondary";
  }
}

// ---------------- Component ----------------
export default function RecruitmentDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  const [jobForm, setJobForm] = useState<Omit<Job,"id">>({
    title: "",
    department: "",
    jobType: "",
    location: "",
    openings: 1,
    status: "Draft",
    description: ""
  });

  const [applicantFilter, setApplicantFilter] = useState<ApplicantStatus | "All">("All");
  const [applicantSearch, setApplicantSearch] = useState("");

  // ---------------- Handlers ----------------
  const handleAddJob = () => {
    const newJob: Job = { id: Date.now(), ...jobForm };
    setJobs([...jobs, newJob]);
    setJobForm({ title:"", department:"", jobType:"", location:"", openings:1, status:"Draft", description:"" });
  };

  const updateApplicantStatus = (id: number, status: ApplicantStatus) => {
    setApplicants(applicants.map(a => a.id === id ? { ...a, status } : a));
  };

  const hireApplicant = (id: number) => updateApplicantStatus(id, "Hired");

  // ---------------- Filtered Applicants ----------------
  const applicantsForSelectedJob = useMemo(() => {
    if (!selectedJob) return [];
    return applicants.filter(a => a.jobId === selectedJob);
  }, [selectedJob, applicants]);

  const filteredApplicants = useMemo(() => {
    let list = applicantsForSelectedJob;
    if (applicantFilter !== "All") list = list.filter(a => a.status === applicantFilter);
    if (applicantSearch) {
      const s = applicantSearch.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(s) || a.email.toLowerCase().includes(s));
    }
    return list;
  }, [applicantsForSelectedJob, applicantFilter, applicantSearch]);

  // ---------------- KPI Metrics ----------------
  const totalJobs = jobs.length;
  const totalApplicants = applicants.length;
  const totalHired = applicants.filter(a=>a.status==="Hired").length;
  const totalInterviews = applicants.filter(a=>a.status==="Interview Scheduled").length;

  // ---------------- Render ----------------
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
          Other
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Recruitment Process</span>
      </div>
 
    <div className="p-8 max-w-full space-y-8">
      <h1 className="text-3xl font-bold mb-4">Recruitment Dashboard</h1>

      {/* ---------------- KPI Cards ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card className="p-6 shadow-lg rounded-xl">
          <CardHeader><CardTitle>Jobs Posted</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{totalJobs}</p></CardContent>
        </Card>
        <Card className="p-6 shadow-lg rounded-xl">
          <CardHeader><CardTitle>Applicants</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{totalApplicants}</p></CardContent>
        </Card>
        <Card className="p-6 shadow-lg rounded-xl">
          <CardHeader><CardTitle>Hired</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{totalHired}</p></CardContent>
        </Card>
        <Card className="p-6 shadow-lg rounded-xl">
          <CardHeader><CardTitle>Interviews</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{totalInterviews}</p></CardContent>
        </Card>
      </div>

      {/* ---------------- Tabs ---------------- */}
      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="grid grid-cols-10 border-b">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="offers">Offer Letters</TabsTrigger>
        </TabsList>

        {/* ---------------- Jobs Tab ---------------- */}
        <TabsContent value="jobs">
          {/* Expanded Job Form */}
          <Card className="p-8 shadow-lg rounded-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Post New Job</CardTitle>
              <CardDescription>HR/Admin can post new vacancy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input placeholder="Job Title" value={jobForm.title} onChange={e=>setJobForm({...jobForm,title:e.target.value})} className="h-12"/>
                <Input placeholder="Department" value={jobForm.department} onChange={e=>setJobForm({...jobForm,department:e.target.value})} className="h-12"/>
                <Input placeholder="Job Type" value={jobForm.jobType} onChange={e=>setJobForm({...jobForm,jobType:e.target.value})} className="h-12"/>
                <Input placeholder="Location" value={jobForm.location} onChange={e=>setJobForm({...jobForm,location:e.target.value})} className="h-12"/>
                <Input type="number" placeholder="Openings" value={jobForm.openings} onChange={e=>setJobForm({...jobForm,openings:Number(e.target.value)})} className="h-12"/>
                <Select value={jobForm.status} onValueChange={v=>setJobForm({...jobForm,status:v as JobStatus})}>
                  <SelectTrigger className="h-12"><SelectValue placeholder="Status"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea placeholder="Job Description" value={jobForm.description} onChange={e=>setJobForm({...jobForm,description:e.target.value})} className="h-32"/>
              <Button onClick={handleAddJob} className="bg-indigo-600 text-white hover:bg-indigo-700 w-full h-12">Post Job</Button>
            </CardContent>
          </Card>

          {/* Job Table */}
          <div className="overflow-x-auto shadow rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Openings</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map(j=>(
                  <tr key={j.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setSelectedJob(j.id)}>
                    <td className="px-4 py-2">{j.title}</td>
                    <td className="px-4 py-2">{j.department}</td>
                    <td className="px-4 py-2">{j.jobType}</td>
                    <td className="px-4 py-2">{j.location}</td>
                    <td className="px-4 py-2">{j.openings}</td>
                    <td className="px-4 py-2"><Badge variant={getBadgeVariant(j.status)}>{j.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Applicants Tab */}
        <TabsContent value="applicants">
          {/* Filter + Search */}
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            <Select value={selectedJob ? String(selectedJob) : ""} onValueChange={v=>setSelectedJob(Number(v))}>
              <SelectTrigger><SelectValue placeholder="Select Job"/></SelectTrigger>
              <SelectContent>{jobs.map(j=><SelectItem key={j.id} value={String(j.id)}>{j.title}</SelectItem>)}</SelectContent>
            </Select>

            <Select value={applicantFilter} onValueChange={v=>setApplicantFilter(v as any)}>
              <SelectTrigger><SelectValue placeholder="Filter by Status"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {["Applied","Shortlisted","Rejected","Interview Scheduled","Hired"].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>

            <Input placeholder="Search Name/Email" value={applicantSearch} onChange={e=>setApplicantSearch(e.target.value)}/>
          </div>

          {/* Applicant Table */}
          <div className="overflow-x-auto shadow rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Resume</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApplicants.map(a=>(
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{a.name}</td>
                    <td className="px-4 py-2">{a.email}</td>
                    <td className="px-4 py-2">{a.phone}</td>
                    <td className="px-4 py-2"><Button onClick={()=>setResumePreview(a.resume)}>View</Button></td>
                    <td className="px-4 py-2"><Badge variant={getBadgeVariant(a.status)}>{a.status}</Badge></td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <Button onClick={()=>updateApplicantStatus(a.id,"Shortlisted")}>Shortlist</Button>
                      <Button onClick={()=>updateApplicantStatus(a.id,"Rejected")} variant="destructive">Reject</Button>
                      <Button onClick={()=>hireApplicant(a.id)} className="bg-indigo-600 text-white hover:bg-indigo-700">Hire</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Interviews Tab */}
        <TabsContent value="interviews">
          <Card className="p-6 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle>Interviews</CardTitle>
              <CardDescription>Schedule and manage interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Feature to schedule interviews can be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offer Letters Tab */}
        <TabsContent value="offers">
          <Card className="p-6 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle>Offer Letters</CardTitle>
              <CardDescription>Generate and manage offer letters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Feature to generate offer letters for hired applicants.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resume Preview Modal */}
      <Dialog open={!!resumePreview} onOpenChange={()=>setResumePreview(null)}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
          </DialogHeader>
          <iframe src={resumePreview || ""} className="w-full h-[700px]" />
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}
