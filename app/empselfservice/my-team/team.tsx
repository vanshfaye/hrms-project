"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
interface TeamMember {
  id: number
  name: string
  email: string
  joiningDate: string
  role: string
}

export default function MyTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newJoiningDate, setNewJoiningDate] = useState("")
  const [newRole, setNewRole] = useState("")

  const addMember = () => {
    if (!newName || !newEmail || !newJoiningDate || !newRole) return
    setMembers([
      ...members,
      {
        id: members.length + 1,
        name: newName,
        email: newEmail,
        joiningDate: newJoiningDate,
        role: newRole,
      },
    ])
    setCreating(false)
    setNewName("")
    setNewEmail("")
    setNewJoiningDate("")
    setNewRole("")
  }

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
        <span className="text-foreground font-semibold">My Team</span>
      </div>
    <div className="p-6 space-y-6">
      {/* Button aligned to the right */}
      <div className="flex justify-end">
        <Button onClick={() => setCreating(!creating)}>
          {creating ? "Cancel" : "Add Member"}
        </Button>
      </div>

      {creating && (
        <Card className="p-4 space-y-2">
          <input
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="date"
            placeholder="Joining Date"
            value={newJoiningDate}
            onChange={(e) => setNewJoiningDate(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            placeholder="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border p-2 w-full"
          />
          <Button onClick={addMember}>Save</Button>
        </Card>
      )}

      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-blue-600">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Joining Date</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-blue-600">
                  No team members yet.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">{m.email}</td>
                  <td className="px-4 py-2">{m.joiningDate}</td>
                  <td className="px-4 py-2">{m.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
    </div>
  )
}
