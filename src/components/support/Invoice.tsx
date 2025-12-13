"use client";

import { useState } from "react";

const invoices = [
  { id: "INV-2024-001", customer: "John Doe", email: "john@example.com", amount: "$234.56", status: "Paid", date: "Dec 14, 2024", dueDate: "Dec 21, 2024" },
  { id: "INV-2024-002", customer: "Jane Smith", email: "jane@example.com", amount: "$89.99", status: "Pending", date: "Dec 13, 2024", dueDate: "Dec 20, 2024" },
  { id: "INV-2024-003", customer: "Mike Wilson", email: "mike@example.com", amount: "$567.89", status: "Paid", date: "Dec 12, 2024", dueDate: "Dec 19, 2024" },
  { id: "INV-2024-004", customer: "Sarah Brown", email: "sarah@example.com", amount: "$123.45", status: "Overdue", date: "Dec 5, 2024", dueDate: "Dec 12, 2024" },
  { id: "INV-2024-005", customer: "Tom Davis", email: "tom@example.com", amount: "$345.67", status: "Draft", date: "Dec 14, 2024", dueDate: "-" },
];

export default function Invoice() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-400/10 text-green-400";
      case "Pending": return "bg-yellow-400/10 text-yellow-400";
      case "Overdue": return "bg-red-400/10 text-red-400";
      case "Draft": return "bg-gray-400/10 text-gray-400";
      default: return "bg-gray-400/10 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-foreground/50 mt-1">Create and manage customer invoices.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Outstanding</div>
          <div className="text-3xl font-bold text-yellow-400">$1,361.56</div>
          <div className="text-sm text-foreground/40 mt-1">5 invoices</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Paid This Month</div>
          <div className="text-3xl font-bold text-green-400">$12,345.67</div>
          <div className="text-sm text-foreground/40 mt-1">23 invoices</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Overdue</div>
          <div className="text-3xl font-bold text-red-400">$123.45</div>
          <div className="text-sm text-foreground/40 mt-1">1 invoice</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Draft</div>
          <div className="text-3xl font-bold">$345.67</div>
          <div className="text-sm text-foreground/40 mt-1">1 invoice</div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Invoice</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Customer</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Amount</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Date</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Due Date</th>
                <th className="text-right text-sm font-medium text-foreground/60 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border/50 last:border-0 hover:bg-border/20">
                  <td className="px-6 py-4">
                    <span className="font-mono text-accent">{invoice.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{invoice.customer}</div>
                      <div className="text-sm text-foreground/50">{invoice.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground/60">{invoice.date}</td>
                  <td className="px-6 py-4 text-foreground/60">{invoice.dueDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors" title="View">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors" title="Download">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors" title="Send">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Create New Invoice</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Customer</label>
                <select className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent">
                  <option>Select customer</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Wilson</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">$</span>
                    <input
                      type="text"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Invoice description..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-border/30 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-medium hover:bg-accent-hover transition-colors">
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

