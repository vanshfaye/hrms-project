"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HrLetterPreview from "@/components/hr-letter-preview";
import { Printer, FileText, FileCheck } from "lucide-react";
import Link from "next/link"
type LetterType = "employment-proof" | "address-proof" | "salary-certificate";
type LetterPurpose = "banking" | "higher-education" | "loan" | "visa";

const LETTER_TYPES: { value: LetterType; label: string }[] = [
  { value: "employment-proof", label: "Employment Proof" },
  { value: "address-proof", label: "Address Proof" },
  { value: "salary-certificate", label: "Salary Certificate" },
];

const LETTER_PURPOSES: { value: LetterPurpose; label: string }[] = [
  { value: "banking", label: "Banking" },
  { value: "higher-education", label: "Higher Education" },
  { value: "loan", label: "Applying for Loan" },
  { value: "visa", label: "Applying for Visa" },
];

export default function HrLettersPage() {
  const [letterType, setLetterType] = useState<LetterType | "">("");
  const [purpose, setPurpose] = useState<LetterPurpose | "">("");
  const [error, setError] = useState<string>("");
  const printRef = useRef<HTMLDivElement>(null);

  const canGenerate = !!letterType && !!purpose;

  const handlePrint = () => {
    if (!canGenerate) {
      setError("Please select both letter type and purpose.");
      return;
    }
    setError("");

    const content = printRef.current?.innerHTML;
    if (!content) return;

    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1024,height=768");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>HR Letter</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 24px; background: #fff; }
            .letter { max-width: 700px; margin: auto; border: 1px solid #e5e7eb; padding: 24px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="letter">${content}</div>
          <script>
            window.addEventListener('load', () => { window.print(); setTimeout(() => window.close(), 300); });
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
         Ess
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Hr Letters</span>
      </div>
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      {/* <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">HR Letters </h1>
        <p className="text-gray-600">Select letter type and purpose to generate professional HR letters instantly.</p>
      </header> */}

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <Card className="p-6 shadow-md rounded-xl">
          <CardHeader className="mb-4">
            <CardTitle className="flex items-center gap-2 text-xl"><FileText size={24} /> Generate Letter</CardTitle>
            <CardDescription>Select the type and purpose of the HR letter below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="letter-type">Letter Type</Label>
                <Select value={letterType} onValueChange={(v) => setLetterType(v as LetterType)}>
                  <SelectTrigger className="mt-1 h-11 rounded-lg border-gray-300 shadow-sm hover:border-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Select letter type" />
                  </SelectTrigger>
                  <SelectContent>
                    {LETTER_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="letter-purpose">Purpose</Label>
                <Select value={purpose} onValueChange={(v) => setPurpose(v as LetterPurpose)}>
                  <SelectTrigger className="mt-1 h-11 rounded-lg border-gray-300 shadow-sm hover:border-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {LETTER_PURPOSES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-red-600 font-medium">{error}</p>}

            <div className="flex gap-4 mt-4 flex-wrap">
              <Button onClick={() => setError("")} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white h-11 px-5">
                <FileCheck size={18} /> Preview
              </Button>
              <Button onClick={handlePrint} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 h-11 px-5">
                <Printer size={18} /> Print
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Preview */}
        <Card className="p-6 shadow-md rounded-xl">
          <CardHeader className="mb-4">
            <CardTitle className="flex items-center gap-2 text-xl"><FileText size={24} /> Live Preview</CardTitle>
            <CardDescription>The letter will appear here once selections are made.</CardDescription>
          </CardHeader>
          <CardContent ref={printRef} className="border border-gray-200 rounded-xl p-6 bg-white min-h-[300px]">
            {canGenerate ? (
              <HrLetterPreview type={letterType as LetterType} purpose={purpose as LetterPurpose} />
            ) : (
              <p className="text-gray-400 text-center mt-20">Select letter type and purpose to preview.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
    </div>
  );
}
