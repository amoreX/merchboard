// ============================================
// Centralized Constants & Dummy Data
// All static data is defined here for easy management
// Replace with API calls when connecting to a database
// ============================================

import {
  InfluencerProduct,
  InfluencerCampaign,
  AutoMessage,
  Payout,
  BrandProduct,
  BrandCampaign,
  InfluencerDiscovery,
  BrandPayment,
  Invoice,
  AdminUser,
  AdminProduct,
  AdminCampaign,
  Report,
  PlatformStats,
  FeatureToggle,
  MessageRule,
  Notification,
} from '@/types';

// ============================================
// Navigation & Tab Configurations
// ============================================

export type InfluencerTab = 'overview' | 'profile' | 'discover' | 'my-products' | 'skipped';
export type BrandTab = 'overview' | 'profile' | 'products';
export type AdminTab = 'overview' | 'users' | 'products' | 'campaigns' | 'messaging' | 'analytics' | 'payments' | 'moderation' | 'system';

export const INFLUENCER_TABS: { id: InfluencerTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'discover', label: 'Discover Products', icon: 'search' },
  { id: 'my-products', label: 'My Products', icon: 'shopping-bag' },
  { id: 'skipped', label: 'Skipped', icon: 'x-circle' },
];

export const BRAND_TABS: { id: BrandTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'profile', label: 'Brand Profile', icon: 'building' },
  { id: 'products', label: 'Products', icon: 'box' },
];

// ============================================
// Niche/Category Options (Shared)
// ============================================

export const NICHE_OPTIONS = [
  { value: 'fashion-style', label: 'Fashion & Style' },
  { value: 'beauty-skincare', label: 'Beauty & Skincare' },
  { value: 'fitness-health', label: 'Fitness & Health' },
  { value: 'technology-gadgets', label: 'Technology & Gadgets' },
  { value: 'food-cooking', label: 'Food & Cooking' },
  { value: 'travel-lifestyle', label: 'Travel & Lifestyle' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'home-decor', label: 'Home & Decor' },
  { value: 'parenting-family', label: 'Parenting & Family' },
  { value: 'finance-business', label: 'Finance & Business' },
];

export const ADMIN_TABS: { id: AdminTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'products', label: 'Products', icon: 'box' },
  { id: 'campaigns', label: 'Campaigns', icon: 'megaphone' },
  { id: 'messaging', label: 'Messaging', icon: 'chat' },
  { id: 'analytics', label: 'Analytics', icon: 'chart' },
  { id: 'payments', label: 'Payments', icon: 'wallet' },
  { id: 'moderation', label: 'Moderation', icon: 'shield' },
  { id: 'system', label: 'System', icon: 'cog' },
];

// ============================================
// Landing Page Data
// ============================================

export const LANDING_CREATORS = [
  { name: 'Malvika Sitlani', handle: '@malvikasitlani', followers: '707K', platform: 'Instagram' },
  { name: 'Aditi Shreshtha', handle: '@thatquirkymissaditi', followers: '1M', platform: 'YouTube' },
  { name: 'Simran Balarjain', handle: '@simranbalarjain', followers: '1M', platform: 'Instagram' },
  { name: 'Kritika Khurana', handle: '@thatbohogirll', followers: '2M', platform: 'Instagram' },
  { name: 'Anushka Hazra', handle: '@anushkahazraa', followers: '569K', platform: 'Instagram' },
  { name: 'Zuola', handle: '@zuola', followers: '201K', platform: 'Instagram' },
  { name: 'Kinnari Jain', handle: '@thepearshapedstylist', followers: '591K', platform: 'Instagram' },
  { name: 'Suman Kothari', handle: '@lifestylediaryy', followers: '473K', platform: 'Instagram' },
];

export const LANDING_BRANDS = ['Nykaa', 'Myntra', 'AJIO', 'Flipkart', 'H&M', 'Urbanic', 'Meesho', 'Snitch', 'Libas', 'Foxtale'];

