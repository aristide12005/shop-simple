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
    <section id="collections" className="section-padding bg-background overflow-hidden">
      <div className="container-luxury">
        {/* Section Header */}
        {!hideHeader && (
          <div className="text-left mb-8 md:mb-12 animate-fade-up">
            <span className="text-sm tracking-luxury uppercase text-muted-foreground mb-4 block">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-6">
              Featured Collections
            </h2>
            <div className="w-16 h-px bg-accent" />
          </div>
        )}

        {/* Collections Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          {limitCollections.map((collection, index) => {
            // Handle image type
            let imageUrl = '/placeholder.svg';
            if ('collection_images' in collection) {
              imageUrl = (collection as any).image_url || ((collection as any).collection_images?.[0]?.image_url) || "https://images.unsplash.com/photo-1590735213920-68192a487bc2?q=80&w=1000";
            } else {
              imageUrl = (collection as any).banner_image_url || "https://images.unsplash.com/photo-1590735213920-68192a487bc2?q=80&w=1000";
            }

            return (
              <div
                key={collection.id}
                className="flex-none w-[85vw] md:w-[350px] snap-center group cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Link to={`/shop?collection=${collection.id}`} className="block">
                  {/* Card Image Container */}
                  <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={imageUrl}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Top Controls Visibility */}
                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />



                    {/* Heart Icon */}
                    <div className="absolute top-4 right-4 text-white z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-7 h-7 hover:scale-110 transition-transform drop-shadow-md"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content (Below Image) */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base text-foreground group-hover:text-primary/80 transition-colors">
                        {collection.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <span>★</span>
                        <span>4.9</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-1">
                      {collection.description || "Collection available now"}
                    </p>
                    <p className="text-foreground font-medium text-sm mt-1">
                      Explore items
                    </p>
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
