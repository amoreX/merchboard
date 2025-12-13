export default function Analytics() {
  const trafficData = [
    { source: "Google", visitors: "12,543", percentage: 45, color: "bg-accent" },
    { source: "Direct", visitors: "8,234", percentage: 30, color: "bg-blue-500" },
    { source: "Social Media", visitors: "4,123", percentage: 15, color: "bg-green-500" },
    { source: "Referral", visitors: "2,745", percentage: 10, color: "bg-purple-500" },
  ];

  const pageViews = [
    { page: "/products/hoodie", views: "8,234", avgTime: "2:45" },
    { page: "/products/tshirt", views: "6,123", avgTime: "1:58" },
    { page: "/checkout", views: "4,567", avgTime: "3:12" },
    { page: "/products/cap", views: "3,890", avgTime: "1:34" },
    { page: "/about", views: "2,345", avgTime: "0:45" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-foreground/50 mt-1">Track your website performance and user behavior.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Page Views</span>
          </div>
          <div className="text-2xl font-bold">127,543</div>
          <div className="text-sm text-green-400 mt-1">+18.2% from last month</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Unique Visitors</span>
          </div>
          <div className="text-2xl font-bold">27,645</div>
          <div className="text-sm text-green-400 mt-1">+12.5% from last month</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Avg. Session</span>
          </div>
          <div className="text-2xl font-bold">4m 32s</div>
          <div className="text-sm text-green-400 mt-1">+8.3% from last month</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-foreground/60 text-sm">Bounce Rate</span>
          </div>
          <div className="text-2xl font-bold">34.2%</div>
          <div className="text-sm text-red-400 mt-1">+2.1% from last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {trafficData.map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.source}</span>
                  <span className="text-sm text-foreground/60">{item.visitors} ({item.percentage}%)</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Top Pages</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-foreground/60 pb-3">Page</th>
                  <th className="text-right text-sm font-medium text-foreground/60 pb-3">Views</th>
                  <th className="text-right text-sm font-medium text-foreground/60 pb-3">Avg. Time</th>
                </tr>
              </thead>
              <tbody>
                {pageViews.map((page) => (
                  <tr key={page.page} className="border-b border-border/50 last:border-0">
                    <td className="py-3 text-sm font-mono text-accent">{page.page}</td>
                    <td className="py-3 text-sm text-right">{page.views}</td>
                    <td className="py-3 text-sm text-right text-foreground/60">{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

