"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useInfluencerStore } from '@/store/influencerStore';
import { useProductStore, CatalogProduct } from '@/store/productStore';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  StatCard, 
  Badge, 
  Input, 
  Textarea, 
  EmptyState,
  Sidebar,
  DashboardHeader,
  NotificationBell,
  PageContainer,
  Icon,
} from '@/components/ui';
import { INFLUENCER_TABS, InfluencerTab, NICHE_OPTIONS } from '@/constants';

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function InfluencerDashboard() {
  const [activeTab, setActiveTab] = useState<InfluencerTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const { profile, notifications } = useInfluencerStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
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
          subtitle={`Welcome back, ${profile?.displayName || user?.name}!`}
        >
          <NotificationBell count={unreadNotifications} />
        </DashboardHeader>

        <PageContainer>
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <OverviewTab key="overview" />}
            {activeTab === 'profile' && <ProfileTab key="profile" />}
            {activeTab === 'discover' && <DiscoverTab key="discover" />}
            {activeTab === 'my-products' && <MyProductsTab key="my-products" />}
            {activeTab === 'skipped' && <SkippedTab key="skipped" />}
          </AnimatePresence>
        </PageContainer>
      </main>
    </div>
  );
}

// ============================================
// Overview Tab
// ============================================
function OverviewTab() {
  const { profile } = useInfluencerStore();
  const { getAcceptedProducts, getRejectedProducts } = useProductStore();
  
  const acceptedProducts = profile ? getAcceptedProducts(profile.userId) : [];
  const skippedProducts = profile ? getRejectedProducts(profile.userId) : [];

  const nicheLabels = profile?.niches.map(n => 
    NICHE_OPTIONS.find(opt => opt.value === n)?.label || n
  ) || [];

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={fadeInUp}
      >
        <StatCard 
          label="My Products" 
          value={acceptedProducts.length.toString()} 
          icon="shopping-bag" 
        />
        <StatCard 
          label="Skipped" 
          value={skippedProducts.length.toString()} 
          icon="x-circle" 
        />
        <StatCard 
          label="Niches" 
          value={(profile?.niches.length || 0).toString()} 
          icon="tag" 
        />
        <StatCard 
          label="Profile Status" 
          value={profile?.verified ? 'Verified' : 'Active'} 
          icon="user" 
        />
      </motion.div>

      {/* Quick Profile Card */}
      <motion.div variants={fadeInUp}>
        <Card>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-20 h-20 rounded-2xl border-2 border-accent/50 bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
              {profile?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-[200px]">
              <h2 className="text-xl font-semibold mb-1">{profile?.displayName}</h2>
              <p className="text-accent mb-3">{profile?.socialHandle}</p>
              <div className="flex flex-wrap gap-2">
                {nicheLabels.map((niche, i) => (
                  <Badge key={i} variant="accent" size="md">{niche}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Accepted Products */}
      <motion.div variants={fadeInUp}>
        <Card>
          <h3 className="font-semibold mb-4">Recently Accepted Products</h3>
          {acceptedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acceptedProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} showActions={false} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon="shopping-bag" 
              title="No products yet" 
              description="Start discovering products to promote!" 
            />
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Profile Tab
// ============================================
function ProfileTab() {
  const { profile, updateProfile } = useInfluencerStore();
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || '',
    socialHandle: profile?.socialHandle || '',
    bio: profile?.bio || '',
    niches: profile?.niches || [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName,
        socialHandle: profile.socialHandle,
        bio: profile.bio,
        niches: profile.niches,
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  const handleNicheToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      niches: prev.niches.includes(value)
        ? prev.niches.filter((n) => n !== value)
        : [...prev.niches, value],
    }));
  };

  const nicheLabels = profile?.niches.map(n => 
    NICHE_OPTIONS.find(opt => opt.value === n)?.label || n
  ) || [];

  const storeUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/store/${profile?.userId}` 
    : `/store/${profile?.userId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Store URL Card */}
      <motion.div variants={fadeInUp}>
        <Card className="border-accent/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold mb-1">Your Public Store</h3>
              <p className="text-sm text-[#888]">Share this link with your followers so they can shop your picks</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <code className="px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded-lg text-sm text-[#888]">
                {storeUrl}
              </code>
              <Button size="sm" onClick={handleCopyLink}>
                {copied ? '✓ Copied!' : 'Copy Link'}
              </Button>
              <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">View Store</Button>
              </a>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={fadeInUp}>
        <Card>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-24 h-24 rounded-2xl border-2 border-accent/50 bg-accent/10 flex items-center justify-center text-accent text-3xl font-bold">
              {profile?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-semibold">{profile?.displayName}</h2>
                {profile?.verified && <Badge variant="success">Verified</Badge>}
              </div>
              <p className="text-accent text-lg mb-4">{profile?.socialHandle}</p>
              <div className="flex flex-wrap gap-2">
                {nicheLabels.map((niche, i) => (
                  <Badge key={i} variant="accent" size="md">{niche}</Badge>
                ))}
              </div>
            </div>
            <Button variant="outline" onClick={() => setEditing(true)}>Edit Profile</Button>
          </div>
        </Card>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={fadeInUp}
      >
        <Card>
          <h3 className="font-semibold mb-4">Profile Details</h3>
          <div className="space-y-4">
            <Input 
              label="Display Name" 
              value={formData.displayName} 
              disabled={!editing} 
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })} 
            />
            <Input 
              label="Social Handle" 
              value={formData.socialHandle} 
              disabled={!editing} 
              onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })} 
            />
            <Textarea 
              label="Bio" 
              value={formData.bio} 
              disabled={!editing} 
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
              rows={3}
              placeholder="Tell brands about yourself..."
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
          <h3 className="font-semibold mb-4">Your Niches</h3>
          {editing ? (
            <div className="grid grid-cols-2 gap-2">
              {NICHE_OPTIONS.map((niche) => (
                <motion.button
                  key={niche.value}
                  type="button"
                  onClick={() => handleNicheToggle(niche.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                    formData.niches.includes(niche.value)
                      ? 'bg-accent/10 text-accent border-accent'
                      : 'bg-transparent border-[#222] text-[#888] hover:border-[#333]'
                  }`}
                >
                  {niche.label}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {nicheLabels.length > 0 ? (
                nicheLabels.map((niche, i) => (
                  <Badge key={i} variant="accent" size="lg">{niche}</Badge>
                ))
              ) : (
                <p className="text-[#888]">No niches selected</p>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Discover Tab
// ============================================
function DiscoverTab() {
  const { profile } = useInfluencerStore();
  const { getProductsForInfluencer, acceptProduct, rejectProduct, products } = useProductStore();
  
  const availableProducts = profile 
    ? getProductsForInfluencer(profile.userId, profile.niches)
    : [];

  const handleAccept = (productId: string) => {
    if (profile) {
      acceptProduct(profile.userId, productId);
    }
  };

  const handleReject = (productId: string) => {
    if (profile) {
      rejectProduct(profile.userId, productId);
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={fadeInUp}
      >
        <div>
          <h3 className="text-lg font-semibold">Discover Products</h3>
          <p className="text-sm text-[#888]">
            Products matching your niches: {profile?.niches.map(n => 
              NICHE_OPTIONS.find(opt => opt.value === n)?.label
            ).join(', ')}
          </p>
        </div>
        <Badge variant="info">{availableProducts.length} available</Badge>
      </motion.div>

      {availableProducts.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
        >
          {availableProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard 
                product={product} 
                showActions={true}
                onAccept={() => handleAccept(product.id)}
                onReject={() => handleReject(product.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={fadeInUp}>
          <EmptyState 
            icon="search" 
            title="No new products" 
            description={products.length === 0 
              ? "No products have been uploaded by brands yet. Check back later!" 
              : "You've reviewed all available products. Check back later for more!"}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// ============================================
// My Products Tab
// ============================================
function MyProductsTab() {
  const { profile } = useInfluencerStore();
  const { getAcceptedProducts, rejectProduct } = useProductStore();
  
  const acceptedProducts = profile ? getAcceptedProducts(profile.userId) : [];

  const handleRemove = (productId: string) => {
    if (profile) {
      rejectProduct(profile.userId, productId);
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={fadeInUp}
      >
        <div>
          <h3 className="text-lg font-semibold">My Products</h3>
          <p className="text-sm text-[#888]">Products you&apos;ve chosen to promote</p>
        </div>
        <Badge variant="success">{acceptedProducts.length} products</Badge>
      </motion.div>

      {acceptedProducts.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
        >
          {acceptedProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard 
                product={product} 
                showActions={true}
                isAccepted={true}
                onRemove={() => handleRemove(product.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={fadeInUp}>
          <EmptyState 
            icon="shopping-bag" 
            title="No products yet" 
            description="Accept products from Discover to add them here" 
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// ============================================
// Skipped Tab
// ============================================
function SkippedTab() {
  const { profile } = useInfluencerStore();
  const { getRejectedProducts, reconsiderProduct, acceptProduct } = useProductStore();
  
  const skippedProducts = profile ? getRejectedProducts(profile.userId) : [];

  const handleReconsider = (productId: string) => {
    if (profile) {
      reconsiderProduct(profile.userId, productId);
    }
  };

  const handleAccept = (productId: string) => {
    if (profile) {
      acceptProduct(profile.userId, productId);
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={fadeInUp}
      >
        <div>
          <h3 className="text-lg font-semibold">Previously Skipped</h3>
          <p className="text-sm text-[#888]">Products you passed on - you can reconsider them</p>
        </div>
        <Badge variant="default">{skippedProducts.length} skipped</Badge>
      </motion.div>

      {skippedProducts.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
        >
          {skippedProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard 
                product={product} 
                showActions={true}
                isSkipped={true}
                onReconsider={() => handleReconsider(product.id)}
                onAccept={() => handleAccept(product.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={fadeInUp}>
          <EmptyState 
            icon="check-circle" 
            title="No skipped products" 
            description="Products you skip will appear here" 
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// ============================================
// Product Card Component
// ============================================
interface ProductCardProps {
  product: CatalogProduct;
  showActions?: boolean;
  isAccepted?: boolean;
  isSkipped?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onRemove?: () => void;
  onReconsider?: () => void;
}

function ProductCard({ 
  product, 
  showActions = false, 
  isAccepted = false,
  isSkipped = false,
  onAccept, 
  onReject,
  onRemove,
  onReconsider,
}: ProductCardProps) {
  const categoryLabel = NICHE_OPTIONS.find(n => n.value === product.category)?.label || product.category;

  return (
    <motion.div 
      className="bg-[#111] border border-[#222] rounded-2xl p-5 flex flex-col hover:border-[#333] transition-colors"
      whileHover={{ y: -2 }}
    >
      {/* Product Image Placeholder */}
      <div className="w-full h-40 bg-[#0a0a0a] border border-[#222] rounded-xl mb-4 flex items-center justify-center">
        <Icon name="box" size={40} className="text-[#333]" />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold line-clamp-2">{product.name}</h4>
          <Badge variant="accent" size="sm">{product.commission}%</Badge>
        </div>
        <p className="text-sm text-[#888] mb-2">by {product.brandName}</p>
        <Badge variant="default" size="sm">{categoryLabel}</Badge>
        <p className="text-sm text-[#666] mt-2 line-clamp-2">{product.description}</p>
        <p className="text-lg font-semibold text-accent mt-3">₹{product.price.toLocaleString()}</p>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#222]">
          {isAccepted ? (
            <Button variant="outline" size="sm" className="flex-1" onClick={onRemove}>
              Remove
            </Button>
          ) : isSkipped ? (
            <>
              <Button variant="ghost" size="sm" className="flex-1" onClick={onReconsider}>
                Skip Again
              </Button>
              <Button size="sm" className="flex-1" onClick={onAccept}>
                Accept
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="flex-1" onClick={onReject}>
                Skip
              </Button>
              <Button size="sm" className="flex-1" onClick={onAccept}>
                Accept
              </Button>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