export const LANDING_FEATURE_CARDS = [
  {
    title: 'Monetize 100% of your content',
    description: 'Earn commissions on every post with huge rewards',
    icon: 'wallet',
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    title: 'Connect with 250+ Brands',
    description: 'Partner with leading brands for collaborations',
    icon: 'handshake',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Boost your influence',
    description: 'Grow your followers and engagement',
    icon: 'trending-up',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Instant link sharing',
    description: 'Share product links with one click',
    icon: 'link',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
];

export const LANDING_STEPS = [
  {
    number: '01',
    title: 'Sign up on Merch Nest',
    description: 'Complete the signup process and create your Merch Nest account',
  },
  {
    number: '02',
    title: 'Link your social media',
    description: 'Connect your Instagram, YouTube, or TikTok account',
  },
  {
    number: '03',
    title: 'Kickstart your earnings',
    description: 'Create your first post, share the link with your audience and begin your earning spree',
  },
];

export const LANDING_TESTIMONIAL_CARDS = [
  {
    name: 'Sana Grover',
    handle: '@sanagrover',
    followers: '505K',
    quote: "I've been on YouTube for the last 07 years and always wished that there was a platform like Merch Nest. It is truly revolutionary as it makes it incredibly simple to share product links in my videos and Instagram DMs.",
  },
  {
    name: 'Vaibhav Keswani',
    handle: '@pehenawah',
    followers: '625K',
    quote: 'Merch Nest has been a game-changer for me as it has opened up a sustainable source of income that perfectly complements my YouTube and Instagram. The seamless way of sharing product links has saved me countless hours.',
  },
  {
    name: 'Naveli Khatri',
    handle: '@navelikhatri',
    followers: '206K',
    quote: "Merch Nest has revolutionized my content creation! As a fashion content Creator, I'm now earning 2-3L monthly by sharing product links on Instagram stories and posts. Monetizing 100% of my content has never been easier.",
  },
];

export const LANDING_FAQ_ITEMS = [
  {
    question: 'How does the Merch Nest Creator payout process work?',
    answer: 'Creator payout in a month will include all the commissions that get confirmed by the brand in that month and any earnings via rewards and referral program. Payments are processed on the last day of the month and will be in your bank account shortly after.',
  },
  {
    question: 'How does Merch Nest help Creators grow?',
    answer: 'Struggling with creative block or unsure about profitable content? The Merch Nest Creator Success Team guides you through content strategies to fuel your growth and maximize earnings.',
  },
  {
    question: 'Will Brands control my content?',
    answer: "No deadlines or content demands. You're the boss of your own creative journey.",
  },
  {
    question: 'Do Merch Nest Creators receive exclusive Brand information?',
    answer: 'Yes, get early alerts on upcoming sales, topical days & more to plan your content better and enhance your revenue.',
  },
  {
    question: "Can Merch Nest's brand commissions surpass my current collab earnings?",
    answer: 'Yes, Merch Nest offers a stable, recurring income stream that can complement and even surpass your existing brand collaborations.',
  },
];

export const LANDING_CATEGORIES = [
  { name: 'Fashion', count: 180, icon: 'dress' },
  { name: 'Beauty & Wellness', count: 120, icon: 'paint' },
  { name: 'Home Decor', count: 130, icon: 'home' },
  { name: 'Lifestyle', count: 50, icon: 'sparkles' },
  { name: 'Travel', count: 100, icon: 'plane' },
];

export const LANDING_FEATURES = [
  {
    icon: 'link',
    title: 'Smart Affiliate Links',
    description: 'Generate trackable links for any product. Share once, earn forever with our intelligent attribution system.',
  },
  {
    icon: 'robot',
    title: 'Auto-DM Magic',
    description: 'Set up keyword triggers and let our AI respond to DMs instantly with your product links.',
  },
  {
    icon: 'chart',
    title: 'Real-Time Analytics',
    description: 'Track every click, conversion, and commission in real-time. Know exactly what\'s working.',
  },
  {
    icon: 'wallet',
    title: 'Instant Payouts',
    description: 'Get paid weekly via UPI or bank transfer. No minimum threshold, no waiting around.',
  },
  {
    icon: 'shopping-bag',
    title: 'Personal Storefront',
    description: 'Your own branded store page showcasing all your recommended products in one place.',
  },
  {
    icon: 'handshake',
    title: 'Brand Collaborations',
    description: 'Get discovered by top brands looking for creators like you. Exclusive deals, higher commissions.',
  },
];

export const LANDING_TESTIMONIALS = [
  {
    quote: 'Merch Nest literally changed my life. I went from making ₹5K/month to ₹2L/month just by recommending products I already use!',
    author: 'Priya Sharma',
    role: 'Fashion Creator, 500K followers',
    avatar: 'PS',
  },
  {
    quote: 'The auto-DM feature is insane. I wake up to sales notifications. My followers get instant responses, and I don\'t have to do anything.',
    author: 'Rahul Mehta',
    role: 'Tech Reviewer, 1.2M followers',
    avatar: 'RM',
  },
  {
    quote: 'Finally, a platform that understands Indian creators. UPI payouts, great brand deals, and a support team that actually responds!',
    author: 'Ananya Singh',
    role: 'Lifestyle Influencer, 300K followers',
    avatar: 'AS',
  },
];

export const LANDING_FAQS = [
  {
    question: 'How much can I really earn?',
    answer: 'Earnings depend on your audience and niche, but our top creators earn ₹5-50 lakhs per month. Even micro-influencers with 10K followers regularly earn ₹20-50K monthly.',
  },
  {
    question: 'Is there any cost to join?',
    answer: 'Absolutely free! We only make money when you make money. No hidden fees, no subscriptions, no catches.',
  },
  {
    question: 'How does the Auto-DM feature work?',
    answer: 'You set up keywords (like "link" or "buy") and template responses. When followers DM you with those keywords, we automatically reply with your product links. It works 24/7!',
  },
  {
    question: 'When and how do I get paid?',
    answer: 'Payouts happen every week on Monday. You can withdraw via UPI (instant) or bank transfer (1-2 days). No minimum threshold required.',
  },
  {
    question: 'Which brands can I work with?',
    answer: 'We partner with 500+ brands across fashion, beauty, tech, lifestyle, and more. From Nykaa to H&M, from boAt to Myntra. The bigger your audience, the more exclusive deals you unlock.',
  },
];

// ============================================
// Role Selection Data
// ============================================

export const ROLE_OPTIONS = [
  {
    id: 'influencer' as const,
    title: 'Influencer / Creator',
    description: 'Monetize your content, partner with brands, and grow your earnings from Day 1',
    icon: 'target',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'hover:border-purple-500/50',
    features: [
      'Personal store & product curation',
      'Brand campaign opportunities',
      'Automated DM messaging',
      'Analytics & earnings tracking',
    ],
  },
  {
    id: 'brand' as const,
    title: 'Brand / Business',
    description: 'Find the right creators, launch campaigns, and scale your sales',
    icon: 'building',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500/50',
    features: [
      'Influencer discovery & filtering',
      'Campaign management',
      'Performance analytics',
      'ROI & conversion tracking',
    ],
  },
  {
    id: 'admin' as const,
    title: 'Admin',
    description: 'Control, scale, and protect the platform with full administrative access',
    icon: 'cog',
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'hover:border-orange-500/50',
    features: [
      'User & content management',
      'Platform-wide analytics',
      'Payment & payout control',
      'System health monitoring',
    ],
  },
];

// ============================================
// Support & Help Center Data
// ============================================

export const HELP_CENTER_ITEMS = [
  { title: 'Getting Started', desc: 'Learn the basics', icon: 'rocket' },
  { title: 'Creating Content', desc: 'Maximize earnings', icon: 'document' },
  { title: 'Payments FAQ', desc: 'Payout questions', icon: 'credit-card' },
  { title: 'Auto-Messaging', desc: 'Setup guide', icon: 'chat' },
  { title: 'Campaigns', desc: 'Collaboration rules', icon: 'clipboard' },
  { title: 'Integrations', desc: 'Connect platforms', icon: 'plug' },
];

export const BRAND_HELP_ITEMS = [
  { title: 'Brand Guidelines', desc: 'Platform rules', icon: 'clipboard' },
  { title: 'Campaign Help', desc: 'Creating campaigns', icon: 'megaphone' },
  { title: 'Payment Support', desc: 'Billing queries', icon: 'credit-card' },
];

export const HELP_RESOURCES = [
  { title: 'Getting Started Guide', description: 'Learn the basics of setting up your store', icon: 'book' },
  { title: 'Video Tutorials', description: 'Watch step-by-step guides', icon: 'video' },
  { title: 'API Documentation', description: 'Integrate with our API', icon: 'code' },
  { title: 'Community Forum', description: 'Connect with other sellers', icon: 'chat' },
];

export const COMMON_FAQS = [
  { question: 'How do I track my sales?', answer: 'Navigate to the Analytics tab to view all your sales data in real-time.' },
  { question: 'When will I receive my payment?', answer: 'Payments are processed every Monday. You can check your payment status in the Payments section.' },
  { question: 'How do I contact support?', answer: 'You can reach our support team through the Help Center or by emailing support@merchnest.com.' },
  { question: 'Can I customize my store?', answer: 'Yes! Visit the Store settings to customize your store appearance and branding.' },
];

export const SUPPORT_CATEGORIES = [
  { value: 'payment', label: 'Payment Issues' },
  { value: 'campaign', label: 'Campaign Support' },
  { value: 'technical', label: 'Technical Problems' },
  { value: 'account', label: 'Account Issues' },
  { value: 'other', label: 'Other' },
];

// ============================================
// Product Categories
// ============================================

export const PRODUCT_CATEGORIES = [
  { id: 1, name: 'Apparel', products: 45, revenue: '₹12,450', icon: 'shirt' },
  { id: 2, name: 'Accessories', products: 28, revenue: '₹5,230', icon: 'backpack' },
  { id: 3, name: 'Collectibles', products: 34, revenue: '₹8,120', icon: 'trophy' },
  { id: 4, name: 'Music', products: 12, revenue: '₹3,890', icon: 'music' },
  { id: 5, name: 'Art & Prints', products: 19, revenue: '₹2,340', icon: 'paint' },
  { id: 6, name: 'Home & Living', products: 8, revenue: '₹1,560', icon: 'home' },
];

export const CATEGORY_OPTIONS = [
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Beauty', label: 'Beauty' },
  { value: 'Skincare', label: 'Skincare' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Tech', label: 'Tech' },
  { value: 'Home', label: 'Home & Living' },
];

export const BRAND_CATEGORY_OPTIONS = [
  { value: 'Skincare', label: 'Skincare' },
  { value: 'Makeup', label: 'Makeup' },
  { value: 'Haircare', label: 'Haircare' },
  { value: 'Fragrance', label: 'Fragrance' },
];

// ============================================
// Social Platforms
// ============================================

export const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'camera' },
  { id: 'youtube', name: 'YouTube', icon: 'play' },
  { id: 'tiktok', name: 'TikTok', icon: 'music' },
  { id: 'twitter', name: 'Twitter', icon: 'chat' },
];

