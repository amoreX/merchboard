"use client";

import { useState } from "react";

const categories = [
  { id: 1, name: "Apparel", products: 45, revenue: "$12,450", icon: "👕" },
  { id: 2, name: "Accessories", products: 28, revenue: "$5,230", icon: "🎒" },
  { id: 3, name: "Collectibles", products: 34, revenue: "$8,120", icon: "🏆" },
  { id: 4, name: "Music", products: 12, revenue: "$3,890", icon: "🎵" },
  { id: 5, name: "Art & Prints", products: 19, revenue: "$2,340", icon: "🎨" },
  { id: 6, name: "Home & Living", products: 8, revenue: "$1,560", icon: "🏠" },
];

export default function Categories() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-foreground/50 mt-1">Organize your products into categories.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl">
                {category.icon}
              </div>
              <button className="p-2 rounded-lg hover:bg-border/30 transition-colors opacity-0 group-hover:opacity-100">
                <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-foreground/60">
                <span className="text-foreground font-medium">{category.products}</span> products
              </div>
              <div className="text-foreground/60">
                <span className="text-foreground font-medium">{category.revenue}</span> revenue
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex gap-2">
              <button className="flex-1 text-sm text-foreground/60 hover:text-foreground transition-colors py-2 rounded-lg hover:bg-border/30">
                Edit
              </button>
              <button className="flex-1 text-sm text-foreground/60 hover:text-foreground transition-colors py-2 rounded-lg hover:bg-border/30">
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g., Electronics"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the category"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Icon</label>
                <div className="flex gap-2">
                  {["🎨", "🎵", "👕", "🎒", "🏆", "🏠"].map((emoji) => (
                    <button
                      key={emoji}
                      className="w-10 h-10 rounded-lg border border-border hover:border-accent flex items-center justify-center text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-border/30 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-medium hover:bg-accent-hover transition-colors">
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

