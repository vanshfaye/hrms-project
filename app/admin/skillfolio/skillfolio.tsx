"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Target,
  ArrowRight,
  User,
  Aperture,
  Clock,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";

interface Skill {
  id: number;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  status: "Pending" | "Approved";
  assignedEmployees: string[];
  category: string;
}

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
const categories = ["Technical", "Soft Skills", "Leadership", "Finance"];

const getLevelIndex = (level: Skill["level"]) => skillLevels.indexOf(level);

const SkillProgressBar = ({ level }: { level: Skill["level"] }) => {
  const maxIndex = skillLevels.length - 1;
  const currentIndex = getLevelIndex(level);
  const progressPercentage = (currentIndex / maxIndex) * 100;
  const isExpert = currentIndex === maxIndex;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-gray-200 relative">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${
            isExpert ? "bg-emerald-500" : "bg-blue-600"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <span
        className={`text-xs font-semibold ${
          isExpert ? "text-emerald-600" : "text-blue-600"
        }`}
      >
        {isExpert ? "Mastered" : `${currentIndex}/${maxIndex} Steps`}
      </span>
    </div>
  );
};

const SkillRadarMock = ({ skills }: { skills: Skill[] }) => {
  const totalSkills = skills.length;
  const avgIndex =
    totalSkills > 0
      ? skills.reduce((sum, s) => sum + getLevelIndex(s.level), 0) / totalSkills
      : 0;
  const progress = (avgIndex / 4) * 100;
  const color =
    progress > 66 ? "text-emerald-600" : progress > 33 ? "text-amber-500" : "text-red-500";

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Aperture className="text-blue-600" size={20} /> Overall Skill Readiness
      </h3>
      <div className="flex justify-center items-center h-48 relative">
        {[0.25, 0.5, 0.75].map((scale, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed border-gray-300"
            style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
          />
        ))}
        <div
          className="absolute bg-blue-500/30 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%`, height: `${progress}%` }}
        />
        <div className={`absolute text-center ${color}`}>
          <span className="text-4xl font-extrabold">{progress.toFixed(0)}%</span>
          <p className="text-sm font-medium text-gray-500 mt-1">Avg. Readiness</p>
        </div>
      </div>
    </div>
  );
};