// ============================================
// Influencer Tier Options
// ============================================

export const INFLUENCER_TIER_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'micro', label: 'Micro (10K-100K)' },
  { value: 'macro', label: 'Macro (100K-1M)' },
  { value: 'game_changer', label: 'Game Changer (1M+)' },
];

export const INFLUENCER_NICHE_OPTIONS = [
  { value: 'all', label: 'All Niches' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'tech', label: 'Tech' },
];

// ============================================
// Payment Methods
// ============================================

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card', desc: 'Visa, Mastercard, RuPay' },
  { id: 'upi', name: 'UPI', icon: 'phone', desc: 'GPay, PhonePe, Paytm' },
  { id: 'netbanking', name: 'Net Banking', icon: 'bank', desc: 'All major banks' },
  { id: 'wallet', name: 'Wallet', icon: 'wallet', desc: 'Paytm, Amazon Pay' },
];

export const QUICK_AMOUNT_OPTIONS = [10000, 25000, 50000, 100000];

// ============================================
// Admin System Services
// ============================================

export const SYSTEM_SERVICES = [
  { name: 'Message Queue', status: 'Running', processed: '45,678/day', icon: 'send' },
  { name: 'Payment Processor', status: 'Running', processed: '234 txns/day', icon: 'credit-card' },
  { name: 'Analytics Pipeline', status: 'Running', processed: '1.2M events/day', icon: 'chart' },
];

