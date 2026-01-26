-- Step 1: Create the category enum type
CREATE TYPE public.product_category AS ENUM ('mens_wear', 'womens_wear', 'accessories', 'footwear');

-- Step 2: Create the product_collections table (Level 1 - Container)
CREATE TABLE public.product_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  banner_image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Step 3: Create the categories table (Level 2 - Tags)
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the fixed categories
INSERT INTO public.categories (name, slug, display_order) VALUES
  ('Men''s Wear', 'mens-wear', 1),
  ('Women''s Wear', 'womens-wear', 2),
  ('Accessories', 'accessories', 3),
  ('Footwear', 'footwear', 4);

-- Step 4: Add collection_id and category_id to the collections table (which acts as products)
ALTER TABLE public.collections 
ADD COLUMN collection_id UUID REFERENCES public.product_collections(id) ON DELETE SET NULL,
ADD COLUMN category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL;

-- Step 5: Create a default collection for existing products
INSERT INTO public.product_collections (id, name, description) 
VALUES (gen_random_uuid(), 'Default Collection', 'Products not yet assigned to a collection')
RETURNING id;

-- Step 6: Add variant_id to collection_images to support image-to-variant mapping
ALTER TABLE public.collection_images
ADD COLUMN variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL;

-- Step 7: Enable RLS on new tables
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Step 8: RLS Policies for product_collections
CREATE POLICY "Product collections are publicly readable"
ON public.product_collections FOR SELECT
USING (true);

CREATE POLICY "Admins can insert product collections"
ON public.product_collections FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

CREATE POLICY "Admins can update product collections"
ON public.product_collections FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

CREATE POLICY "Admins can delete product collections"
ON public.product_collections FOR DELETE
USING (EXISTS (
  SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

-- Step 9: RLS Policies for categories (read-only for everyone, admin managed)
CREATE POLICY "Categories are publicly readable"
ON public.categories FOR SELECT
USING (true);

CREATE POLICY "Admins can manage categories"
ON public.categories FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

-- Step 10: Create trigger for updated_at on product_collections
CREATE TRIGGER update_product_collections_updated_at
BEFORE UPDATE ON public.product_collections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();