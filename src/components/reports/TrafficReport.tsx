export default function TrafficReport() {
  const trafficSources = [
    { source: "Google Search", visitors: 45234, sessions: 52341, bounceRate: 32.4, color: "bg-blue-500" },
    { source: "Direct", visitors: 28456, sessions: 31234, bounceRate: 28.1, color: "bg-green-500" },
    { source: "Social Media", visitors: 18923, sessions: 21456, bounceRate: 45.2, color: "bg-purple-500" },
    { source: "Referral", visitors: 12456, sessions: 14567, bounceRate: 38.7, color: "bg-accent" },
    { source: "Email", visitors: 8234, sessions: 9876, bounceRate: 22.3, color: "bg-yellow-500" },
  ];

  const topPages = [
    { page: "/", views: 45234, uniqueViews: 38456, avgTime: "2:45", bounceRate: 28.4 },
    { page: "/products", views: 32456, uniqueViews: 28123, avgTime: "3:12", bounceRate: 32.1 },
    { page: "/products/hoodie", views: 18923, uniqueViews: 16234, avgTime: "4:05", bounceRate: 18.5 },
    { page: "/checkout", views: 12456, uniqueViews: 11234, avgTime: "5:23", bounceRate: 15.2 },
    { page: "/about", views: 8234, uniqueViews: 7123, avgTime: "1:45", bounceRate: 52.3 },
  ];

  const deviceData = [
    { device: "Desktop", percentage: 52, sessions: 58234 },
    { device: "Mobile", percentage: 38, sessions: 42567 },
    { device: "Tablet", percentage: 10, sessions: 11234 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Traffic Report</h1>
          <p className="text-foreground/50 mt-1">Understand how visitors find and use your store.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Visitors</div>
          <div className="text-3xl font-bold">127,543</div>
          <div className="text-sm text-green-400 mt-1">+18.2% from last period</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Page Views</div>
          <div className="text-3xl font-bold">342,891</div>
          <div className="text-sm text-green-400 mt-1">+22.5% from last period</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Avg. Session Duration</div>
          <div className="text-3xl font-bold">3:24</div>
          <div className="text-sm text-green-400 mt-1">+8.3% from last period</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Bounce Rate</div>
          <div className="text-3xl font-bold">34.2%</div>
          <div className="text-sm text-red-400 mt-1">+2.1% from last period</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${source.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm text-foreground/60">{source.visitors.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${source.color} rounded-full`} 
                      style={{ width: `${(source.visitors / trafficSources[0].visitors) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Device Breakdown</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" className="text-border" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" 
                  className="text-accent" 
                  strokeDasharray={`${52 * 2.51} ${100 * 2.51}`}
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" 
                  className="text-blue-500" 
                  strokeDasharray={`${38 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={`${-52 * 2.51}`}
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" 
                  className="text-green-500" 
                  strokeDasharray={`${10 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={`${-90 * 2.51}`}
                />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            {deviceData.map((device) => (
              <div key={device.device} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    device.device === 'Desktop' ? 'bg-accent' : 
                    device.device === 'Mobile' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <span className="font-medium">{device.device}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{device.percentage}%</div>
                  <div className="text-xs text-foreground/50">{device.sessions.toLocaleString()} sessions</div>
                </div>
              </div>
            ))}
          </div>
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
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Unique Views</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Avg. Time</th>
                <th className="text-right text-sm font-medium text-foreground/60 pb-3">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page) => (
                <tr key={page.page} className="border-b border-border/50 last:border-0">
                  <td className="py-4 font-mono text-accent">{page.page}</td>
                  <td className="py-4 text-right">{page.views.toLocaleString()}</td>
                  <td className="py-4 text-right">{page.uniqueViews.toLocaleString()}</td>
                  <td className="py-4 text-right">{page.avgTime}</td>
                  <td className="py-4 text-right">
                    <span className={page.bounceRate > 40 ? 'text-red-400' : 'text-green-400'}>
                      {page.bounceRate}%
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

