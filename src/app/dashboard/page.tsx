"use client";

import Link from "next/link";
import { useState } from "react";

// Dashboard components
import Overview from "@/components/dashboard/Overview";
import Analytics from "@/components/dashboard/Analytics";
import Sales from "@/components/dashboard/Sales";

// Products components
import AllProducts from "@/components/products/AllProducts";
import AddProduct from "@/components/products/AddProduct";
import Categories from "@/components/products/Categories";

// Orders components
import AllOrders from "@/components/orders/AllOrders";
import PendingOrders from "@/components/orders/PendingOrders";
import CompletedOrders from "@/components/orders/CompletedOrders";

// Customers component
import Customers from "@/components/customers/Customers";

// Reports components
import SalesReport from "@/components/reports/SalesReport";
import TrafficReport from "@/components/reports/TrafficReport";
import RevenueReport from "@/components/reports/RevenueReport";

// Support components
import Messages from "@/components/support/Messages";
import Inbox from "@/components/support/Inbox";
import Invoice from "@/components/support/Invoice";

// Settings components
import Profile from "@/components/settings/Profile";
import Account from "@/components/settings/Account";
import Security from "@/components/settings/Security";
import HelpCenter from "@/components/settings/HelpCenter";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string | number;
  badgeType?: "count" | "pro";
  children?: { name: string; key: string; badge?: string }[];
  key?: string;
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
      { name: "Overview", key: "overview" },
      { name: "Analytics", key: "analytics" },
      { name: "Sales", key: "sales" },
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
      { name: "All Products", key: "all-products" },
      { name: "Add Product", key: "add-product" },
      { name: "Categories", key: "categories" },
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
      { name: "All Orders", key: "all-orders" },
      { name: "Pending", key: "pending-orders" },
      { name: "Completed", key: "completed-orders" },
    ],
  },
  {
    name: "Customers",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    key: "customers",
  },
  {
    name: "Reports",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    children: [
      { name: "Sales Report", key: "sales-report" },
      { name: "Traffic Report", key: "traffic-report" },
      { name: "Revenue Report", key: "revenue-report" },
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
    key: "messages",
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
    key: "inbox",
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
    key: "invoice",
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
      { name: "Profile", key: "profile" },
      { name: "Account", key: "account" },
      { name: "Security", key: "security" },
    ],
  },
  {
    name: "Help Center",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    key: "help-center",
  },
];

// Component mapping
const componentMap: Record<string, React.ComponentType> = {
  // Dashboard
  "overview": Overview,
  "analytics": Analytics,
  "sales": Sales,
  // Products
  "all-products": AllProducts,
  "add-product": AddProduct,
  "categories": Categories,
  // Orders
  "all-orders": AllOrders,
  "pending-orders": PendingOrders,
  "completed-orders": CompletedOrders,
  // Customers
  "customers": Customers,
  // Reports
  "sales-report": SalesReport,
  "traffic-report": TrafficReport,
  "revenue-report": RevenueReport,
  // Support
  "messages": Messages,
  "inbox": Inbox,
  "invoice": Invoice,
  // Settings
  "profile": Profile,
  "account": Account,
  "security": Security,
  "help-center": HelpCenter,
};

// Breadcrumb mapping
const breadcrumbMap: Record<string, { parent: string; name: string }> = {
  "overview": { parent: "Dashboard", name: "Overview" },
  "analytics": { parent: "Dashboard", name: "Analytics" },
  "sales": { parent: "Dashboard", name: "Sales" },
  "all-products": { parent: "Products", name: "All Products" },
  "add-product": { parent: "Products", name: "Add Product" },
  "categories": { parent: "Products", name: "Categories" },
  "all-orders": { parent: "Orders", name: "All Orders" },
  "pending-orders": { parent: "Orders", name: "Pending" },
  "completed-orders": { parent: "Orders", name: "Completed" },
  "customers": { parent: "", name: "Customers" },
  "sales-report": { parent: "Reports", name: "Sales Report" },
  "traffic-report": { parent: "Reports", name: "Traffic Report" },
  "revenue-report": { parent: "Reports", name: "Revenue Report" },
  "messages": { parent: "Support", name: "Messages" },
  "inbox": { parent: "Support", name: "Inbox" },
  "invoice": { parent: "Support", name: "Invoice" },
  "profile": { parent: "Settings", name: "Profile" },
  "account": { parent: "Settings", name: "Account" },
  "security": { parent: "Settings", name: "Security" },
  "help-center": { parent: "", name: "Help Center" },
};

