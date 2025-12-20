# Merch Nest - Database Schema & Architecture

This document outlines the database schema, relationships, and integration guide for the Merch Nest platform.

---

## Table of Contents

1. [Overview](#overview)
2. [User Types & Roles](#user-types--roles)
3. [Database Schema](#database-schema)
4. [Entity Relationships](#entity-relationships)
5. [API Endpoints Structure](#api-endpoints-structure)
6. [Integration Guide](#integration-guide)

---

## Overview

Merch Nest is a creator-commerce platform with three distinct user types:
- **Influencers** - Content creators who promote products and earn commissions
- **Brands** - Businesses that list products and run campaigns with influencers
- **Admins** - Platform administrators who manage users, content, and operations

The platform supports:
- Product affiliate marketing
- Brand-influencer campaigns
- Automated DM messaging
- Payment processing and payouts
- Analytics and reporting

---

## User Types & Roles

### Influencer (Creator)
```
Primary Functions:
├── Manage personal storefront
├── Curate and promote products
├── Join brand campaigns
├── Set up auto-DM messaging
├── Track earnings and analytics
└── Request payouts
```

### Brand (Business)
```
Primary Functions:
├── Manage brand profile
├── List products with commissions
├── Create and manage campaigns
├── Discover and invite influencers
├── Track campaign performance
└── Manage wallet and payments
```

### Admin (Platform)
```
Primary Functions:
├── User management (approve/suspend)
├── Product moderation
├── Campaign approval
├── Platform analytics
├── Payout processing
├── System configuration
└── Content moderation
```

---

## Database Schema

### Core Tables

#### 1. `users`
Central authentication table for all user types.

```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(100) NOT NULL,
  role          ENUM('influencer', 'brand', 'admin') NOT NULL,
  avatar_url    VARCHAR(500),
  status        ENUM('active', 'pending', 'suspended') DEFAULT 'pending',
  email_verified BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

---

### Influencer Tables

#### 2. `influencer_profiles`
Extended profile for influencer users.

```sql
CREATE TABLE influencer_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  bio             TEXT,
  niche           VARCHAR(100)[], -- Array of niches: ['Fashion', 'Beauty']
  store_url       VARCHAR(255) UNIQUE,
  store_active    BOOLEAN DEFAULT TRUE,
  verified        BOOLEAN DEFAULT FALSE,
  tier            ENUM('micro', 'macro', 'game_changer') DEFAULT 'micro',
  follower_count  INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_influencer_tier ON influencer_profiles(tier);
CREATE INDEX idx_influencer_verified ON influencer_profiles(verified);
```

#### 3. `social_accounts`
Connected social media accounts.

```sql
CREATE TABLE social_accounts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id   UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  platform        ENUM('instagram', 'youtube', 'tiktok', 'twitter') NOT NULL,
  handle          VARCHAR(100) NOT NULL,
  followers       INTEGER DEFAULT 0,
  connected       BOOLEAN DEFAULT FALSE,
  access_token    TEXT, -- Encrypted OAuth token
  refresh_token   TEXT, -- Encrypted refresh token
  token_expires   TIMESTAMP,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(influencer_id, platform)
);
```

#### 4. `influencer_products`
Products curated/promoted by influencers.

```sql
CREATE TABLE influencer_products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id   UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  brand_product_id UUID REFERENCES brand_products(id), -- NULL for own products
  name            VARCHAR(255) NOT NULL,
  brand           VARCHAR(100),
  category        VARCHAR(100),
  commission      DECIMAL(5,2) NOT NULL, -- Percentage
  price           DECIMAL(10,2) NOT NULL,
  image_url       VARCHAR(500),
  product_url     VARCHAR(500) NOT NULL,
  affiliate_link  VARCHAR(500) UNIQUE, -- Generated tracking link
  type            ENUM('curated', 'campaign', 'own') NOT NULL,
  status          ENUM('active', 'pending', 'hidden', 'removed') DEFAULT 'pending',
  clicks          INTEGER DEFAULT 0,
  sales           INTEGER DEFAULT 0,
  earnings        DECIMAL(12,2) DEFAULT 0.00,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_inf_products_influencer ON influencer_products(influencer_id);
CREATE INDEX idx_inf_products_type ON influencer_products(type);
CREATE INDEX idx_inf_products_status ON influencer_products(status);
```

#### 5. `auto_messages`
Automated DM response configurations.

```sql
CREATE TABLE auto_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id   UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  keyword         VARCHAR(50) NOT NULL,
  template        TEXT NOT NULL,
  status          ENUM('active', 'paused') DEFAULT 'active',
  deliveries      INTEGER DEFAULT 0,
  opens           INTEGER DEFAULT 0,
  clicks          INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE(influencer_id, keyword)
);

CREATE INDEX idx_auto_messages_influencer ON auto_messages(influencer_id);
CREATE INDEX idx_auto_messages_status ON auto_messages(status);
```

#### 6. `message_logs`
Log of all automated messages sent.

```sql
CREATE TABLE message_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auto_message_id UUID REFERENCES auto_messages(id) ON DELETE SET NULL,
  influencer_id   UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  recipient_id    VARCHAR(255), -- Platform-specific user ID
  platform        ENUM('instagram', 'youtube', 'tiktok') NOT NULL,
  status          ENUM('sent', 'delivered', 'opened', 'clicked', 'failed') DEFAULT 'sent',
  sent_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivered_at    TIMESTAMP,
  opened_at       TIMESTAMP,
  clicked_at      TIMESTAMP
);

CREATE INDEX idx_message_logs_influencer ON message_logs(influencer_id);
CREATE INDEX idx_message_logs_status ON message_logs(status);
```

---

### Brand Tables

#### 7. `brand_profiles`
Extended profile for brand users.

```sql
CREATE TABLE brand_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  company_name    VARCHAR(255) NOT NULL,
  description     TEXT,
  website         VARCHAR(500),
  logo_url        VARCHAR(500),
  category        VARCHAR(100),
  target_audience VARCHAR(100)[], -- Array: ['Women 18-25', 'Urban']
  verified        BOOLEAN DEFAULT FALSE,
  wallet_balance  DECIMAL(12,2) DEFAULT 0.00,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_brand_verified ON brand_profiles(verified);
CREATE INDEX idx_brand_category ON brand_profiles(category);
```

#### 8. `brand_products`
Products listed by brands.

```sql
CREATE TABLE brand_products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID REFERENCES brand_profiles(id) ON DELETE CASCADE,
  name            VARCHAR(255) NOT NULL,
  description     TEXT,
  category        VARCHAR(100),
  price           DECIMAL(10,2) NOT NULL,
  commission      DECIMAL(5,2) NOT NULL, -- Percentage offered to influencers
  stock           INTEGER DEFAULT 0,
  image_url       VARCHAR(500),
  product_url     VARCHAR(500),
  status          ENUM('pending', 'approved', 'rejected', 'out_of_stock') DEFAULT 'pending',
  sales           INTEGER DEFAULT 0,
  clicks          INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_brand_products_brand ON brand_products(brand_id);
CREATE INDEX idx_brand_products_status ON brand_products(status);
CREATE INDEX idx_brand_products_category ON brand_products(category);
```

#### 9. `campaigns`
Brand campaigns for influencer collaborations.

```sql
CREATE TABLE campaigns (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID REFERENCES brand_profiles(id) ON DELETE CASCADE,
  name            VARCHAR(255) NOT NULL,
  description     TEXT,
  influencer_tier ENUM('micro', 'macro', 'game_changer', 'all') DEFAULT 'all',
  budget          DECIMAL(12,2) NOT NULL,
  spent           DECIMAL(12,2) DEFAULT 0.00,
  commission      DECIMAL(5,2) NOT NULL, -- Percentage
  start_date      DATE NOT NULL,
  end_date        DATE NOT NULL,
  status          ENUM('draft', 'pending', 'active', 'paused', 'completed', 'rejected') DEFAULT 'draft',
  total_sales     INTEGER DEFAULT 0,
  total_clicks    INTEGER DEFAULT 0,
  total_revenue   DECIMAL(12,2) DEFAULT 0.00,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_campaigns_brand ON campaigns(brand_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);
```

#### 10. `campaign_products`
Products included in a campaign.

```sql
CREATE TABLE campaign_products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id     UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES brand_products(id) ON DELETE CASCADE,
  
  UNIQUE(campaign_id, product_id)
);
```

#### 11. `campaign_influencers`
Influencers participating in campaigns.

```sql
CREATE TABLE campaign_influencers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id     UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id   UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  status          ENUM('invited', 'accepted', 'rejected', 'active', 'completed') DEFAULT 'invited',
  clicks          INTEGER DEFAULT 0,
  sales           INTEGER DEFAULT 0,
  earnings        DECIMAL(12,2) DEFAULT 0.00,
  invited_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_at     TIMESTAMP,
  
  UNIQUE(campaign_id, influencer_id)
);

CREATE INDEX idx_campaign_inf_campaign ON campaign_influencers(campaign_id);
CREATE INDEX idx_campaign_inf_influencer ON campaign_influencers(influencer_id);
CREATE INDEX idx_campaign_inf_status ON campaign_influencers(status);
```

---

### Payment Tables

#### 12. `payouts`
Creator payout requests and history.

```sql
CREATE TABLE payouts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  amount          DECIMAL(12,2) NOT NULL,
  method          ENUM('bank', 'upi') NOT NULL,
  status          ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  
  -- Bank details (nullable)
  bank_account    VARCHAR(20),
  bank_ifsc       VARCHAR(15),
  bank_holder     VARCHAR(100),
  bank_name       VARCHAR(100),
  
  -- UPI details (nullable)
  upi_id          VARCHAR(100),
  
  transaction_id  VARCHAR(100),
  failure_reason  TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at    TIMESTAMP
);

CREATE INDEX idx_payouts_user ON payouts(user_id);
CREATE INDEX idx_payouts_status ON payouts(status);
```

#### 13. `brand_payments`
Brand wallet transactions.

```sql
CREATE TABLE brand_payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID REFERENCES brand_profiles(id) ON DELETE CASCADE,
  type            ENUM('deposit', 'campaign_spend', 'refund') NOT NULL,
  amount          DECIMAL(12,2) NOT NULL, -- Negative for spends
  description     VARCHAR(255),
  status          ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  transaction_id  VARCHAR(100),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brand_payments_brand ON brand_payments(brand_id);
CREATE INDEX idx_brand_payments_type ON brand_payments(type);
```

#### 14. `invoices`
Brand invoices for campaign budgets.

```sql
CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID REFERENCES brand_profiles(id) ON DELETE CASCADE,
  amount          DECIMAL(12,2) NOT NULL,
  description     VARCHAR(255),
  status          ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
  due_date        DATE NOT NULL,
  paid_at         TIMESTAMP,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoices_brand ON invoices(brand_id);
CREATE INDEX idx_invoices_status ON invoices(status);
```

---

### Analytics & Tracking

#### 15. `click_events`
Tracking all affiliate link clicks.

```sql
CREATE TABLE click_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID REFERENCES influencer_products(id) ON DELETE SET NULL,
  influencer_id   UUID REFERENCES influencer_profiles(id) ON DELETE SET NULL,
  campaign_id     UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  visitor_ip      VARCHAR(45), -- Anonymized/hashed
  user_agent      TEXT,
  referrer        VARCHAR(500),
  converted       BOOLEAN DEFAULT FALSE,
  conversion_value DECIMAL(10,2),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clicks_product ON click_events(product_id);
CREATE INDEX idx_clicks_influencer ON click_events(influencer_id);
CREATE INDEX idx_clicks_campaign ON click_events(campaign_id);
CREATE INDEX idx_clicks_date ON click_events(created_at);
```

#### 16. `sales_events`
Tracking all sales/conversions.

```sql
CREATE TABLE sales_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  click_id        UUID REFERENCES click_events(id),
  product_id      UUID REFERENCES influencer_products(id) ON DELETE SET NULL,
  influencer_id   UUID REFERENCES influencer_profiles(id) ON DELETE SET NULL,
  brand_id        UUID REFERENCES brand_profiles(id) ON DELETE SET NULL,
  campaign_id     UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  order_id        VARCHAR(100), -- External order reference
  order_value     DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  status          ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at    TIMESTAMP
);

