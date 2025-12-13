export default function Sales() {
  const salesData = [
    { month: "Jan", amount: 12500 },
    { month: "Feb", amount: 15800 },
    { month: "Mar", amount: 14200 },
    { month: "Apr", amount: 18900 },
    { month: "May", amount: 21500 },
    { month: "Jun", amount: 24563 },
  ];

  const maxAmount = Math.max(...salesData.map(d => d.amount));

  const topSellers = [
    { name: "Logo Hoodie", units: 234, revenue: "$21,060", growth: "+15%" },
    { name: "Tour T-Shirt", units: 189, revenue: "$6,610", growth: "+8%" },
    { name: "Limited Cap", units: 156, revenue: "$4,680", growth: "+23%" },
    { name: "Poster Bundle", units: 98, revenue: "$2,450", growth: "-5%" },
    { name: "Vinyl Record", units: 87, revenue: "$2,175", growth: "+12%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          <p className="text-foreground/50 mt-1">Monitor your sales performance and trends.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>
          <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Sales</div>
          <div className="text-3xl font-bold">$107,463</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+24.5%</span>
            <span className="text-sm text-foreground/40">vs last period</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Average Order Value</div>
          <div className="text-3xl font-bold">$86.24</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+8.2%</span>
            <span className="text-sm text-foreground/40">vs last period</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Orders</div>
          <div className="text-3xl font-bold">1,247</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+15.3%</span>
            <span className="text-sm text-foreground/40">vs last period</span>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6">Monthly Sales</h2>
        <div className="flex items-end gap-4 h-48">
          {salesData.map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-border rounded-t-lg relative" style={{ height: `${(data.amount / maxAmount) * 100}%` }}>
                <div 
                  className="absolute inset-0 bg-accent/80 rounded-t-lg hover:bg-accent transition-colors"
                  style={{ height: '100%' }}
                />
              </div>
              <span className="text-xs text-foreground/60">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-border">
          {salesData.map((data) => (
            <div key={data.month} className="text-center">
              <div className="text-sm font-medium">${(data.amount / 1000).toFixed(1)}k</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Top Selling Products</h2>
          <button className="text-sm text-accent hover:text-accent-hover transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-medium text-foreground/60 pb-3">Product</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Units Sold</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Revenue</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((product) => (
                <tr key={product.name} className="border-b border-border/50 last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">{product.units}</td>
                  <td className="py-4 text-right font-medium">{product.revenue}</td>
                  <td className="py-4 text-right">
                    <span className={`text-sm ${product.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {product.growth}
                    </span>
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

