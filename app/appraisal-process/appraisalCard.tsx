import React from "react";
import { Appraisal } from "../appraisal-process/types/appraisal-data";
import RatingStars from "./ratingStars";
import { Button } from "@/components/ui/button";

interface Props {
  appraisal: Appraisal;
  onView: (appraisal: Appraisal) => void;
}

const AppraisalCard: React.FC<Props> = ({ appraisal, onView }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
      <h3 className="text-lg font-semibold">{appraisal.employee.name}</h3>
      <p className="text-sm text-gray-500">
        {appraisal.employee.designation} - {appraisal.employee.department}
      </p>
      <p className="text-sm text-gray-500">{appraisal.employee.appraisalPeriod}</p>
      <p className="text-sm font-medium mt-2">
        Status:{" "}
        <span
          className={`${
            appraisal.employee.status === "Pending"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {appraisal.employee.status}
        </span>
      </p>
      <div className="mt-2">
        <RatingStars rating={appraisal.overallRating} />
      </div>
      <Button className="mt-3" onClick={() => onView(appraisal)}>
        View / Edit
      </Button>
    </div>
  );
};

export default AppraisalCard;
