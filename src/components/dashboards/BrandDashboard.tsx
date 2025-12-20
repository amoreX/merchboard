"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useBrandStore } from '@/store/brandStore';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  StatCard, 
  Badge, 
  Input, 
  Textarea, 
  Modal, 
  Table, 
  EmptyState,
  Alert,
  ConfirmDialog,
  Select,
  Tabs,
  Sidebar,
  DashboardHeader,
  NotificationBell,
  PageContainer,
} from '@/components/ui';
import { BrandProduct, BrandCampaign, InfluencerDiscovery } from '@/types';
import {
  BRAND_TABS,
  BrandTab,
  BRAND_CATEGORY_OPTIONS,
  BRAND_HELP_ITEMS,
  INFLUENCER_TIER_OPTIONS,
  INFLUENCER_NICHE_OPTIONS,
  QUICK_AMOUNT_OPTIONS,
  SUPPORT_CATEGORIES,
} from '@/constants';

export default function BrandDashboard() {
  const [activeTab, setActiveTab] = useState<BrandTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const { initializeProfile, notifications } = useBrandStore();
  const router = useRouter();

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
        tabs={BRAND_TABS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as BrandTab)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user || undefined}
        userRole="Brand Partner"
        roleColor="blue"
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <DashboardHeader
          title={BRAND_TABS.find(t => t.id === activeTab)?.label || 'Dashboard'}
          subtitle="Brand Dashboard"
        >
          <NotificationBell count={unreadNotifications} />
        </DashboardHeader>

        <PageContainer>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'campaigns' && <CampaignsTab />}
          {activeTab === 'influencers' && <InfluencersTab />}
          {activeTab === 'performance' && <PerformanceTab />}
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
  const { campaigns, totalSales, totalRevenue, totalSpent, influencers } = useBrandStore();
  
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const partnerInfluencers = campaigns.reduce((sum, c) => sum + c.influencers.length, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Sales" value={`₹${totalRevenue.toLocaleString()}`} change="+18.2%" icon="💰" />
        <StatCard label="Active Campaigns" value={activeCampaigns.length.toString()} change={`+${activeCampaigns.length}`} icon="📢" />
        <StatCard label="Partner Influencers" value={partnerInfluencers.toString()} icon="⭐" />
        <StatCard label="Total Spent" value={`₹${totalSpent.toLocaleString()}`} icon="💸" />
      </div>

      {/* Active Campaigns */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Active Campaigns</h3>
        </div>
        {activeCampaigns.length > 0 ? (
          <div className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-foreground/60">{campaign.influencers.length} influencers</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-foreground/60">Budget Used</p>
                    <p className="font-medium">₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60">Sales</p>
                    <p className="font-medium">{campaign.totalSales}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60">Revenue</p>
                    <p className="font-medium text-accent">₹{campaign.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="📢" title="No active campaigns" description="Create your first campaign to get started" />
        )}
      </Card>

      {/* Top Influencers */}
      <Card>
        <h3 className="font-semibold mb-4">Top Performing Influencers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCampaigns[0]?.influencers.slice(0, 3).map((inf, i) => (
            <div key={i} className="p-4 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {inf.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{inf.name}</p>
                  <p className="text-xs text-foreground/60">{inf.sales} sales</p>
                </div>
              </div>
              <p className="text-lg font-bold text-accent">₹{inf.earnings.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================
// Profile Tab
// ============================================
function ProfileTab() {
  const { user } = useAuthStore();
  const { profile, updateProfile } = useBrandStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: profile?.companyName || '',
    description: profile?.description || '',
    website: profile?.website || '',
    category: profile?.category || '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName,
        description: profile.description,
        website: profile.website,
        category: profile.category,
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-24 h-24 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 text-3xl font-bold">
            {profile?.companyName?.charAt(0) || 'B'}
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold">{profile?.companyName}</h2>
              {profile?.verified && <Badge variant="success">Verified</Badge>}
            </div>
            <p className="text-foreground/60 mb-4">{user?.email}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge variant="info">{profile?.category}</Badge>
              <Badge variant="accent">Premium Partner</Badge>
            </div>
          </div>
          <Button variant="outline" onClick={() => setEditing(true)}>Edit Profile</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Brand Details</h3>
          <div className="space-y-4">
            <Input label="Company Name" value={formData.companyName} disabled={!editing} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
            <Input label="Website" value={formData.website} disabled={!editing} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
            <Textarea label="Description" value={formData.description} disabled={!editing} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
            {editing && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Target Audience</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile?.targetAudience.map((tag, i) => (
              <Badge key={i} variant="accent" size="md">{tag}</Badge>
            ))}
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <div className="flex items-center gap-2 text-green-500">
              <span>✓</span>
              <span className="font-medium">Verified Brand Partner</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================
// Products Tab
// ============================================
function ProductsTab() {
  const { products, addProduct, updateProduct, deleteProduct } = useBrandStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Skincare',
    price: 0,
    commission: 10,
    stock: 100,
  });

  const handleAddProduct = () => {
    addProduct(newProduct);
    setShowAddModal(false);
    setNewProduct({ name: '', description: '', category: 'Skincare', price: 0, commission: 10, stock: 100 });
  };

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (p: BrandProduct) => (
        <div>
          <p className="font-medium">{p.name}</p>
          <p className="text-sm text-foreground/60">{p.category}</p>
        </div>
      ),
    },
    { key: 'price', header: 'Price', render: (p: BrandProduct) => `₹${p.price}` },
    { key: 'commission', header: 'Commission', render: (p: BrandProduct) => <span className="text-accent">{p.commission}%</span> },
    { key: 'stock', header: 'Stock', render: (p: BrandProduct) => <span className={p.stock === 0 ? 'text-red-500' : ''}>{p.stock}</span> },
    { key: 'sales', header: 'Sales', render: (p: BrandProduct) => p.sales.toLocaleString() },
    {
      key: 'status',
      header: 'Status',
      render: (p: BrandProduct) => (
        <Badge variant={p.status === 'approved' ? 'success' : p.status === 'pending' ? 'warning' : p.status === 'out_of_stock' ? 'error' : 'error'}>
          {p.status.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p: BrandProduct) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(p.id)}>🗑️</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Product Catalog</h3>
          <p className="text-sm text-foreground/60">{products.length} products</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Add Product</Button>
      </div>

      <Table columns={columns} data={products} keyExtractor={(p) => p.id} />

      {/* Add Product Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product" size="lg">
        <div className="space-y-4">
          <Input label="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Textarea label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (₹)" type="number" value={newProduct.price || ''} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
            <Input label="Commission (%)" type="number" value={newProduct.commission || ''} onChange={(e) => setNewProduct({ ...newProduct, commission: Number(e.target.value) })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} options={BRAND_CATEGORY_OPTIONS} />
            <Input label="Stock" type="number" value={newProduct.stock || ''} onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddProduct} className="flex-1" disabled={!newProduct.name}>Add Product</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => { if (deleteConfirm) { deleteProduct(deleteConfirm); setDeleteConfirm(null); } }}
        title="Delete Product?"
        description="This action cannot be undone."
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}

// ============================================
// Campaigns Tab
// ============================================
function CampaignsTab() {
  const { campaigns, createCampaign, pauseCampaign, resumeCampaign, deleteCampaign } = useBrandStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    influencerTier: 'all' as const,
    budget: 50000,
    commission: 15,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    products: [] as string[],
  });

  const handleCreateCampaign = () => {
    createCampaign(newCampaign);
    setShowCreateModal(false);
    setNewCampaign({ name: '', description: '', influencerTier: 'all', budget: 50000, commission: 15, startDate: new Date(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), products: [] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Campaign Management</h3>
          <p className="text-sm text-foreground/60">{campaigns.length} campaigns</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>+ Create Campaign</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} hover>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">{campaign.name}</h4>
              <Badge variant={campaign.status === 'active' ? 'success' : campaign.status === 'completed' ? 'info' : campaign.status === 'paused' ? 'warning' : 'default'}>
                {campaign.status}
              </Badge>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Budget</span>
                <span>₹{campaign.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Spent</span>
                <span>₹{campaign.spent.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Revenue</span>
                <span className="text-accent font-medium">₹{campaign.totalRevenue.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">View</Button>
              {campaign.status === 'active' && (
                <Button variant="outline" size="sm" onClick={() => pauseCampaign(campaign.id)}>Pause</Button>
              )}
              {campaign.status === 'paused' && (
                <Button size="sm" onClick={() => resumeCampaign(campaign.id)}>Resume</Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Create Campaign Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Campaign" size="lg">
        <div className="space-y-4">
          <Input label="Campaign Name" value={newCampaign.name} onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })} placeholder="e.g., Summer Beauty Sale" />
          <Textarea label="Description" value={newCampaign.description} onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })} rows={2} />
          <Select label="Influencer Tier" value={newCampaign.influencerTier} onChange={(e) => setNewCampaign({ ...newCampaign, influencerTier: e.target.value as 'all' | 'micro' | 'macro' | 'game_changer' })} options={INFLUENCER_TIER_OPTIONS} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Budget (₹)" type="number" value={newCampaign.budget || ''} onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number(e.target.value) })} />
            <Input label="Commission (%)" type="number" value={newCampaign.commission || ''} onChange={(e) => setNewCampaign({ ...newCampaign, commission: Number(e.target.value) })} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleCreateCampaign} className="flex-1" disabled={!newCampaign.name}>Create Campaign</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ============================================
// Influencers Tab
// ============================================
function InfluencersTab() {
  const { influencers, campaigns, inviteInfluencer } = useBrandStore();
  const [tierFilter, setTierFilter] = useState<'all' | 'micro' | 'macro' | 'game_changer'>('all');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const filteredInfluencers = influencers.filter(inf => {
    if (tierFilter !== 'all' && inf.tier !== tierFilter) return false;
    if (nicheFilter !== 'all' && inf.niche.toLowerCase() !== nicheFilter) return false;
    return true;
  });

  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'draft');

  const handleInvite = (influencer: InfluencerDiscovery) => {
    if (selectedCampaign) {
      inviteInfluencer(selectedCampaign, influencer);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Tabs
          tabs={[
            { id: 'all', label: 'All' },
            { id: 'micro', label: 'Micro' },
            { id: 'macro', label: 'Macro' },
            { id: 'game_changer', label: 'Game Changer' },
          ]}
          activeTab={tierFilter}
          onChange={(id) => setTierFilter(id as typeof tierFilter)}
          variant="pills"
        />
        <Select
          value={nicheFilter}
          onChange={(e) => setNicheFilter(e.target.value)}
          options={INFLUENCER_NICHE_OPTIONS}
          className="w-40"
        />
        <Select
          value={selectedCampaign || ''}
          onChange={(e) => setSelectedCampaign(e.target.value || null)}
          options={[
            { value: '', label: 'Select Campaign' },
            ...activeCampaigns.map(c => ({ value: c.id, label: c.name })),
          ]}
          className="w-48"
        />
      </div>

      {/* Influencers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInfluencers.map((influencer) => (
          <Card key={influencer.id} hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xl font-bold">
                {influencer.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{influencer.name}</p>
                <p className="text-sm text-accent">{influencer.handle}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="accent">{influencer.niche}</Badge>
              <Badge variant={influencer.tier === 'micro' ? 'info' : influencer.tier === 'macro' ? 'warning' : 'success'}>
                {influencer.tier.replace('_', ' ')}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="p-2 bg-background rounded-lg">
                <p className="text-lg font-bold">{(influencer.followers / 1000).toFixed(0)}K</p>
                <p className="text-xs text-foreground/60">Followers</p>
              </div>
              <div className="p-2 bg-background rounded-lg">
                <p className="text-lg font-bold">{influencer.engagementRate}%</p>
                <p className="text-xs text-foreground/60">Engagement</p>
              </div>
              <div className="p-2 bg-background rounded-lg">
                <p className="text-lg font-bold">{influencer.avgSales}</p>
                <p className="text-xs text-foreground/60">Avg Sales</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => handleInvite(influencer)} 
                className="flex-1" 
                size="sm"
                disabled={!selectedCampaign}
              >
                Invite
              </Button>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Performance Tab
// ============================================
function PerformanceTab() {
  const { campaigns, totalSales, totalRevenue, totalSpent } = useBrandStore();
  
  const roi = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent * 100) : 0;
  
  const influencerPerformance = campaigns
    .flatMap(c => c.influencers)
    .reduce((acc, inf) => {
      const existing = acc.find(i => i.name === inf.name);
      if (existing) {
        existing.clicks += inf.clicks;
        existing.sales += inf.sales;
        existing.earnings += inf.earnings;
      } else {
        acc.push({ ...inf });
      }
      return acc;
    }, [] as typeof campaigns[0]['influencers'])
    .sort((a, b) => b.earnings - a.earnings);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Sales" value={totalSales.toString()} icon="🛒" />
        <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon="💰" />
        <StatCard label="Campaign Spend" value={`₹${totalSpent.toLocaleString()}`} icon="💸" />
        <StatCard label="ROI" value={`${roi.toFixed(1)}%`} change={roi > 0 ? `+${roi.toFixed(0)}%` : ''} positive={roi > 0} icon="📈" />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Sales Over Time</h3>
          <div className="h-64 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📊 Chart visualization
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold mb-4">Revenue by Campaign</h3>
          <div className="h-64 flex items-center justify-center text-foreground/40 border border-dashed border-border rounded-lg">
            📈 Chart visualization
          </div>
        </Card>
      </div>

      {/* Influencer Breakdown */}
      {influencerPerformance.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-4">Influencer Performance</h3>
          <Table
            columns={[
              { key: 'name', header: 'Influencer' },
              { key: 'clicks', header: 'Clicks', render: (r) => r.clicks.toLocaleString() },
              { key: 'sales', header: 'Sales' },
              { key: 'earnings', header: 'Paid', render: (r) => <span className="text-accent">₹{r.earnings.toLocaleString()}</span> },
            ]}
            data={influencerPerformance}
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
  const { walletBalance, payments, invoices, addFunds, totalSpent } = useBrandStore();
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [amount, setAmount] = useState('');

  const handleAddFunds = () => {
    const numAmount = Number(amount);
    if (numAmount > 0) {
      addFunds(numAmount);
      setShowAddFundsModal(false);
      setAmount('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-accent/5 border-accent/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💰</span>
            <span className="text-foreground/60">Wallet Balance</span>
          </div>
          <p className="text-3xl font-bold text-accent">₹{walletBalance.toLocaleString()}</p>
        </Card>
        <StatCard label="Total Spent" value={`₹${totalSpent.toLocaleString()}`} icon="💸" />
        <StatCard label="Pending Invoices" value={invoices.filter(i => i.status === 'pending').length.toString()} icon="📄" />
      </div>

      <Button onClick={() => setShowAddFundsModal(true)} size="lg" className="w-full">
        Add Funds to Wallet
      </Button>

      {/* Payment History */}
      <Card>
        <h3 className="font-semibold mb-4">Payment History</h3>
        {payments.length > 0 ? (
          <Table
            columns={[
              { key: 'date', header: 'Date', render: (p) => new Date(p.createdAt).toLocaleDateString() },
              { key: 'description', header: 'Description' },
              { 
                key: 'amount', 
                header: 'Amount', 
                render: (p) => (
                  <span className={p.amount > 0 ? 'text-green-500' : ''}>
                    {p.amount > 0 ? '+' : ''}₹{Math.abs(p.amount).toLocaleString()}
                  </span>
                ) 
              },
              {
                key: 'status',
                header: 'Status',
                render: (p) => <Badge variant={p.status === 'completed' ? 'success' : 'warning'}>{p.status}</Badge>,
              },
            ]}
            data={payments}
            keyExtractor={(p) => p.id}
          />
        ) : (
          <EmptyState icon="💳" title="No payments yet" />
        )}
      </Card>

      {/* Add Funds Modal */}
      <Modal isOpen={showAddFundsModal} onClose={() => setShowAddFundsModal(false)} title="Add Funds" size="md">
        <div className="space-y-4">
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNT_OPTIONS.map((amt) => (
              <Button key={amt} variant={amount === amt.toString() ? 'primary' : 'outline'} size="sm" onClick={() => setAmount(amt.toString())}>
                ₹{amt.toLocaleString()}
              </Button>
            ))}
          </div>
          <Alert type="info">
            This is a demo. No real payment will be processed.
          </Alert>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddFundsModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddFunds} className="flex-1" disabled={!amount || Number(amount) <= 0}>
              Add ₹{amount ? Number(amount).toLocaleString() : '0'}
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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BRAND_HELP_ITEMS.map((item, i) => (
          <Card key={i} hover className="cursor-pointer">
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-foreground/60">{item.desc}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Contact Support</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Subject" placeholder="What do you need help with?" />
            <Select label="Category" options={SUPPORT_CATEGORIES} />
          </div>
          <Textarea label="Message" placeholder="Describe your issue..." rows={4} />
          <Button type="submit">Send Message</Button>
        </form>
      </Card>
    </div>
  );
}
