-- Add currency column to collections (products) table
ALTER TABLE public.collections 
ADD COLUMN currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'CAD'));

-- Add currency to delivery_zones as well
ALTER TABLE public.delivery_zones
ADD COLUMN currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'CAD'));

-- Add currency to orders for historical record
ALTER TABLE public.orders
ADD COLUMN currency TEXT NOT NULL DEFAULT 'USD';