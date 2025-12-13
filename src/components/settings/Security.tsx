"use client";

import { useState } from "react";

export default function Security() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const sessions = [
    { device: "MacBook Pro", location: "San Francisco, CA", lastActive: "Active now", current: true },
    { device: "iPhone 15", location: "San Francisco, CA", lastActive: "2 hours ago", current: false },
    { device: "Chrome on Windows", location: "New York, NY", lastActive: "3 days ago", current: false },
  ];

  const loginHistory = [
    { action: "Successful login", device: "MacBook Pro", location: "San Francisco, CA", time: "Today, 10:30 AM" },
    { action: "Successful login", device: "iPhone 15", location: "San Francisco, CA", time: "Yesterday, 8:45 PM" },
    { action: "Password changed", device: "MacBook Pro", location: "San Francisco, CA", time: "Dec 10, 2024" },
    { action: "2FA enabled", device: "MacBook Pro", location: "San Francisco, CA", time: "Dec 5, 2024" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <p className="text-foreground/50 mt-1">Manage your account security and authentication.</p>
      </div>

      <div className="space-y-6">
        {/* Password */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Password</h2>
              <p className="text-sm text-foreground/50">Last changed 4 days ago</p>
            </div>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-border/30 transition-colors"
            >
              Change Password
            </button>
          </div>
          <div className="p-4 bg-background rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-green-400">Strong Password</div>
                <div className="text-sm text-foreground/50">Your password meets all security requirements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
              <p className="text-sm text-foreground/50">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${twoFactorEnabled ? 'bg-accent' : 'bg-border'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          {twoFactorEnabled ? (
            <div className="p-4 bg-green-400/5 rounded-xl border border-green-400/20">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400 font-medium">Two-factor authentication is enabled</span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-400/5 rounded-xl border border-yellow-400/20">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-yellow-400 font-medium">We recommend enabling 2FA for better security</span>
              </div>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Active Sessions</h2>
            <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
              Sign out all other sessions
            </button>
          </div>
          <div className="space-y-3">
            {sessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full">Current</span>
                      )}
                    </div>
                    <div className="text-sm text-foreground/50">{session.location} · {session.lastActive}</div>
                  </div>
                </div>
                {!session.current && (
                  <button className="px-4 py-2 rounded-lg text-red-400 border border-red-400/30 text-sm hover:bg-red-400/10 transition-colors">
                    Sign Out
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login History */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {loginHistory.map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    log.action.includes('Successful') ? 'bg-green-400/10' : 'bg-accent/10'
                  }`}>
                    {log.action.includes('Successful') ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-foreground/50">{log.device} · {log.location}</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/50">{log.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-border/30 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-medium hover:bg-accent-hover transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

