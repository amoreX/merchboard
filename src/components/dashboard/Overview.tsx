export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-foreground/50 mt-1">Welcome back! Here&apos;s what&apos;s happening with your merch today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </div>
    </div>
  );
}