CREATE INDEX idx_sales_influencer ON sales_events(influencer_id);
CREATE INDEX idx_sales_brand ON sales_events(brand_id);
CREATE INDEX idx_sales_campaign ON sales_events(campaign_id);
CREATE INDEX idx_sales_status ON sales_events(status);
```

---

### Platform & Admin Tables

#### 17. `notifications`
User notifications.

```sql
CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  type            ENUM('sale', 'campaign', 'payout', 'system', 'message') NOT NULL,
  title           VARCHAR(255) NOT NULL,
  description     TEXT,
  read            BOOLEAN DEFAULT FALSE,
  action_url      VARCHAR(500),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read);
```

#### 18. `reports`
Content/user reports for moderation.

```sql
CREATE TABLE reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            ENUM('product', 'user', 'campaign', 'message') NOT NULL,
  target_id       UUID NOT NULL, -- ID of reported entity
  target_name     VARCHAR(255),
  reporter_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  reporter_email  VARCHAR(255),
  reason          TEXT NOT NULL,
  status          ENUM('pending', 'investigating', 'resolved', 'dismissed') DEFAULT 'pending',
  admin_notes     TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at     TIMESTAMP
);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_type ON reports(type);
```

#### 19. `feature_toggles`
Feature flags for the platform.

```sql
CREATE TABLE feature_toggles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(100) UNIQUE NOT NULL,
  description     TEXT,
  enabled         BOOLEAN DEFAULT FALSE,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 20. `message_rules`
