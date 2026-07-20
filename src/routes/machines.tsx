import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/PublicLayout";
import { Factory, Cpu, Droplets, Scissors } from "lucide-react";

export const Route = createFileRoute("/machines")({
  component: MachinesPage,
});

function MachinesPage() {
  const categories = [
    {
      title: "Cutting Department",
      icon: <Scissors className="w-6 h-6 text-secondary" />,
      machines: [
        { name: "40-Foot Large-Format Cutting Table", desc: "Automated spreader and cutter for mass precision." },
        { name: "CAD Pattern Plotter", desc: "For printing highly efficient pattern markers to reduce material waste." },
        { name: "Band Saw Machines", desc: "Used for precise block cutting of layered fabrics." },
      ]
    },
    {
      title: "Sewing & Assembly",
      icon: <Factory className="w-6 h-6 text-secondary" />,
      machines: [
        { name: "72 Industrial Sewing Machines", desc: "Running in parallel across multiple lines for high-throughput assembly." },
        { name: "Overlock Machines (3, 4, and 5 Thread)", desc: "For clean edge finishing and durable seam construction." },
        { name: "Double Needle Lockstitch Machines", desc: "Essential for denim flat-felled seams." },
        { name: "Buttonhole and Bar-tacking Machines", desc: "For reinforcing stress points and automating closures." },
      ]
    },
    {
      title: "Laundry & Wet Processing",
      icon: <Droplets className="w-6 h-6 text-secondary" />,
      machines: [
        { name: "Large-Capacity Industrial Washers", desc: "For heavy-duty enzyme washing, stone washing, and rinsing." },
        { name: "Industrial Steam Dryers", desc: "For controlled shrinkage and moisture removal." },
        { name: "High-Pressure Boilers", desc: "Powering the steam infrastructure for washing and pressing." },
      ]
    },
    {
      title: "Specialty Finishing",
      icon: <Cpu className="w-6 h-6 text-secondary" />,
      machines: [
        { name: "Laser Etching Systems", desc: "Creates fading or pattern effects on denim without using harsh chemicals." },
        { name: "Ozone Treatment Chambers", desc: "Lightens color in a controlled, highly sustainable way compared to traditional bleaching." },
        { name: "3D Wrinkle Machines", desc: "Used to create permanent creases or textures on specialty-finished garments." },
        { name: "Industrial Steam Presses", desc: "For final garment shaping and presentation before tagging." },
      ]
    }
  ];

  return (
    <PublicLayout>
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary">Our Machine List</h1>
            <p className="font-body-lg text-lg text-on-surface-variant">
              We provide the capital-intensive machinery required for modern conversion manufacturing. Our facility is equipped to handle everything from precision cutting to sustainable denim finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-outline-variant/60 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    {category.icon}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-primary">{category.title}</h2>
                </div>
                <ul className="space-y-4">
                  {category.machines.map((machine, mIdx) => (
                    <li key={mIdx} className="border-b border-outline-variant/30 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-headline-sm text-base font-bold text-foreground">{machine.name}</h4>
                      <p className="font-body-sm text-sm text-on-surface-variant mt-1">{machine.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
