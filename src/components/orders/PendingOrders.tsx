const pendingOrders = [
  { id: "#4516", customer: "Lisa Park", email: "lisa@example.com", product: "Logo Hoodie", amount: "$89.99", date: "Dec 11, 2024", time: "3 days ago" },
  { id: "#4515", customer: "David Kim", email: "david@example.com", product: "Vinyl Record", amount: "$24.99", date: "Dec 10, 2024", time: "4 days ago" },
  { id: "#4514", customer: "Anna White", email: "anna@example.com", product: "Tour T-Shirt x2", amount: "$69.98", date: "Dec 10, 2024", time: "4 days ago" },
  { id: "#4513", customer: "Chris Lee", email: "chris@example.com", product: "Cap Bundle", amount: "$49.99", date: "Dec 9, 2024", time: "5 days ago" },
];

export default function PendingOrders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pending Orders</h1>
          <p className="text-foreground/50 mt-1">Orders awaiting confirmation and processing.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-border/30 transition-colors">
            Bulk Process
          </button>
          <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
            Process All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Total Pending</div>
          <div className="text-3xl font-bold text-yellow-400">{pendingOrders.length}</div>
          <div className="text-sm text-foreground/40 mt-1">orders</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Pending Value</div>
          <div className="text-3xl font-bold">$234.95</div>
          <div className="text-sm text-foreground/40 mt-1">total amount</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-foreground/60 text-sm mb-2">Avg. Wait Time</div>
          <div className="text-3xl font-bold">4.2</div>
          <div className="text-sm text-foreground/40 mt-1">days</div>
        </div>
      </div>

      {/* Pending Orders List */}
      <div className="space-y-4">
        {pendingOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-accent">{order.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-400/10 text-yellow-400">Pending</span>
                  </div>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-sm text-foreground/50">{order.email}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{order.amount}</div>
                <div className="text-sm text-foreground/50">{order.time}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="text-sm text-foreground/60">
                <span className="text-foreground">{order.product}</span> · Ordered on {order.date}
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-border/30 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 rounded-lg bg-accent text-background text-sm font-medium hover:bg-accent-hover transition-colors">
                  Process Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingOrders.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-400/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
          <p className="text-foreground/50">No pending orders at the moment.</p>
        </div>
      )}
    </div>
  );
}

