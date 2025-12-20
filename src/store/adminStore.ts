import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AdminUser,
  AdminProduct,
  AdminCampaign,
  Report,
  PlatformStats,
  FeatureToggle,
  MessageRule,
  Notification,
  Payout,
} from '@/types';
import {
  MOCK_ADMIN_USERS,
  MOCK_ADMIN_PRODUCTS,
  MOCK_ADMIN_CAMPAIGNS,
  MOCK_REPORTS,
  MOCK_PLATFORM_STATS,
  MOCK_FEATURE_TOGGLES,
  MOCK_MESSAGE_RULES,
  MOCK_NOTIFICATIONS,
  MOCK_PENDING_PAYOUTS,
  generateId,
} from '@/constants';

interface AdminState {
  // Users
  users: AdminUser[];
  
  // Products
  products: AdminProduct[];
  
  // Campaigns
  campaigns: AdminCampaign[];
  
  // Reports & Moderation
  reports: Report[];
  
  // Platform Stats
  platformStats: PlatformStats;
  
  // System
  featureToggles: FeatureToggle[];
  messageRules: MessageRule[];
  
  // Payouts (admin view)
  pendingPayouts: Payout[];
  
  // Notifications
  notifications: Notification[];
  
  // Loading states
  isLoading: boolean;
  initialized: boolean;
  
  // Initialization
  initialize: () => void;
  
  // User Management
  approveUser: (id: string) => void;
  suspendUser: (id: string) => void;
  activateUser: (id: string) => void;
  deleteUser: (id: string) => void;
  updateUserNiche: (id: string, niche: string) => void;
  
  // Product Management
  approveProduct: (id: string) => void;
  rejectProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  
  // Campaign Management
  approveCampaign: (id: string) => void;
  rejectCampaign: (id: string) => void;
  
  // Report Management
  investigateReport: (id: string) => void;
  resolveReport: (id: string) => void;
  dismissReport: (id: string) => void;
  
  // Feature Toggles
  toggleFeature: (id: string) => void;
  
  // Message Rules
  updateMessageRules: (rules: Partial<MessageRule>) => void;
  
  // Payout Management
  processPayout: (id: string) => void;
  
  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  users: [],
  products: [],
  campaigns: [],
  reports: [],
  platformStats: {
    totalGMV: 0,
    activeCreators: 0,
    activeBrands: 0,
    platformRevenue: 0,
    totalPayouts: 0,
    pendingPayouts: 0,
    messagesDelivered: 0,
    messageDeliveryRate: 0,
  },
  featureToggles: [],
  messageRules: [],
  pendingPayouts: [],
  notifications: [],
  isLoading: false,
  initialized: false,
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Initialization
      initialize: () => {
        if (get().initialized) return;

        set({
          users: MOCK_ADMIN_USERS,
          products: MOCK_ADMIN_PRODUCTS,
          campaigns: MOCK_ADMIN_CAMPAIGNS,
          reports: MOCK_REPORTS,
          platformStats: MOCK_PLATFORM_STATS,
          featureToggles: MOCK_FEATURE_TOGGLES,
          messageRules: MOCK_MESSAGE_RULES,
          notifications: MOCK_NOTIFICATIONS,
          pendingPayouts: MOCK_PENDING_PAYOUTS,
          initialized: true,
        });
      },

      // User Management
      approveUser: (id) => {
        set((state) => ({
          users: state.users.map(u =>
            u.id === id ? { ...u, status: 'active' } : u
          ),
        }));
      },

      suspendUser: (id) => {
        set((state) => ({
          users: state.users.map(u =>
            u.id === id ? { ...u, status: 'suspended' } : u
          ),
        }));
      },

      activateUser: (id) => {
        set((state) => ({
          users: state.users.map(u =>
            u.id === id ? { ...u, status: 'active' } : u
          ),
        }));
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter(u => u.id !== id),
        }));
      },

      updateUserNiche: (id, niche) => {
        set((state) => ({
          users: state.users.map(u =>
            u.id === id ? { ...u, niche } : u
          ),
        }));
      },

      // Product Management
      approveProduct: (id) => {
        set((state) => ({
          products: state.products.map(p =>
            p.id === id ? { ...p, status: 'approved' } : p
          ),
        }));
      },

      rejectProduct: (id) => {
        set((state) => ({
          products: state.products.map(p =>
            p.id === id ? { ...p, status: 'rejected' } : p
          ),
        }));
      },

      removeProduct: (id) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== id),
        }));
      },

      // Campaign Management
      approveCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === id ? { ...c, status: 'approved' } : c
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

      // Report Management
      investigateReport: (id) => {
        set((state) => ({
          reports: state.reports.map(r =>
            r.id === id ? { ...r, status: 'investigating' } : r
          ),
        }));
      },

      resolveReport: (id) => {
        set((state) => ({
          reports: state.reports.map(r =>
            r.id === id ? { ...r, status: 'resolved' } : r
          ),
        }));
      },

      dismissReport: (id) => {
        set((state) => ({
          reports: state.reports.map(r =>
            r.id === id ? { ...r, status: 'dismissed' } : r
          ),
        }));
      },

      // Feature Toggles
      toggleFeature: (id) => {
        set((state) => ({
          featureToggles: state.featureToggles.map(f =>
            f.id === id ? { ...f, enabled: !f.enabled, updatedAt: new Date() } : f
          ),
        }));
      },

      // Message Rules
      updateMessageRules: (rules) => {
        set((state) => ({
          messageRules: state.messageRules.map((r, i) =>
            i === 0 ? { ...r, ...rules } : r
          ),
        }));
      },

      // Payout Management
      processPayout: (id) => {
        set((state) => ({
          pendingPayouts: state.pendingPayouts.map(p =>
            p.id === id ? { ...p, status: 'processing', processedAt: new Date() } : p
          ),
          platformStats: {
            ...state.platformStats,
            pendingPayouts: state.platformStats.pendingPayouts - 
              (state.pendingPayouts.find(p => p.id === id)?.amount || 0),
          },
        }));

        // Simulate completion after delay
        setTimeout(() => {
          set((state) => ({
            pendingPayouts: state.pendingPayouts.filter(p => p.id !== id),
          }));
        }, 2000);
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
      name: 'merchboard-admin',
    }
  )
);
