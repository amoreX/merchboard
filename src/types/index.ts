// ============================================
// Core Types & Interfaces for Merch Nest
// ============================================

// User & Authentication Types
export type UserRole = 'influencer' | 'brand' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Influencer Types
// ============================================

export interface InfluencerProfile {
  id: string;
  userId: string;
  bio: string;
  niche: string[];
  socials: SocialAccount[];
  storeUrl: string;
  storeActive: boolean;
  verified: boolean;
  tier: 'micro' | 'macro' | 'game_changer';
  followerCount: number;
  engagementRate: number;
}

export interface SocialAccount {
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  handle: string;
  followers: number;
  connected: boolean;
}

export interface InfluencerProduct {
  id: string;
  influencerId: string;
  name: string;
  brand: string;
  category: string;
  commission: number; // percentage
  price: number;
  imageUrl?: string;
  productUrl: string;
  type: 'curated' | 'campaign' | 'own';
  status: 'active' | 'pending' | 'hidden' | 'removed';
  clicks: number;
  sales: number;
  earnings: number;
  createdAt: Date;
}

export interface InfluencerCampaign {
  id: string;
  influencerId: string;
  brandId: string;
  brandName: string;
  title: string;
  description: string;
  commission: number;
  budget: number;
  deadline: Date;
  status: 'available' | 'accepted' | 'active' | 'completed' | 'rejected';
  products: string[]; // product IDs
  earnings: number;
  clicks: number;
  sales: number;
  createdAt: Date;
}

export interface AutoMessage {
  id: string;
  influencerId: string;
  keyword: string;
  template: string;
  status: 'active' | 'paused';
  deliveries: number;
  opens: number;
  clicks: number;
  createdAt: Date;
}

export interface Payout {
  id: string;
  userId: string;
  amount: number;
  method: 'bank' | 'upi';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  bankDetails?: BankDetails;
  upiId?: string;
  transactionId?: string;
  createdAt: Date;
  processedAt?: Date;
}

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  bankName: string;
}

// ============================================
// Brand Types
// ============================================

export interface BrandProfile {
  id: string;
  userId: string;
  companyName: string;
  description: string;
  website: string;
  category: string;
  targetAudience: string[];
  verified: boolean;
  logo?: string;
}

export interface BrandProduct {
  id: string;
  brandId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  commission: number;
  stock: number;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'out_of_stock';
  sales: number;
  clicks: number;
  createdAt: Date;
}

export interface BrandCampaign {
  id: string;
  brandId: string;
  name: string;
  description: string;
  influencerTier: 'micro' | 'macro' | 'game_changer' | 'all';
  budget: number;
  spent: number;
  commission: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'pending' | 'active' | 'paused' | 'completed' | 'rejected';
  products: string[]; // product IDs
  influencers: CampaignInfluencer[];
  totalSales: number;
  totalClicks: number;
  totalRevenue: number;
  createdAt: Date;
}

export interface CampaignInfluencer {
  influencerId: string;
  name: string;
  status: 'invited' | 'accepted' | 'rejected' | 'active';
  clicks: number;
  sales: number;
  earnings: number;
}

export interface InfluencerDiscovery {
  id: string;
  name: string;
  handle: string;
  niche: string;
  tier: 'micro' | 'macro' | 'game_changer';
  followers: number;
  engagementRate: number;
  avgSales: number;
  platforms: string[];
}

export interface BrandPayment {
  id: string;
  brandId: string;
  type: 'deposit' | 'campaign_spend' | 'refund';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  brandId: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paidAt?: Date;
  createdAt: Date;
}

// ============================================
// Admin Types
// ============================================

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  type: 'influencer' | 'brand';
  status: 'active' | 'pending' | 'suspended';
  niche: string;
  joinedAt: Date;
  lastActive: Date;
}

export interface AdminProduct {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  category: string;
  price: number;
  commission: number;
  status: 'pending' | 'approved' | 'rejected';
  reports: number;
  createdAt: Date;
}

export interface AdminCampaign {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  budget: number;
  status: 'pending' | 'approved' | 'active' | 'rejected' | 'completed';
  influencerCount: number;
  createdAt: Date;
}

export interface PlatformStats {
  totalGMV: number;
  activeCreators: number;
  activeBrands: number;
  platformRevenue: number;
  totalPayouts: number;
  pendingPayouts: number;
  messagesDelivered: number;
  messageDeliveryRate: number;
}

export interface MessageRule {
  id: string;
  name: string;
  maxPerHour: number;
  maxPerDay: number;
  cooldownMinutes: number;
  active: boolean;
}

export interface Report {
  id: string;
  type: 'product' | 'user' | 'campaign' | 'message';
  targetId: string;
  targetName: string;
  reporterId: string;
  reporterEmail: string;
  reason: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

export interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  updatedAt: Date;
}

// ============================================
// Support Types
// ============================================

export interface SupportTicket {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  category: 'payment' | 'campaign' | 'technical' | 'account' | 'other';
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  isAdmin: boolean;
  content: string;
  createdAt: Date;
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: 'sale' | 'campaign' | 'payout' | 'system' | 'message';
  title: string;
  description: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// ============================================
// Analytics Types
// ============================================

export interface AnalyticsPeriod {
  startDate: Date;
  endDate: Date;
  label: string;
}

export interface EarningsData {
  date: string;
  amount: number;
  source: 'product' | 'campaign';
}

export interface ClicksData {
  date: string;
  clicks: number;
  conversions: number;
}

export interface PerformanceMetrics {
  totalEarnings: number;
  totalClicks: number;
  totalConversions: number;
  conversionRate: number;
  avgOrderValue: number;
  topProducts: { name: string; earnings: number }[];
  topCampaigns: { name: string; earnings: number }[];
}
