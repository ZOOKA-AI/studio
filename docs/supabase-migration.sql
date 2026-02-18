-- ==========================================
-- ZOOKA-AI Studio Database Setup
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Marketing Campaigns Table
-- ==========================================
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_type TEXT NOT NULL,
  emirate TEXT NOT NULL,
  tone TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  hashtags TEXT[] NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  estimated_reach INTEGER DEFAULT 5000,
  actual_reach INTEGER,
  engagement_rate DECIMAL(5,2),
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. Autonomous Publications Table
-- ==========================================
CREATE TABLE IF NOT EXISTS autonomous_publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES marketing_campaigns(id),
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'facebook', 'linkedin', 'twitter', 'tiktok', 'whatsapp')),
  post_id TEXT,
  post_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed')),
  error_message TEXT,
  engagement_metrics JSONB DEFAULT '{}',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. Platform Performance Table
-- ==========================================
CREATE TABLE IF NOT EXISTS platform_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  post_id TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. Hashtag Performance Table
-- ==========================================
CREATE TABLE IF NOT EXISTS hashtag_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hashtag TEXT NOT NULL,
  platform TEXT NOT NULL,
  usage_count INTEGER DEFAULT 1,
  total_reach INTEGER DEFAULT 0,
  total_engagement INTEGER DEFAULT 0,
  avg_engagement_rate DECIMAL(5,2),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. Platform Tokens (Encrypted)
-- ==========================================
CREATE TABLE IF NOT EXISTS platform_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Indexes for Performance
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON marketing_campaigns(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON marketing_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_publications_campaign ON autonomous_publications(campaign_id);
CREATE INDEX IF NOT EXISTS idx_publications_platform ON autonomous_publications(platform);
CREATE INDEX IF NOT EXISTS idx_performance_platform ON platform_performance(platform);
CREATE INDEX IF NOT EXISTS idx_hashtag_platform ON hashtag_performance(platform, hashtag);

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE autonomous_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_tokens ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for authenticated users)
CREATE POLICY "Allow all for authenticated users - campaigns"
  ON marketing_campaigns FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users - publications"
  ON autonomous_publications FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users - performance"
  ON platform_performance FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users - hashtags"
  ON hashtag_performance FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users - tokens"
  ON platform_tokens FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==========================================
-- Auto-update Timestamp Function
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON marketing_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tokens_updated_at
  BEFORE UPDATE ON platform_tokens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- Analytics Functions
-- ==========================================

-- Get top performing hashtags
CREATE OR REPLACE FUNCTION get_top_hashtags(limit_count INTEGER DEFAULT 20)
RETURNS TABLE (
  hashtag TEXT,
  platform TEXT,
  usage_count INTEGER,
  avg_engagement_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    h.hashtag,
    h.platform,
    h.usage_count,
    h.avg_engagement_rate
  FROM hashtag_performance h
  ORDER BY h.avg_engagement_rate DESC, h.usage_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Get campaign summary
CREATE OR REPLACE FUNCTION get_campaign_summary()
RETURNS TABLE (
  total_campaigns BIGINT,
  published_campaigns BIGINT,
  success_rate DECIMAL,
  total_reach INTEGER,
  avg_engagement_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_campaigns,
    COUNT(*) FILTER (WHERE status = 'published') as published_campaigns,
    ROUND((COUNT(*) FILTER (WHERE status = 'published')::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as success_rate,
    COALESCE(SUM(actual_reach), 0)::INTEGER as total_reach,
    ROUND(AVG(engagement_rate), 2) as avg_engagement_rate
  FROM marketing_campaigns;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- Sample Data for Testing (Optional)
-- ==========================================
INSERT INTO marketing_campaigns (service_type, emirate, tone, content_en, content_ar, hashtags, status)
VALUES 
  ('deep_cleaning', 'dubai', 'professional', 
   'Professional deep cleaning services in Dubai. Book now!',
   'خدمات تنظيف عميق احترافية في دبي. احجز الآن!',
   ARRAY['CleaningDubai', 'DeepCleaning', 'تنظيف_دبي'],
   'draft')
ON CONFLICT DO NOTHING;
