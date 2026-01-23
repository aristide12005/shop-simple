
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types/database';

export function useOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async (): Promise<Order[]> => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return (data as Order[]) || [];
        },
    });
}
