import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Ruler } from 'lucide-react';

const mensSizes = [
  { size: 'S', chest: '36-38"', waist: '28-30"', hips: '36-38"' },
  { size: 'M', chest: '38-40"', waist: '30-32"', hips: '38-40"' },
  { size: 'L', chest: '40-42"', waist: '32-34"', hips: '40-42"' },
  { size: 'XL', chest: '42-44"', waist: '34-36"', hips: '42-44"' },
  { size: 'XXL', chest: '44-46"', waist: '36-38"', hips: '44-46"' },
];

const womensSizes = [
  { size: 'XS', bust: '30-32"', waist: '24-26"', hips: '34-36"' },
  { size: 'S', bust: '32-34"', waist: '26-28"', hips: '36-38"' },
  { size: 'M', bust: '34-36"', waist: '28-30"', hips: '38-40"' },
  { size: 'L', bust: '36-38"', waist: '30-32"', hips: '40-42"' },
  { size: 'XL', bust: '38-40"', waist: '32-34"', hips: '42-44"' },
];

export default function SizeGuide() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 max-w-4xl">
        <div className="text-center mb-16">
          <Ruler className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Size Guide</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your perfect fit. All measurements are in inches.
          </p>
        </div>

        {/* Men's Sizes */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6">Men's Sizing</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Size</th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Chest</th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Waist</th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Hips</th>
                </tr>
              </thead>
              <tbody>
                {mensSizes.map((row) => (
                  <tr key={row.size} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-bold">{row.size}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.chest}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Women's Sizes */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6">Women's Sizing</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Size</th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Bust</th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Waist</th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-muted-foreground">Hips</th>
                </tr>
              </thead>
              <tbody>
                {womensSizes.map((row) => (
                  <tr key={row.size} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-bold">{row.size}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.bust}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <div className="bg-muted/50 rounded-xl p-8">
          <h3 className="font-serif font-bold text-lg mb-4">How to Measure</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest, keeping the tape level.</li>
            <li><strong>Waist:</strong> Measure at the narrowest part of your natural waistline.</li>
            <li><strong>Hips:</strong> Measure around the widest part of your hips.</li>
            <li className="text-accent font-medium">If you're between sizes, we recommend sizing up for a relaxed fit.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
