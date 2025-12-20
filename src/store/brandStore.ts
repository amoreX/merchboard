import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  BrandProfile,
  BrandProduct,
  BrandCampaign,
  InfluencerDiscovery,
  BrandPayment,
  Invoice,
  Notification,
  CampaignInfluencer,
} from '@/types';
import {
  MOCK_BRAND_PRODUCTS,
  MOCK_BRAND_CAMPAIGNS,
  MOCK_INFLUENCER_DISCOVERY,
  MOCK_BRAND_PAYMENTS,
  MOCK_INVOICES,
  MOCK_NOTIFICATIONS,
  generateId,
} from '@/constants';

interface BrandState {
  // Profile
  profile: BrandProfile | null;
  
  // Products
  products: BrandProduct[];
  
  // Campaigns
  campaigns: BrandCampaign[];
  
  // Influencer Discovery
  influencers: InfluencerDiscovery[];
  
  // Payments
  payments: BrandPayment[];
  invoices: Invoice[];
  walletBalance: number;
  
  // Notifications
  notifications: Notification[];
  
  // Analytics
  totalSales: number;
  totalRevenue: number;
  totalSpent: number;
  
  // Loading states
  isLoading: boolean;
  
  // Profile Actions
  initializeProfile: (userId: string, name: string, email: string) => void;
  updateProfile: (updates: Partial<BrandProfile>) => void;
  
  // Product Actions
  addProduct: (product: Omit<BrandProduct, 'id' | 'brandId' | 'status' | 'sales' | 'clicks' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<BrandProduct>) => void;
  deleteProduct: (id: string) => void;
  
  // Campaign Actions
  createCampaign: (campaign: Omit<BrandCampaign, 'id' | 'brandId' | 'spent' | 'status' | 'influencers' | 'totalSales' | 'totalClicks' | 'totalRevenue' | 'createdAt'>) => void;
  updateCampaign: (id: string, updates: Partial<BrandCampaign>) => void;
  pauseCampaign: (id: string) => void;
  resumeCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  inviteInfluencer: (campaignId: string, influencer: InfluencerDiscovery) => void;
  
  // Payment Actions
  addFunds: (amount: number) => void;
  
  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  profile: null,
  products: [],
  campaigns: [],
  influencers: [],
  payments: [],
  invoices: [],
  walletBalance: 0,
  notifications: [],
  totalSales: 0,
  totalRevenue: 0,
  totalSpent: 0,
  isLoading: false,
};

export const useBrandStore = create<BrandState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Profile Actions
      initializeProfile: (userId, name, email) => {
        const existingProfile = get().profile;
        if (existingProfile) return;

        const profile: BrandProfile = {
          id: generateId(),
          userId,
          companyName: name,
          description: 'Leading brand in our category',
          website: 'https://yourbrand.com',
          category: 'Beauty & Skincare',
          targetAudience: ['Women 18-25', 'Women 25-35', 'Urban', 'Premium'],
          verified: true,
        };

        // Calculate totals from campaigns
        const campaigns = MOCK_BRAND_CAMPAIGNS;
        const totalSales = campaigns.reduce((sum, c) => sum + c.totalSales, 0);
        const totalRevenue = campaigns.reduce((sum, c) => sum + c.totalRevenue, 0);
        const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);

        set({
          profile,
          products: MOCK_BRAND_PRODUCTS,
          campaigns: MOCK_BRAND_CAMPAIGNS,
          influencers: MOCK_INFLUENCER_DISCOVERY,
          payments: MOCK_BRAND_PAYMENTS,
          invoices: MOCK_INVOICES,
          walletBalance: 50000 - totalSpent,
          notifications: MOCK_NOTIFICATIONS,
          totalSales,
          totalRevenue,
          totalSpent,
        });
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        }));
      },

      // Product Actions
      addProduct: (product) => {
        const newProduct: BrandProduct = {
          ...product,
          id: generateId(),
          brandId: 'current-brand',
          status: 'pending',
          sales: 0,
          clicks: 0,
          createdAt: new Date(),
        };
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map(p => p.id === id ? { ...p, ...updates } : p),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== id),
        }));
      },

      // Campaign Actions
      createCampaign: (campaign) => {
        const newCampaign: BrandCampaign = {
          ...campaign,
          id: generateId(),
          brandId: 'current-brand',
          spent: 0,
          status: 'draft',
          influencers: [],
          totalSales: 0,
          totalClicks: 0,
          totalRevenue: 0,
          createdAt: new Date(),
        };
        set((state) => ({ campaigns: [...state.campaigns, newCampaign] }));
      },

      updateCampaign: (id, updates) => {
        set((state) => ({
          campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c),
        }));
      },

      pauseCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === id ? { ...c, status: 'paused' } : c
          ),
        }));
      },

      resumeCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === id && c.status === 'paused' ? { ...c, status: 'active' } : c
          ),
        }));
      },

      deleteCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.filter(c => c.id !== id),
        }));
      },

      inviteInfluencer: (campaignId, influencer) => {
        const campaignInfluencer: CampaignInfluencer = {
          influencerId: influencer.id,
          name: influencer.name,
          status: 'invited',
          clicks: 0,
          sales: 0,
          earnings: 0,
        };

        set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === campaignId
              ? { ...c, influencers: [...c.influencers, campaignInfluencer] }
              : c
          ),
        }));
      },

      // Payment Actions
      addFunds: (amount) => {
        const payment: BrandPayment = {
          id: generateId(),
          brandId: 'current-brand',
          type: 'deposit',
          amount,
          description: 'Wallet top-up',
          status: 'completed',
          transactionId: 'TXN' + Date.now(),
          createdAt: new Date(),
        };

        set((state) => ({
          payments: [payment, ...state.payments],
          walletBalance: state.walletBalance + amount,
        }));
      },

      // Notification Actions
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
        }));
      },

      // Reset
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'merchboard-brand',
    }
  )
);