export const REVENUE_CATEGORIES = [
  { category: 'Beauty & Skincare', gmv: '₹85L', rate: '2.5%', revenue: '₹2.12L' },
  { category: 'Fashion', gmv: '₹1.2Cr', rate: '2%', revenue: '₹2.4L' },
  { category: 'Lifestyle', gmv: '₹45L', rate: '3%', revenue: '₹1.35L' },
];

// ============================================
// Helper to generate unique IDs
// ============================================

export const generateId = () => Math.random().toString(36).substring(2, 15);

// ============================================
// Mock Entity Data (for stores)
// ============================================

export const MOCK_INFLUENCER_PRODUCTS: InfluencerProduct[] = [
  {
    id: generateId(),
    influencerId: 'current-user',
    name: 'Nykaa Lipstick Set',
    brand: 'Nykaa',
    category: 'Makeup',
    commission: 12,
    price: 899,
    productUrl: 'https://nykaa.com/product',
    type: 'curated',
    status: 'active',
    clicks: 1234,
    sales: 89,
    earnings: 4560,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    name: 'H&M Summer Collection',
    brand: 'H&M',
    category: 'Fashion',
    commission: 8,
    price: 1299,
    productUrl: 'https://hm.com/product',
    type: 'campaign',
    status: 'active',
    clicks: 892,
    sales: 45,
    earnings: 2340,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    name: 'Foxtale Vitamin C Serum',
    brand: 'Foxtale',
    category: 'Skincare',
    commission: 15,
    price: 599,
    productUrl: 'https://foxtale.com/product',
    type: 'curated',
    status: 'active',
    clicks: 2341,
    sales: 156,
    earnings: 7890,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    name: 'Myntra Ethnic Wear',
    brand: 'Myntra',
    category: 'Fashion',
    commission: 10,
    price: 2499,
    productUrl: 'https://myntra.com/product',
    type: 'campaign',
    status: 'pending',
    clicks: 567,
    sales: 23,
    earnings: 1230,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    name: 'My Custom T-Shirt',
    brand: 'Own Brand',
    category: 'Fashion',
    commission: 100,
    price: 799,
    productUrl: 'https://mystore.com/tshirt',
    type: 'own',
    status: 'active',
    clicks: 234,
    sales: 12,
    earnings: 9588,
    createdAt: new Date('2024-02-15'),
  },
];

