"use client";

import { useState } from "react";

const completedOrders = [
  { id: "#4521", customer: "Mike Wilson", email: "mike@example.com", product: "Cap Bundle", amount: "$49.99", date: "Dec 13, 2024", deliveredDate: "Dec 14, 2024" },
  { id: "#4519", customer: "Tom Davis", email: "tom@example.com", product: "Vinyl Record", amount: "$24.99", date: "Dec 12, 2024", deliveredDate: "Dec 14, 2024" },
  { id: "#4517", customer: "Alex Johnson", email: "alex@example.com", product: "Tote Bag", amount: "$15.99", date: "Dec 11, 2024", deliveredDate: "Dec 13, 2024" },
  { id: "#4510", customer: "Maria Garcia", email: "maria@example.com", product: "Logo Hoodie", amount: "$89.99", date: "Dec 8, 2024", deliveredDate: "Dec 12, 2024" },
  { id: "#4508", customer: "James Brown", email: "james@example.com", product: "Poster Set", amount: "$24.99", date: "Dec 7, 2024", deliveredDate: "Dec 11, 2024" },
  { id: "#4505", customer: "Sophie Turner", email: "sophie@example.com", product: "Tour T-Shirt", amount: "$34.99", date: "Dec 5, 2024", deliveredDate: "Dec 9, 2024" },
];

export default function CompletedOrders() {
  const [dateFilter, setDateFilter] = useState("This Month");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Completed Orders</h1>
          <p className="text-foreground/50 mt-1">Successfully delivered orders.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-accent cursor-pointer"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Completed</span>
          </div>
          <div className="text-2xl font-bold">{completedOrders.length}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Revenue</span>
          </div>
          <div className="text-2xl font-bold">$240.94</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Avg. Delivery</span>
          </div>
          <div className="text-2xl font-bold">2.8 days</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Satisfaction</span>
          </div>
          <div className="text-2xl font-bold">4.8/5</div>
        </div>
      </div>

      {/* Completed Orders Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Order</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Customer</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Product</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Amount</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Ordered</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Delivered</th>
                <th className="text-right text-sm font-medium text-foreground/60 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-border/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-400/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-mono text-accent">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-foreground/50">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{order.product}</td>
                  <td className="px-6 py-4 font-medium">{order.amount}</td>
                  <td className="px-6 py-4 text-foreground/60">{order.date}</td>
                  <td className="px-6 py-4 text-green-400">{order.deliveredDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors" title="View Details">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors" title="Download Invoice">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
    </div>
  );
}

