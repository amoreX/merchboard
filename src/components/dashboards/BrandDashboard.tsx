"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useBrandStore } from '@/store/brandStore';
import { useProductStore, CatalogProduct } from '@/store/productStore';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  StatCard, 
  Badge, 
  Input, 
  Textarea, 
  Modal,
  EmptyState,
  Select,
  Sidebar,
  DashboardHeader,
  NotificationBell,
  PageContainer,
  ConfirmDialog,
} from '@/components/ui';
import { BRAND_TABS, BrandTab, NICHE_OPTIONS } from '@/constants';

export default function BrandDashboard() {
  const [activeTab, setActiveTab] = useState<BrandTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const { profile, notifications } = useBrandStore();
  const router = useRouter();

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
        </PageContainer>
      </main>
    </div>
  );
}

// ============================================
// Overview Tab
// ============================================
function OverviewTab() {
  const { profile } = useBrandStore();
  const { getProductsByBrand } = useProductStore();
  
  const brandProducts = profile ? getProductsByBrand(profile.userId) : [];

  const categoryLabels = profile?.categories.map(c => 
    NICHE_OPTIONS.find(opt => opt.value === c)?.label || c
  ) || [];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Products Uploaded" 
          value={brandProducts.length.toString()} 
          icon="box" 
        />
        <StatCard 
          label="Categories" 
          value={(profile?.categories.length || 0).toString()} 
          icon="tag" 
        />
        <StatCard 
          label="Status" 
          value={profile?.verified ? 'Verified' : 'Active'} 
          icon="shield" 
        />
        <StatCard 
          label="Reach" 
          value="All Influencers" 
          icon="users" 
        />
      </div>

      {/* Quick Profile Card */}
      <Card>
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
            {profile?.companyName?.charAt(0) || 'B'}
          </div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-2xl font-bold">{profile?.companyName}</h2>
            {profile?.website && (
              <p className="text-foreground/60 mb-3">{profile.website}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {categoryLabels.map((cat, i) => (
                <Badge key={i} variant="info" size="md">{cat}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Products */}
      <Card>
        <h3 className="font-semibold mb-4">Your Products</h3>
        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon="box" 
            title="No products yet" 
            description="Upload your first product to get started!" 
          />
        )}
      </Card>
    </div>
  );
}

// ============================================
// Profile Tab
// ============================================
function ProfileTab() {
  const { profile, updateProfile } = useBrandStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: profile?.companyName || '',
    description: profile?.description || '',
    website: profile?.website || '',
    categories: profile?.categories || [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName,
        description: profile.description,
        website: profile.website,
        categories: profile.categories,
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  const handleCategoryToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((c) => c !== value)
        : [...prev.categories, value],
    }));
  };

  const categoryLabels = profile?.categories.map(c => 
    NICHE_OPTIONS.find(opt => opt.value === c)?.label || c
  ) || [];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
            {profile?.companyName?.charAt(0) || 'B'}
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold">{profile?.companyName}</h2>
              {profile?.verified && <Badge variant="success">Verified</Badge>}
            </div>
            {profile?.website && (
              <p className="text-foreground/60 mb-4">{profile.website}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {categoryLabels.map((cat, i) => (
                <Badge key={i} variant="info" size="md">{cat}</Badge>
              ))}
            </div>
          </div>
          <Button variant="outline" onClick={() => setEditing(true)}>Edit Profile</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Brand Details</h3>
          <div className="space-y-4">
            <Input 
              label="Company Name" 
              value={formData.companyName} 
              disabled={!editing} 
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} 
            />
            <Input 
              label="Website" 
              value={formData.website} 
              disabled={!editing} 
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourbrand.com"
            />
            <Textarea 
              label="Description" 
              value={formData.description} 
              disabled={!editing} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              rows={3}
              placeholder="Tell influencers about your brand..."
            />
            {editing && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Product Categories</h3>
          {editing ? (
            <div className="grid grid-cols-2 gap-2">
              {NICHE_OPTIONS.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategoryToggle(cat.value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    formData.categories.includes(cat.value)
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent'
                      : 'bg-background border-border hover:border-blue-500/50 text-foreground/70'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categoryLabels.length > 0 ? (
                categoryLabels.map((cat, i) => (
                  <Badge key={i} variant="info" size="lg">{cat}</Badge>
                ))
              ) : (
                <p className="text-foreground/50">No categories selected</p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ============================================
// Products Tab
// ============================================
function ProductsTab() {
  const { profile } = useBrandStore();
  const { addProduct, deleteProduct, getProductsByBrand } = useProductStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    commission: 10,
  });

  const brandProducts = profile ? getProductsByBrand(profile.userId) : [];

  const handleAddProduct = () => {
    if (!profile || !newProduct.name || !newProduct.category) return;
    
    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      price: newProduct.price,
      commission: newProduct.commission,
      brandId: profile.userId,
      brandName: profile.companyName,
    });
    
    setShowAddModal(false);
    setNewProduct({ name: '', description: '', category: '', price: 0, commission: 10 });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    ...NICHE_OPTIONS,
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Your Products</h3>
          <p className="text-sm text-foreground/60">{brandProducts.length} products uploaded</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Add Product</Button>
      </div>

      {brandProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              showDelete={true}
              onDelete={() => setDeleteConfirm(product.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon="box" 
          title="No products yet" 
          description="Upload your first product to start reaching influencers" 
        />
      )}

      {/* Add Product Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product" size="lg">
        <div className="space-y-4">
          <Input 
            label="Product Name" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="e.g., Premium Face Serum"
          />
          <Textarea 
            label="Description" 
            value={newProduct.description} 
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
            rows={3}
            placeholder="Describe your product..."
          />
          <Select 
            label="Category" 
            value={newProduct.category} 
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} 
            options={categoryOptions}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Price (₹)" 
              type="number" 
              value={newProduct.price || ''} 
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              placeholder="999"
            />
            <Input 
              label="Commission (%)" 
              type="number" 
              value={newProduct.commission || ''} 
              onChange={(e) => setNewProduct({ ...newProduct, commission: Number(e.target.value) })}
              placeholder="10"
            />
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <p className="text-blue-400 text-sm">
              💡 Products will be visible to influencers matching the category you select.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
            <Button 
              onClick={handleAddProduct} 
              className="flex-1" 
              disabled={!newProduct.name || !newProduct.category}
            >
              Add Product
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDeleteProduct(deleteConfirm)}
        title="Delete Product?"
        description="This will remove the product from the catalog. Influencers who accepted it will no longer see it."
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}

// ============================================
// Product Card Component
// ============================================
interface ProductCardProps {
  product: CatalogProduct;
  showDelete?: boolean;
  onDelete?: () => void;
}

function ProductCard({ product, showDelete = false, onDelete }: ProductCardProps) {
  const categoryLabel = NICHE_OPTIONS.find(n => n.value === product.category)?.label || product.category;

  return (
    <Card hover className="flex flex-col">
      {/* Product Image Placeholder */}
      <div className="w-full h-40 bg-gradient-to-br from-border to-border/50 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl opacity-50">📦</span>
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold line-clamp-2">{product.name}</h4>
          <Badge variant="accent" size="sm">{product.commission}%</Badge>
        </div>
        <Badge variant="info" size="sm">{categoryLabel}</Badge>
        <p className="text-sm text-foreground/60 mt-2 line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold text-accent mt-3">₹{product.price.toLocaleString()}</p>
      </div>

      {/* Delete Action */}
      {showDelete && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full" onClick={onDelete}>
            Delete Product
          </Button>
        </div>
      )}
    </Card>
  );
}
