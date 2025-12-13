export default function RevenueReport() {
  const revenueByCategory = [
    { category: "Apparel", revenue: 45230, percentage: 42, orders: 523 },
    { category: "Accessories", revenue: 23450, percentage: 22, orders: 345 },
    { category: "Collectibles", revenue: 18900, percentage: 18, orders: 234 },
    { category: "Music", revenue: 12340, percentage: 11, orders: 156 },
    { category: "Other", revenue: 7543, percentage: 7, orders: 89 },
  ];

  const paymentMethods = [
    { method: "Credit Card", amount: 67890, percentage: 63 },
    { method: "PayPal", amount: 23450, percentage: 22 },
    { method: "Apple Pay", amount: 10780, percentage: 10 },
    { method: "Other", amount: 5343, percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Revenue Report</h1>
          <p className="text-foreground/50 mt-1">Detailed breakdown of your revenue streams.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last Quarter</option>
            <option>This Year</option>
          </select>
          <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Gross Revenue</div>
          <div className="text-3xl font-bold">$107,463</div>
          <div className="text-sm text-green-400 mt-1">+24.5% MoM</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Net Revenue</div>
          <div className="text-3xl font-bold">$98,234</div>
          <div className="text-sm text-green-400 mt-1">+22.1% MoM</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Refunds</div>
          <div className="text-3xl font-bold text-red-400">$2,345</div>
          <div className="text-sm text-foreground/40 mt-1">2.2% of gross</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Fees & Taxes</div>
          <div className="text-3xl font-bold">$6,884</div>
          <div className="text-sm text-foreground/40 mt-1">6.4% of gross</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Revenue by Category</h2>
          <div className="space-y-4">
            {revenueByCategory.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-xs text-foreground/50">({item.orders} orders)</span>
                  </div>
                  <span className="font-medium">${item.revenue.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-right text-xs text-foreground/50 mt-1">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Payment Methods</h2>
          <div className="space-y-4">
            {paymentMethods.map((item) => (
              <div key={item.method} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    {item.method === 'Credit Card' && (
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    )}
                    {item.method === 'PayPal' && (
                      <span className="text-accent font-bold">P</span>
                    )}
                    {item.method === 'Apple Pay' && (
                      <span className="text-accent font-bold"></span>
                    )}
                    {item.method === 'Other' && (
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{item.method}</div>
                    <div className="text-sm text-foreground/50">{item.percentage}% of total</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">${item.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Comparison */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6">Revenue Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-background rounded-xl">
            <div className="text-foreground/60 text-sm mb-2">This Week</div>
            <div className="text-2xl font-bold">$24,563</div>
            <div className="text-sm text-green-400">+12.5%</div>
          </div>
          <div className="text-center p-4 bg-background rounded-xl">
            <div className="text-foreground/60 text-sm mb-2">Last Week</div>
            <div className="text-2xl font-bold">$21,834</div>
            <div className="text-sm text-foreground/40">baseline</div>
          </div>
          <div className="text-center p-4 bg-background rounded-xl">
            <div className="text-foreground/60 text-sm mb-2">This Month</div>
            <div className="text-2xl font-bold">$87,234</div>
            <div className="text-sm text-green-400">+18.2%</div>
          </div>
          <div className="text-center p-4 bg-background rounded-xl">
            <div className="text-foreground/60 text-sm mb-2">Last Month</div>
            <div className="text-2xl font-bold">$73,821</div>
            <div className="text-sm text-foreground/40">baseline</div>
          </div>
        </div>
      </div>
    </div>
  );
}

