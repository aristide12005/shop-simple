import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductWithDetails, Product } from '@/types/database';

export function useProducts(filters?: { collectionId?: string; categoryId?: string }) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async (): Promise<ProductWithDetails[]> => {
      let query = (supabase as any)
        .from('collections')
        .select(`
          *,
          collection_images (*),
          product_variants (*),
          product_collection:product_collections (*),
          category:categories (*)
        `)
        .order('created_at', { ascending: false });

      if (filters?.collectionId) {
        query = query.eq('collection_id', filters.collectionId);
      }

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data as ProductWithDetails[]) || [];
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<ProductWithDetails | null> => {
      const { data, error } = await (supabase as any)
        .from('collections')
        .select(`
          *,
          collection_images (*),
          product_variants (*),
          product_collection:product_collections (*),
          category:categories (*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as ProductWithDetails | null;
    },
    enabled: !!id,
  });
}

export function useProductsByCategory(categorySlug: string) {
  return useQuery({
    queryKey: ['products-by-category', categorySlug],
    queryFn: async (): Promise<ProductWithDetails[]> => {
      // First get the category ID from slug
      const { data: category, error: catError } = await (supabase as any)
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .maybeSingle();

      if (catError) throw catError;
      if (!category) return [];

      const { data, error } = await (supabase as any)
        .from('collections')
        .select(`
          *,
          collection_images (*),
          product_variants (*),
          product_collection:product_collections (*),
          category:categories (*)
        `)
        .eq('category_id', category.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as ProductWithDetails[]) || [];
    },
    enabled: !!categorySlug,
  });
}

export function useProductsByCollection(collectionId: string) {
  return useQuery({
    queryKey: ['products-by-collection', collectionId],
    queryFn: async (): Promise<ProductWithDetails[]> => {
      const { data, error } = await (supabase as any)
        .from('collections')
        .select(`
          *,
          collection_images (*),
          product_variants (*),
          product_collection:product_collections (*),
          category:categories (*)
        `)
        .eq('collection_id', collectionId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as ProductWithDetails[]) || [];
    },
    enabled: !!collectionId,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { 
      name: string; 
      description?: string; 
      price: number; 
      stock_quantity?: number;
      collection_id?: string;
      category_id?: string;
    }) => {
      const { data: product, error } = await supabase
        .from('collections')
        .insert({ 
          ...data, 
          stock_quantity: data.stock_quantity ?? 0 
        } as any)
        .select()
        .single();

      if (error) throw error;
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { 
      id: string; 
      name?: string; 
      description?: string; 
      price?: number; 
      stock_quantity?: number;
      collection_id?: string;
      category_id?: string;
    }) => {
      const { data: product, error } = await supabase
        .from('collections')
        .update(data as any)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}
