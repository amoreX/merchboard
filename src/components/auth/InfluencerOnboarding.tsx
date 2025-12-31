"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInfluencerStore } from '@/store/influencerStore';
import { NICHE_OPTIONS } from '@/constants';

export default function InfluencerOnboarding() {
  const { completeOnboarding } = useInfluencerStore();
  const [formData, setFormData] = useState({
    displayName: '',
    socialHandle: '',
    niches: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNicheToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      niches: prev.niches.includes(value)
        ? prev.niches.filter((n) => n !== value)
        : [...prev.niches, value],
    }));
    if (errors.niches) {
      setErrors((prev) => ({ ...prev, niches: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    if (!formData.socialHandle.trim()) {
      newErrors.socialHandle = 'Social handle is required';
    }
    if (formData.niches.length === 0) {
      newErrors.niches = 'Please select at least one niche';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    completeOnboarding(formData);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <motion.div 
        className="relative w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl border border-accent bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-bold text-2xl">M</span>
            </div>
            <span className="font-semibold text-2xl tracking-tight">Merch Nest</span>
          </div>
          <h1 className="text-3xl font-semibold mb-2">Welcome, Creator! 🎉</h1>
          <p className="text-[#888]">Let&apos;s set up your profile to get you started</p>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          className="bg-[#111] border border-[#222] rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#888]">
                Display Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => {
                  setFormData({ ...formData, displayName: e.target.value });
                  if (errors.displayName) setErrors({ ...errors, displayName: '' });
                }}
                className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
                  errors.displayName ? 'border-red-500' : 'border-[#222]'
                } rounded-xl focus:outline-none focus:border-accent transition-colors`}
                placeholder="Your creator name (e.g., Priya Fashion)"
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
              )}
            </div>

            {/* Social Handle */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#888]">
                Social Handle <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]">@</span>
                <input
                  type="text"
                  value={formData.socialHandle.replace('@', '')}
                  onChange={(e) => {
                    setFormData({ ...formData, socialHandle: e.target.value.replace('@', '') });
                    if (errors.socialHandle) setErrors({ ...errors, socialHandle: '' });
                  }}
                  className={`w-full pl-8 pr-4 py-3 bg-[#0a0a0a] border ${
                    errors.socialHandle ? 'border-red-500' : 'border-[#222]'
                  } rounded-xl focus:outline-none focus:border-accent transition-colors`}
                  placeholder="your_instagram_handle"
                />
              </div>
              {errors.socialHandle && (
                <p className="text-red-500 text-sm mt-1">{errors.socialHandle}</p>
              )}
              <p className="text-[#666] text-xs mt-1">Your primary social media handle</p>
            </div>

            {/* Niches */}
            <div>
              <label className="block text-sm font-medium mb-3 text-[#888]">
                Select Your Niches <span className="text-red-500">*</span>
              </label>
              <p className="text-[#666] text-sm mb-4">
                Choose the categories that best describe your content. You can select multiple.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {NICHE_OPTIONS.map((niche) => (
                  <motion.button
                    key={niche.value}
                    type="button"
                    onClick={() => handleNicheToggle(niche.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.niches.includes(niche.value)
                        ? 'bg-accent/10 text-accent border-accent'
                        : 'bg-transparent border-[#222] text-[#888] hover:border-[#333]'
                    }`}
                  >
                    {niche.label}
                  </motion.button>
                ))}
              </div>
              {errors.niches && (
                <p className="text-red-500 text-sm mt-2">{errors.niches}</p>
              )}
            </div>

            {/* Selected Count */}
            {formData.niches.length > 0 && (
              <motion.div 
                className="p-4 bg-[#0a0a0a] border border-green-500/30 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-green-400 text-sm">
                  ✓ {formData.niches.length} niche{formData.niches.length > 1 ? 's' : ''} selected
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-accent hover:bg-accent-hover text-[#0a0a0a] font-semibold rounded-xl transition-colors border border-accent"
            >
              Complete Setup & Start Discovering
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          className="text-center text-[#666] text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You can update these details anytime from your profile settings
        </motion.p>
      </motion.div>
    </div>
  );
}
