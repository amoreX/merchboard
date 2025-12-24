"use client";

import { useState } from 'react';
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">Merch Nest</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome, Brand Partner! 🚀</h1>
          <p className="text-foreground/60">Let&apos;s set up your brand profile</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({ ...formData, companyName: e.target.value });
                  if (errors.companyName) setErrors({ ...errors, companyName: '' });
                }}
                className={`w-full px-4 py-3 bg-background border ${
                  errors.companyName ? 'border-red-500' : 'border-border'
                } rounded-xl focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder="Your brand or company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium mb-3">
                What do you sell? <span className="text-red-500">*</span>
              </label>
              <p className="text-foreground/50 text-sm mb-4">
                Select the categories that match your products. You can select multiple.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {NICHE_OPTIONS.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleCategoryToggle(category.value)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.categories.includes(category.value)
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/20'
                        : 'bg-background border-border hover:border-blue-500/50 text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              {errors.categories && (
                <p className="text-red-500 text-sm mt-2">{errors.categories}</p>
              )}
            </div>

            {/* Selected Count */}
            {formData.categories.length > 0 && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-400 text-sm">
                  ✓ {formData.categories.length} categor{formData.categories.length > 1 ? 'ies' : 'y'} selected
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
            >
              Complete Setup & Start Adding Products
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-foreground/40 text-sm mt-6">
          You can update these details anytime from your profile settings
        </p>
      </div>
    </div>
  );
}