Rate limiting and compliance rules for auto-messaging.

```sql
CREATE TABLE message_rules (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(100) NOT NULL,
  max_per_hour    INTEGER DEFAULT 50,
  max_per_day     INTEGER DEFAULT 500,
  cooldown_minutes INTEGER DEFAULT 5,
  active          BOOLEAN DEFAULT TRUE,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 21. `support_tickets`
Customer support tickets.

```sql
CREATE TABLE support_tickets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
  user_email      VARCHAR(255) NOT NULL,
  subject         VARCHAR(255) NOT NULL,
  category        ENUM('payment', 'campaign', 'technical', 'account', 'other') NOT NULL,
  description     TEXT NOT NULL,
  status          ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  priority        ENUM('low', 'medium', 'high') DEFAULT 'medium',
  assigned_to     UUID REFERENCES users(id), -- Admin user
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_tickets_user ON support_tickets(user_id);
CREATE INDEX idx_tickets_status ON support_tickets(status);
```

#### 22. `ticket_messages`
Messages within support tickets.

```sql
CREATE TABLE ticket_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id       UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  sender_name     VARCHAR(100) NOT NULL,
  is_admin        BOOLEAN DEFAULT FALSE,
  content         TEXT NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ticket_messages_ticket ON ticket_messages(ticket_id);
