-- Create Product Collections table (e.g. Summer 2025)
CREATE TABLE IF NOT EXISTS product_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  banner_image_url TEXT,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create Categories table (e.g. Men, Women)
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add foreign keys to the main Products table ('collections')
ALTER TABLE collections 
ADD COLUMN IF NOT EXISTS collection_id UUID REFERENCES product_collections(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies for Product Collections
DROP POLICY IF EXISTS "Public collections are viewable by everyone" ON product_collections;
CREATE POLICY "Public collections are viewable by everyone" 
ON product_collections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert product collections" ON product_collections;
CREATE POLICY "Admins can insert product collections" 
ON product_collections FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update product collections" ON product_collections;
CREATE POLICY "Admins can update product collections" 
ON product_collections FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete product collections" ON product_collections;
CREATE POLICY "Admins can delete product collections" 
ON product_collections FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for Categories
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON categories;
CREATE POLICY "Public categories are viewable by everyone" 
ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
CREATE POLICY "Admins can manage categories" 
ON categories FOR ALL USING (auth.role() = 'authenticated');

-- Seed some default Categories
INSERT INTO categories (name, slug, display_order) VALUES
('Men', 'men', 1),
('Women', 'women', 2),
('Accessories', 'accessories', 3)
ON CONFLICT (slug) DO NOTHING;
