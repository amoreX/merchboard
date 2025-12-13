"use client";

import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    sku: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-foreground/50 mt-1">Create a new product listing for your store.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter product description"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  >
                    <option value="">Select category</option>
                    <option value="apparel">Apparel</option>
                    <option value="accessories">Accessories</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="music">Music</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g., HOODIE-001"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">$</span>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Product Variants</h2>
              <button className="text-sm text-accent hover:text-accent-hover transition-colors">+ Add Variant</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                <div className="flex-1">
                  <div className="text-sm font-medium">Size</div>
                  <div className="text-xs text-foreground/50">S, M, L, XL</div>
                </div>
                <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                  <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                <div className="flex-1">
                  <div className="text-sm font-medium">Color</div>
                  <div className="text-xs text-foreground/50">Black, White, Navy</div>
                </div>
                <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                  <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Product Image</h2>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-foreground/60 mb-1">Click to upload</p>
              <p className="text-xs text-foreground/40">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Product Status</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-border/20 cursor-pointer">
                <input type="radio" name="status" className="w-4 h-4 text-accent" defaultChecked />
                <div>
                  <div className="text-sm font-medium">Active</div>
                  <div className="text-xs text-foreground/50">Product is visible</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-border/20 cursor-pointer">
                <input type="radio" name="status" className="w-4 h-4 text-accent" />
                <div>
                  <div className="text-sm font-medium">Draft</div>
                  <div className="text-xs text-foreground/50">Product is hidden</div>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-accent text-background py-3 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
              Create Product
            </button>
            <button className="w-full bg-card border border-border py-3 rounded-lg text-sm font-medium hover:bg-border/30 transition-colors">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

