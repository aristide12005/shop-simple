import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductCollection } from '@/types/database';

export function useProductCollections() {
  return useQuery({
    queryKey: ['product-collections'],
    queryFn: async (): Promise<ProductCollection[]> => {
      const { data, error } = await (supabase as any)
        .from('product_collections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as ProductCollection[]) || [];
    },
  });
}

export function useProductCollection(id: string) {
  return useQuery({
    queryKey: ['product-collection', id],
    queryFn: async (): Promise<ProductCollection | null> => {
      const { data, error } = await (supabase as any)
        .from('product_collections')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as ProductCollection | null;
    },
    enabled: !!id,
  });
}

export function useCreateProductCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; description?: string; banner_image_url?: string }) => {
      const { data: collection, error } = await (supabase as any)
        .from('product_collections')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return collection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-collections'] });
    },
  });
}

export function useUpdateProductCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; name?: string; description?: string; banner_image_url?: string; is_active?: boolean }) => {
      const { data: collection, error } = await (supabase as any)
        .from('product_collections')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return collection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-collections'] });
    },
  });
}

export function useDeleteProductCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('product_collections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-collections'] });
    },
  });
}
