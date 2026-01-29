import { useRef } from "react";
import { Link } from "react-router-dom";
import { useProductCollections } from '@/hooks/useProductCollections';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionsGrid({ limit, hideHeader = false }: { limit?: number; hideHeader?: boolean }) {
  const { data: collections, isLoading } = useProductCollections();

  // Use data or fallback if empty (for design verification)
  const displayCollections = collections && collections.length > 0 ? collections : [];
  const limitCollections = limit ? displayCollections.slice(0, limit) : displayCollections;

  if (isLoading) {
    return <div className="py-20 text-center">Loading Collections...</div>;
  }

  return (
    <section id="collections" className="section-padding bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        {!hideHeader && (
          <div className="text-center mb-16 md:mb-24 animate-fade-up">
            <span className="text-sm tracking-luxury uppercase text-muted-foreground mb-4 block">
              Curated Selection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
              Featured Collections
            </h2>
            <div className="accent-line mx-auto" />
          </div>
        )}

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {limitCollections.map((collection, index) => {
            // Handle image type
            let imageUrl = '/placeholder.svg';
            if ('collection_images' in collection) { // It's a product? No, wait, type check.
              // Assuming standard collection type from Supabase schema
              // If it's the `ProductCollection` type:
              imageUrl = (collection as any).image_url || ((collection as any).collection_images?.[0]?.image_url) || "https://images.unsplash.com/photo-1590735213920-68192a487bc2?q=80&w=1000";
            } else {
              imageUrl = (collection as any).banner_image_url || "https://images.unsplash.com/photo-1590735213920-68192a487bc2?q=80&w=1000";
            }

            return (
              <div
                key={collection.id}
                className="group relative overflow-hidden cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Link to={`/shop?collection=${collection.id}`}>
                  <div className="img-zoom aspect-[3/4]">
                    <img
                      src={imageUrl}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 group-hover:text-accent transition-colors duration-300">
                        {collection.name}
                      </h3>
                      <p className="text-white/70 text-sm font-light mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
                        {collection.description || "Discover our exclusive collection."}
                      </p>
                      <span className="inline-block text-white/80 text-xs tracking-luxury uppercase link-underline">
                        Discover
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
