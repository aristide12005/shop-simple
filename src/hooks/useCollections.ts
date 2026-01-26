import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CollectionWithImages, Collection } from '@/types/database';

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async (): Promise<CollectionWithImages[]> => {
      const { data, error } = await (supabase as any)
        .from('collections')
        .select(`
          *,
          collection_images (*),
          product_variants (*),
          categories (*),
          product_collections (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as CollectionWithImages[]) || [];
    },
  });
}

export function useCollection(id: string) {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: async (): Promise<CollectionWithImages | null> => {
      const { data, error } = await (supabase as any)
        .from('collections')
        .select(`
          *,
          collection_images (*),
          product_variants (*),
          categories (*),
          product_collections (*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as CollectionWithImages | null;
    },
    enabled: !!id,
  });
}

export function useCreateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; description: string; price: number; stock_quantity?: number }) => {
      const { data: collection, error } = await supabase
        .from('collections')
        .insert({ ...data, stock_quantity: data.stock_quantity ?? 0 } as any)
        .select()
        .single();

      if (error) throw error;
      return collection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; name: string; description: string; price: number; stock_quantity?: number }) => {
      const { data: collection, error } = await supabase
        .from('collections')
        .update(data as any)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return collection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useDeleteCollection() {
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
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionId, file }: { collectionId: string; file: File }) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${collectionId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('collection-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('collection-images')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('collection_images')
        .insert({
          collection_id: collectionId,
          image_url: publicUrl,
        });

      if (insertError) throw insertError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: string) => {
      const { error } = await supabase
        .from('collection_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useCreateVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { collection_id: string; name: string; sku?: string; stock_quantity: number; price?: number }) => {
      const { data: variant, error } = await (supabase as any)
        .from('product_variants')
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return variant;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useUpdateVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; name?: string; sku?: string; stock_quantity?: number; price?: number }) => {
      const { data: variant, error } = await (supabase as any)
        .from('product_variants')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return variant;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useDeleteVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('product_variants')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}
