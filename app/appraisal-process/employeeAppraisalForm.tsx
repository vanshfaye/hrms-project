import React, { useState } from "react";
import { Appraisal, KPI } from "../appraisal-process/types/appraisal-data";
import RatingStars from "./ratingStars";
import { Button } from "@/components/ui/button";

interface Props {
  appraisal: Appraisal;
  onBack: () => void;
}

const EmployeeAppraisalForm: React.FC<Props> = ({ appraisal, onBack }) => {
  const [kpis, setKpis] = useState<KPI[]>(appraisal.kpis);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button onClick={onBack} className="text-blue-500 underline mb-4">← Back to Dashboard</button>
      <h2 className="text-2xl font-bold mb-2">{appraisal.employee.name} - {appraisal.employee.designation}</h2>
      <p className="text-sm text-gray-500 mb-4">Appraisal Period: {appraisal.employee.appraisalPeriod}</p>

      <div className="space-y-4">
        {kpis.map(kpi => (
          <div key={kpi.id} className="p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="font-medium">{kpi.goal}</h3>
            <p>Target: {kpi.target}</p>
            <p>Achieved: {kpi.achieved}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span>Rating:</span>
              <RatingStars rating={kpi.rating} />
            </div>
            {kpi.comments && <p className="text-sm text-gray-600 mt-1">Comments: {kpi.comments}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block mb-2 font-medium">HR Comments</label>
        <textarea
          className="w-full border p-2 rounded-lg"
          defaultValue={appraisal.hrComments}
        />
      </div>

      <div className="mt-4 flex space-x-4">
        <Button>Save Draft</Button>
        <Button>Submit Appraisal</Button>
      </div>
    </div>
  );
};

export default EmployeeAppraisalForm;
