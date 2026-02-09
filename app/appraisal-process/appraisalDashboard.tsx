"use client"
import React, { useState } from "react";
import AppraisalCard from "./appraisalCard";
import { appraisalList } from "../appraisal-process/data/appraisalData";
import { Appraisal } from "../appraisal-process/types/appraisal-data";
import EmployeeAppraisalForm from "./employeeAppraisalForm";

const AppraisalDashboard = () => {
  const [selectedAppraisal, setSelectedAppraisal] = useState<Appraisal | null>(null);

  if (selectedAppraisal) {
    return (
      <EmployeeAppraisalForm appraisal={selectedAppraisal} onBack={() => setSelectedAppraisal(null)} />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {appraisalList.map((appraisal) => (
        <AppraisalCard key={appraisal.employee.id} appraisal={appraisal} onView={setSelectedAppraisal} />
      ))}
    </div>
  );
};

export default AppraisalDashboard;
