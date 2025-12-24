// Export all stores from a single entry point
// This makes imports cleaner and allows for easier refactoring

export { useAuthStore } from './authStore';
export type { UserRole, User } from './authStore';

export { useInfluencerStore } from './influencerStore';
export type { InfluencerProfile } from './influencerStore';

export { useBrandStore } from './brandStore';
export type { BrandProfile } from './brandStore';

export { useProductStore } from './productStore';
export type { CatalogProduct } from './productStore';

export { useAdminStore } from './adminStore';
