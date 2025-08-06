# Production Deployment Guide

## 🚀 Deploy to Vercel + Supabase

### 1. Set up Supabase

1. **Create Supabase account**: https://supabase.com
2. **Create new project**: Name it "asset-tracker"
3. **Get your credentials**:
   - Project URL: `https://[your-project].supabase.co`
   - Anon Key: Found in Settings > API
   - Service Role Key: Found in Settings > API
   - Database URL: Found in Settings > Database

### 2. Database Setup

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'manager', 'user')) DEFAULT 'user',
    department TEXT,
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    permissions TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Assets table
CREATE TABLE assets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('laptop', 'desktop', 'mobile', 'tablet', 'printer', 'scanner', 'camera', 'network', 'software', 'hardware', 'other')),
    category TEXT CHECK (category IN ('IT Equipment', 'Office Equipment', 'Furniture', 'Vehicles', 'Software Licenses', 'Hardware', 'Other')),
    description TEXT,
    serial_number TEXT UNIQUE NOT NULL,
    model TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    purchase_date DATE NOT NULL,
    purchase_price DECIMAL(10,2) NOT NULL,
    current_value DECIMAL(10,2),
    warranty_expiry DATE,
    status TEXT CHECK (status IN ('active', 'inactive', 'maintenance', 'disposed', 'lost', 'damaged')) DEFAULT 'active',
    condition TEXT CHECK (condition IN ('excellent', 'good', 'fair', 'poor', 'damaged')) DEFAULT 'good',
    location TEXT NOT NULL,
    assigned_to UUID REFERENCES users(id),
    assigned_date TIMESTAMP,
    department TEXT,
    tags TEXT[],
    images TEXT[],
    documents JSONB,
    maintenance_history JSONB,
    custom_fields JSONB,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('asset-summary', 'asset-details', 'maintenance', 'depreciation', 'audit', 'custom')),
    description TEXT,
    filters JSONB,
    data JSONB,
    generated_by UUID REFERENCES users(id),
    format TEXT CHECK (format IN ('pdf', 'excel', 'csv', 'json')) DEFAULT 'pdf',
    file_url TEXT,
    file_size INTEGER,
    status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    is_scheduled BOOLEAN DEFAULT false,
    schedule JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    resource_id UUID NOT NULL,
    user_id UUID REFERENCES users(id),
    changes JSONB,
    ip_address TEXT,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW(),
    status TEXT CHECK (status IN ('success', 'failed', 'pending')) DEFAULT 'success',
    error_message TEXT
);

-- Settings table
CREATE TABLE settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    type TEXT CHECK (type IN ('string', 'number', 'boolean', 'object', 'array')),
    description TEXT,
    category TEXT CHECK (category IN ('general', 'email', 'security', 'appearance', 'notifications', 'integrations')),
    is_public BOOLEAN DEFAULT false,
    options TEXT[],
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_assets_assigned_to ON assets(assigned_to);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_location ON assets(location);
CREATE INDEX idx_assets_category ON assets(category);
CREATE INDEX idx_audit_logs_user_timestamp ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource, resource_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- Create storage bucket for files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES ('asset-tracker-files', 'asset-tracker-files', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']);
```

### 3. Environment Variables

Create `.env.local` in root:
```bash
# Supabase
REACT_APP_SUPABASE_URL=https://[your-project].supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# Backend (for Vercel)
SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
JWT_SECRET=your-jwt-secret
```

### 4. Deploy to Vercel

**Frontend (React App):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
vercel --prod
```

**Backend (API):**
```bash
cd backend
vercel --prod
```

### 5. Quick Deploy Commands

**One-click deploy:**
```bash
# Frontend
npx vercel --prod --env REACT_APP_API_URL=https://your-backend.vercel.app/api

# Backend
cd backend
npx vercel --prod --env DATABASE_URL=your-supabase-url --env JWT_SECRET=your-secret
```

### 6. Post-Deployment Setup

1. **Update API URLs** in frontend:
   - Update `src/services/api.js` with production URLs

2. **Seed production data**:
   ```bash
   # Run seed script in production
   curl -X POST https://your-backend.vercel.app/api/seed
   ```

3. **Test the deployment**:
   - Visit your frontend URL
   - Login with default credentials
   - Test all features

### 7. Monitoring & Maintenance

- **Supabase Dashboard**: Monitor database usage
- **Vercel Analytics**: Monitor app performance
- **Error tracking**: Set up Sentry or similar

### 8. Custom Domain (Optional)

1. **Add custom domain in Vercel**
2. **Update CORS settings** in backend
3. **Update API URLs** in frontend

## 🎯 Production URLs

After deployment, you'll have:
- **Frontend**: `https://asset-tracker-[your-name].vercel.app`
- **Backend API**: `https://asset-tracker-api-[your-name].vercel.app/api`

## 🔧 Troubleshooting

### Common Issues

1. **CORS errors**: Update CORS origins in backend
2. **Database connection**: Check DATABASE_URL format
3. **File uploads**: Ensure Supabase storage is configured
4. **Authentication**: Verify JWT_SECRET is set correctly

### Support

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **PostgreSQL**: https://www.postgresql.org/docs/
