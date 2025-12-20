import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  InfluencerProfile,
  InfluencerProduct,
  InfluencerCampaign,
  AutoMessage,
  Payout,
  Notification,
  SocialAccount,
  BankDetails,
} from '@/types';
import {
  MOCK_INFLUENCER_PRODUCTS,
  MOCK_INFLUENCER_CAMPAIGNS,
  MOCK_AUTO_MESSAGES,
  MOCK_PAYOUTS,
  MOCK_NOTIFICATIONS,
  generateId,
} from '@/constants';

interface InfluencerState {
  // Profile
  profile: InfluencerProfile | null;
  
  // Products
  products: InfluencerProduct[];
  
  // Campaigns
  campaigns: InfluencerCampaign[];
  
  // Auto Messages
  autoMessages: AutoMessage[];
  
  // Payouts
  payouts: Payout[];
  bankDetails: BankDetails | null;
  upiId: string | null;
  
  // Notifications
  notifications: Notification[];
  
  // Analytics
  totalEarnings: number;
  pendingEarnings: number;
  availableBalance: number;
  
  // Loading states (for future API integration)
  isLoading: boolean;
  
  // Profile Actions
  initializeProfile: (userId: string, name: string, email: string) => void;
  updateProfile: (updates: Partial<InfluencerProfile>) => void;
  connectSocial: (social: SocialAccount) => void;
  disconnectSocial: (platform: string) => void;
  
  // Product Actions
  addProduct: (product: Omit<InfluencerProduct, 'id' | 'influencerId' | 'clicks' | 'sales' | 'earnings' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<InfluencerProduct>) => void;
  hideProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  
  // Campaign Actions
  acceptCampaign: (id: string) => void;
  rejectCampaign: (id: string) => void;
  
  // Auto Message Actions
  addAutoMessage: (keyword: string, template: string) => void;
  updateAutoMessage: (id: string, updates: Partial<AutoMessage>) => void;
  toggleAutoMessage: (id: string) => void;
  deleteAutoMessage: (id: string) => void;
  
  // Payout Actions
  requestPayout: (amount: number, method: 'bank' | 'upi') => void;
  updateBankDetails: (details: BankDetails) => void;
  updateUpiId: (upiId: string) => void;
  
  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  profile: null,
  products: [],
  campaigns: [],
  autoMessages: [],
  payouts: [],
  bankDetails: null,
  upiId: null,
  notifications: [],
  totalEarnings: 0,
  pendingEarnings: 0,
  availableBalance: 0,
  isLoading: false,
};

export const useInfluencerStore = create<InfluencerState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Profile Actions
      initializeProfile: (userId, name, email) => {
        const existingProfile = get().profile;
        if (existingProfile) return;

        // Initialize with mock data from constants
        const profile: InfluencerProfile = {
          id: generateId(),
          userId,
          bio: '',
          niche: ['Fashion', 'Beauty'],
          socials: [
            { platform: 'instagram', handle: '@' + name.toLowerCase().replace(' ', ''), followers: 0, connected: false },
          ],
          storeUrl: `merchnest.com/store/${name.toLowerCase().replace(' ', '')}`,
          storeActive: true,
          verified: false,
          tier: 'micro',
          followerCount: 0,
          engagementRate: 0,
        };

        // Calculate earnings from products
        const products = MOCK_INFLUENCER_PRODUCTS;
        const totalEarnings = products.reduce((sum, p) => sum + p.earnings, 0);
        const campaigns = MOCK_INFLUENCER_CAMPAIGNS;
        const campaignEarnings = campaigns.reduce((sum, c) => sum + c.earnings, 0);

        set({
          profile,
          products: MOCK_INFLUENCER_PRODUCTS,
          campaigns: MOCK_INFLUENCER_CAMPAIGNS,
          autoMessages: MOCK_AUTO_MESSAGES,
          payouts: MOCK_PAYOUTS,
          notifications: MOCK_NOTIFICATIONS,
          totalEarnings: totalEarnings + campaignEarnings,
          pendingEarnings: 5230,
          availableBalance: 12500,
          bankDetails: {
            accountNumber: '****1234',
            ifscCode: 'HDFC0001234',
            accountHolderName: name,
            bankName: 'HDFC Bank',
          },
          upiId: name.toLowerCase().replace(' ', '') + '@upi',
        });
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        }));
      },

      connectSocial: (social) => {
        set((state) => {
          if (!state.profile) return state;
          const socials = state.profile.socials.filter(s => s.platform !== social.platform);
          return {
            profile: {
              ...state.profile,
              socials: [...socials, { ...social, connected: true }],
            },
          };
        });
      },

      disconnectSocial: (platform) => {
        set((state) => {
          if (!state.profile) return state;
          return {
            profile: {
              ...state.profile,
              socials: state.profile.socials.map(s =>
                s.platform === platform ? { ...s, connected: false } : s
              ),
            },
          };
        });
      },

      // Product Actions
      addProduct: (product) => {
        const newProduct: InfluencerProduct = {
          ...product,
          id: generateId(),
          influencerId: 'current-user',
          clicks: 0,
          sales: 0,
          earnings: 0,
          createdAt: new Date(),
        };
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map(p => p.id === id ? { ...p, ...updates } : p),
        }));
      },

      hideProduct: (id) => {
        set((state) => ({
          products: state.products.map(p =>
            p.id === id ? { ...p, status: p.status === 'hidden' ? 'active' : 'hidden' } : p
          ),
        }));
      },

      removeProduct: (id) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== id),
        }));
      },

      // Campaign Actions
      acceptCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === id ? { ...c, status: 'active' } : c
          ),
        }));
      },

      rejectCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === id ? { ...c, status: 'rejected' } : c
          ),
        }));
      },

      // Auto Message Actions
      addAutoMessage: (keyword, template) => {
        const newMessage: AutoMessage = {
          id: generateId(),
          influencerId: 'current-user',
          keyword: keyword.toUpperCase(),
          template,
          status: 'active',
          deliveries: 0,
          opens: 0,
          clicks: 0,
          createdAt: new Date(),
        };
        set((state) => ({ autoMessages: [...state.autoMessages, newMessage] }));
      },

      updateAutoMessage: (id, updates) => {
        set((state) => ({
          autoMessages: state.autoMessages.map(m => m.id === id ? { ...m, ...updates } : m),
        }));
      },

      toggleAutoMessage: (id) => {
        set((state) => ({
          autoMessages: state.autoMessages.map(m =>
            m.id === id ? { ...m, status: m.status === 'active' ? 'paused' : 'active' } : m
          ),
        }));
      },

      deleteAutoMessage: (id) => {
        set((state) => ({
          autoMessages: state.autoMessages.filter(m => m.id !== id),
        }));
      },

      // Payout Actions
      requestPayout: (amount, method) => {
        const state = get();
        if (amount > state.availableBalance) return;

        const newPayout: Payout = {
          id: generateId(),
          userId: 'current-user',
          amount,
          method,
          status: 'pending',
          bankDetails: method === 'bank' ? state.bankDetails || undefined : undefined,
          upiId: method === 'upi' ? state.upiId || undefined : undefined,
          createdAt: new Date(),
        };

        set((state) => ({
          payouts: [newPayout, ...state.payouts],
          availableBalance: state.availableBalance - amount,
          pendingEarnings: state.pendingEarnings + amount,
        }));
      },

      updateBankDetails: (details) => {
        set({ bankDetails: details });
      },

      updateUpiId: (upiId) => {
        set({ upiId });
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

      clearNotifications: () => {
        set({ notifications: [] });
      },

      // Reset
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'merchboard-influencer',
    }
  )
);
