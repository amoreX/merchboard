"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBrandStore } from '@/store/brandStore';
import { NICHE_OPTIONS } from '@/constants';

export default function BrandOnboarding() {
  const { completeOnboarding } = useBrandStore();
  const [formData, setFormData] = useState({
    companyName: '',
    categories: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCategoryToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((c) => c !== value)
        : [...prev.categories, value],
    }));
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (formData.categories.length === 0) {
      newErrors.categories = 'Please select at least one category';
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
            <div className="w-14 h-14 rounded-2xl border border-blue-500/50 bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-2xl">M</span>
            </div>
            <span className="font-semibold text-2xl tracking-tight">Merch Nest</span>
          </div>
          <h1 className="text-3xl font-semibold mb-2">Welcome, Brand Partner! 🚀</h1>
          <p className="text-[#888]">Let&apos;s set up your brand profile</p>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          className="bg-[#111] border border-[#222] rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#888]">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({ ...formData, companyName: e.target.value });
                  if (errors.companyName) setErrors({ ...errors, companyName: '' });
                }}
                className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
                  errors.companyName ? 'border-red-500' : 'border-[#222]'
                } rounded-xl focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder="Your brand or company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium mb-3 text-[#888]">
                What do you sell? <span className="text-red-500">*</span>
              </label>
              <p className="text-[#666] text-sm mb-4">
                Select the categories that match your products. You can select multiple.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {NICHE_OPTIONS.map((category) => (
                  <motion.button
                    key={category.value}
                    type="button"
                    onClick={() => handleCategoryToggle(category.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.categories.includes(category.value)
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/50'
                        : 'bg-transparent border-[#222] text-[#888] hover:border-[#333]'
                    }`}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
              {errors.categories && (
                <p className="text-red-500 text-sm mt-2">{errors.categories}</p>
              )}
            </div>

            {/* Selected Count */}
            {formData.categories.length > 0 && (
              <motion.div 
                className="p-4 bg-[#0a0a0a] border border-blue-500/30 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-blue-400 text-sm">
                  ✓ {formData.categories.length} categor{formData.categories.length > 1 ? 'ies' : 'y'} selected
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors border border-blue-500"
            >
              Complete Setup & Start Adding Products
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
