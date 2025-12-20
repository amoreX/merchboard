"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import RoleSelection from '@/components/auth/RoleSelection';
import InfluencerDashboard from '@/components/dashboards/InfluencerDashboard';
import BrandDashboard from '@/components/dashboards/BrandDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isSelectingRole } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for hydration to prevent SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect to home if not logged in
  useEffect(() => {
    if (isHydrated && !user && !isSelectingRole) {
      router.push('/');
    }
  }, [isHydrated, user, isSelectingRole, router]);

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center animate-pulse">
            <span className="text-background font-bold text-xl">M</span>
          </div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Show role selection if user is logged in but hasn't selected a role
  if (user && isSelectingRole) {
    return <RoleSelection />;
  }

  // If not authenticated and not selecting role, show loading (redirect will happen)
  if (!isAuthenticated || !user?.role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center animate-pulse">
            <span className="text-background font-bold text-xl">M</span>
          </div>
          <p className="text-foreground/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case 'influencer':
      return <InfluencerDashboard />;
    case 'brand':
      return <BrandDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <RoleSelection />;
  }
}
