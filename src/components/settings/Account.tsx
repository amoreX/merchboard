"use client";

import { useState } from "react";

export default function Account() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orders: true,
    marketing: false,
    updates: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-foreground/50 mt-1">Manage your account preferences and settings.</p>
      </div>

      <div className="space-y-6">
        {/* Store Settings */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Store Name</label>
              <input
                type="text"
                defaultValue="Merch Nest Store"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Store URL</label>
              <div className="flex">
                <span className="px-4 py-2.5 bg-border rounded-l-lg text-sm text-foreground/60 border border-r-0 border-border">
                  https://
                </span>
                <input
                  type="text"
                  defaultValue="merchnest.store"
                  className="flex-1 px-4 py-2.5 bg-background border border-border rounded-r-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Currency</label>
              <select className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
                <option>CAD - Canadian Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Timezone</label>
              <select className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-accent text-background px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-foreground/50">Receive notifications via email</div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-accent' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-foreground/50">Receive push notifications in browser</div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                className={`w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-accent' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
              <div>
                <div className="font-medium">Order Updates</div>
                <div className="text-sm text-foreground/50">Get notified about new orders and updates</div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, orders: !notifications.orders })}
                className={`w-12 h-6 rounded-full transition-colors ${notifications.orders ? 'bg-accent' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${notifications.orders ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
              <div>
                <div className="font-medium">Marketing Emails</div>
                <div className="text-sm text-foreground/50">Receive tips, promotions, and updates</div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                className={`w-12 h-6 rounded-full transition-colors ${notifications.marketing ? 'bg-accent' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${notifications.marketing ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-red-400/30 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-400/5 rounded-xl border border-red-400/20">
              <div>
                <div className="font-medium">Delete Account</div>
                <div className="text-sm text-foreground/50">Permanently delete your account and all data</div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-red-400 text-white text-sm font-medium hover:bg-red-500 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

