-- ============================================================================
-- Supabase Database Schema for Marketing Campaigns
-- Royal Clean UAE Marketing Automation System
-- ============================================================================

-- Create marketing_campaigns table
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Campaign details
  service_type TEXT NOT NULL,
  emirate TEXT NOT NULL,
  tone TEXT NOT NULL,
  
  -- Generated content
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  hashtags TEXT[] NOT NULL,
  
  -- Campaign status
  status TEXT NOT NULL DEFAULT 'draft',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'scheduled', 'archived'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth setup)
CREATE POLICY "Enable read access for all users" ON marketing_campaigns
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON marketing_campaigns
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_campaigns_status ON marketing_campaigns(status);
CREATE INDEX idx_campaigns_created_at ON marketing_campaigns(created_at DESC);
CREATE INDEX idx_campaigns_emirate ON marketing_campaigns(emirate);
CREATE INDEX idx_campaigns_service_type ON marketing_campaigns(service_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_marketing_campaigns_updated_at
  BEFORE UPDATE ON marketing_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INSTALLATION INSTRUCTIONS
-- ============================================================================
-- 
-- 1. Go to your Supabase project dashboard at https://supabase.com
-- 2. Navigate to SQL Editor (left sidebar)
-- 3. Click "New Query"
-- 4. Copy and paste this entire file
-- 5. Click "Run" to execute the schema
-- 6. Verify table creation:
--    - Go to Table Editor
--    - Look for "marketing_campaigns" table
--    - Verify columns and indexes are created
-- 
-- ============================================================================
-- OPTIONAL: Sample Data for Testing
-- ============================================================================
-- 
-- INSERT INTO marketing_campaigns (
--   service_type,
--   emirate,
--   tone,
--   content_en,
--   content_ar,
--   hashtags,
--   status
-- ) VALUES (
--   'deep_cleaning',
--   'dubai',
--   'professional',
--   'Experience the Royal Clean difference! Professional deep cleaning services across Dubai.',
--   'جرب الفرق مع رويال كلين! خدمات تنظيف عميق احترافية في جميع أنحاء دبي.',
--   ARRAY['DubaiCleaning', 'DeepCleaning', 'RoyalClean', 'UAE', 'دبي', 'تنظيف'],
--   'draft'
-- );
-- 
-- ============================================================================
