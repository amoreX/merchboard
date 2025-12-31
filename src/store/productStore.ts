import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '@/constants';

// ============================================
// Catalog Product - Shared between brands and influencers
// ============================================

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  commission: number; // percentage
  category: string; // niche value
  brandId: string;
  brandName: string;
  imageUrl?: string;
  createdAt: Date;
}

interface ProductState {
  // All products in the catalog (uploaded by brands)
  products: CatalogProduct[];
  
  // Per-influencer product relationships
  // Key: influencerId, Value: array of product IDs
  acceptedProducts: Record<string, string[]>;
  rejectedProducts: Record<string, string[]>;
  
  // Brand Actions
  addProduct: (product: Omit<CatalogProduct, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<CatalogProduct>) => void;
  deleteProduct: (id: string) => void;
  
  // Influencer Actions
  acceptProduct: (influencerId: string, productId: string) => void;
  rejectProduct: (influencerId: string, productId: string) => void;
  reconsiderProduct: (influencerId: string, productId: string) => void;
  
  // Getters
  getProductsByBrand: (brandId: string) => CatalogProduct[];
  getProductsForInfluencer: (influencerId: string, niches: string[]) => CatalogProduct[];
  getAcceptedProducts: (influencerId: string) => CatalogProduct[];
  getRejectedProducts: (influencerId: string) => CatalogProduct[];
  
  // Reset
  reset: () => void;
}

const initialState = {
  products: [] as CatalogProduct[],
  acceptedProducts: {} as Record<string, string[]>,
  rejectedProducts: {} as Record<string, string[]>,
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Brand Actions
      addProduct: (product) => {
        const newProduct: CatalogProduct = {
          ...product,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          // Also remove from all influencer accepted/rejected lists
          acceptedProducts: Object.fromEntries(
            Object.entries(state.acceptedProducts).map(([infId, productIds]) => [
              infId,
              productIds.filter((pId) => pId !== id),
            ])
          ),
          rejectedProducts: Object.fromEntries(
            Object.entries(state.rejectedProducts).map(([infId, productIds]) => [
              infId,
              productIds.filter((pId) => pId !== id),
            ])
          ),
        }));
      },

      // Influencer Actions
      acceptProduct: (influencerId, productId) => {
        set((state) => {
          const accepted = state.acceptedProducts[influencerId] || [];
          const rejected = state.rejectedProducts[influencerId] || [];
          
          // Remove from rejected if present
          const newRejected = rejected.filter((id) => id !== productId);
          
          // Add to accepted if not already there
          if (!accepted.includes(productId)) {
            return {
              acceptedProducts: {
                ...state.acceptedProducts,
                [influencerId]: [...accepted, productId],
              },
              rejectedProducts: {
                ...state.rejectedProducts,
                [influencerId]: newRejected,
              },
            };
          }
          return state;
        });
      },

      rejectProduct: (influencerId, productId) => {
        set((state) => {
          const accepted = state.acceptedProducts[influencerId] || [];
          const rejected = state.rejectedProducts[influencerId] || [];
          
          // Remove from accepted if present
          const newAccepted = accepted.filter((id) => id !== productId);
          
          // Add to rejected if not already there
          if (!rejected.includes(productId)) {
            return {
              acceptedProducts: {
                ...state.acceptedProducts,
                [influencerId]: newAccepted,
              },
              rejectedProducts: {
                ...state.rejectedProducts,
                [influencerId]: [...rejected, productId],
              },
            };
          }
          return state;
        });
      },

      reconsiderProduct: (influencerId, productId) => {
        // Remove from rejected list so it appears in discover again
        set((state) => {
          const rejected = state.rejectedProducts[influencerId] || [];
          return {
            rejectedProducts: {
              ...state.rejectedProducts,
              [influencerId]: rejected.filter((id) => id !== productId),
            },
          };
        });
      },

      // Getters
      getProductsByBrand: (brandId) => {
        return get().products.filter((p) => p.brandId === brandId);
      },

      getProductsForInfluencer: (influencerId, niches) => {
        const state = get();
        const accepted = state.acceptedProducts[influencerId] || [];
        const rejected = state.rejectedProducts[influencerId] || [];
        
        return state.products.filter((p) => {
          // Filter by niche match
          const nicheMatch = niches.length === 0 || niches.includes(p.category);
          // Exclude already accepted or rejected
          const notProcessed = !accepted.includes(p.id) && !rejected.includes(p.id);
          return nicheMatch && notProcessed;
        });
      },

      getAcceptedProducts: (influencerId) => {
        const state = get();
        const acceptedIds = state.acceptedProducts[influencerId] || [];
        return state.products.filter((p) => acceptedIds.includes(p.id));
      },

      getRejectedProducts: (influencerId) => {
        const state = get();
        const rejectedIds = state.rejectedProducts[influencerId] || [];
        return state.products.filter((p) => rejectedIds.includes(p.id));
      },

      // Reset
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'merchboard-products',
    }
  )
);


