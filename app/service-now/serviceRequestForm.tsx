"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

interface Props {
  onAdd: (request: any) => void;
}

export default function ServiceRequestForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    category: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      ...form,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    onAdd(newRequest);
    setForm({ category: "", subject: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 bg-[hsl(170.6,76.9%,64.3%)] hover:bg-[hsl(170.6,76.9%,54%)] text-white font-semibold"
        >
          <PlusCircle className="h-4 w-4" /> Create Request
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            New Service Request
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Select
              onValueChange={(value) => setForm({ ...form, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT Support">IT Support</SelectItem>
                <SelectItem value="HR Query">HR Query</SelectItem>
                <SelectItem value="Payroll">Payroll</SelectItem>
                <SelectItem value="Access Request">Access Request</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <Input
              placeholder="Enter subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="Describe your issue..."
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[hsl(170.6,76.9%,64.3%)] hover:bg-[hsl(170.6,76.9%,54%)] text-white font-semibold"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
