"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useInfluencerStore } from '@/store/influencerStore';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  StatCard, 
  Badge, 
  Input, 
  Textarea, 
  Toggle, 
  Modal, 
  Table, 
  EmptyState,
  Alert,
  ConfirmDialog,
  Select,
  Sidebar,
  DashboardHeader,
  NotificationBell,
  PageContainer,
} from '@/components/ui';
import { InfluencerProduct, InfluencerCampaign } from '@/types';
import { 
  INFLUENCER_TABS, 
  InfluencerTab,
  CATEGORY_OPTIONS,
  HELP_CENTER_ITEMS,
  SUPPORT_CATEGORIES,
  ONBOARDING_TIPS,
  DEFAULT_AUTO_DM_TEMPLATE,
} from '@/constants';

export default function InfluencerDashboard() {
  const [activeTab, setActiveTab] = useState<InfluencerTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const { initializeProfile, notifications } = useInfluencerStore();
  const router = useRouter();

  // Initialize store with user data
  useEffect(() => {
    if (user) {
      initializeProfile(user.email, user.name, user.email);
    }
  }, [user, initializeProfile]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        tabs={INFLUENCER_TABS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as InfluencerTab)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user || undefined}
        userRole="Influencer"
        roleColor="accent"
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <DashboardHeader
          title={INFLUENCER_TABS.find(t => t.id === activeTab)?.label || 'Dashboard'}
          subtitle={`Welcome back, ${user?.name}!`}
        >
          <NotificationBell count={unreadNotifications} />
        </DashboardHeader>

        <PageContainer>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'campaigns' && <CampaignsTab />}
          {activeTab === 'messaging' && <MessagingTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'payments' && <PaymentsTab />}
          {activeTab === 'support' && <SupportTab />}
        </PageContainer>
      </main>
    </div>
  );
}

