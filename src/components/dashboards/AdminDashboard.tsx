"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAdminStore } from '@/store/adminStore';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  StatCard, 
  Badge, 
  Input, 
  Toggle, 
  Table, 
  EmptyState,
  Alert,
  ConfirmDialog,
  Select,
  Tabs,
} from '@/components/ui';
import { AdminUser, AdminProduct, AdminCampaign, Payout } from '@/types';
import {
  ADMIN_TABS,
  AdminTab,
  SYSTEM_SERVICES,
  REVENUE_CATEGORIES,
} from '@/constants';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const { initialize, notifications } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <span className="text-background font-bold text-lg">M</span>
          </div>
          {sidebarOpen && <span className="font-bold text-lg">Merch Nest</span>}
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-orange-500 truncate">Administrator</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-accent text-background'
                  : 'hover:bg-border/50 text-foreground/70'
              }`}
            >
              <span className="text-lg flex-shrink-0">{tab.icon}</span>
              {sidebarOpen && <span className="font-medium text-sm">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-border/50 transition-colors"
          >
            <svg className={`w-5 h-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-all"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card/50 border-b border-border px-6 py-4 sticky top-0 z-10 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{ADMIN_TABS.find(t => t.id === activeTab)?.label}</h1>
              <p className="text-foreground/60 text-sm">Admin Control Panel</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-border/50 rounded-lg transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadNotifications > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
              </button>
              <Badge variant="warning">Admin</Badge>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'campaigns' && <CampaignsTab />}
          {activeTab === 'messaging' && <MessagingTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'payments' && <PaymentsTab />}
          {activeTab === 'moderation' && <ModerationTab />}
          {activeTab === 'system' && <SystemTab />}
        </div>
      </main>
    </div>
  );
}

