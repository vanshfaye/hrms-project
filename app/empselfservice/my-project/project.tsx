"use client";

import React, { useState } from "react";
import { Search, PlusCircle, X, FileText, CheckSquare } from "lucide-react";
import Link from "next/link";

// ---------- Types ----------
type Task = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "Not Started" | "In Progress" | "Done";
  progress: number;
};

type Project = {
  id: string;
  name: string;
  description: string;
  manager: string;
  startDate: string;
  endDate: string;
  status: "Ongoing" | "Completed" | "On Hold";
  tasks: Task[];
};

// ---------- Mock Data ----------
const MOCK_PROJECTS: Project[] = [
  {
    id: "PRJ001",
    name: "HRMS Portal",
    description: "Development of the HRMS employee portal (ESS features).",
    manager: "R. Mehta",
    startDate: "2025-08-01",
    endDate: "2025-12-31",
    status: "Ongoing",
    tasks: [
      {
        id: "T1",
        name: "UI Design",
        startDate: "2025-08-01",
        endDate: "2025-08-15",
        status: "Done",
        progress: 100,
      },
      {
        id: "T2",
        name: "API Integration",
        startDate: "2025-08-16",
        endDate: "2025-09-05",
        status: "In Progress",
        progress: 55,
      },
    ],
  },
  {
    id: "PRJ002",
    name: "Payroll System",
    description: "Payroll microservice and payslip generation.",
    manager: "A. Das",
    startDate: "2024-11-10",
    endDate: "2025-03-31",
    status: "Completed",
    tasks: [
      {
        id: "T3",
        name: "Tax Rules Implementation",
        startDate: "2025-01-05",
        endDate: "2025-02-20",
        status: "Done",
        progress: 100,
      },
    ],
  },
];

export default function MyProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase())
  );

  function updateTaskProgress(projectId: string, taskId: string, newProgress: number) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId
                  ? {
                      ...t,
                      progress: newProgress,
                      status:
                        newProgress === 100
                          ? "Done"
                          : newProgress > 0
                          ? "In Progress"
                          : "Not Started",
                    }
                  : t
              ),
            }
          : p
      )
    );
    if (selected?.id === projectId) {
      setSelected((s) =>
        s
          ? {
              ...s,
              tasks: s.tasks.map((t) =>
                t.id === taskId
                  ? {
                      ...t,
                      progress: newProgress,
                      status:
                        newProgress === 100
                          ? "Done"
                          : newProgress > 0
                          ? "In Progress"
                          : "Not Started",
                    }
                  : t
              ),
            }
          : s
      );
    }
  }

  function addProject(newProject: Project) {
    setProjects((p) => [newProject, ...p]);
    setShowAdd(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ---------- Breadcrumb ---------- */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
         Ess
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">My Project</span>
      </div>

      {/* ---------- Main Projects Section ---------- */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">My Projects</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded px-3 py-1 gap-2">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="outline-none text-sm"
              />
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 bg-sky-600 text-white px-3 py-1 rounded shadow-sm"
            >
              <PlusCircle size={16} /> Add Project
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="bg-white rounded shadow p-4">
              <h3 className="font-medium mb-3">Projects List</h3>
              <div className="divide-y">
                {filtered.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {p.manager} · {p.startDate} → {p.endDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`text-xs px-2 py-1 rounded ${
                          p.status === "Ongoing"
                            ? "bg-green-100 text-green-800"
                            : p.status === "Completed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {p.status}
                      </div>
                      <button
                        onClick={() => setSelected(p)}
                        className="p-1 rounded hover:bg-slate-50"
                      >
                        <FileText size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-4 text-sm text-center text-gray-500">
                    No projects found
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            {selected ? (
              <div className="bg-white rounded shadow p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{selected.name}</h2>
                    <div className="text-sm text-gray-500">
                      {selected.manager} · {selected.startDate} → {selected.endDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm px-2 py-1 rounded bg-slate-100">
                      {selected.status}
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="p-2 rounded hover:bg-slate-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-700">{selected.description}</p>

                <section className="mt-6">
                  <h3 className="font-medium mb-3">My Tasks</h3>
                  <div className="space-y-4">
                    {selected.tasks.map((t) => (
                      <div key={t.id} className="p-3 border rounded">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{t.name}</div>
                            <div className="text-xs text-gray-500">
                              {t.startDate} → {t.endDate}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{t.status}</div>
                            <div className="text-xs text-gray-500">{t.progress}%</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={t.progress}
                            onChange={(e) =>
                              updateTaskProgress(selected.id, t.id, Number(e.target.value))
                            }
                          />
                          <button
                            onClick={() => updateTaskProgress(selected.id, t.id, 100)}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-600 text-white text-sm"
                          >
                            <CheckSquare size={14} /> Mark Done
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-6">
                  <h3 className="font-medium mb-2">Remarks / Comments</h3>
                  <CommentBox projectId={selected.id} />
                </section>
              </div>
            ) : (
              <div className="bg-white rounded shadow p-6 flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <div className="mb-2">Select a project to view details</div>
                  <div className="text-xs">
                    Or add a new project using{" "}
                    <span className="font-medium">Add Project</span>.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showAdd && (
          <AddProjectModal
            onClose={() => setShowAdd(false)}
            onAdd={addProject}
            managers={["R. Mehta", "A. Das", "S. Kapoor"]}
          />
        )}
      </div>
    </div>
  );
}

// ---------- Comment Box ----------
function CommentBox({ projectId }: { projectId: string }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<{ id: string; text: string; at: string }[]>([]);

  function add() {
    if (!text.trim()) return;
    setComments((c) => [
      { id: String(Date.now()), text: text.trim(), at: new Date().toISOString() },
      ...c,
    ]);
    setText("");
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a remark..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button onClick={add} className="px-3 py-2 bg-sky-600 text-white rounded">
          Add
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {comments.length === 0 && <div className="text-sm text-gray-500">No remarks yet.</div>}
        {comments.map((c) => (
          <div key={c.id} className="p-3 border rounded">
            <div className="text-sm">{c.text}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(c.at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Add Project Modal ----------
function AddProjectModal({
  onClose,
  onAdd,
  managers,
}: {
  onClose: () => void;
  onAdd: (p: Project) => void;
  managers: string[];
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [manager, setManager] = useState(managers[0]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function submit() {
    if (!name.trim()) return;
    const newProject: Project = {
      id: `PRJ${Math.floor(Math.random() * 900 + 100)}`,
      name: name.trim(),
      description: desc.trim(),
      manager,
      startDate: start || new Date().toISOString().slice(0, 10),
      endDate: end || new Date().toISOString().slice(0, 10),
      status: "Ongoing",
      tasks: [],
    };
    onAdd(newProject);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded shadow max-w-xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Add Project</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short description"
            className="w-full border rounded px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="border rounded px-2 py-2"
            >
              {managers.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border rounded px-2 py-2"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1 rounded border">
              Cancel
            </button>
            <button onClick={submit} className="px-3 py-1 rounded bg-sky-600 text-white">
              Add Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
