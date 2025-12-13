export default function SalesReport() {
  const monthlyData = [
    { month: "Jan", revenue: 12500, orders: 145, avgOrder: 86.21 },
    { month: "Feb", revenue: 15800, orders: 178, avgOrder: 88.76 },
    { month: "Mar", revenue: 14200, orders: 162, avgOrder: 87.65 },
    { month: "Apr", revenue: 18900, orders: 215, avgOrder: 87.91 },
    { month: "May", revenue: 21500, orders: 248, avgOrder: 86.69 },
    { month: "Jun", revenue: 24563, orders: 287, avgOrder: 85.58 },
  ];

  const topProducts = [
    { name: "Logo Hoodie", units: 234, revenue: 21060 },
    { name: "Tour T-Shirt", units: 189, revenue: 6610 },
    { name: "Limited Cap", units: 156, revenue: 4680 },
    { name: "Poster Bundle", units: 98, revenue: 2450 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sales Report</h1>
          <p className="text-foreground/50 mt-1">Comprehensive sales analytics and insights.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Revenue</div>
          <div className="text-3xl font-bold">$107,463</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+24.5%</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Orders</div>
          <div className="text-3xl font-bold">1,235</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+18.2%</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Avg. Order Value</div>
          <div className="text-3xl font-bold">$87.01</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+5.3%</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Refund Rate</div>
          <div className="text-3xl font-bold">2.4%</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">-0.8%</span>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6">Monthly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-medium text-foreground/60 pb-3">Month</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Revenue</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Orders</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Avg. Order</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Growth</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, i) => {
                const prevRevenue = i > 0 ? monthlyData[i - 1].revenue : row.revenue;
                const growth = ((row.revenue - prevRevenue) / prevRevenue * 100).toFixed(1);
                return (
                  <tr key={row.month} className="border-b border-border/50 last:border-0">
                    <td className="py-4 font-medium">{row.month} 2024</td>
                    <td className="py-4 text-right">${row.revenue.toLocaleString()}</td>
                    <td className="py-4 text-right">{row.orders}</td>
                    <td className="py-4 text-right">${row.avgOrder.toFixed(2)}</td>
                    <td className="py-4 text-right">
                      <span className={`text-sm ${parseFloat(growth) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-border">
                <td className="py-4 font-bold">Total</td>
                <td className="py-4 text-right font-bold">${monthlyData.reduce((a, b) => a + b.revenue, 0).toLocaleString()}</td>
                <td className="py-4 text-right font-bold">{monthlyData.reduce((a, b) => a + b.orders, 0)}</td>
                <td className="py-4 text-right font-bold">${(monthlyData.reduce((a, b) => a + b.avgOrder, 0) / monthlyData.length).toFixed(2)}</td>
                <td className="py-4 text-right">-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6">Top Selling Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topProducts.map((product, i) => (
            <div key={product.name} className="p-4 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                  {i + 1}
                </div>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Units Sold</span>
                  <span>{product.units}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Revenue</span>
                  <span className="font-medium">${product.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