```

---

## Entity Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USERS TABLE                                     │
│                    (Central authentication for all roles)                    │
└─────────────────────────────────────────────────────────────────────────────┘
                    │                    │                    │
                    ▼                    ▼                    ▼
        ┌───────────────────┐  ┌─────────────────┐  ┌─────────────────┐
        │ INFLUENCER_PROFILE │  │  BRAND_PROFILE  │  │   ADMIN ROLE    │
        └───────────────────┘  └─────────────────┘  │  (uses users    │
                    │                    │          │   table only)   │
                    │                    │          └─────────────────┘
        ┌───────────┴───────────┐        │
        │                       │        │
        ▼                       ▼        ▼
┌───────────────┐    ┌──────────────┐  ┌─────────────────┐
│SOCIAL_ACCOUNTS│    │AUTO_MESSAGES │  │ BRAND_PRODUCTS  │
└───────────────┘    └──────────────┘  └─────────────────┘
                            │                    │
                            ▼                    │
                    ┌──────────────┐             │
                    │ MESSAGE_LOGS │             │
                    └──────────────┘             │
                                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                          CAMPAIGNS                               │
│              (Brand creates, Influencers join)                  │
└─────────────────────────────────────────────────────────────────┘
        │                                        │
        ▼                                        ▼
┌─────────────────┐                    ┌─────────────────────┐
│CAMPAIGN_PRODUCTS│                    │CAMPAIGN_INFLUENCERS │
│  (N:M bridge)   │                    │    (N:M bridge)     │
└─────────────────┘                    └─────────────────────┘
                                                 │
                                                 ▼
                                       ┌─────────────────────┐
                                       │INFLUENCER_PRODUCTS  │
                                       │(Curated from brands │
                                       │ or own products)    │
                                       └─────────────────────┘
                                                 │
                    ┌────────────────────────────┼────────────────────────────┐
                    ▼                            ▼                            ▼
            ┌──────────────┐            ┌──────────────┐            ┌──────────────┐
            │ CLICK_EVENTS │───────────▶│ SALES_EVENTS │───────────▶│   PAYOUTS    │
            └──────────────┘            └──────────────┘            └──────────────┘
```

