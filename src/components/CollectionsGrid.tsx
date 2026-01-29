import { useProductCollections } from '@/hooks/useProductCollections';
import CollectionCard from './CollectionCard';
import { Skeleton } from '@/components/ui/skeleton';

interface CollectionsGridProps {
  limit?: number;
  hideHeader?: boolean;
}

export default function CollectionsGrid({ limit, hideHeader = false }: CollectionsGridProps) {
  const { data: collections, isLoading, error } = useProductCollections();

  if (isLoading) {
    return (
      <section id="collections" className={hideHeader ? "" : "py-16 md:py-24 bg-background"}>
        <div className={hideHeader ? "" : "container mx-auto px-4"}>
          {!hideHeader && (
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Featured Collections
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(limit || 4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="collections" className={hideHeader ? "" : "py-16 md:py-24 bg-background"}>
        <div className={hideHeader ? "text-center" : "container mx-auto px-4 text-center"}>
          {!hideHeader && (
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Collections
            </h2>
          )}
          <p className="text-muted-foreground">Unable to load collections. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!collections || collections.length === 0) {
    return (
      <section id="collections" className={hideHeader ? "" : "py-16 md:py-24 bg-background"}>
        <div className={hideHeader ? "text-center" : "container mx-auto px-4 text-center"}>
          {!hideHeader && (
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Collections
            </h2>
          )}
          <p className="text-muted-foreground">No collections available yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  const displayedCollections = limit ? collections.slice(0, limit) : collections;

  return (
    <section id="collections" className={hideHeader ? "" : "py-16 md:py-24 bg-background"}>
      <div className={hideHeader ? "" : "container mx-auto px-4"}>
        {!hideHeader && (
          <>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Featured Collections
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore our curated selection of authentic African craftsmanship
            </p>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[400px]">
          {displayedCollections.map((collection, index) => (
            <div
              key={collection.id}
              className={`relative group overflow-hidden rounded-none ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            >
              <CollectionCard collection={collection} variant="featured" />
            </div>
          ))}
        </div>

        {!hideHeader && (
          <div className="mt-12 text-center">
            <Link to="/collections">
              <Button variant="outline" className="border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-white uppercase tracking-widest px-8">
                View All Collections
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
