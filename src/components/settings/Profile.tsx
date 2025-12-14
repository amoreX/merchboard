"use client";

import { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "Nihal",
    lastName: "",
    email: "nihal@merchnest.com",
    phone: "+1 (555) 000-0000",
    bio: "Merch store owner and entrepreneur. Building the best merchandise platform for creators.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-foreground/50 mt-1">Manage your personal information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center text-accent text-3xl font-bold mb-4">
            N
          </div>
          <h3 className="text-lg font-semibold">{formData.firstName} {formData.lastName}</h3>
          <p className="text-foreground/50 text-sm">{formData.email}</p>
          <div className="mt-4 pt-4 border-t border-border">
            <button className="w-full py-2 rounded-lg border border-border text-sm hover:bg-border/30 transition-colors">
              Change Photo
            </button>
          </div>
          <div className="mt-4 space-y-2 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/60">Member since</span>
              <span>Dec 2024</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/60">Role</span>
              <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full text-xs">Admin</span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-accent text-background px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center">
                    <span className="text-[#1DA1F2] font-bold">X</span>
                  </div>
                  <div>
                    <div className="font-medium">Twitter / X</div>
                    <div className="text-sm text-foreground/50">Not connected</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-border/30 transition-colors">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E4405F]/10 flex items-center justify-center">
                    <span className="text-[#E4405F] font-bold">IG</span>
                  </div>
                  <div>
                    <div className="font-medium">Instagram</div>
                    <div className="text-sm text-green-400">Connected as @merchnest</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg text-red-400 border border-red-400/30 text-sm hover:bg-red-400/10 transition-colors">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