### Key Relationships

| Parent Table | Child Table | Relationship | Description |
|--------------|-------------|--------------|-------------|
| `users` | `influencer_profiles` | 1:1 | Each influencer user has one profile |
| `users` | `brand_profiles` | 1:1 | Each brand user has one profile |
| `influencer_profiles` | `social_accounts` | 1:N | One influencer, many social accounts |
| `influencer_profiles` | `influencer_products` | 1:N | One influencer, many products |
| `influencer_profiles` | `auto_messages` | 1:N | One influencer, many auto-message rules |
| `brand_profiles` | `brand_products` | 1:N | One brand, many products |
| `brand_profiles` | `campaigns` | 1:N | One brand, many campaigns |
| `campaigns` | `campaign_products` | 1:N | One campaign, many products (bridge) |
| `campaigns` | `campaign_influencers` | 1:N | One campaign, many influencers (bridge) |
| `influencer_products` | `click_events` | 1:N | One product, many clicks |
| `click_events` | `sales_events` | 1:1 | One click can lead to one sale |

---

## API Endpoints Structure

### Authentication
```
POST   /api/auth/login          # Login user
POST   /api/auth/signup         # Register user
POST   /api/auth/logout         # Logout user
POST   /api/auth/refresh        # Refresh token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### Influencer Endpoints
```
GET    /api/influencer/profile
PUT    /api/influencer/profile
GET    /api/influencer/products
POST   /api/influencer/products
PUT    /api/influencer/products/:id
DELETE /api/influencer/products/:id
GET    /api/influencer/campaigns
POST   /api/influencer/campaigns/:id/accept
POST   /api/influencer/campaigns/:id/reject
GET    /api/influencer/messages
POST   /api/influencer/messages
PUT    /api/influencer/messages/:id
DELETE /api/influencer/messages/:id
GET    /api/influencer/analytics
GET    /api/influencer/earnings
GET    /api/influencer/payouts
POST   /api/influencer/payouts
```

### Brand Endpoints
```
GET    /api/brand/profile
PUT    /api/brand/profile
GET    /api/brand/products
POST   /api/brand/products
PUT    /api/brand/products/:id
DELETE /api/brand/products/:id
GET    /api/brand/campaigns
POST   /api/brand/campaigns
PUT    /api/brand/campaigns/:id
DELETE /api/brand/campaigns/:id
POST   /api/brand/campaigns/:id/invite/:influencerId
GET    /api/brand/influencers
GET    /api/brand/influencers/:id
GET    /api/brand/analytics
GET    /api/brand/payments
POST   /api/brand/payments/deposit
```

### Admin Endpoints
```
GET    /api/admin/users
PUT    /api/admin/users/:id/approve
PUT    /api/admin/users/:id/suspend
DELETE /api/admin/users/:id
GET    /api/admin/products
PUT    /api/admin/products/:id/approve
PUT    /api/admin/products/:id/reject
GET    /api/admin/campaigns
PUT    /api/admin/campaigns/:id/approve
PUT    /api/admin/campaigns/:id/reject
GET    /api/admin/reports
PUT    /api/admin/reports/:id
GET    /api/admin/payouts
POST   /api/admin/payouts/:id/process
GET    /api/admin/analytics
GET    /api/admin/features
PUT    /api/admin/features/:id
```

### Tracking Endpoints (Public)
```
GET    /api/track/click/:affiliateCode  # Redirect with tracking
POST   /api/webhooks/sale               # Brand webhook for sales
```

---

## Integration Guide

### Step 1: Replace Mock Data with API Calls

Current code uses Zustand stores with local mock data. To integrate a database:

#### Example: Influencer Store Migration

**Before (Local State):**
```typescript
// src/store/influencerStore.ts
addProduct: (product) => {
  set((state) => ({ products: [...state.products, newProduct] }));
}
```

**After (API Integration):**
```typescript
// src/store/influencerStore.ts
addProduct: async (product) => {
  set({ isLoading: true });
  try {
    const response = await fetch('/api/influencer/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const newProduct = await response.json();
    set((state) => ({ 
      products: [...state.products, newProduct],
      isLoading: false 
    }));
  } catch (error) {
    set({ isLoading: false, error: error.message });
  }
}
```

### Step 2: Recommended Database Setup

**Option A: PostgreSQL (Recommended)**
```bash
# Using Supabase (includes Auth, Database, Storage)
npm install @supabase/supabase-js

# Or self-hosted PostgreSQL with Prisma
npm install prisma @prisma/client
npx prisma init
```

**Option B: MongoDB**
```bash
npm install mongoose
# or
npm install mongodb
```

### Step 3: Environment Variables

```env
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/merchboard"
# or
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/merchboard"

# Auth
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Payment Gateway (Razorpay/Stripe)
RAZORPAY_KEY_ID="rzp_test_xxx"
RAZORPAY_KEY_SECRET="xxx"

# Social OAuth
INSTAGRAM_CLIENT_ID="xxx"
INSTAGRAM_CLIENT_SECRET="xxx"
```

### Step 4: API Route Example (Next.js App Router)

```typescript
// src/app/api/influencer/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = await prisma.influencerProduct.findMany({
    where: { influencerId: session.user.profileId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  
  const product = await prisma.influencerProduct.create({
    data: {
      ...body,
      influencerId: session.user.profileId,
      affiliateLink: generateAffiliateLink(session.user.id),
    },
  });

  return NextResponse.json(product, { status: 201 });
}
```

### Step 5: Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                            │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   Dashboard   │───▶│ Zustand Store │───▶│  API Client  │       │
│  │  Components   │◀───│   (State)     │◀───│   (fetch)    │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                      SERVER (Next.js API)                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │  API Routes  │───▶│   Services   │───▶│   Database   │       │
│  │  (handlers)  │◀───│   (logic)    │◀───│   (Prisma)   │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                        DATABASE (PostgreSQL)                      │
│         users, profiles, products, campaigns, payments           │
└──────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

### Files to Modify for Database Integration

| File | Purpose | Action |
|------|---------|--------|
| `src/constants/index.ts` | Mock data | Remove mock data, keep UI constants |
| `src/store/influencerStore.ts` | Influencer state | Add API calls |
| `src/store/brandStore.ts` | Brand state | Add API calls |
| `src/store/adminStore.ts` | Admin state | Add API calls |
| `src/app/api/*` | API routes | Create new directory with handlers |
| `src/lib/prisma.ts` | DB client | Create Prisma client singleton |
| `prisma/schema.prisma` | DB schema | Define schema (copy from above) |

### Recommended Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js + React + Tailwind CSS |
| State | Zustand |
| Database | PostgreSQL (Supabase or Neon) |
| ORM | Prisma |
| Auth | NextAuth.js or Supabase Auth |
| Payments | Razorpay (India) or Stripe |
| Storage | Cloudinary or Supabase Storage |
| Hosting | Vercel |

---

## Summary

This document provides a complete database schema for the Merch Nest platform with:

- **20+ tables** covering all user types and features
- **Proper indexing** for query optimization
- **Relationship mapping** between entities
- **API endpoint structure** for full CRUD operations
- **Integration guide** for replacing mock data with real database calls

The current codebase is structured to make this integration straightforward - all you need to do is:

1. Set up the database with the schema above
2. Create API routes following the endpoint structure
3. Update Zustand stores to call APIs instead of local state
4. Remove mock data from constants (keep UI constants)

The TypeScript types in `src/types/index.ts` already match this schema, making the transition seamless.
