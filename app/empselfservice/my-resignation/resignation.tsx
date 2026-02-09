'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import * as Collapsible from '@radix-ui/react-collapsible'
import { CalendarDays, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import Link from "next/link"
export default function ResignationPage() {
  const [lastWorkingDay, setLastWorkingDay] = useState<Date | undefined>()
  const [reason, setReason] = useState('')
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openRequests, setOpenRequests] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openDetails, setOpenDetails] = useState(true) // for expandable section

  const handleSubmit = () => {
    if (!reason || !lastWorkingDay) {
      alert('⚠️ Please fill in all required fields before submitting.')
      return
    }
    setSubmitted(true)
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
        <span className="text-foreground font-semibold">My Resignation</span>
      </div>
    <div className="flex flex-col p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Submit Resignation</h1>
        <Button
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={() => setOpenRequests(true)}
        >
          View Requests
        </Button>
      </div>

      {/* Employee Info */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-3">Employee Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Employee ID:</strong> EMP-1023</p>
          <p><strong>Department:</strong> Human Resources</p>
          <p><strong>Designation:</strong> HR Executive</p>
          <p><strong>Joining Date:</strong> 12 Jan 2022</p>
        </div>
      </Card>

      {/* Collapsible Resignation Form */}
      <Card className="p-6 space-y-4">
        <Collapsible.Root open={openDetails} onOpenChange={setOpenDetails}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-blue-600">Resignation Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenDetails(!openDetails)}
              className="text-blue-600 hover:text-blue-800"
            >
              {openDetails ? (
                <><ChevronUp className="w-4 h-4 mr-1" /> </>
              ) : (
                <><ChevronDown className="w-4 h-4 mr-1" /> </>
              )}
            </Button>
          </div>

          <Collapsible.Content className="space-y-4 mt-3 border-t pt-4">
            <div>
              <label className="font-medium text-sm">
                Reason for Resignation <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please describe your reason for resignation..."
                className="mt-1 border-gray-300"
              />
            </div>

            <div>
              <label className="font-medium text-sm">
                Last Working Day <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  readOnly
                  value={lastWorkingDay ? lastWorkingDay.toDateString() : ''}
                  placeholder="Select Date"
                  onClick={() => setOpenCalendar(true)}
                  className="cursor-pointer"
                />
                <CalendarDays className="text-blue-600" />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
            >
              Submit Resignation
            </Button>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card>

      {/* Status Card */}
      {submitted && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Resignation Status</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-700 font-medium">
              <CheckCircle2 className="mr-2 text-green-600" /> Submitted
            </div>
            <div className="w-10 h-[2px] bg-blue-400" />
            <div className="flex items-center text-gray-500 opacity-60">
              <CheckCircle2 className="mr-2" /> HR Review
            </div>
            <div className="w-10 h-[2px] bg-gray-300" />
            <div className="flex items-center text-gray-500 opacity-60">
              <CheckCircle2 className="mr-2" /> Approved
            </div>
          </div>
        </Card>
      )}

      {/* Requests Modal */}
      <Dialog open={openRequests} onOpenChange={setOpenRequests}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>My Resignation Requests</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="p-4 flex justify-between items-center border-l-4 border-yellow-400">
              <div>
                <p className="font-medium text-gray-800">Submitted on: 08 Oct 2025</p>
                <p className="text-sm text-gray-500">Last Working Day: 25 Oct 2025</p>
              </div>
              <span className="text-yellow-700 font-semibold">Pending HR Review</span>
            </Card>

            <Card className="p-4 flex justify-between items-center border-l-4 border-green-500">
              <div>
                <p className="font-medium text-gray-800">Submitted on: 10 Aug 2025</p>
                <p className="text-sm text-gray-500">Last Working Day: 30 Aug 2025</p>
              </div>
              <span className="text-green-700 font-semibold">Approved</span>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  )
}
