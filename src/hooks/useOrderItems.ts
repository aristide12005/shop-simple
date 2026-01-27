import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { OrderItem } from '@/types/database';

export function useOrderItems(orderId: string) {
  return useQuery({
    queryKey: ['order-items', orderId],
    queryFn: async (): Promise<OrderItem[]> => {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)
        .order('collection_name', { ascending: true });

      if (error) throw error;
      return (data as OrderItem[]) || [];
    },
    enabled: !!orderId,
  });
}
