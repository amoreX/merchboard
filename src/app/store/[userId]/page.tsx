"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useProductStore, CatalogProduct } from '@/store/productStore';
import { Badge, Button, EmptyState, Icon } from '@/components/ui';
import { NICHE_OPTIONS } from '@/constants';
import Link from 'next/link';

// Store data interface for localStorage
interface StoredInfluencer {
  profile: {
    userId: string;
    displayName: string;
    socialHandle: string;
    niches: string[];
    bio: string;
    verified: boolean;
  } | null;
  isOnboarded: boolean;
}

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

export default function PublicStorePage() {
  const params = useParams();
  const userId = params.userId as string;
  
  const [influencer, setInfluencer] = useState<StoredInfluencer['profile'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  const { getAcceptedProducts } = useProductStore();
  const acceptedProducts = influencer ? getAcceptedProducts(influencer.userId) : [];

  useEffect(() => {
    // Load influencer data from localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('merchboard-influencer');
        if (stored) {
          const parsed = JSON.parse(stored) as { state: StoredInfluencer };
          const profile = parsed.state?.profile;
          
          // Check if this userId matches the stored influencer
          if (profile && profile.userId === userId && parsed.state.isOnboarded) {
            setInfluencer(profile);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
    }
    setIsLoading(false);
  }, [userId]);

  const nicheLabels = influencer?.niches.map(n => 
    NICHE_OPTIONS.find(opt => opt.value === n)?.label || n
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="w-12 h-12 rounded-xl border border-accent bg-accent/10 flex items-center justify-center"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-accent font-bold text-xl">M</span>
          </motion.div>
          <p className="text-[#888]">Loading store...</p>
        </div>
      </div>
    );
  }

  if (notFound || !influencer) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 rounded-2xl border border-[#222] bg-[#111] flex items-center justify-center mx-auto mb-6">
            <Icon name="search" size={40} className="text-[#555]" />
          </div>
          <h1 className="text-3xl font-semibold mb-3">Store Not Found</h1>
          <p className="text-[#888] mb-6 max-w-md">
            This creator&apos;s store doesn&apos;t exist or hasn&apos;t been set up yet.
          </p>
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#0a0a0a] border-b border-[#222] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-accent bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-bold text-lg">M</span>
            </div>
            <span className="font-semibold text-lg">Merch Nest</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#111] py-16 border-b border-[#222]">
        <motion.div 
          className="max-w-6xl mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-2xl border-2 border-accent/50 bg-accent/10 flex items-center justify-center text-accent text-5xl font-bold">
              {influencer.displayName?.charAt(0) || 'U'}
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-4xl font-semibold">{influencer.displayName}</h1>
                {influencer.verified && <Badge variant="success">Verified</Badge>}
              </div>
              <p className="text-accent text-xl mb-4">{influencer.socialHandle}</p>
              {influencer.bio && (
                <p className="text-[#888] max-w-lg mb-4">{influencer.bio}</p>
              )}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {nicheLabels.map((niche, i) => (
                  <Badge key={i} variant="accent" size="md">{niche}</Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>
            <h2 className="text-2xl font-semibold mb-1">My Curated Products</h2>
            <p className="text-[#888]">Products hand-picked by {influencer.displayName}</p>
          </div>
          <Badge variant="info" size="md">{acceptedProducts.length} products</Badge>
        </motion.div>

        {acceptedProducts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {acceptedProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState 
            icon="shopping-bag" 
            title="No products yet" 
            description={`${influencer.displayName} hasn't added any products to their store yet. Check back later!`}
          />
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#111] border-t border-[#222] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#888] hover:text-foreground transition-colors">
            <div className="w-8 h-8 rounded-lg border border-accent/50 bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-bold text-sm">M</span>
            </div>
            <span className="font-medium">Powered by Merch Nest</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// Product Card Component for Public Store
// ============================================
interface ProductCardProps {
  product: CatalogProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = NICHE_OPTIONS.find(n => n.value === product.category)?.label || product.category;

  return (
    <motion.div 
      className="bg-[#111] border border-[#222] rounded-2xl p-5 flex flex-col hover:border-[#333] transition-colors"
      whileHover={{ y: -4 }}
    >
      {/* Product Image Placeholder */}
      <div className="w-full h-48 bg-[#0a0a0a] border border-[#222] rounded-xl mb-4 flex items-center justify-center">
        <Icon name="box" size={48} className="text-[#333]" />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold line-clamp-2">{product.name}</h4>
        </div>
        <p className="text-sm text-[#888] mb-2">by {product.brandName}</p>
        <Badge variant="default" size="sm">{categoryLabel}</Badge>
        <p className="text-sm text-[#666] mt-3 line-clamp-2">{product.description}</p>
      </div>

      {/* Price & CTA */}
      <div className="mt-4 pt-4 border-t border-[#222] flex items-center justify-between">
        <p className="text-xl font-semibold text-accent">₹{product.price.toLocaleString()}</p>
        <Badge variant="accent" size="sm">{product.commission}% off</Badge>
      </div>
    </motion.div>
  );
}