export const MOCK_INFLUENCER_CAMPAIGNS: InfluencerCampaign[] = [
  {
    id: generateId(),
    influencerId: 'current-user',
    brandId: 'brand-1',
    brandName: 'Nykaa',
    title: 'Summer Beauty Campaign',
    description: 'Promote our summer beauty collection to your followers',
    commission: 15,
    budget: 50000,
    deadline: new Date('2024-03-15'),
    status: 'active',
    products: [],
    earnings: 12500,
    clicks: 3456,
    sales: 89,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    brandId: 'brand-2',
    brandName: 'H&M',
    title: 'Spring Fashion Launch',
    description: 'Be part of our spring collection launch campaign',
    commission: 12,
    budget: 75000,
    deadline: new Date('2024-03-28'),
    status: 'available',
    products: [],
    earnings: 0,
    clicks: 0,
    sales: 0,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    brandId: 'brand-3',
    brandName: 'AJIO',
    title: 'Weekend Sale Promo',
    description: 'Exclusive weekend sale promotion opportunity',
    commission: 18,
    budget: 30000,
    deadline: new Date('2024-02-28'),
    status: 'completed',
    products: [],
    earnings: 8900,
    clicks: 2341,
    sales: 67,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    brandId: 'brand-4',
    brandName: 'Foxtale',
    title: 'Skincare Routine Challenge',
    description: 'Create content around your skincare routine featuring our products',
    commission: 20,
    budget: 40000,
    deadline: new Date('2024-04-01'),
    status: 'available',
    products: [],
    earnings: 0,
    clicks: 0,
    sales: 0,
    createdAt: new Date('2024-02-25'),
  },
];

export const MOCK_AUTO_MESSAGES: AutoMessage[] = [
  {
    id: generateId(),
    influencerId: 'current-user',
    keyword: 'LINK',
    template: "Hey! 👋 Thanks for reaching out! Here's the link you requested: {PRODUCT_LINK}\n\nHappy shopping! 🛍️",
    status: 'active',
    deliveries: 1234,
    opens: 890,
    clicks: 456,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    keyword: 'BUY',
    template: "Hi {USER_NAME}! 🌟 Ready to shop? Here's your exclusive link: {PRODUCT_LINK}\n\nUse code CREATOR10 for extra 10% off!",
    status: 'active',
    deliveries: 567,
    opens: 345,
    clicks: 178,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: generateId(),
    influencerId: 'current-user',
    keyword: 'SHOP',
    template: "Hey there! 🛒 Check out my favorite picks: {PRODUCT_LINK}\n\nLet me know if you have any questions!",
    status: 'paused',
    deliveries: 234,
    opens: 123,
    clicks: 67,
    createdAt: new Date('2024-02-01'),
  },
];

export const MOCK_PAYOUTS: Payout[] = [
  {
    id: generateId(),
    userId: 'current-user',
    amount: 15000,
    method: 'bank',
    status: 'completed',
    bankDetails: {
      accountNumber: '****1234',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'Creator Name',
      bankName: 'HDFC Bank',
    },
    transactionId: 'TXN' + Date.now(),
    createdAt: new Date('2024-02-15'),
    processedAt: new Date('2024-02-16'),
  },
  {
    id: generateId(),
    userId: 'current-user',
    amount: 22500,
    method: 'bank',
    status: 'completed',
    bankDetails: {
      accountNumber: '****1234',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'Creator Name',
      bankName: 'HDFC Bank',
    },
    transactionId: 'TXN' + (Date.now() - 1000000),
    createdAt: new Date('2024-01-30'),
    processedAt: new Date('2024-01-31'),
  },
  {
    id: generateId(),
    userId: 'current-user',
    amount: 18000,
    method: 'upi',
    status: 'completed',
    upiId: 'creator@upi',
    transactionId: 'TXN' + (Date.now() - 2000000),
    createdAt: new Date('2024-01-15'),
    processedAt: new Date('2024-01-15'),
  },
];