function NavItemComponent({ 
  item, 
  isOpen, 
  onToggle, 
  activeView,
  onViewChange 
}: { 
  item: NavItem; 
  isOpen: boolean; 
  onToggle: () => void;
  activeView: string;
  onViewChange: (key: string) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = hasChildren 
    ? item.children?.some(child => child.key === activeView) ?? false
    : item.key === activeView;

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            isOpen || isActive ? "bg-accent/10 text-accent" : "text-foreground/60 hover:text-foreground hover:bg-border/30"
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
        {isOpen && item.children && (
          <ul className="mt-1 ml-4 pl-4 border-l border-border/50 space-y-1">
            {item.children.map((child) => (
              <li key={child.key}>
                <button
                  onClick={() => onViewChange(child.key)}
                  className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-lg ${
                    activeView === child.key 
                      ? "text-accent font-medium bg-accent/5" 
                      : "text-foreground/50 hover:text-foreground hover:bg-border/20"
                  }`}
                >
                  {child.name}
                  {child.badge && (
                    <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                      {child.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => item.key && onViewChange(item.key)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-colors ${
          isActive ? "bg-accent/10 text-accent" : "text-foreground/60 hover:text-foreground hover:bg-border/30"
        }`}
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
      </button>
    </li>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ Dashboard: true });
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeView, setActiveView] = useState("overview");

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleViewChange = (key: string) => {
    setActiveView(key);
    // Close sidebar on mobile after selecting
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Get current component and breadcrumb
  const CurrentComponent = componentMap[activeView] || Overview;
  const breadcrumb = breadcrumbMap[activeView] || { parent: "Dashboard", name: "Overview" };

  return (
    <div className="min-h-screen grid-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0 lg:w-64"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between gap-2 px-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-background font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Merch Nest</span>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-border/30 transition-colors"
            >
              <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
                      activeView={activeView}
                      onViewChange={handleViewChange}
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
                      activeView={activeView}
                      onViewChange={handleViewChange}
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
                      activeView={activeView}
                      onViewChange={handleViewChange}
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
      <div className="transition-all duration-300 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
            {/* Left: Toggle & Breadcrumb */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-border/30 transition-colors lg:hidden"
              >
                <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <button 
                  onClick={() => setActiveView("overview")}
                  className="text-foreground/50 hover:text-foreground transition-colors hidden sm:block"
                >
                  Dashboard
                </button>
                {breadcrumb.parent && (
                  <>
                    <span className="text-foreground/30 hidden sm:block">/</span>
                    <span className="text-foreground/50 hidden md:block">{breadcrumb.parent}</span>
                    <span className="text-foreground/30 hidden md:block">/</span>
                  </>
                )}
                <span className="text-foreground font-medium">{breadcrumb.name}</span>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
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
                    <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-16 sm:top-12 sm:w-80 bg-card border border-border rounded-xl shadow-xl z-50 p-4">
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
                      <div className="mt-3 text-xs text-foreground/40 hidden sm:block">
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
                    <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-16 sm:top-12 sm:w-80 bg-card border border-border rounded-xl shadow-xl z-50">
                      <div className="p-3 sm:p-4 border-b border-border">
                        <h3 className="font-semibold text-sm sm:text-base">Notifications</h3>
                      </div>
                      <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                        {[
                          { title: "New order received", desc: "Order #4525 from John Doe", time: "2 min ago", unread: true },
                          { title: "Product low in stock", desc: "Logo Hoodie has only 5 left", time: "1 hour ago", unread: true },
                          { title: "Payment successful", desc: "$89.99 payment confirmed", time: "3 hours ago", unread: false },
                        ].map((notif, i) => (
                          <div
                            key={i}
                            className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border/50 hover:bg-border/20 cursor-pointer ${
                              notif.unread ? "bg-accent/5" : ""
                            }`}
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              {notif.unread && (
                                <span className="w-2 h-2 bg-accent rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                              )}
                              <div className={notif.unread ? "" : "ml-4 sm:ml-5"}>
                                <p className="text-xs sm:text-sm font-medium">{notif.title}</p>
                                <p className="text-xs text-foreground/50">{notif.desc}</p>
                                <p className="text-xs text-foreground/40 mt-0.5 sm:mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 sm:p-3">
                        <button className="w-full text-xs sm:text-sm text-accent hover:text-accent-hover text-center">
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
                  className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-border/30 transition-colors"
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
                    <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-16 sm:top-14 sm:w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-2">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="font-medium text-sm sm:text-base">Nihal</p>
                        <p className="text-xs sm:text-sm text-foreground/50">nihal@merchnest.com</p>
                      </div>
                      <div className="py-2">
                        <button 
                          onClick={() => { setUserDropdownOpen(false); handleViewChange("profile"); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground/70 hover:bg-border/30 hover:text-foreground text-left"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </button>
                        <button 
                          onClick={() => { setUserDropdownOpen(false); handleViewChange("account"); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground/70 hover:bg-border/30 hover:text-foreground text-left"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </button>
                        <button 
                          onClick={() => { setUserDropdownOpen(false); handleViewChange("help-center"); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground/70 hover:bg-border/30 hover:text-foreground text-left"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Help Center
                        </button>
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
        <main className="p-3 sm:p-6">
          <CurrentComponent />
        </main>
      </div>
    </div>
  );
}