// ============================================
// Overview Tab
// ============================================
function OverviewTab() {
  const { platformStats, users, products, campaigns, reports } = useAdminStore();

  const pendingApprovals = products.filter(p => p.status === 'pending').length + campaigns.filter(c => c.status === 'pending').length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total GMV" value={`₹${(platformStats.totalGMV / 10000000).toFixed(1)}Cr`} change="+23.5%" icon="💰" />
        <StatCard label="Active Creators" value={platformStats.activeCreators.toLocaleString()} change="+156" icon="⭐" />
        <StatCard label="Active Brands" value={platformStats.activeBrands.toString()} change="+12" icon="🏢" />
        <StatCard label="Platform Revenue" value={`₹${(platformStats.platformRevenue / 100000).toFixed(0)}L`} change="+18.2%" icon="📈" />
      </div>

      {/* Alerts */}
      {(pendingApprovals > 0 || pendingReports > 0) && (
        <Alert type="warning" title="Action Required">
          {pendingApprovals > 0 && <span>{pendingApprovals} items pending approval. </span>}
          {pendingReports > 0 && <span>{pendingReports} reports need review.</span>}
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Approvals', value: pendingApprovals, icon: '📋', color: 'yellow' },
          { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, icon: '📢', color: 'green' },
          { label: 'Open Reports', value: pendingReports, icon: '🎫', color: 'blue' },
          { label: 'Suspended Users', value: users.filter(u => u.status === 'suspended').length, icon: '🚫', color: 'red' },
        ].map((item, i) => (
          <Card key={i} hover className="cursor-pointer">
            <span className="text-3xl mb-2 block">{item.icon}</span>
            <p className="text-3xl font-bold text-accent">{item.value}</p>
            <p className="text-sm text-foreground/60">{item.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Platform Growth</h3>
          <div className="h-48 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📊 Growth chart
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold mb-4">Revenue Breakdown</h3>
          <div className="h-48 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📈 Revenue chart
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================
// Users Tab
// ============================================
function UsersTab() {
  const { users, approveUser, suspendUser, activateUser } = useAdminStore();
  const [typeFilter, setTypeFilter] = useState<'all' | 'influencer' | 'brand'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [actionConfirm, setActionConfirm] = useState<{ id: string; action: 'suspend' | 'activate' | 'approve' } | null>(null);

  const filteredUsers = users.filter(user => {
    if (typeFilter !== 'all' && user.type !== typeFilter) return false;
    if (statusFilter !== 'all' && user.status !== statusFilter) return false;
    return true;
  });

  const handleAction = () => {
    if (!actionConfirm) return;
    const { id, action } = actionConfirm;
    if (action === 'suspend') suspendUser(id);
    else if (action === 'activate') activateUser(id);
    else if (action === 'approve') approveUser(id);
    setActionConfirm(null);
  };

  const columns = [
    {
      key: 'user',
      header: 'User',
      render: (u: AdminUser) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            u.type === 'influencer' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'
          }`}>
            {u.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-foreground/60">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (u: AdminUser) => (
        <Badge variant={u.type === 'influencer' ? 'info' : 'accent'}>{u.type}</Badge>
      ),
    },
    { key: 'niche', header: 'Niche' },
    { key: 'joinedAt', header: 'Joined', render: (u: AdminUser) => new Date(u.joinedAt).toLocaleDateString() },
    {
      key: 'status',
      header: 'Status',
      render: (u: AdminUser) => (
        <Badge variant={u.status === 'active' ? 'success' : u.status === 'pending' ? 'warning' : 'error'}>
          {u.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (u: AdminUser) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">View</Button>
          {u.status === 'active' && (
            <Button variant="danger" size="sm" onClick={() => setActionConfirm({ id: u.id, action: 'suspend' })}>
              Suspend
            </Button>
          )}
          {u.status === 'suspended' && (
            <Button variant="secondary" size="sm" onClick={() => setActionConfirm({ id: u.id, action: 'activate' })}>
              Activate
            </Button>
          )}
          {u.status === 'pending' && (
            <Button size="sm" onClick={() => setActionConfirm({ id: u.id, action: 'approve' })}>
              Approve
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={users.length.toString()} icon="👥" />
        <StatCard label="Influencers" value={users.filter(u => u.type === 'influencer').length.toString()} icon="⭐" />
        <StatCard label="Brands" value={users.filter(u => u.type === 'brand').length.toString()} icon="🏢" />
        <StatCard label="Suspended" value={users.filter(u => u.status === 'suspended').length.toString()} icon="🚫" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Tabs
          tabs={[
            { id: 'all', label: 'All' },
            { id: 'influencer', label: 'Influencers' },
            { id: 'brand', label: 'Brands' },
          ]}
          activeTab={typeFilter}
          onChange={(id) => setTypeFilter(id as typeof typeFilter)}
          variant="pills"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Pending' },
            { value: 'suspended', label: 'Suspended' },
          ]}
          className="w-40"
        />
      </div>

      <Table columns={columns} data={filteredUsers} keyExtractor={(u) => u.id} />

      <ConfirmDialog
        isOpen={!!actionConfirm}
        onClose={() => setActionConfirm(null)}
        onConfirm={handleAction}
        title={actionConfirm?.action === 'suspend' ? 'Suspend User?' : actionConfirm?.action === 'activate' ? 'Activate User?' : 'Approve User?'}
        description="This action will change the user's status."
        variant={actionConfirm?.action === 'suspend' ? 'danger' : 'default'}
        confirmText={actionConfirm?.action === 'suspend' ? 'Suspend' : actionConfirm?.action === 'activate' ? 'Activate' : 'Approve'}
      />
    </div>
  );
}

// ============================================
// Products Tab
// ============================================
function ProductsTab() {
  const { products, approveProduct, rejectProduct, removeProduct } = useAdminStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [actionConfirm, setActionConfirm] = useState<{ id: string; action: 'approve' | 'reject' | 'remove' } | null>(null);

  const filteredProducts = products.filter(p => filter === 'all' || p.status === filter);

  const handleAction = () => {
    if (!actionConfirm) return;
    const { id, action } = actionConfirm;
    if (action === 'approve') approveProduct(id);
    else if (action === 'reject') rejectProduct(id);
    else if (action === 'remove') removeProduct(id);
    setActionConfirm(null);
  };

  const columns = [
    { key: 'name', header: 'Product' },
    { key: 'brand', header: 'Brand' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', render: (p: AdminProduct) => `₹${p.price}` },
    { key: 'commission', header: 'Commission', render: (p: AdminProduct) => <span className="text-accent">{p.commission}%</span> },
    {
      key: 'reports',
      header: 'Reports',
      render: (p: AdminProduct) => p.reports > 0 ? <span className="text-red-500">{p.reports}</span> : <span className="text-foreground/40">0</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (p: AdminProduct) => (
        <Badge variant={p.status === 'approved' ? 'success' : p.status === 'pending' ? 'warning' : 'error'}>
          {p.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p: AdminProduct) => (
        <div className="flex items-center gap-2">
          {p.status === 'pending' && (
            <>
              <Button size="sm" onClick={() => setActionConfirm({ id: p.id, action: 'approve' })}>Approve</Button>
              <Button variant="danger" size="sm" onClick={() => setActionConfirm({ id: p.id, action: 'reject' })}>Reject</Button>
            </>
          )}
          {p.status === 'approved' && (
            <Button variant="danger" size="sm" onClick={() => setActionConfirm({ id: p.id, action: 'remove' })}>Remove</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={products.length.toString()} icon="📦" />
        <StatCard label="Pending" value={products.filter(p => p.status === 'pending').length.toString()} icon="⏳" />
        <StatCard label="Approved" value={products.filter(p => p.status === 'approved').length.toString()} icon="✅" />
        <StatCard label="Reported" value={products.filter(p => p.reports > 0).length.toString()} icon="🚩" />
      </div>

      <Tabs
        tabs={[
          { id: 'all', label: 'All' },
          { id: 'pending', label: 'Pending' },
          { id: 'approved', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
        ]}
        activeTab={filter}
        onChange={(id) => setFilter(id as typeof filter)}
        variant="pills"
      />

      <Table columns={columns} data={filteredProducts} keyExtractor={(p) => p.id} />

      <ConfirmDialog
        isOpen={!!actionConfirm}
        onClose={() => setActionConfirm(null)}
        onConfirm={handleAction}
        title={actionConfirm?.action === 'approve' ? 'Approve Product?' : actionConfirm?.action === 'reject' ? 'Reject Product?' : 'Remove Product?'}
        variant={actionConfirm?.action !== 'approve' ? 'danger' : 'default'}
        confirmText={actionConfirm?.action === 'approve' ? 'Approve' : actionConfirm?.action === 'reject' ? 'Reject' : 'Remove'}
      />
    </div>
  );
}

// ============================================
// Campaigns Tab
// ============================================
function CampaignsTab() {
  const { campaigns, approveCampaign, rejectCampaign } = useAdminStore();
  const [actionConfirm, setActionConfirm] = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);

  const handleAction = () => {
    if (!actionConfirm) return;
    const { id, action } = actionConfirm;
    if (action === 'approve') approveCampaign(id);
    else rejectCampaign(id);
    setActionConfirm(null);
  };

  const columns = [
    { key: 'name', header: 'Campaign' },
    { key: 'brand', header: 'Brand' },
    { key: 'budget', header: 'Budget', render: (c: AdminCampaign) => `₹${c.budget.toLocaleString()}` },
    { key: 'influencerCount', header: 'Influencers' },
    {
      key: 'status',
      header: 'Status',
      render: (c: AdminCampaign) => (
        <Badge variant={c.status === 'active' || c.status === 'approved' ? 'success' : c.status === 'pending' ? 'warning' : 'error'}>
          {c.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c: AdminCampaign) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">View</Button>
          {c.status === 'pending' && (
            <>
              <Button size="sm" onClick={() => setActionConfirm({ id: c.id, action: 'approve' })}>Approve</Button>
              <Button variant="danger" size="sm" onClick={() => setActionConfirm({ id: c.id, action: 'reject' })}>Reject</Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Campaigns" value={campaigns.length.toString()} icon="📢" />
        <StatCard label="Active" value={campaigns.filter(c => c.status === 'active').length.toString()} icon="▶️" />
        <StatCard label="Pending" value={campaigns.filter(c => c.status === 'pending').length.toString()} icon="⏳" />
        <StatCard label="Total Budget" value={`₹${campaigns.reduce((s, c) => s + c.budget, 0).toLocaleString()}`} icon="💰" />
      </div>

      <Table columns={columns} data={campaigns} keyExtractor={(c) => c.id} />

      <ConfirmDialog
        isOpen={!!actionConfirm}
        onClose={() => setActionConfirm(null)}
        onConfirm={handleAction}
        title={actionConfirm?.action === 'approve' ? 'Approve Campaign?' : 'Reject Campaign?'}
        variant={actionConfirm?.action === 'reject' ? 'danger' : 'default'}
        confirmText={actionConfirm?.action === 'approve' ? 'Approve' : 'Reject'}
      />
    </div>
  );
}

// ============================================
// Messaging Tab
// ============================================
function MessagingTab() {
  const { platformStats, messageRules, updateMessageRules } = useAdminStore();
  const [editingRules, setEditingRules] = useState(false);
  const [rules, setRules] = useState(messageRules[0] || { maxPerHour: 50, maxPerDay: 500, cooldownMinutes: 5 });

  const handleSaveRules = () => {
    updateMessageRules(rules);
    setEditingRules(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Messages Today" value={platformStats.messagesDelivered.toLocaleString()} icon="📤" />
        <StatCard label="Delivery Rate" value={`${platformStats.messageDeliveryRate}%`} icon="✅" />
        <StatCard label="Queue Size" value="1,234" icon="📋" />
        <StatCard label="Failed" value="12" icon="❌" />
      </div>

      {/* Message Rules */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Message Rules & Limits</h3>
          <Button variant="outline" size="sm" onClick={() => setEditingRules(!editingRules)}>
            {editingRules ? 'Cancel' : 'Edit'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Max Messages per Hour (per user)"
            type="number"
            value={rules.maxPerHour}
            onChange={(e) => setRules({ ...rules, maxPerHour: Number(e.target.value) })}
            disabled={!editingRules}
          />
          <Input
            label="Max Messages per Day (per user)"
            type="number"
            value={rules.maxPerDay}
            onChange={(e) => setRules({ ...rules, maxPerDay: Number(e.target.value) })}
            disabled={!editingRules}
          />
          <Input
            label="Cool-down Period (minutes)"
            type="number"
            value={rules.cooldownMinutes}
            onChange={(e) => setRules({ ...rules, cooldownMinutes: Number(e.target.value) })}
            disabled={!editingRules}
          />
        </div>
        {editingRules && (
          <Button onClick={handleSaveRules} className="mt-4">Save Rules</Button>
        )}
      </Card>

      {/* Compliance */}
      <Card>
        <h3 className="font-semibold mb-4">Platform Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert type="success" title="Rate Limiting Active">
            Messages are throttled to comply with platform limits
          </Alert>
          <Alert type="success" title="Content Filtering">
            Spam and prohibited content is blocked
          </Alert>
        </div>
      </Card>
    </div>
  );
}

// ============================================
// Analytics Tab
// ============================================
function AnalyticsTab() {
  const { platformStats } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total GMV" value={`₹${(platformStats.totalGMV / 10000000).toFixed(1)}Cr`} change="+23.5%" icon="💰" />
        <StatCard label="Active Creators" value={platformStats.activeCreators.toLocaleString()} change="+12%" icon="⭐" />
        <StatCard label="Active Brands" value={platformStats.activeBrands.toString()} change="+8%" icon="🏢" />
        <StatCard label="Platform Revenue" value={`₹${(platformStats.platformRevenue / 100000).toFixed(0)}L`} change="+18%" icon="📈" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">GMV Over Time</h3>
          <div className="h-64 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📊 Chart visualization
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📈 Chart visualization
          </div>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <h3 className="font-semibold mb-4">Revenue by Category</h3>
        <Table
            columns={[
              { key: 'category', header: 'Category' },
              { key: 'gmv', header: 'GMV' },
              { key: 'rate', header: 'Commission Rate' },
              { key: 'revenue', header: 'Revenue', render: (r) => <span className="text-accent font-medium">{r.revenue}</span> },
            ]}
            data={REVENUE_CATEGORIES}
          keyExtractor={(r) => r.category}
        />
      </Card>
    </div>
  );
}

// ============================================
// Payments Tab
// ============================================
function PaymentsTab() {
  const { platformStats, pendingPayouts, processPayout } = useAdminStore();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleProcess = (id: string) => {
    setProcessingId(id);
    processPayout(id);
    setTimeout(() => setProcessingId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Payouts" value={`₹${(platformStats.totalPayouts / 100000).toFixed(0)}L`} icon="💸" />
        <StatCard label="Pending Payouts" value={`₹${(platformStats.pendingPayouts / 100000).toFixed(1)}L`} icon="⏳" />
        <StatCard label="Platform Revenue" value={`₹${(platformStats.platformRevenue / 100000).toFixed(0)}L`} icon="💰" />
        <StatCard label="Commission Rate" value="2.5%" icon="📊" />
      </div>

      {/* Pending Payouts */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Pending Creator Payouts</h3>
          <Button size="sm">Process All</Button>
        </div>
        {pendingPayouts.length > 0 ? (
          <div className="space-y-3">
            {pendingPayouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {payout.bankDetails?.accountHolderName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-medium">{payout.bankDetails?.accountHolderName || 'User'}</p>
                    <p className="text-sm text-foreground/60">
                      {payout.method === 'bank' ? `${payout.bankDetails?.bankName} ${payout.bankDetails?.accountNumber}` : payout.upiId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">₹{payout.amount.toLocaleString()}</span>
                  <Button 
                    size="sm" 
                    onClick={() => handleProcess(payout.id)}
                    loading={processingId === payout.id}
                    disabled={payout.status !== 'pending'}
                  >
                    {payout.status === 'processing' ? 'Processing...' : 'Process'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="✅" title="No pending payouts" description="All payouts have been processed" />
        )}
      </Card>

      {/* Fraud Detection */}
      <Alert type="warning" title="🚨 Fraud Detection">
        <p>Suspicious activity monitoring is active. 2 alerts in the last 24 hours.</p>
      </Alert>
    </div>
  );
}

// ============================================
// Moderation Tab
// ============================================
function ModerationTab() {
  const { reports, investigateReport, resolveReport, dismissReport } = useAdminStore();
  const [actionConfirm, setActionConfirm] = useState<{ id: string; action: 'investigate' | 'resolve' | 'dismiss' } | null>(null);

  const handleAction = () => {
    if (!actionConfirm) return;
    const { id, action } = actionConfirm;
    if (action === 'investigate') investigateReport(id);
    else if (action === 'resolve') resolveReport(id);
    else dismissReport(id);
    setActionConfirm(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Reports" value={reports.length.toString()} icon="🚩" />
        <StatCard label="Pending" value={reports.filter(r => r.status === 'pending').length.toString()} icon="📋" />
        <StatCard label="Investigating" value={reports.filter(r => r.status === 'investigating').length.toString()} icon="🔍" />
        <StatCard label="Resolved" value={reports.filter(r => r.status === 'resolved').length.toString()} icon="✅" />
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Reported Content</h3>
        {reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <Badge variant={report.type === 'product' ? 'info' : report.type === 'user' ? 'warning' : 'accent'}>
                    {report.type}
                  </Badge>
                  <div>
                    <p className="font-medium">{report.targetName}</p>
                    <p className="text-sm text-foreground/60">{report.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={report.status === 'pending' ? 'warning' : report.status === 'investigating' ? 'info' : 'success'}>
                    {report.status}
                  </Badge>
                  {report.status === 'pending' && (
                    <Button size="sm" onClick={() => setActionConfirm({ id: report.id, action: 'investigate' })}>
                      Investigate
                    </Button>
                  )}
                  {report.status === 'investigating' && (
                    <>
                      <Button size="sm" onClick={() => setActionConfirm({ id: report.id, action: 'resolve' })}>
                        Resolve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setActionConfirm({ id: report.id, action: 'dismiss' })}>
                        Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="🎉" title="No reports" description="Everything looks clean!" />
        )}
      </Card>

      <ConfirmDialog
        isOpen={!!actionConfirm}
        onClose={() => setActionConfirm(null)}
        onConfirm={handleAction}
        title={`${actionConfirm?.action === 'investigate' ? 'Start Investigation' : actionConfirm?.action === 'resolve' ? 'Resolve Report' : 'Dismiss Report'}?`}
        confirmText={actionConfirm?.action === 'investigate' ? 'Investigate' : actionConfirm?.action === 'resolve' ? 'Resolve' : 'Dismiss'}
      />
    </div>
  );
}

// ============================================
// System Tab
// ============================================
function SystemTab() {
  const { featureToggles, toggleFeature } = useAdminStore();

  return (
    <div className="space-y-6">
      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="API Uptime" value="99.9%" icon="🟢" />
        <StatCard label="Response Time" value="45ms" icon="⚡" />
        <StatCard label="Error Rate" value="0.1%" icon="✅" />
        <StatCard label="Active Sessions" value="2,345" icon="👥" />
      </div>

      {/* Feature Toggles */}
      <Card>
        <h3 className="font-semibold mb-4">Feature Toggles</h3>
        <div className="space-y-3">
          {featureToggles.map((toggle) => (
            <div key={toggle.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
              <div>
                <p className="font-medium">{toggle.name}</p>
                <p className="text-sm text-foreground/60">{toggle.description}</p>
              </div>
              <Toggle checked={toggle.enabled} onChange={() => toggleFeature(toggle.id)} />
            </div>
          ))}
        </div>
      </Card>

      {/* Service Status */}
      <Card>
        <h3 className="font-semibold mb-4">Service Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SYSTEM_SERVICES.map((service, i) => (
            <div key={i} className="p-4 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{service.icon}</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-green-500">{service.status}</span>
              </div>
              <p className="text-sm text-foreground/60">{service.processed}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Logs */}
      <Card>
        <h3 className="font-semibold mb-4">Recent Logs</h3>
        <div className="space-y-2 font-mono text-sm max-h-64 overflow-auto">
          {[
            { time: '14:32:15', level: 'INFO', msg: 'Campaign approved: Summer Beauty' },
            { time: '14:32:10', level: 'INFO', msg: 'User registered: new_influencer@mail.com' },
            { time: '14:31:55', level: 'WARN', msg: 'Rate limit hit for user_123' },
            { time: '14:31:40', level: 'INFO', msg: 'Payout processed: ₹15,000' },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-4 p-2 rounded hover:bg-border/30">
              <span className="text-foreground/50">{log.time}</span>
              <Badge variant={log.level === 'WARN' ? 'warning' : 'info'} size="sm">{log.level}</Badge>
              <span>{log.msg}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