export const MOCK_BRAND_PRODUCTS: BrandProduct[] = [
  {
    id: generateId(),
    brandId: 'current-brand',
    name: 'Vitamin C Serum',
    description: 'Brightening vitamin C serum for radiant skin',
    category: 'Skincare',
    price: 599,
    commission: 12,
    stock: 250,
    status: 'approved',
    sales: 1234,
    clicks: 5678,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: generateId(),
    brandId: 'current-brand',
    name: 'Lipstick Collection',
    description: 'Long-lasting matte lipstick collection',
    category: 'Makeup',
    price: 899,
    commission: 15,
    stock: 180,
    status: 'approved',
    sales: 892,
    clicks: 3456,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: generateId(),
    brandId: 'current-brand',
    name: 'Hair Serum Pro',
    description: 'Professional hair serum for smooth, frizz-free hair',
    category: 'Haircare',
    price: 799,
    commission: 10,
    stock: 0,
    status: 'out_of_stock',
    sales: 567,
    clicks: 2345,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: generateId(),
    brandId: 'current-brand',
    name: 'New Eye Palette',
    description: 'Limited edition eyeshadow palette with 12 shades',
    category: 'Makeup',
    price: 1299,
    commission: 18,
    stock: 500,
    status: 'pending',
    sales: 0,
    clicks: 0,
    createdAt: new Date('2024-02-20'),
  },
];

export const MOCK_BRAND_CAMPAIGNS: BrandCampaign[] = [
  {
    id: generateId(),
    brandId: 'current-brand',
    name: 'Summer Beauty Campaign',
    description: 'Promote our summer collection',
    influencerTier: 'all',
    budget: 50000,
    spent: 32500,
    commission: 15,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-15'),
    status: 'active',
    products: [],
    influencers: [
      { influencerId: '1', name: 'Malvika Sitlani', status: 'active', clicks: 2341, sales: 89, earnings: 12500 },
      { influencerId: '2', name: 'Kritika Khurana', status: 'active', clicks: 1892, sales: 67, earnings: 9800 },
    ],
    totalSales: 234,
    totalClicks: 8567,
    totalRevenue: 125000,
    createdAt: new Date('2024-01-25'),
  },
  {
    id: generateId(),
    brandId: 'current-brand',
    name: 'Spring Fashion Launch',
    description: 'New spring collection launch campaign',
    influencerTier: 'macro',
    budget: 75000,
    spent: 45000,
    commission: 12,
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-03-30'),
    status: 'active',
    products: [],
    influencers: [
      { influencerId: '3', name: 'Anushka Hazra', status: 'active', clicks: 3456, sales: 123, earnings: 18500 },
    ],
    totalSales: 456,
    totalClicks: 12345,
    totalRevenue: 280000,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: generateId(),
    brandId: 'current-brand',
    name: 'Weekend Sale Promo',
    description: 'Flash sale promotion',
    influencerTier: 'micro',
    budget: 30000,
    spent: 30000,
    commission: 18,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-01-27'),
    status: 'completed',
    products: [],
    influencers: [],
    totalSales: 189,
    totalClicks: 5678,
    totalRevenue: 95000,
    createdAt: new Date('2024-01-15'),
  },
];

export const MOCK_INFLUENCER_DISCOVERY: InfluencerDiscovery[] = [
  {
    id: '1',
    name: 'Malvika Sitlani',
    handle: '@malvikasitlani',
    niche: 'Beauty',
    tier: 'macro',
    followers: 707000,
    engagementRate: 4.2,
    avgSales: 156,
    platforms: ['Instagram', 'YouTube'],
  },
  {
    id: '2',
    name: 'Kritika Khurana',
    handle: '@thatbohogirll',
    niche: 'Fashion',
    tier: 'game_changer',
    followers: 2000000,
    engagementRate: 3.8,
    avgSales: 342,
    platforms: ['Instagram'],
  },
  {
    id: '3',
    name: 'Anushka Hazra',
    handle: '@anushkahazraa',
    niche: 'Lifestyle',
    tier: 'macro',
    followers: 569000,
    engagementRate: 5.1,
    avgSales: 89,
    platforms: ['Instagram', 'YouTube'],
  },
  {
    id: '4',
    name: 'Zuola',
    handle: '@zuola',
    niche: 'Fashion',
    tier: 'micro',
    followers: 201000,
    engagementRate: 6.2,
    avgSales: 45,
    platforms: ['Instagram'],
  },
  {
    id: '5',
    name: 'Kinnari Jain',
    handle: '@thepearshapedstylist',
    niche: 'Fashion',
    tier: 'macro',
    followers: 591000,
    engagementRate: 4.8,
    avgSales: 78,
    platforms: ['Instagram', 'YouTube'],
  },
  {
    id: '6',
    name: 'Suman Kothari',
    handle: '@lifestylediaryy',
    niche: 'Lifestyle',
    tier: 'micro',
    followers: 473000,
    engagementRate: 5.5,
    avgSales: 56,
    platforms: ['Instagram'],
  },
];

