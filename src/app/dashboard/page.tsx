"use client";

import Link from "next/link";
import { useState } from "react";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string | number;
  badgeType?: "count" | "pro";
  children?: { name: string; href: string; badge?: string }[];
}

const mainMenuItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    children: [
      { name: "Overview", href: "#" },
      { name: "Analytics", href: "#" },
      { name: "Sales", href: "#" },
    ],
  },
  {
    name: "Products",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    children: [
      { name: "All Products", href: "#" },
      { name: "Add Product", href: "#" },
      { name: "Categories", href: "#" },
    ],
  },
  {
    name: "Orders",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    children: [
      { name: "All Orders", href: "#" },
      { name: "Pending", href: "#" },
      { name: "Completed", href: "#" },
    ],
  },
  {
    name: "Customers",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "Reports",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    children: [
      { name: "Sales Report", href: "#" },
      { name: "Traffic Report", href: "#" },
      { name: "Revenue Report", href: "#" },
    ],
  },
];

const supportItems: NavItem[] = [
  {
    name: "Messages",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    href: "#",
    badge: 9,
    badgeType: "count",
  },
  {
    name: "Inbox",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    href: "#",
    badge: "Pro",
    badgeType: "pro",
  },
  {
    name: "Invoice",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: "#",
    badge: "Pro",
    badgeType: "pro",
  },
];

const otherItems: NavItem[] = [
  {
    name: "Settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    children: [
      { name: "Profile", href: "#" },
      { name: "Account", href: "#" },
      { name: "Security", href: "#" },
    ],
  },
  {
    name: "Help Center",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "#",
  },
];