// ============================================
// Overview Tab
// ============================================
function OverviewTab() {
  const { totalEarnings, products, campaigns, autoMessages, notifications } = useInfluencerStore();
  
  const totalClicks = products.reduce((sum, p) => sum + p.clicks, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const activeProducts = products.filter(p => p.status === 'active').length;

  const stats = [
    { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, change: '+12.5%', positive: true, icon: '💰' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), change: '+8.3%', positive: true, icon: '👆' },
    { label: 'Conversions', value: totalSales.toLocaleString(), change: '+15.2%', positive: true, icon: '🎯' },
    { label: 'Active Products', value: activeProducts.toString(), change: `+${products.length - activeProducts}`, positive: true, icon: '🛍️' },
  ];

  const recentNotifications = notifications.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover className="cursor-pointer group">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🔗</span>
            <span className="font-semibold group-hover:text-accent transition-colors">Share Product Link</span>
          </div>
          <p className="text-sm text-foreground/60">Generate affiliate links for your content</p>
        </Card>
        <Card hover className="cursor-pointer group">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📢</span>
            <span className="font-semibold group-hover:text-accent transition-colors">View Campaigns</span>
          </div>
          <p className="text-sm text-foreground/60">{campaigns.filter(c => c.status === 'available').length} new campaign opportunities</p>
        </Card>
        <Card hover className="cursor-pointer group">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💬</span>
            <span className="font-semibold group-hover:text-accent transition-colors">Auto-Messages</span>
          </div>
          <p className="text-sm text-foreground/60">{autoMessages.reduce((sum, m) => sum + m.deliveries, 0).toLocaleString()} messages sent</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        {recentNotifications.length > 0 ? (
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    notification.type === 'sale' ? 'bg-green-500/10 text-green-500' :
                    notification.type === 'campaign' ? 'bg-blue-500/10 text-blue-500' :
                    notification.type === 'payout' ? 'bg-accent/10 text-accent' :
                    'bg-purple-500/10 text-purple-500'
                  }`}>
                    {notification.type === 'sale' ? '💵' : notification.type === 'campaign' ? '📢' : notification.type === 'payout' ? '💰' : '👆'}
                  </div>
                  <div>
                    <span className="text-sm font-medium">{notification.title}</span>
                    <p className="text-xs text-foreground/50">{notification.description}</p>
                  </div>
                </div>
                {!notification.read && <span className="w-2 h-2 bg-accent rounded-full" />}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="📭" title="No recent activity" description="Your recent activities will appear here" />
        )}
      </Card>
    </div>
  );
}

// ============================================
// Profile Tab
// ============================================
function ProfileTab() {
  const { user } = useAuthStore();
  const { profile, updateProfile, connectSocial, disconnectSocial } = useInfluencerStore();
  const [copied, setCopied] = useState(false);
  
  const copyStoreUrl = () => {
    navigator.clipboard.writeText(profile?.storeUrl || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = profile?.socials || [];
  
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-24 h-24 rounded-xl bg-accent/20 flex items-center justify-center text-accent text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-foreground/60 mb-4">{user?.email}</p>
            <div className="flex items-center gap-4 flex-wrap">
              {profile?.niche.map((n, i) => (
                <Badge key={i} variant="accent">{n}</Badge>
              ))}
              {profile?.verified && <Badge variant="success">Verified Creator</Badge>}
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </Card>

      {/* Store Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>🏪</span> Personal Store
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground/60 mb-1">Store URL</label>
              <div className="flex items-center gap-2">
                <Input 
                  value={profile?.storeUrl || ''} 
                  readOnly 
                  className="text-sm"
                />
                <Button onClick={copyStoreUrl} size="sm">
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-foreground/60 mb-1">Store Status</label>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${profile?.storeActive ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm">{profile?.storeActive ? 'Live & Active' : 'Inactive'}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">Preview Store</Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>📱</span> Connected Socials
          </h3>
          <div className="space-y-3">
            {(['instagram', 'youtube', 'tiktok'] as const).map((platform) => {
              const social = socials.find(s => s.platform === platform);
              return (
                <div key={platform} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{platform === 'instagram' ? '📸' : platform === 'youtube' ? '📺' : '🎵'}</span>
                    <div>
                      <p className="font-medium capitalize">{platform}</p>
                      <p className="text-xs text-foreground/60">{social?.connected ? social.handle : 'Not connected'}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={social?.connected ? 'secondary' : 'primary'}
                    onClick={() => {
                      if (social?.connected) {
                        disconnectSocial(platform);
                      } else {
                        connectSocial({ platform, handle: `@${user?.name?.toLowerCase().replace(' ', '')}`, followers: 0, connected: true });
                      }
                    }}
                  >
                    {social?.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span>🏷️</span> Product Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile?.niche.map((cat, i) => (
            <Badge key={i} variant="accent" size="md">{cat}</Badge>
          ))}
          <button 
            onClick={() => {
              const newNiche = prompt('Enter new category:');
              if (newNiche && profile) {
                updateProfile({ niche: [...profile.niche, newNiche] });
              }
            }}
            className="px-3 py-1.5 border border-dashed border-border rounded-lg text-sm text-foreground/60 hover:border-accent hover:text-accent transition-colors"
          >
            + Add Category
          </button>
        </div>
      </Card>
    </div>
  );
}

// ============================================
// Products Tab
// ============================================
function ProductsTab() {
  const { products, addProduct, updateProduct, hideProduct, removeProduct } = useInfluencerStore();
  const [filter, setFilter] = useState<'all' | 'curated' | 'campaign' | 'own'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: 'Fashion',
    commission: 10,
    price: 0,
    productUrl: '',
    type: 'own' as const,
  });

  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  const handleAddProduct = () => {
    addProduct({
      ...newProduct,
      status: 'pending',
    });
    setShowAddModal(false);
    setNewProduct({ name: '', brand: '', category: 'Fashion', commission: 10, price: 0, productUrl: '', type: 'own' });
  };

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (product: InfluencerProduct) => (
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-foreground/60">{product.brand}</p>
        </div>
      ),
    },
    {
      key: 'commission',
      header: 'Commission',
      render: (product: InfluencerProduct) => <span className="text-accent font-medium">{product.commission}%</span>,
    },
    { key: 'clicks', header: 'Clicks', render: (p: InfluencerProduct) => p.clicks.toLocaleString() },
    { key: 'sales', header: 'Sales', render: (p: InfluencerProduct) => p.sales.toString() },
    { key: 'earnings', header: 'Earnings', render: (p: InfluencerProduct) => <span className="font-medium">₹{p.earnings.toLocaleString()}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (product: InfluencerProduct) => (
        <Badge variant={product.status === 'active' ? 'success' : product.status === 'pending' ? 'warning' : 'error'}>
          {product.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (product: InfluencerProduct) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigator.clipboard.writeText(product.productUrl)}
            className="p-1 hover:bg-border rounded transition-colors" 
            title="Copy link"
          >
            📋
          </button>
          <button 
            onClick={() => hideProduct(product.id)}
            className="p-1 hover:bg-border rounded transition-colors" 
            title={product.status === 'hidden' ? 'Show' : 'Hide'}
          >
            {product.status === 'hidden' ? '👁️' : '🙈'}
          </button>
          <button 
            onClick={() => setDeleteConfirm(product.id)}
            className="p-1 hover:bg-red-500/10 rounded transition-colors text-red-500" 
            title="Remove"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'curated', label: 'Curated' },
            { id: 'campaign', label: 'Campaign' },
            { id: 'own', label: 'My Products' },
          ].map((f) => (
            <Button
              key={f.id}
              variant={filter === f.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(f.id as typeof filter)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Add Product</Button>
      </div>

      {/* Products Table */}
      <Table
        columns={columns}
        data={filteredProducts}
        keyExtractor={(p) => p.id}
        emptyMessage="No products found"
      />

      {/* Add Product Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product" size="lg">
        <div className="space-y-4">
          <Input
            label="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Enter product name"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              placeholder="Brand name"
            />
            <Select
              label="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              options={CATEGORY_OPTIONS}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              type="number"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <Input
              label="Commission (%)"
              type="number"
              value={newProduct.commission || ''}
              onChange={(e) => setNewProduct({ ...newProduct, commission: Number(e.target.value) })}
            />
          </div>
          <Input
            label="Product URL"
            value={newProduct.productUrl}
            onChange={(e) => setNewProduct({ ...newProduct, productUrl: e.target.value })}
            placeholder="https://..."
          />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddProduct} className="flex-1" disabled={!newProduct.name || !newProduct.productUrl}>
              Add Product
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          if (deleteConfirm) {
            removeProduct(deleteConfirm);
            setDeleteConfirm(null);
          }
        }}
        title="Remove Product?"
        description="This action cannot be undone. The product will be removed from your store."
        variant="danger"
        confirmText="Remove"
      />
    </div>
  );
}

// ============================================
// Campaigns Tab
// ============================================
function CampaignsTab() {
  const { campaigns, acceptCampaign, rejectCampaign } = useInfluencerStore();

  const availableCampaigns = campaigns.filter(c => c.status === 'available');
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Available Campaigns */}
      <div>
        <h3 className="font-semibold mb-4">Available Campaigns for You</h3>
        {availableCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableCampaigns.map((campaign) => (
              <Card key={campaign.id} hover>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {campaign.brandName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{campaign.brandName}</p>
                    <p className="text-xs text-foreground/60">{campaign.title}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Commission</span>
                    <span className="text-accent font-medium">{campaign.commission}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Budget</span>
                    <span>₹{campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Deadline</span>
                    <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => acceptCampaign(campaign.id)} className="flex-1" size="sm">
                    Accept
                  </Button>
                  <Button onClick={() => rejectCampaign(campaign.id)} variant="outline" className="flex-1" size="sm">
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon="📢" 
            title="No available campaigns" 
            description="Check back later for new opportunities"
          />
        )}
      </div>

      {/* Active Campaigns */}
      <div>
        <h3 className="font-semibold mb-4">Your Campaigns</h3>
        {activeCampaigns.length > 0 ? (
          <Table
            columns={[
              {
                key: 'campaign',
                header: 'Campaign',
                render: (c: InfluencerCampaign) => (
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-foreground/60">{c.brandName}</p>
                  </div>
                ),
              },
              { key: 'commission', header: 'Commission', render: (c: InfluencerCampaign) => <span className="text-accent">{c.commission}%</span> },
              { key: 'deadline', header: 'Deadline', render: (c: InfluencerCampaign) => new Date(c.deadline).toLocaleDateString() },
              { key: 'earnings', header: 'Earnings', render: (c: InfluencerCampaign) => `₹${c.earnings.toLocaleString()}` },
              {
                key: 'status',
                header: 'Status',
                render: (c: InfluencerCampaign) => (
                  <Badge variant={c.status === 'active' ? 'success' : c.status === 'completed' ? 'info' : 'warning'}>
                    {c.status}
                  </Badge>
                ),
              },
            ]}
            data={activeCampaigns}
            keyExtractor={(c) => c.id}
          />
        ) : (
          <EmptyState icon="📋" title="No active campaigns" description="Accept campaigns to see them here" />
        )}
      </div>
    </div>
  );
}

// ============================================
// Messaging Tab
// ============================================
function MessagingTab() {
  const { autoMessages, addAutoMessage, updateAutoMessage, toggleAutoMessage, deleteAutoMessage } = useInfluencerStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newTemplate, setNewTemplate] = useState(DEFAULT_AUTO_DM_TEMPLATE);

  const totalDeliveries = autoMessages.reduce((sum, m) => sum + m.deliveries, 0);
  const totalOpens = autoMessages.reduce((sum, m) => sum + m.opens, 0);
  const totalClicks = autoMessages.reduce((sum, m) => sum + m.clicks, 0);

  const handleAddMessage = () => {
    if (newKeyword) {
      addAutoMessage(newKeyword, newTemplate);
      setShowAddModal(false);
      setNewKeyword('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <Alert type="info" title="Secret Sauce: Auto-DM Messaging">
        Automatically respond to DMs with product links when followers use your keywords!
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Sent" value={totalDeliveries.toLocaleString()} icon="📤" />
        <StatCard label="Opens" value={totalOpens.toLocaleString()} icon="👀" />
        <StatCard label="Link Clicks" value={totalClicks.toLocaleString()} icon="🔗" />
        <StatCard label="Click Rate" value={`${totalDeliveries > 0 ? ((totalClicks / totalDeliveries) * 100).toFixed(1) : 0}%`} icon="📈" />
      </div>

      {/* Keyword Setup */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Keywords</h3>
          <Button onClick={() => setShowAddModal(true)} size="sm">+ Add Keyword</Button>
        </div>
        {autoMessages.length > 0 ? (
          <div className="space-y-3">
            {autoMessages.map((msg) => (
              <div key={msg.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <Badge variant="accent" size="md">{msg.keyword}</Badge>
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <span>📤 {msg.deliveries.toLocaleString()}</span>
                    <span>👀 {msg.opens.toLocaleString()}</span>
                    <span>🔗 {msg.clicks.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle checked={msg.status === 'active'} onChange={() => toggleAutoMessage(msg.id)} />
                  <button 
                    onClick={() => deleteAutoMessage(msg.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="💬" title="No keywords set up" description="Add keywords to start auto-messaging" />
        )}
      </Card>

      {/* Add Keyword Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Keyword" size="lg">
        <div className="space-y-4">
          <Input
            label="Keyword"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value.toUpperCase())}
            placeholder="e.g., LINK, BUY, SHOP"
          />
          <Textarea
            label="Message Template"
            value={newTemplate}
            onChange={(e) => setNewTemplate(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-foreground/50">
            Available variables: {'{PRODUCT_LINK}'}, {'{USER_NAME}'}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddMessage} className="flex-1" disabled={!newKeyword}>Add Keyword</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ============================================
// Analytics Tab
// ============================================
function AnalyticsTab() {
  const { totalEarnings, pendingEarnings, products, campaigns } = useInfluencerStore();
  
  const paidOut = totalEarnings - pendingEarnings - 12500;
  
  const productEarnings = products
    .map(p => ({ name: p.name, earnings: p.earnings }))
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 4);

  const campaignEarnings = campaigns
    .filter(c => c.earnings > 0)
    .map(c => ({ name: c.title, earnings: c.earnings, clicks: c.clicks, conversions: c.sales }))
    .sort((a, b) => b.earnings - a.earnings);

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Earnings" value={`₹${totalEarnings.toLocaleString()}`} change="+12.5%" icon="💰" />
        <StatCard label="This Month" value="₹45,230" change="+8.3%" icon="📅" />
        <StatCard label="Pending" value={`₹${pendingEarnings.toLocaleString()}`} icon="⏳" />
        <StatCard label="Paid Out" value={`₹${paidOut.toLocaleString()}`} icon="✅" />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Earnings Over Time</h3>
          <div className="h-64 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📊 Chart visualization (integrate with recharts/chart.js)
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold mb-4">Clicks vs Conversions</h3>
          <div className="h-64 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📈 Chart visualization (integrate with recharts/chart.js)
          </div>
        </Card>
      </div>

      {/* Earnings by Product */}
      <Card>
        <h3 className="font-semibold mb-4">Earnings by Product</h3>
        <div className="space-y-4">
          {productEarnings.map((product, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{product.name}</span>
                <span className="font-medium">₹{product.earnings.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${(product.earnings / productEarnings[0].earnings) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Campaign Earnings */}
      {campaignEarnings.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-4">Earnings by Campaign</h3>
          <Table
            columns={[
              { key: 'name', header: 'Campaign' },
              { key: 'clicks', header: 'Clicks', render: (r) => r.clicks.toLocaleString() },
              { key: 'conversions', header: 'Conversions' },
              { key: 'earnings', header: 'Earnings', render: (r) => <span className="text-accent font-medium">₹{r.earnings.toLocaleString()}</span> },
            ]}
            data={campaignEarnings}
            keyExtractor={(r) => r.name}
          />
        </Card>
      )}
    </div>
  );
}

// ============================================
// Payments Tab
// ============================================
function PaymentsTab() {
  const router = useRouter();
  const { availableBalance, pendingEarnings, payouts, bankDetails, upiId, requestPayout, updateBankDetails, updateUpiId } = useInfluencerStore();
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState<'bank' | 'upi'>('bank');

  const totalPaid = payouts.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

  const handleRequestPayout = () => {
    const amount = Number(payoutAmount);
    if (amount > 0 && amount <= availableBalance) {
      requestPayout(amount, payoutMethod);
      setShowPayoutModal(false);
      setPayoutAmount('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Payout Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-accent/5 border-accent/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💰</span>
            <span className="text-foreground/60">Available Balance</span>
          </div>
          <p className="text-3xl font-bold text-accent">₹{availableBalance.toLocaleString()}</p>
        </Card>
        <StatCard label="Pending" value={`₹${pendingEarnings.toLocaleString()}`} icon="⏳" />
        <StatCard label="Total Paid" value={`₹${totalPaid.toLocaleString()}`} icon="✅" />
      </div>

      {/* Bank Details */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Payment Method</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-background rounded-xl border border-border">
            <p className="text-sm text-foreground/60 mb-1">Bank Account</p>
            <p className="font-medium">{bankDetails?.bankName} {bankDetails?.accountNumber}</p>
            <p className="text-sm text-foreground/60">IFSC: {bankDetails?.ifscCode}</p>
          </div>
          <div className="p-4 bg-background rounded-xl border border-border">
            <p className="text-sm text-foreground/60 mb-1">UPI ID</p>
            <p className="font-medium">{upiId}</p>
          </div>
        </div>
      </Card>

      {/* Request Payout */}
      <Button onClick={() => setShowPayoutModal(true)} size="lg" className="w-full">
        Request Payout
      </Button>

      {/* Payout History */}
      <Card>
        <h3 className="font-semibold mb-4">Payout History</h3>
        {payouts.length > 0 ? (
          <div className="space-y-3">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    payout.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                    payout.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {payout.status === 'completed' ? '✓' : payout.status === 'pending' ? '⏳' : '↻'}
                  </div>
                  <div>
                    <p className="font-medium">₹{payout.amount.toLocaleString()}</p>
                    <p className="text-sm text-foreground/60 capitalize">{payout.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{new Date(payout.createdAt).toLocaleDateString()}</p>
                  <Badge variant={payout.status === 'completed' ? 'success' : payout.status === 'pending' ? 'warning' : 'info'}>
                    {payout.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="💸" title="No payouts yet" description="Request your first payout above" />
        )}
      </Card>

      {/* Payout Modal */}
      <Modal isOpen={showPayoutModal} onClose={() => setShowPayoutModal(false)} title="Request Payout" size="md">
        <div className="space-y-4">
          <Input
            label="Amount"
            type="number"
            value={payoutAmount}
            onChange={(e) => setPayoutAmount(e.target.value)}
            placeholder="Enter amount"
            helperText={`Available: ₹${availableBalance.toLocaleString()}`}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPayoutMethod('bank')}
                className={`p-4 rounded-xl text-left transition-all ${
                  payoutMethod === 'bank' ? 'bg-accent/10 border-2 border-accent' : 'bg-background border border-border'
                }`}
              >
                <span className="text-2xl mb-2 block">🏦</span>
                <p className="font-medium">Bank Transfer</p>
              </button>
              <button
                onClick={() => setPayoutMethod('upi')}
                className={`p-4 rounded-xl text-left transition-all ${
                  payoutMethod === 'upi' ? 'bg-accent/10 border-2 border-accent' : 'bg-background border border-border'
                }`}
              >
                <span className="text-2xl mb-2 block">📱</span>
                <p className="font-medium">UPI</p>
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowPayoutModal(false)} className="flex-1">Cancel</Button>
            <Button 
              onClick={handleRequestPayout} 
              className="flex-1" 
              disabled={!payoutAmount || Number(payoutAmount) > availableBalance || Number(payoutAmount) <= 0}
            >
              Request ₹{payoutAmount ? Number(payoutAmount).toLocaleString() : '0'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ============================================
// Support Tab
// ============================================
function SupportTab() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('payment');
  const [ticketDescription, setTicketDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would create a support ticket
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setTicketDescription('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Help Center */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span>📚</span> Help Center
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HELP_CENTER_ITEMS.map((item, i) => (
            <button key={i} className="p-4 bg-background rounded-xl border border-border text-left hover:border-accent/50 transition-all group">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="font-medium group-hover:text-accent transition-colors">{item.title}</p>
              <p className="text-sm text-foreground/60">{item.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Raise Ticket */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span>🎫</span> Raise a Ticket
        </h3>
        {submitted ? (
          <Alert type="success" title="Ticket Submitted!">
            We&apos;ll get back to you within 24 hours.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Subject"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="What do you need help with?"
              required
            />
            <Select
              label="Category"
              value={ticketCategory}
              onChange={(e) => setTicketCategory(e.target.value)}
              options={SUPPORT_CATEGORIES}
            />
            <Textarea
              label="Description"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              placeholder="Describe your issue in detail..."
              rows={4}
              required
            />
            <Button type="submit">Submit Ticket</Button>
          </form>
        )}
      </Card>

      {/* Tips */}
      <Alert type="info" title="💡 Onboarding Tips">
        <ul className="list-disc list-inside space-y-1 mt-2">
          {ONBOARDING_TIPS.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </Alert>
    </div>
  );
}
