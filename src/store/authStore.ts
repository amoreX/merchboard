import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Re-export UserRole from types for backwards compatibility
export type UserRole = 'influencer' | 'brand' | 'admin' | null;

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSelectingRole: boolean;
  
  // Actions
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
  setSelectingRole: (selecting: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isSelectingRole: false,

      login: (email: string, name: string) => {
        set({
          user: { email, name, role: null },
          isAuthenticated: false,
          isSelectingRole: true,
        });
      },

      signup: (email: string, name: string) => {
        set({
          user: { email, name, role: null },
          isAuthenticated: false,
          isSelectingRole: true,
        });
      },

      setRole: (role: UserRole) => {
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
          isAuthenticated: true,
          isSelectingRole: false,
        }));
      },

      logout: () => {
        // Clear all store data from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('merchboard-influencer');
          localStorage.removeItem('merchboard-brand');
          localStorage.removeItem('merchboard-admin');
        }
        set({
          user: null,
          isAuthenticated: false,
          isSelectingRole: false,
        });
      },

      setSelectingRole: (selecting: boolean) => {
        set({ isSelectingRole: selecting });
      },
    }),
    {
      name: 'merchboard-auth',
    }
  )
);
