"use client";

import { useState } from "react";

const customers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: "$1,234.56", joined: "Jan 2024", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, spent: "$567.89", joined: "Feb 2024", status: "Active" },
  { id: 3, name: "Mike Wilson", email: "mike@example.com", orders: 15, spent: "$2,345.67", joined: "Dec 2023", status: "VIP" },
  { id: 4, name: "Sarah Brown", email: "sarah@example.com", orders: 3, spent: "$123.45", joined: "Mar 2024", status: "Active" },
  { id: 5, name: "Tom Davis", email: "tom@example.com", orders: 0, spent: "$0.00", joined: "Dec 2024", status: "New" },
  { id: 6, name: "Emily Chen", email: "emily@example.com", orders: 25, spent: "$3,456.78", joined: "Oct 2023", status: "VIP" },
  { id: 7, name: "Alex Johnson", email: "alex@example.com", orders: 6, spent: "$345.67", joined: "Apr 2024", status: "Active" },
  { id: 8, name: "Lisa Park", email: "lisa@example.com", orders: 1, spent: "$89.99", joined: "Dec 2024", status: "New" },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "Active", "VIP", "New", "Inactive"];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "bg-purple-400/10 text-purple-400";
      case "Active": return "bg-green-400/10 text-green-400";
      case "New": return "bg-blue-400/10 text-blue-400";
      case "Inactive": return "bg-gray-400/10 text-gray-400";
      default: return "bg-gray-400/10 text-gray-400";
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-foreground/50 mt-1">Manage your customer base and relationships.</p>
        </div>
        <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Customers</div>
          <div className="text-3xl font-bold">3,892</div>
          <div className="text-sm text-green-400 mt-1">+23.1% from last month</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">VIP Customers</div>
          <div className="text-3xl font-bold text-purple-400">234</div>
          <div className="text-sm text-foreground/40 mt-1">6% of total</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">New This Month</div>
          <div className="text-3xl font-bold text-blue-400">156</div>
          <div className="text-sm text-green-400 mt-1">+12% from last month</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Avg. Order Value</div>
          <div className="text-3xl font-bold">$86.24</div>
          <div className="text-sm text-green-400 mt-1">+8.2% from last month</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-accent text-background"
                  : "bg-card border border-border text-foreground/60 hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Customer</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Orders</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Total Spent</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Joined</th>
                <th className="text-right text-sm font-medium text-foreground/60 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border/50 last:border-0 hover:bg-border/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                        {getInitials(customer.name)}
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-foreground/50">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{customer.orders}</td>
                  <td className="px-6 py-4 font-medium">{customer.spent}</td>
                  <td className="px-6 py-4 text-foreground/60">{customer.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors" title="View Profile">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors" title="Send Email">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

