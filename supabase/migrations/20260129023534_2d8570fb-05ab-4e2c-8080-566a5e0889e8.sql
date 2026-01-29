-- Create function to deduct stock when order is completed
CREATE OR REPLACE FUNCTION public.deduct_stock_on_order_complete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only run when status changes to 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    -- Deduct stock for each item in the order
    UPDATE public.collections c
    SET stock_quantity = GREATEST(0, c.stock_quantity - oi.quantity)
    FROM public.order_items oi
    WHERE oi.order_id = NEW.id
      AND oi.collection_id = c.id;
    
    -- Also deduct from product_variants if variant_id exists in order_items
    -- (for future variant-level stock tracking)
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on orders table
CREATE TRIGGER trigger_deduct_stock_on_order_complete
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.deduct_stock_on_order_complete();