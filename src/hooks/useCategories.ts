import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/database';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await (supabase as any)
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return (data as Category[]) || [];
    },
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async (): Promise<Category | null> => {
      const { data, error } = await (supabase as any)
        .from('categories')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Category | null;
    },
    enabled: !!id,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ['category-slug', slug],
    queryFn: async (): Promise<Category | null> => {
      const { data, error } = await (supabase as any)
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Category | null;
    },
    enabled: !!slug,
  });
}