export const MOCK_BRAND_PAYMENTS: BrandPayment[] = [
  {
    id: generateId(),
    brandId: 'current-brand',
    type: 'deposit',
    amount: 50000,
    description: 'Wallet top-up',
    status: 'completed',
    transactionId: 'TXN' + Date.now(),
    createdAt: new Date('2024-02-10'),
  },
  {
    id: generateId(),
    brandId: 'current-brand',
    type: 'campaign_spend',
    amount: -32500,
    description: 'Campaign: Summer Beauty',
    status: 'completed',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: generateId(),
    brandId: 'current-brand',
    type: 'campaign_spend',
    amount: -45000,
    description: 'Campaign: Spring Fashion',
    status: 'completed',
    createdAt: new Date('2024-02-01'),
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-001',
    brandId: 'current-brand',
    amount: 50000,
    description: 'Campaign budget - Summer Beauty',
    status: 'paid',
    dueDate: new Date('2024-02-20'),
    paidAt: new Date('2024-02-15'),
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'INV-002',
    brandId: 'current-brand',
    amount: 32500,
    description: 'Campaign budget - Spring Fashion',
    status: 'paid',
    dueDate: new Date('2024-02-10'),
    paidAt: new Date('2024-02-05'),
    createdAt: new Date('2024-01-25'),
  },
];

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: '1',
    name: 'Malvika Sitlani',
    email: 'malvika@example.com',
    type: 'influencer',
    status: 'active',
    niche: 'Beauty',
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date(),
  },
  {
    id: '2',
    name: 'Kritika Khurana',
    email: 'kritika@example.com',
    type: 'influencer',
    status: 'active',
    niche: 'Fashion',
    joinedAt: new Date('2024-02-20'),
    lastActive: new Date(),
  },
  {
    id: '3',
    name: 'Nykaa Beauty',
    email: 'brand@nykaa.com',
    type: 'brand',
    status: 'active',
    niche: 'Skincare',
    joinedAt: new Date('2023-11-10'),
    lastActive: new Date(),
  },
  {
    id: '4',
    name: 'H&M India',
    email: 'brand@hm.com',
    type: 'brand',
    status: 'pending',
    niche: 'Fashion',
    joinedAt: new Date('2024-03-01'),
    lastActive: new Date('2024-03-01'),
  },
  {
    id: '5',
    name: 'Test User',
    email: 'test@spam.com',
    type: 'influencer',
    status: 'suspended',
    niche: 'Unknown',
    joinedAt: new Date('2024-03-10'),
    lastActive: new Date('2024-03-10'),
  },
];

export const MOCK_ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: '1',
    name: 'Vitamin C Serum',
    brand: 'Nykaa',
    brandId: 'brand-1',
    category: 'Skincare',
    price: 599,
    commission: 12,
    status: 'approved',
    reports: 0,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Fake Designer Bag',
    brand: 'Unknown Seller',
    brandId: 'brand-x',
    category: 'Fashion',
    price: 999,
    commission: 25,
    status: 'pending',
    reports: 5,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Summer Dress',
    brand: 'H&M',
    brandId: 'brand-2',
    category: 'Fashion',
    price: 1299,
    commission: 10,
    status: 'approved',
    reports: 0,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    name: 'Suspicious Product',
    brand: 'Spam Brand',
    brandId: 'brand-y',
    category: 'Other',
    price: 99,
    commission: 50,
    status: 'rejected',
    reports: 12,
    createdAt: new Date('2024-02-15'),
  },
];

export const MOCK_ADMIN_CAMPAIGNS: AdminCampaign[] = [
  {
    id: '1',
    name: 'Summer Beauty',
    brand: 'Nykaa',
    brandId: 'brand-1',
    budget: 50000,
    status: 'active',
    influencerCount: 12,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    name: 'Spring Fashion',
    brand: 'H&M',
    brandId: 'brand-2',
    budget: 75000,
    status: 'pending',
    influencerCount: 0,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Fake Campaign',
    brand: 'Spam Brand',
    brandId: 'brand-y',
    budget: 100000,
    status: 'rejected',
    influencerCount: 0,
    createdAt: new Date('2024-02-25'),
  },
];

