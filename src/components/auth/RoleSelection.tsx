"use client";

import { motion } from 'framer-motion';
import { useAuthStore, UserRole } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { ROLE_OPTIONS } from '@/constants';
import { Icon } from '@/components/ui';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function RoleSelection() {
  const { user, setRole, logout } = useAuthStore();
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    router.push('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a] overflow-auto">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <motion.div 
        className="relative w-full max-w-5xl py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#111] rounded-full border border-[#222] mb-6">
            <div className="w-10 h-10 rounded-xl border border-accent bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-bold">M</span>
            </div>
            <span className="text-sm font-medium">Welcome, {user?.name}!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">What brings you to Merch Nest?</h1>
          <p className="text-[#888] max-w-xl mx-auto">
            Choose your role to personalize your dashboard experience
          </p>
        </motion.div>

        {/* Role cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {ROLE_OPTIONS.map((role) => (
            <motion.button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              variants={fadeInUp}
              whileHover={{ y: -8, borderColor: 'var(--accent)' }}
              whileTap={{ scale: 0.98 }}
              className="group text-left p-6 bg-[#111] border border-[#222] rounded-2xl transition-all"
            >
              <div className={`w-14 h-14 rounded-xl border border-accent/30 bg-accent/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-all text-accent`}>
                <Icon name={role.icon} size={28} />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {role.title}
              </h3>
              
              <p className="text-[#888] text-sm mb-4">
                {role.description}
              </p>
              
              <ul className="space-y-2">
                {role.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#888]">
                    <div className="w-4 h-4 rounded-full border border-accent/50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                Get started
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Logout option */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={logout}
            className="text-[#666] hover:text-foreground transition-colors text-sm"
          >
            Not you? Sign out
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
