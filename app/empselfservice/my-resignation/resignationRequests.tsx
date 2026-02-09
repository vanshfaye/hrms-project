'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function RequestsPage() {
  const requests = [
    { id: 1, date: '2025-10-08', status: 'Pending HR Review' },
    { id: 2, date: '2025-07-20', status: 'Approved' },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Resignation Requests</h1>

      <div className="grid gap-4">
        {requests.map((req) => (
          <Card key={req.id} className="p-6 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Request ID: #{req.id}</p>
              <p className="text-sm text-gray-600">Submitted on: {req.date}</p>
            </div>
            <Badge
              className={
                req.status === 'Approved'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }
            >
              {req.status}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  )
}
