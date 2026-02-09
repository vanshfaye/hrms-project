"use client"

import { Card, CardContent } from "@/components/ui/card"

type Props = {
  type: "employment-proof" | "address-proof" | "salary-certificate"
  purpose: "banking" | "higher-education" | "loan" | "visa"
}

function titleFor(type: Props["type"]) {
  switch (type) {
    case "employment-proof":
      return "Employment Proof Letter"
    case "address-proof":
      return "Address Proof Letter"
    case "salary-certificate":
      return "Salary Certificate"
    default:
      return "HR Letter"
  }
}

function purposeLine(purpose: Props["purpose"]) {
  switch (purpose) {
    case "banking":
      return "This letter is issued upon request for banking formalities."
    case "higher-education":
      return "This letter is issued upon request for higher education requirements."
    case "loan":
      return "This letter is issued upon request for loan application purposes."
    case "visa":
      return "This letter is issued upon request for visa application purposes."
    default:
      return ""
  }
}

export default function HrLetterPreview({ type, purpose }: Props) {
  const title = titleFor(type)

  return (
    <Card className="mt-4 print:shadow-none">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>Company Name: [Your Company Name]</div>
          <div>Company Address: [Street, City, Country]</div>
          <div>Contact: [Phone] | [Email]</div>
          <div>Date: {new Date().toLocaleDateString()}</div>
        </div>

        <div className="my-6 h-px w-full bg-border" />

        <h1 className="text-balance text-xl font-semibold">{title}</h1>

        <div className="mt-6 space-y-4 leading-relaxed">
          <p>To Whom It May Concern,</p>

          {type === "employment-proof" && (
            <p>
              This is to certify that <strong>[Employee Name]</strong>, bearing employee ID
              <strong> [Employee ID]</strong>, is employed with <strong>[Your Company Name]</strong> as
              <strong> [Designation]</strong> since <strong>[DD/MM/YYYY]</strong> and is currently working on a
              full-time basis.
            </p>
          )}

          {type === "address-proof" && (
            <p>
              This is to certify that <strong>[Employee Name]</strong>, employee ID
              <strong> [Employee ID]</strong>, currently resides at <strong>[Residential Address]</strong>. The address
              details are provided as per our HR records for verification.
            </p>
          )}

          {type === "salary-certificate" && (
            <p>
              This is to certify that <strong>[Employee Name]</strong>, employee ID
              <strong> [Employee ID]</strong>, is drawing a gross monthly salary of
              <strong> [Amount in Currency]</strong>. This certificate is issued based on the records maintained by the
              HR and Payroll departments.
            </p>
          )}

          <p>{purposeLine(purpose)}</p>

          <p>
            This letter is issued at the request of the employee without any risk or liability on the part of the
            company.
          </p>

          <div className="mt-8 space-y-2">
            <p>Sincerely,</p>
            <p>
              <strong>[Authorized Signatory]</strong>
            </p>
            <p className="text-sm text-muted-foreground">[Title/Department]</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
