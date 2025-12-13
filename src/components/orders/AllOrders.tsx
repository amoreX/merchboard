"use client";

import { useState } from "react";

const orders = [
  { id: "#4523", customer: "John Doe", email: "john@example.com", product: "Logo Hoodie", amount: "$89.99", date: "Dec 14, 2024", status: "Shipped" },
  { id: "#4522", customer: "Jane Smith", email: "jane@example.com", product: "Tour T-Shirt", amount: "$34.99", date: "Dec 14, 2024", status: "Processing" },
  { id: "#4521", customer: "Mike Wilson", email: "mike@example.com", product: "Cap Bundle", amount: "$49.99", date: "Dec 13, 2024", status: "Delivered" },
  { id: "#4520", customer: "Sarah Brown", email: "sarah@example.com", product: "Poster Set", amount: "$24.99", date: "Dec 13, 2024", status: "Shipped" },
  { id: "#4519", customer: "Tom Davis", email: "tom@example.com", product: "Vinyl Record", amount: "$24.99", date: "Dec 12, 2024", status: "Delivered" },
  { id: "#4518", customer: "Emily Chen", email: "emily@example.com", product: "Sticker Pack", amount: "$9.99", date: "Dec 12, 2024", status: "Cancelled" },
  { id: "#4517", customer: "Alex Johnson", email: "alex@example.com", product: "Tote Bag", amount: "$15.99", date: "Dec 11, 2024", status: "Delivered" },
  { id: "#4516", customer: "Lisa Park", email: "lisa@example.com", product: "Logo Hoodie", amount: "$89.99", date: "Dec 11, 2024", status: "Pending" },
];

export default function AllOrders() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const statuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-400/10 text-green-400";
      case "Shipped": return "bg-blue-400/10 text-blue-400";
      case "Processing": return "bg-yellow-400/10 text-yellow-400";
      case "Pending": return "bg-purple-400/10 text-purple-400";
      case "Cancelled": return "bg-red-400/10 text-red-400";
      default: return "bg-gray-400/10 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Orders</h1>
          <p className="text-foreground/50 mt-1">View and manage all customer orders.</p>
        </div>
        <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-card border border-border rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-accent cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">
                  <input type="checkbox" className="rounded border-border" />
                </th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Order ID</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Customer</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Product</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Amount</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Date</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Status</th>
                <th className="text-right text-sm font-medium text-foreground/60 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-border/20">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-border" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-accent">{order.id}</span>
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
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                      <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/60">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-border/30 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-accent text-background rounded-lg text-sm font-medium">1</button>
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-border/30 transition-colors">
            2
          </button>
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-border/30 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