const SkillfolioDashboard: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: "React Development", level: "Expert", status: "Approved", assignedEmployees: ["Alex", "Sarah"], category: "Technical" },
    { id: 2, name: "Negotiation Tactics", level: "Intermediate", status: "Pending", assignedEmployees: ["Ben"], category: "Soft Skills" },
    { id: 3, name: "Budget Planning", level: "Advanced", status: "Approved", assignedEmployees: ["Chloe", "David"], category: "Finance" },
    { id: 4, name: "Team Leadership", level: "Beginner", status: "Pending", assignedEmployees: ["Eva"], category: "Leadership" },
  ]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: "Beginner" as Skill["level"],
    employees: "",
    category: "Technical",
  });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0] || null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = useMemo(() => (
    selectedCategory ? skills.filter(s => s.category === selectedCategory) : skills
  ), [skills, selectedCategory]);

  const totalSkills = skills.length;
  const pendingSkills = skills.filter(s => s.status === "Pending").length;
  const avgLevel = (skills.reduce((s, v) => s + getLevelIndex(v.level), 0) / (totalSkills || 1)).toFixed(1);

  const handleEditOpen = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      employees: skill.assignedEmployees.join(", "),
      category: skill.category,
    });
    setFormOpen(true);
  };

  const handleSaveSkill = () => {
    if (!formData.name) return alert("Enter skill name");
    const updatedSkill: Skill = {
      id: editingSkill ? editingSkill.id : Date.now(),
      name: formData.name,
      level: formData.level,
      status: editingSkill ? editingSkill.status : "Pending",
      assignedEmployees: formData.employees.split(",").map(e => e.trim()).filter(Boolean),
      category: formData.category,
    };
    setSkills(prev =>
      editingSkill
        ? prev.map(s => (s.id === updatedSkill.id ? updatedSkill : s))
        : [updatedSkill, ...prev]
    );
    setEditingSkill(null);
    setFormData({ name: "", level: "Beginner", employees: "", category: "Technical" });
    setFormOpen(false);
    setSelectedSkill(updatedSkill);
  };

  const handleDelete = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    if (selectedSkill?.id === id) setSelectedSkill(null);
    if (editingSkill?.id === id) setEditingSkill(null);
  };

  const KPICard = ({ title, value, icon: Icon, color }: any) => (
    <div className="p-4 sm:p-5 rounded-xl bg-white shadow-md border border-gray-100 flex flex-col items-center justify-center">
      <Icon size={22} className={color} />
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  );

  const SkillDetailsPanel = ({ skill }: { skill: Skill }) => {
    const currentLevelIndex = getLevelIndex(skill.level);
    const nextLevel = skillLevels[currentLevelIndex + 1];
    const isExpert = currentLevelIndex === skillLevels.length - 1;

    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{skill.name}</h2>
        <p className="text-md text-blue-600 mb-6">{skill.category} Skill</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-sm">
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-500">Status</p>
            <p className={`font-semibold ${skill.status === "Approved" ? "text-emerald-600" : "text-amber-500"}`}>{skill.status}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-500">Level</p>
            <p className="font-semibold">{skill.level}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-500">Employees</p>
            <p className="font-semibold">{skill.assignedEmployees.length}</p>
          </div>
        </div>

        <SkillProgressBar level={skill.level} />
        {!isExpert && (
          <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
            <span>Next Goal: <strong>{nextLevel}</strong></span>
            <Target size={18} className="text-emerald-600" />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => handleEditOpen(skill)}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Edit size={16} className="inline mr-1" /> Edit
          </button>
          <button
            onClick={() => handleDelete(skill.id)}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 size={16} className="inline mr-1" /> Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-8 text-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-4 py-3 bg-white rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">HRMS</Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/admin" className="font-medium hover:text-primary transition-colors">Admin</Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Skillfolio</span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* LEFT PANEL */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-2xl font-extrabold text-gray-900">Skillfolio</h1>
            <button
              onClick={() => {
                setEditingSkill(null);
                setFormData({ name: "", level: "Beginner", employees: "", category: "Technical" });
                setFormOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <KPICard title="Total" value={totalSkills} icon={Aperture} color="text-blue-600" />
            <KPICard title="Pending" value={pendingSkills} icon={Clock} color="text-amber-500" />
            <KPICard title="Avg. Level" value={avgLevel} icon={TrendingUp} color="text-emerald-600" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex-1 overflow-hidden">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Skill Tree</h3>
            <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-340px)] pr-2">
              {categories.map(cat => (
                <div key={cat}>
                  <h4
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer font-semibold ${
                      selectedCategory === cat ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ArrowRight size={16} /> {cat}
                  </h4>
                  {filteredSkills.filter(s => s.category === cat).map(skill => (
                    <div
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill)}
                      className={`ml-6 border-l-2 pl-4 py-2 flex justify-between items-center text-sm cursor-pointer ${
                        selectedSkill?.id === skill.id
                          ? "text-blue-700 font-medium border-blue-600 bg-blue-50 rounded-r-lg"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <span className="truncate">{skill.name}</span>
                      <CheckCircle size={14} className={skill.status === "Approved" ? "text-emerald-600" : "text-amber-500"} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          {selectedSkill ? (
            <SkillDetailsPanel skill={selectedSkill} />
          ) : (
            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col items-center justify-center">
              <Aperture size={48} className="text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Skill</h2>
              <p className="text-gray-500 text-center">Tap a skill in the list to view its details.</p>
            </div>
          )}
          <SkillRadarMock skills={skills} />
        </div>
      </div>

      {/* MODAL */}
      {formOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-0">
          <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-[95%] sm:w-full max-w-lg border border-gray-200 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{editingSkill ? "Edit Skill" : "New Skill"}</h2>
              <button onClick={() => { setFormOpen(false); setEditingSkill(null); }} className="text-gray-500 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Skill Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2.5"
                  placeholder="e.g., Data Modeling"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Employees (comma-separated)</label>
                <input
                  type="text"
                  value={formData.employees}
                  onChange={e => setFormData({ ...formData, employees: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select
                    value={formData.level}
                    onChange={e => setFormData({ ...formData, level: e.target.value as Skill["level"] })}
                    className="w-full border rounded-lg px-4 py-2.5"
                  >
                    {skillLevels.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2.5"
                  >
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-200">
              <button onClick={handleSaveSkill} className="flex-1 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Plus size={16} className="inline mr-1" /> {editingSkill ? "Save Changes" : "Save Skill"}
              </button>
              <button onClick={() => { setFormOpen(false); setEditingSkill(null); }} className="w-1/3 py-2.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillfolioDashboard;
