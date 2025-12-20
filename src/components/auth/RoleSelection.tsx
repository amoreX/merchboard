"use client";

import { useAuthStore, UserRole } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { ROLE_OPTIONS } from '@/constants';

export default function RoleSelection() {
  const { user, setRole, logout } = useAuthStore();
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    router.push('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-scale" />
      
      <div className="relative w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-accent font-medium">Welcome, {user?.name}!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">What brings you to Merch Nest?</h1>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Choose your role to personalize your dashboard experience
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLE_OPTIONS.map((role, index) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`group text-left p-6 bg-card border border-border rounded-2xl transition-all hover-lift ${role.borderColor} animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {role.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                {role.title}
              </h3>
              
              <p className="text-foreground/60 text-sm mb-4">
                {role.description}
              </p>
              
              <ul className="space-y-2">
                {role.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                Get started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Logout option */}
        <div className="text-center mt-8">
          <button
            onClick={logout}
            className="text-foreground/50 hover:text-foreground transition-colors text-sm"
          >
            Not you? Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