function NavItemComponent({ item, isOpen, onToggle }: { item: NavItem; isOpen: boolean; onToggle: () => void }) {
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            isOpen ? "bg-accent/10 text-accent" : "text-foreground/60 hover:text-foreground hover:bg-border/30"
          }`}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <ul className="mt-1 ml-4 pl-4 border-l border-border/50 space-y-1">
            {item.children.map((child) => (
              <li key={child.name}>
                <a
                  href={child.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/50 hover:text-foreground transition-colors rounded-lg hover:bg-border/20"
                >
                  {child.name}
                  {child.badge && (
                    <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                      {child.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-border/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span className="text-sm font-medium">{item.name}</span>
        </div>
        {item.badge && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              item.badgeType === "count"
                ? "bg-accent text-background font-medium"
                : "bg-accent/20 text-accent"
            }`}
          >
            {item.badge}
          </span>
        )}
      </a>
    </li>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ Dashboard: true });
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen grid-bg">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-background font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">merchboard</span>
          </div>

          {/* Scrollable Navigation */}
          <div className="flex-1 overflow-y-auto space-y-6">
            {/* Main Menu */}
            <div>
              <h3 className="px-4 mb-2 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                Main Menu
              </h3>
              <nav>
                <ul className="space-y-1">
                  {mainMenuItems.map((item) => (
                    <NavItemComponent
                      key={item.name}
                      item={item}
                      isOpen={openMenus[item.name] || false}
                      onToggle={() => toggleMenu(item.name)}
                    />
                  ))}
                </ul>
              </nav>
            </div>

            {/* Support */}
            <div>
              <h3 className="px-4 mb-2 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                Support
              </h3>
              <nav>
                <ul className="space-y-1">
                  {supportItems.map((item) => (
                    <NavItemComponent
                      key={item.name}
                      item={item}
                      isOpen={openMenus[item.name] || false}
                      onToggle={() => toggleMenu(item.name)}
                    />
                  ))}
                </ul>
              </nav>
            </div>

            {/* Others */}
            <div>
              <h3 className="px-4 mb-2 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                Others
              </h3>
              <nav>
                <ul className="space-y-1">
                  {otherItems.map((item) => (
                    <NavItemComponent
                      key={item.name}
                      item={item}
                      isOpen={openMenus[item.name] || false}
                      onToggle={() => toggleMenu(item.name)}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Sign Out */}
          <div className="pt-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-border/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-medium">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left: Toggle & Breadcrumb */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-border/30 transition-colors"
              >
                <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Breadcrumb */}
              <nav className="hidden sm:flex items-center gap-2 text-sm">
                <Link href="/dashboard" className="text-foreground/50 hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <span className="text-foreground/30">/</span>
                <span className="text-foreground">Overview</span>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-lg hover:bg-border/30 transition-colors"
                >
                  <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Search Modal */}
                {searchOpen && (
                  <>
                    <div className="fixed inset-0 z-50" onClick={() => setSearchOpen(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-xl z-50 p-4">
                      <div className="relative">
                        <svg
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                          autoFocus
                        />
                      </div>
                      <div className="mt-3 text-xs text-foreground/40">
                        Press <kbd className="px-1.5 py-0.5 bg-border rounded">⌘K</kbd> to open search
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg hover:bg-border/30 transition-colors relative"
                >
                  <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-50" onClick={() => setNotificationsOpen(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-xl z-50">
                      <div className="p-4 border-b border-border">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {[
                          { title: "New order received", desc: "Order #4525 from John Doe", time: "2 min ago", unread: true },
                          { title: "Product low in stock", desc: "Logo Hoodie has only 5 left", time: "1 hour ago", unread: true },
                          { title: "Payment successful", desc: "$89.99 payment confirmed", time: "3 hours ago", unread: false },
                        ].map((notif, i) => (
                          <div
                            key={i}
                            className={`px-4 py-3 border-b border-border/50 hover:bg-border/20 cursor-pointer ${
                              notif.unread ? "bg-accent/5" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {notif.unread && (
                                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                              )}
                              <div className={notif.unread ? "" : "ml-5"}>
                                <p className="text-sm font-medium">{notif.title}</p>
                                <p className="text-xs text-foreground/50">{notif.desc}</p>
                                <p className="text-xs text-foreground/40 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3">
                        <button className="w-full text-sm text-accent hover:text-accent-hover text-center">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-border/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-background font-semibold text-sm">N</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Nihal</p>
                    <p className="text-xs text-foreground/50">Admin</p>
                  </div>
                  <svg className="w-4 h-4 text-foreground/40 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-50" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 top-14 w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-2">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="font-medium">Nihal</p>
                        <p className="text-sm text-foreground/50">nihal@merchboard.com</p>
                      </div>
                      <div className="py-2">
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-foreground/70 hover:bg-border/30 hover:text-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-foreground/70 hover:bg-border/30 hover:text-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-foreground/70 hover:bg-border/30 hover:text-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Help Center
                        </a>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <Link
                          href="/"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-foreground/50 mt-1">Welcome back! Here&apos;s what&apos;s happening with your merch today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glow bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-foreground/60 text-sm">Total Revenue</span>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+12.5%</span>
              </div>
              <div className="text-3xl font-bold">$24,563</div>
              <div className="text-sm text-foreground/40 mt-1">vs. last month</div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-foreground/60 text-sm">Orders</span>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+8.2%</span>
              </div>
              <div className="text-3xl font-bold">1,247</div>
              <div className="text-sm text-foreground/40 mt-1">vs. last month</div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-foreground/60 text-sm">Customers</span>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+23.1%</span>
              </div>
              <div className="text-3xl font-bold">3,892</div>
              <div className="text-sm text-foreground/40 mt-1">vs. last month</div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-foreground/60 text-sm">Conversion</span>
                <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded-full">-2.4%</span>
              </div>
              <div className="text-3xl font-bold">4.28%</div>
              <div className="text-sm text-foreground/40 mt-1">vs. last month</div>
            </div>
          </div>

          {/* Recent Orders & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <div className="relative">
                  <select className="appearance-none bg-background border border-border rounded-lg px-3 py-1.5 text-sm pr-8 focus:outline-none focus:border-accent cursor-pointer">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { id: "#4523", customer: "John Doe", product: "Logo Hoodie", amount: "$89.99", status: "Shipped" },
                  { id: "#4522", customer: "Jane Smith", product: "Tour T-Shirt", amount: "$34.99", status: "Processing" },
                  { id: "#4521", customer: "Mike Wilson", product: "Cap Bundle", amount: "$49.99", status: "Delivered" },
                  { id: "#4520", customer: "Sarah Brown", product: "Poster Set", amount: "$24.99", status: "Shipped" },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-border flex items-center justify-center text-sm font-mono text-foreground/60">
                        {order.id}
                      </div>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-foreground/50">{order.product}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{order.amount}</div>
                      <div
                        className={`text-xs ${
                          order.status === "Delivered"
                            ? "text-green-400"
                            : order.status === "Shipped"
                            ? "text-blue-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-accent hover:text-accent-hover transition-colors">
                View all orders →
              </button>
            </div>

            {/* Top Products */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Top Products</h2>
                <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                  <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Logo Hoodie", sales: 234, revenue: "$21,060", trend: "+15%" },
                  { name: "Tour T-Shirt", sales: 189, revenue: "$6,610", trend: "+8%" },
                  { name: "Limited Edition Cap", sales: 156, revenue: "$4,680", trend: "+23%" },
                  { name: "Poster Bundle", sales: 98, revenue: "$2,450", trend: "-5%" },
                ].map((product, i) => (
                  <div key={product.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-foreground/50">{product.sales} sales</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{product.revenue}</div>
                      <div className={`text-xs ${product.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                        {product.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-accent hover:text-accent-hover transition-colors">
                View all products →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