export const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    type: 'product',
    targetId: '2',
    targetName: 'Fake Designer Bag',
    reporterId: 'user-1',
    reporterEmail: 'user@email.com',
    reason: 'Counterfeit goods',
    status: 'pending',
    createdAt: new Date('2024-02-22'),
  },
  {
    id: '2',
    type: 'user',
    targetId: '5',
    targetName: 'SpamAccount123',
    reporterId: 'brand-1',
    reporterEmail: 'brand@company.com',
    reason: 'Spam activity',
    status: 'pending',
    createdAt: new Date('2024-02-23'),
  },
  {
    id: '3',
    type: 'campaign',
    targetId: '3',
    targetName: 'Misleading Promo',
    reporterId: 'user-2',
    reporterEmail: 'creator@email.com',
    reason: 'False claims',
    status: 'investigating',
    createdAt: new Date('2024-02-24'),
  },
];

export const MOCK_PLATFORM_STATS: PlatformStats = {
  totalGMV: 25000000,
  activeCreators: 15234,
  activeBrands: 256,
  platformRevenue: 2500000,
  totalPayouts: 4500000,
  pendingPayouts: 320000,
  messagesDelivered: 4567800,
  messageDeliveryRate: 98.5,
};

export const MOCK_FEATURE_TOGGLES: FeatureToggle[] = [
  {
    id: '1',
    name: 'Auto-DM Messaging',
    description: 'Allow creators to use automated DM responses',
    enabled: true,
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Brand Campaigns',
    description: 'Enable brand campaign creation',
    enabled: true,
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'New User Onboarding',
    description: 'Show onboarding flow for new users',
    enabled: true,
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    name: 'Beta Features',
    description: 'Enable experimental features',
    enabled: false,
    updatedAt: new Date('2024-02-15'),
  },
];

export const MOCK_MESSAGE_RULES: MessageRule[] = [
  {
    id: '1',
    name: 'Default Rate Limit',
    maxPerHour: 50,
    maxPerDay: 500,
    cooldownMinutes: 5,
    active: true,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: generateId(),
    userId: 'current-user',
    type: 'sale',
    title: 'New sale from Nykaa Lipstick Set',
    description: 'You earned ₹108 from this sale',
    read: false,
    actionUrl: '/dashboard',
    createdAt: new Date(Date.now() - 120000),
  },
  {
    id: generateId(),
    userId: 'current-user',
    type: 'campaign',
    title: 'H&M campaign approved',
    description: 'Your application for Spring Fashion Launch has been accepted',
    read: false,
    actionUrl: '/dashboard',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: generateId(),
    userId: 'current-user',
    type: 'payout',
    title: 'Payout of ₹12,500 processed',
    description: 'Amount has been transferred to your bank account',
    read: true,
    actionUrl: '/dashboard',
    createdAt: new Date(Date.now() - 86400000),
  },
];

export const MOCK_PENDING_PAYOUTS: Payout[] = [
  {
    id: generateId(),
    userId: 'user-1',
    amount: 45000,
    method: 'bank',
    status: 'pending',
    bankDetails: {
      accountNumber: '****1234',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'Malvika Sitlani',
      bankName: 'HDFC Bank',
    },
    createdAt: new Date(),
  },
  {
    id: generateId(),
    userId: 'user-2',
    amount: 78000,
    method: 'bank',
    status: 'pending',
    bankDetails: {
      accountNumber: '****5678',
      ifscCode: 'ICICI0005678',
      accountHolderName: 'Kritika Khurana',
      bankName: 'ICICI Bank',
    },
    createdAt: new Date(),
  },
  {
    id: generateId(),
    userId: 'user-3',
    amount: 32000,
    method: 'upi',
    status: 'pending',
    upiId: 'anushka@upi',
    createdAt: new Date(),
  },
];

// ============================================
// Default Auto-DM Template
// ============================================

export const DEFAULT_AUTO_DM_TEMPLATE = "Hey! 👋 Thanks for reaching out! Here's the link you requested: {PRODUCT_LINK}\n\nHappy shopping! 🛍️";

// ============================================
// Onboarding Tips
// ============================================

export const ONBOARDING_TIPS = [
  'Complete your profile to get more brand invitations',
  'Connect all your social media accounts',
  'Set up auto-messaging to save time',
  'Check for new campaigns daily',
];
