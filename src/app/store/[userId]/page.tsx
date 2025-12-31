"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductStore, CatalogProduct } from '@/store/productStore';
import { Card, Badge, Button, EmptyState } from '@/components/ui';
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

export default function PublicStorePage() {
  const params = useParams();
  const router = useRouter();
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center animate-pulse">
            <span className="text-background font-bold text-xl">M</span>
          </div>
          <p className="text-foreground/60">Loading store...</p>
        </div>
      </div>
    );
  }

  if (notFound || !influencer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-border/50 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🔍</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">Store Not Found</h1>
          <p className="text-foreground/60 mb-6 max-w-md">
            This creator&apos;s store doesn&apos;t exist or hasn&apos;t been set up yet.
          </p>
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-card via-card to-card/90 border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-lg">Merch Nest</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card to-background py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-orange-500/30">
              {influencer.displayName?.charAt(0) || 'U'}
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-4xl font-bold">{influencer.displayName}</h1>
                {influencer.verified && <Badge variant="success">Verified</Badge>}
              </div>
              <p className="text-accent text-xl mb-4">{influencer.socialHandle}</p>
              {influencer.bio && (
                <p className="text-foreground/70 max-w-lg mb-4">{influencer.bio}</p>
              )}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {nicheLabels.map((niche, i) => (
                  <Badge key={i} variant="accent" size="md">{niche}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">My Curated Products</h2>
            <p className="text-foreground/60">Products hand-picked by {influencer.displayName}</p>
          </div>
          <Badge variant="info" size="md">{acceptedProducts.length} products</Badge>
        </div>

        {acceptedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {acceptedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon="shopping-bag" 
            title="No products yet" 
            description={`${influencer.displayName} hasn't added any products to their store yet. Check back later!`}
          />
        )}
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
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
    <Card hover className="flex flex-col">
      {/* Product Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-border to-border/30 rounded-xl mb-4 flex items-center justify-center">
        <span className="text-5xl opacity-40">📦</span>
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold line-clamp-2">{product.name}</h4>
        </div>
        <p className="text-sm text-foreground/60 mb-2">by {product.brandName}</p>
        <Badge variant="default" size="sm">{categoryLabel}</Badge>
        <p className="text-sm text-foreground/60 mt-3 line-clamp-2">{product.description}</p>
      </div>

      {/* Price & CTA */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <p className="text-xl font-bold text-accent">₹{product.price.toLocaleString()}</p>
        <Badge variant="accent" size="sm">{product.commission}% off</Badge>
      </div>
    </Card>
  );
}

