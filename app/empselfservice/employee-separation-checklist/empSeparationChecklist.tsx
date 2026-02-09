'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from "next/link"
interface ChecklistItem {
  label: string
  checked: boolean
}

interface Section {
  title: string
  items: ChecklistItem[]
}

export default function EmpSeparationChecklist() {
  const [sections, setSections] = useState<Section[]>([
    {
      title: 'Employee Details',
      items: [
        { label: 'Name, ID, Department, Designation', checked: false },
        { label: 'Last working day', checked: false },
        { label: 'Manager/supervisor name', checked: false },
      ],
    },
    {
      title: 'Clearance / Handover',
      items: [
        { label: 'Return company assets (laptop, ID, keys)', checked: false },
        { label: 'Handover of projects & documentation', checked: false },
        { label: 'Knowledge transfer sessions', checked: false },
        { label: 'Revoke access to systems and tools', checked: false },
      ],
    },
    {
      title: 'Finance / Payroll',
      items: [
        { label: 'Final salary processed', checked: false },
        { label: 'Pending bonuses / incentives settled', checked: false },
        { label: 'Reimbursement of pending expenses', checked: false },
      ],
    },
    {
      title: 'HR / Legal',
      items: [
        { label: 'Exit interview scheduled', checked: false },
        { label: 'Clearance forms signed', checked: false },
        { label: 'Benefits closure (insurance, retirement plans)', checked: false },
      ],
    },
    {
      title: 'IT / Access',
      items: [
        { label: 'Disable email, network, and software accounts', checked: false },
        { label: 'Backup employee data if needed', checked: false },
      ],
    },
    {
      title: 'Miscellaneous',
      items: [
        { label: 'Relieving letter / Experience certificate issued', checked: false },
        { label: 'Update HRMS records', checked: false },
      ],
    },
  ])

  const [expandedSections, setExpandedSections] = useState<boolean[]>(
    Array(sections.length).fill(false)
  )

  const toggleSection = (index: number) => {
    setExpandedSections(prev => prev.map((v, i) => (i === index ? !v : v)))
  }

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    setSections(prev => {
      const newSections = [...prev]
      newSections[sectionIndex].items[itemIndex].checked =
        !newSections[sectionIndex].items[itemIndex].checked
      return newSections
    })
  }

  const handleSubmit = () => {
    console.log('Checklist Status:', sections)
    alert('Checklist saved! Check console for details.')
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
        <span className="text-foreground font-semibold">Employee Separation Checklist</span>
      </div>
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Employee Separation Checklist</h1>

      {sections.map((section, sIndex) => (
        <Card key={sIndex} className="p-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(sIndex)}
          >
            <h2 className="text-lg font-semibold text-black-600">{section.title}</h2>
            {expandedSections[sIndex] ? <ChevronUp /> : <ChevronDown />}
          </div>

          {expandedSections[sIndex] && (
            <div className="mt-4 space-y-2">
              {section.items.map((item, iIndex) => (
                <div key={iIndex} className="flex items-center space-x-2">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(sIndex, iIndex)}
                  />
                  <span className={item.checked ? 'line-through text-gray-400' : ''}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}

      <Button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Save Checklist
      </Button>
    </div>
    </div>
  )
}
