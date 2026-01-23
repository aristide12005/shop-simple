-- Add stock_quantity to collections (Main Products)
ALTER TABLE collections ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL, -- e.g., "Size: L, Color: Red" or just "Large"
  sku VARCHAR(100),
  stock_quantity INTEGER DEFAULT 0,
  price DECIMAL(10, 2), -- Optional override price
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_product_variants_collection_id ON product_variants(collection_id);

-- Enable RLS
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Policies for product_variants (Public read, Admin write)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Public variants are viewable by everyone'
    ) THEN
        CREATE POLICY "Public variants are viewable by everyone" ON product_variants
          FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Admins can insert variants'
    ) THEN
        CREATE POLICY "Admins can insert variants" ON product_variants
          FOR INSERT WITH CHECK (
          auth.uid() IN (SELECT user_id FROM profiles WHERE is_admin = true)
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Admins can update variants'
    ) THEN
        CREATE POLICY "Admins can update variants" ON product_variants
          FOR UPDATE USING (
          auth.uid() IN (SELECT user_id FROM profiles WHERE is_admin = true)
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Admins can delete variants'
    ) THEN
        CREATE POLICY "Admins can delete variants" ON product_variants
          FOR DELETE USING (
          auth.uid() IN (SELECT user_id FROM profiles WHERE is_admin = true)
        );
    END IF;
END
$$;
