import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification } from '@/types';
import { generateId } from '@/constants';

// ============================================
// Simplified Influencer Profile for new flow
// ============================================

export interface InfluencerProfile {
  id: string;
  userId: string;
  displayName: string;
  socialHandle: string;
  niches: string[]; // Array of niche values from NICHE_OPTIONS
  bio: string;
  verified: boolean;
}

interface InfluencerState {
  // Profile
  profile: InfluencerProfile | null;
  
  // Onboarding
  isOnboarded: boolean;
  
  // Notifications
  notifications: Notification[];
  
  // Stats (computed from productStore)
  totalAcceptedProducts: number;
  
  // Loading states
  isLoading: boolean;
  
  // Onboarding Action
  completeOnboarding: (data: {
    displayName: string;
    socialHandle: string;
    niches: string[];
  }) => void;
  
  // Profile Actions
  initializeProfile: (userId: string, name: string, email: string) => void;
  updateProfile: (updates: Partial<InfluencerProfile>) => void;
  
  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  
  // Stats
  updateStats: (acceptedCount: number) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  profile: null,
  isOnboarded: false,
  notifications: [],
  totalAcceptedProducts: 0,
  isLoading: false,
};

export const useInfluencerStore = create<InfluencerState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Onboarding Action
      completeOnboarding: (data) => {
        const userId = get().profile?.userId || generateId();
        
        const profile: InfluencerProfile = {
          id: generateId(),
          userId,
          displayName: data.displayName,
          socialHandle: data.socialHandle.startsWith('@') 
            ? data.socialHandle 
            : '@' + data.socialHandle,
          niches: data.niches,
          bio: '',
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
              description: 'Start discovering products that match your niche.',
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
              displayName: name,
              socialHandle: '',
              niches: [],
              bio: '',
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

      clearNotifications: () => {
        set({ notifications: [] });
      },

      // Stats
      updateStats: (acceptedCount) => {
        set({ totalAcceptedProducts: acceptedCount });
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
