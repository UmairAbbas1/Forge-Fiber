import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/PublicLayout";
import { Leaf, Sun, Wind, Recycle } from "lucide-react";

export const Route = createFileRoute("/sustainability")({
  component: SustainabilityPage,
});

function SustainabilityPage() {
  return (
    <PublicLayout>
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary">Sustainable Conversion</h1>
            <p className="font-body-lg text-lg text-on-surface-variant">
              We believe the conversion manufacturing model is inherently more sustainable, allowing brands to maintain full control over their own ethical fabric sourcing. We complement that control with green finishing technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <Leaf className="w-10 h-10 text-secondary" />
                <h3 className="font-display text-2xl font-bold text-primary">Laser Etching</h3>
                <p className="font-body-sm text-base text-on-surface-variant leading-relaxed">
                  Traditional denim fading relies on harsh chemicals and manual sanding which harms the environment and degrades worker safety. Our laser systems create fading and pattern effects with zero chemical runoff.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <Wind className="w-10 h-10 text-secondary" />
                <h3 className="font-display text-2xl font-bold text-primary">Ozone Bleaching</h3>
                <p className="font-body-sm text-base text-on-surface-variant leading-relaxed">
                  We use ozone treatment chambers to lighten colors in a controlled manner. This drastically reduces the water consumption and eliminates the need for toxic chlorine bleach used in traditional wet processing.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <Recycle className="w-10 h-10 text-secondary" />
                <h3 className="font-display text-2xl font-bold text-primary">Pattern Efficiency</h3>
                <p className="font-body-sm text-base text-on-surface-variant leading-relaxed">
                  Sustainability starts at the cutting table. By using advanced CAD marker planning, we maximize fabric utilization on our 40-foot cutting tables, ensuring less of your material ends up as scrap.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <Sun className="w-10 h-10 text-secondary" />
                <h3 className="font-display text-2xl font-bold text-primary">Transparent Sourcing</h3>
                <p className="font-body-sm text-base text-on-surface-variant leading-relaxed">
                  Because we operate on a "cut, make, wash, pack" conversion model, you supply the fabric. This gives you 100% control over organic cotton sourcing, recycled poly usage, and ethical trim purchasing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
