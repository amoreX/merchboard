"use client";

import { useState } from "react";

const emails = [
  { id: 1, from: "John Doe", email: "john@example.com", subject: "Question about order #4523", preview: "Hi, I was wondering if I could get an update on my order...", time: "10:30 AM", read: false, starred: true },
  { id: 2, from: "Jane Smith", email: "jane@example.com", subject: "Return request for T-Shirt", preview: "Hello, I'd like to initiate a return for my recent purchase...", time: "9:15 AM", read: false, starred: false },
  { id: 3, from: "Shipping Dept", email: "shipping@carrier.com", subject: "Delivery confirmation", preview: "Your package has been delivered to the recipient...", time: "Yesterday", read: true, starred: false },
  { id: 4, from: "Mike Wilson", email: "mike@example.com", subject: "Re: Product availability", preview: "Thanks for the quick response! I'll order it now...", time: "Yesterday", read: true, starred: true },
  { id: 5, from: "Support Team", email: "support@merchboard.com", subject: "Weekly report summary", preview: "Here's your weekly performance summary for the store...", time: "Dec 12", read: true, starred: false },
  { id: 6, from: "Sarah Brown", email: "sarah@example.com", subject: "Wholesale inquiry", preview: "Hi, I'm interested in placing a bulk order for our company...", time: "Dec 11", read: true, starred: true },
];

export default function Inbox() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Unread", "Starred"];

  const filteredEmails = emails.filter((email) => {
    if (filter === "Unread") return !email.read;
    if (filter === "Starred") return email.starred;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-foreground/50 mt-1">Manage your email communications.</p>
        </div>
        <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Compose
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-accent text-background"
                : "bg-card border border-border text-foreground/60 hover:text-foreground"
            }`}
          >
            {f}
            {f === "Unread" && (
              <span className="ml-2 px-1.5 py-0.5 bg-background/20 rounded text-xs">
                {emails.filter(e => !e.read).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Email List */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => setSelectedEmail(email.id)}
            className={`p-4 border-b border-border/50 last:border-0 cursor-pointer hover:bg-border/20 transition-colors ${
              !email.read ? "bg-accent/5" : ""
            } ${selectedEmail === email.id ? "bg-accent/10" : ""}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-border" />
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="text-foreground/40 hover:text-yellow-400 transition-colors"
                >
                  <svg className={`w-5 h-5 ${email.starred ? 'text-yellow-400 fill-yellow-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${!email.read ? 'text-foreground' : 'text-foreground/70'}`}>
                      {email.from}
                    </span>
                    {!email.read && (
                      <span className="w-2 h-2 bg-accent rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-foreground/50">{email.time}</span>
                </div>
                <div className={`text-sm mb-1 ${!email.read ? 'font-medium' : 'text-foreground/70'}`}>
                  {email.subject}
                </div>
                <p className="text-sm text-foreground/50 truncate">{email.preview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmails.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No emails found</h3>
          <p className="text-foreground/50">No emails match your current filter.</p>
        </div>
      )}
    </div>
  );
}

