// app/recruitment-process/data.ts
export const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"];

export type Candidate = {
  id: string;
  name: string;
  stage: string;
  email: string;
  avatar?: string;
};

export const candidates: Candidate[] = [
  { id: "1", name: "Alice Johnson", stage: "Applied", email: "alice@example.com" },
  { id: "2", name: "Bob Smith", stage: "Screening", email: "bob@example.com" },
  { id: "3", name: "Charlie Lee", stage: "Interview", email: "charlie@example.com" },
  { id: "4", name: "Diana Prince", stage: "Offer", email: "diana@example.com" },
  { id: "5", name: "Ethan Hunt", stage: "Hired", email: "ethan@example.com" },
];
