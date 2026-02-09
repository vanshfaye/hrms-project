"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function AppraisalProcess() {
  const [form, setForm] = useState({
    goal: "",
    achievement: "",
    rating: "",
    comments: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🚀 You can replace this with your API call
    console.log("Appraisal Submitted:", form);
    alert("✅ Appraisal submitted successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Self-Appraisal Form
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Goals</label>
              <Textarea
                name="goal"
                value={form.goal}
                onChange={handleChange}
                placeholder="List your key goals..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Achievements
              </label>
              <Textarea
                name="achievement"
                value={form.achievement}
                onChange={handleChange}
                placeholder="Describe your accomplishments..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Self-Rating (1 – 5)
              </label>
              <Input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                min="1"
                max="5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Comments</label>
              <Textarea
                name="comments"
                value={form.comments}
                onChange={handleChange}
                placeholder="Any feedback or training needs..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => alert("Draft saved!")}
              >
                Save Draft
              </Button>
              <Button type="submit" className="bg-blue-600 text-white">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Appraisals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This section will list your past appraisal submissions once linked
            to backend data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
