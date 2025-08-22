"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Mail, MailOpen, Reply } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}

export default function ContactManager({ submissions }: { submissions: ContactSubmission[] }) {
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-500/10 text-red-400 border-red-500/50"
      case "read":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/50"
      case "replied":
        return "bg-green-500/10 text-green-400 border-green-500/50"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Mail className="w-3 h-3" />
      case "read":
        return <MailOpen className="w-3 h-3" />
      case "replied":
        return <Reply className="w-3 h-3" />
      default:
        return <Mail className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
          <p className="text-slate-400">Manage contact form submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-red-500/50 text-red-400">
            {submissions.filter((s) => s.status === "unread").length} Unread
          </Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-300">
            {submissions.length} Total
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-white">{submission.name}</h3>
                    <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                      {getStatusIcon(submission.status)}
                      <span className="ml-1 capitalize">{submission.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{submission.email}</p>
                  <p className="text-sm text-slate-300 font-medium">{submission.subject}</p>
                  <p className="text-sm text-slate-300 line-clamp-2">{submission.message}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(submission.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedSubmission(submission)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Contact Message</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          From {submission.name} ({submission.email})
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Subject</h4>
                          <p className="text-slate-300">{submission.subject}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Message</h4>
                          <div className="bg-slate-700 rounded-lg p-4">
                            <p className="text-slate-300 whitespace-pre-wrap">{submission.message}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Details</h4>
                          <div className="text-sm text-slate-400 space-y-1">
                            <p>Received: {new Date(submission.created_at).toLocaleString()}</p>
                            <p>
                              Status: <span className="capitalize">{submission.status}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            asChild
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            <a href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}>
                              <Reply className="w-4 h-4 mr-2" />
                              Reply via Email
                            </a>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {submissions.length === 0 && (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-12 text-center">
              <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
              <p className="text-slate-400">Contact form submissions will appear here</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
