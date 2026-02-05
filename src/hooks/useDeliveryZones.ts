 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 import { DeliveryZone } from '@/types/delivery';
 
 export function useDeliveryZones(includeInactive = false) {
   return useQuery({
     queryKey: ['delivery-zones', includeInactive],
     queryFn: async (): Promise<DeliveryZone[]> => {
       let query = supabase
         .from('delivery_zones')
         .select('*')
         .order('delivery_fee', { ascending: true });
       
       if (!includeInactive) {
         query = query.eq('is_active', true);
       }
       
       const { data, error } = await query;
       if (error) throw error;
       return (data as DeliveryZone[]) || [];
     },
   });
 }
 
 export function useCreateDeliveryZone() {
   const queryClient = useQueryClient();
   
   return useMutation({
     mutationFn: async (zone: Omit<DeliveryZone, 'id' | 'created_at' | 'updated_at'>) => {
       const { data, error } = await supabase
         .from('delivery_zones')
         .insert(zone as any)
         .select()
         .single();
       
       if (error) throw error;
       return data;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['delivery-zones'] });
     },
   });
 }
 
 export function useUpdateDeliveryZone() {
   const queryClient = useQueryClient();
   
   return useMutation({
     mutationFn: async ({ id, ...updates }: Partial<DeliveryZone> & { id: string }) => {
       const { data, error } = await supabase
         .from('delivery_zones')
         .update(updates as any)
         .eq('id', id)
         .select()
         .single();
       
       if (error) throw error;
       return data;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['delivery-zones'] });
     },
   });
 }
 
 export function useDeleteDeliveryZone() {
   const queryClient = useQueryClient();
   
   return useMutation({
     mutationFn: async (id: string) => {
       const { error } = await supabase
         .from('delivery_zones')
         .delete()
         .eq('id', id);
       
       if (error) throw error;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['delivery-zones'] });
     },
   });
 }