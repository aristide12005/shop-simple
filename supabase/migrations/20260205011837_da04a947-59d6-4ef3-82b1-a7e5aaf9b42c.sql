-- Create delivery zones table
CREATE TABLE public.delivery_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  delivery_fee NUMERIC NOT NULL DEFAULT 0,
  min_order_amount NUMERIC DEFAULT 0,
  estimated_delivery_days INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;

-- Public can read active zones
CREATE POLICY "Active delivery zones are publicly readable"
ON public.delivery_zones
FOR SELECT
USING (is_active = true);

-- Admins can read all zones
CREATE POLICY "Admins can view all delivery zones"
ON public.delivery_zones
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

-- Admins can insert zones
CREATE POLICY "Admins can insert delivery zones"
ON public.delivery_zones
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

-- Admins can update zones
CREATE POLICY "Admins can update delivery zones"
ON public.delivery_zones
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

-- Admins can delete zones
CREATE POLICY "Admins can delete delivery zones"
ON public.delivery_zones
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
));

-- Add updated_at trigger
CREATE TRIGGER update_delivery_zones_updated_at
BEFORE UPDATE ON public.delivery_zones
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add delivery_zone_id to orders table
ALTER TABLE public.orders 
ADD COLUMN delivery_zone_id UUID REFERENCES public.delivery_zones(id),
ADD COLUMN delivery_fee NUMERIC DEFAULT 0;

-- Insert some default zones
INSERT INTO public.delivery_zones (name, description, is_active, delivery_fee, min_order_amount, estimated_delivery_days) VALUES
('Local', 'Same city delivery', true, 5.00, 0, 1),
('Regional', 'Within state/province', true, 10.00, 25, 3),
('National', 'Nationwide delivery', true, 15.00, 50, 5),
('International', 'Worldwide shipping', false, 35.00, 100, 14);