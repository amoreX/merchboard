import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-background font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">merchboard</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/10 text-accent font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Overview
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/60 hover:text-foreground hover:bg-border/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Products
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/60 hover:text-foreground hover:bg-border/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/60 hover:text-foreground hover:bg-border/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Customers
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/60 hover:text-foreground hover:bg-border/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </nav>

        {/* Sign Out */}
        <div className="absolute bottom-6 left-6 right-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/60 hover:text-foreground hover:bg-border/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-foreground/60 mt-1">Here&apos;s what&apos;s happening with your merch today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
              <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="text-background font-semibold">N</span>
            </div>
          </div>
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
              <a href="#" className="text-sm text-accent hover:text-accent-hover transition-colors">View all</a>
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
                    <div className={`text-xs ${
                      order.status === "Delivered" ? "text-green-400" :
                      order.status === "Shipped" ? "text-blue-400" : "text-yellow-400"
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Top Products</h2>
              <a href="#" className="text-sm text-accent hover:text-accent-hover transition-colors">View all</a>
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
          </div>
        </div>
      </main>
    </div>
  );
}

