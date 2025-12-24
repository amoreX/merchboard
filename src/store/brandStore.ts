import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification } from '@/types';
import { generateId } from '@/constants';

// ============================================
// Simplified Brand Profile for new flow
// ============================================

export interface BrandProfile {
  id: string;
  userId: string;
  companyName: string;
  categories: string[]; // Array of category values from NICHE_OPTIONS
  description: string;
  website: string;
  verified: boolean;
}

interface BrandState {
  // Profile
  profile: BrandProfile | null;
  
  // Onboarding
  isOnboarded: boolean;
  
  // Notifications
  notifications: Notification[];
  
  // Stats
  totalProducts: number;
  
  // Loading states
  isLoading: boolean;
  
  // Onboarding Action
  completeOnboarding: (data: {
    companyName: string;
    categories: string[];
  }) => void;
  
  // Profile Actions
  initializeProfile: (userId: string, name: string, email: string) => void;
  updateProfile: (updates: Partial<BrandProfile>) => void;
  
  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Stats
  updateStats: (productCount: number) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  profile: null,
  isOnboarded: false,
  notifications: [],
  totalProducts: 0,
  isLoading: false,
};

export const useBrandStore = create<BrandState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Onboarding Action
      completeOnboarding: (data) => {
        const userId = get().profile?.userId || generateId();
        
        const profile: BrandProfile = {
          id: generateId(),
          userId,
          companyName: data.companyName,
          categories: data.categories,
          description: '',
          website: '',
          verified: false,
        };

        set({
          profile,
          isOnboarded: true,
          notifications: [
            {
              id: generateId(),
              userId,
              type: 'system',
              title: 'Welcome to MerchNest!',
              description: 'Start uploading your products to reach influencers.',
              read: false,
              createdAt: new Date(),
            },
          ],
        });
      },

      // Profile Actions
      initializeProfile: (userId, name, email) => {
        // Only set userId if not onboarded yet
        const existingProfile = get().profile;
        if (!existingProfile) {
          // Just set a minimal profile with userId for onboarding
          set({
            profile: {
              id: generateId(),
              userId,
              companyName: name,
              categories: [],
              description: '',
              website: '',
              verified: false,
            },
          });
        }
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        }));
      },

      // Notification Actions
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      // Stats
      updateStats: (productCount) => {
        set({ totalProducts: productCount });
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
