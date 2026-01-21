export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 gradient-warm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">
            About Accicoa
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              We offer a curated selection of African-made premium products with exceptional 
              quality and customer service. Our mission is to provide you with the best 
              African crafted shopping experience.
            </p>
            
            <p>
              Every piece in our collection is carefully sourced from skilled artisans across 
              Africa, preserving traditional techniques while embracing contemporary style. 
              When you purchase from Accicoa, you're supporting communities and keeping 
              centuries-old craftsmanship alive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-background rounded-xl shadow-card">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Authentic African</h3>
              <p className="text-muted-foreground text-sm">
                Genuine products sourced directly from African artisans
              </p>
            </div>
            
            <div className="p-6 bg-background rounded-xl shadow-card">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                Handcrafted with care using the finest materials
              </p>
            </div>
            
            <div className="p-6 bg-background rounded-xl shadow-card">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Ethical Trade</h3>
              <p className="text-muted-foreground text-sm">
                Fair prices supporting local communities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
