"use client";

import { useState } from 'react';
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">Merch Nest</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome, Creator! 🎉</h1>
          <p className="text-foreground/60">Let&apos;s set up your profile to get you started</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Display Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => {
                  setFormData({ ...formData, displayName: e.target.value });
                  if (errors.displayName) setErrors({ ...errors, displayName: '' });
                }}
                className={`w-full px-4 py-3 bg-background border ${
                  errors.displayName ? 'border-red-500' : 'border-border'
                } rounded-xl focus:outline-none focus:border-accent transition-colors`}
                placeholder="Your creator name (e.g., Priya Fashion)"
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
              )}
            </div>

            {/* Social Handle */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Social Handle <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">@</span>
                <input
                  type="text"
                  value={formData.socialHandle.replace('@', '')}
                  onChange={(e) => {
                    setFormData({ ...formData, socialHandle: e.target.value.replace('@', '') });
                    if (errors.socialHandle) setErrors({ ...errors, socialHandle: '' });
                  }}
                  className={`w-full pl-8 pr-4 py-3 bg-background border ${
                    errors.socialHandle ? 'border-red-500' : 'border-border'
                  } rounded-xl focus:outline-none focus:border-accent transition-colors`}
                  placeholder="your_instagram_handle"
                />
              </div>
              {errors.socialHandle && (
                <p className="text-red-500 text-sm mt-1">{errors.socialHandle}</p>
              )}
              <p className="text-foreground/50 text-xs mt-1">Your primary social media handle</p>
            </div>

            {/* Niches */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Your Niches <span className="text-red-500">*</span>
              </label>
              <p className="text-foreground/50 text-sm mb-4">
                Choose the categories that best describe your content. You can select multiple.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {NICHE_OPTIONS.map((niche) => (
                  <button
                    key={niche.value}
                    type="button"
                    onClick={() => handleNicheToggle(niche.value)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.niches.includes(niche.value)
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                        : 'bg-background border-border hover:border-accent/50 text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {niche.label}
                  </button>
                ))}
              </div>
              {errors.niches && (
                <p className="text-red-500 text-sm mt-2">{errors.niches}</p>
              )}
            </div>

            {/* Selected Count */}
            {formData.niches.length > 0 && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-400 text-sm">
                  ✓ {formData.niches.length} niche{formData.niches.length > 1 ? 's' : ''} selected
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25"
            >
              Complete Setup & Start Discovering
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

