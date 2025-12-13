"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "Logo Hoodie", category: "Apparel", price: "$89.99", stock: 234, status: "Active", image: "🧥" },
  { id: 2, name: "Tour T-Shirt", category: "Apparel", price: "$34.99", stock: 189, status: "Active", image: "👕" },
  { id: 3, name: "Limited Edition Cap", category: "Accessories", price: "$29.99", stock: 56, status: "Low Stock", image: "🧢" },
  { id: 4, name: "Poster Bundle", category: "Collectibles", price: "$24.99", stock: 98, status: "Active", image: "🖼️" },
  { id: 5, name: "Vinyl Record", category: "Music", price: "$24.99", stock: 45, status: "Active", image: "💿" },
  { id: 6, name: "Phone Case", category: "Accessories", price: "$19.99", stock: 0, status: "Out of Stock", image: "📱" },
  { id: 7, name: "Tote Bag", category: "Accessories", price: "$15.99", stock: 123, status: "Active", image: "👜" },
  { id: 8, name: "Sticker Pack", category: "Collectibles", price: "$9.99", stock: 567, status: "Active", image: "🎨" },
];

export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", "Apparel", "Accessories", "Collectibles", "Music"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-foreground/50 mt-1">Manage your product inventory.</p>
        </div>
        <button className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === category
                  ? "bg-accent text-background"
                  : "bg-card border border-border text-foreground/60 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Product</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Category</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Price</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Stock</th>
                <th className="text-left text-sm font-medium text-foreground/60 px-6 py-4">Status</th>
                <th className="text-right text-sm font-medium text-foreground/60 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border/50 last:border-0 hover:bg-border/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-xl">
                        {product.image}
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/60">{product.category}</td>
                  <td className="px-6 py-4 font-medium">{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-400/10 text-green-400"
                          : product.status === "Low Stock"
                          ? "bg-yellow-400/10 text-yellow-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-400/10 transition-colors">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/60">
          Showing {filteredProducts.length} of {products.length} products
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-border/30 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-accent text-background rounded-lg text-sm font-medium">1</button>
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-border/30 transition-colors">
            2
          </button>
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-border/30 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

