import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Package,
  Cpu,
  Factory,
  Droplets,
  Eye,
  CheckSquare,
  History,
  Clock,
  Share2,
  Mail,
  Menu,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forge & Fabric | Industrial Garment Production Tracking" },
      { name: "description", content: "Real-time garment production tracking for conversion manufacturing. We convert customer-supplied fabric and trims into finished, high-quality garments." },
      { property: "og:title", content: "Forge & Fabric | Industrial Garment Production Tracking" },
      { property: "og:description", content: "Real-time garment production tracking for conversion manufacturing." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* TopNavBar */}
      <nav
        className={`fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/50 transition-all duration-300 ${
          scrolled ? "h-16 shadow-md" : "h-20"
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 h-full w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-display-lg text-lg md:text-xl font-extrabold text-primary tracking-tight uppercase">
              Forge & Fabric
            </span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {/* Navigation links have been removed for unauthenticated landing page */}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex bg-primary-container text-on-primary-container hover:bg-primary hover:text-white px-6 py-2.5 rounded-lg font-label-caps text-xs tracking-wider uppercase transition-all duration-200"
            >
              Sign In
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-on-surface hover:text-secondary"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface-container-lowest border-b border-outline-variant p-6 space-y-4 shadow-xl">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-primary-container text-on-primary-container hover:bg-primary hover:text-white py-3 rounded-lg font-label-caps text-sm tracking-wider uppercase transition-all"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>

      <main className={`${scrolled ? "mt-16" : "mt-20"} transition-all duration-300`}>
        {/* Hero Section */}
        <section className="relative min-h-[800px] flex items-center overflow-hidden industrial-grid py-16 px-6 md:px-12 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 z-10 space-y-6">
              <p className="font-label-caps text-xs text-secondary font-bold uppercase tracking-[0.2em]">
                Built to Craft. Made to Last.
              </p>
              <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-primary font-extrabold leading-tight tracking-tight">
                Real-time garment production tracking for <span className="text-secondary italic font-semibold">conversion manufacturing</span>.
              </h1>
              <p className="font-body-lg text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Specializing in the customer-supplied-materials model—converting your fabric and trims into finished, high-quality garments with precision and full transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/dashboard"
                  className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-headline-sm text-base font-semibold flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all group shadow-xl duration-200"
                >
                  View Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="border border-outline-variant text-primary px-8 py-4 rounded-lg font-headline-sm text-base font-semibold hover:border-secondary transition-all hover:bg-white/40">
                  Request Demo
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-outline-variant">
                <img
                  className="w-full h-full object-cover"
                  alt="Industrial sewing machine stitching navy denim"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPqO4hbdfBxxskRI2CfHS331oukD5X_ujOGIGlBXlTIim7rsn9rIOaGdSYVjkycWXs85iB7WMlfAvJw7_vOH-xkncP6uth0qyjAZm36R2yrAyTPrQPlLFhgxTb5d-octMo_HN3CrC6hRJ7BgrJChxYM451cFLFFPZUNz7qaH18jN8vkbdrQjLUOXngCDiXgKUsgTo6XP2amKdFaiSE0xOAHPcKJ1lNDqTCurtUGAu5sKHz6Ry2rStj_vwa7ws3uycZY5F6RplNKmw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 to-transparent"></div>
                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 glass-card border border-outline-variant/60 p-4 rounded-lg flex items-center gap-3 animate-bounce shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white shadow-inner">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-label-caps text-xs font-bold text-primary">Quality Certified</p>
                    <p className="font-mono-data text-xs text-on-surface-variant font-medium">Batch #7721-QC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-primary-container text-on-primary-container py-12 px-6 md:px-12 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-8">
            <div className="flex flex-col min-w-[150px]">
              <span className="font-display-lg text-3xl md:text-4xl text-white font-extrabold">72</span>
              <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold mt-1">Sewing Machines</span>
            </div>
            <div className="h-12 w-px bg-outline-variant/20 hidden md:block"></div>
            
            <div className="flex flex-col min-w-[150px]">
              <span className="font-display-lg text-3xl md:text-4xl text-white font-extrabold">13-Stage</span>
              <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold mt-1">Tracked Pipeline</span>
            </div>
            <div className="h-12 w-px bg-outline-variant/20 hidden md:block"></div>
            
            <div className="flex flex-col min-w-[150px]">
              <span className="font-display-lg text-3xl md:text-4xl text-white font-extrabold">94%</span>
              <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold mt-1">On-Time Delivery</span>
            </div>
            <div className="h-12 w-px bg-outline-variant/20 hidden md:block"></div>
            
            <div className="flex flex-col min-w-[150px]">
              <span className="font-display-lg text-3xl md:text-4xl text-white font-extrabold">5</span>
              <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold mt-1">Quality Checkpoints</span>
            </div>
          </div>
        </section>

        {/* How It Works (Bento-style Grid) */}
        <section className="py-24 px-6 md:px-12 bg-surface">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-primary">How It Works</h2>
              <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
                Our 5-phase conversion process ensures every yard of customer material is accounted for and transformed into perfection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Phase 1: Intake */}
              <div className="md:col-span-3 bg-surface-container-low border border-outline-variant p-8 rounded-xl flex flex-col justify-between group hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-xs text-secondary font-bold uppercase tracking-wider">PHASE 01</span>
                    <Package className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold">Intake &amp; Materials</h3>
                  <ul className="font-body-md text-sm text-on-surface-variant space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 
                      <span>PO &amp; Tech Pack reconciliation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 
                      <span>Material receiving &amp; discrepancy reporting</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 overflow-hidden rounded-lg h-40">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Intake of garment components"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuPLPH0-BYnKmtrZQfIxGkjICMwo9LWxAJVFa9PYIE2VzXZFueMZp5Pi9AtmukGZmb69Y4sGJi_s5VGXEXnndaJNoLzan_Io9eQFkMe6uYkM2UD0_axHYqVlFeC6gFQdo8w4sRAymRcOY8G6UkJNowwtSg8svgLFnjHV931WhEnHw2WyRpMeX50f1Tth0m0t-9pDgRQjsAXw5R_U54TL9X4axvXuOA9-10qTibM6jnUkHk23nRWKRbCFKSemycaQQydFAl-_8_EqQ"
                  />
                </div>
              </div>

              {/* Phase 2: Cutting */}
              <div className="md:col-span-3 bg-surface-container-low border border-outline-variant p-8 rounded-xl flex flex-col justify-between group hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-xs text-secondary font-bold uppercase tracking-wider">PHASE 02</span>
                    <Cpu className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold">Precision Cutting</h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Marker optimization using our 40ft automated cutter for maximum material yield and zero-drift accuracy.
                  </p>
                </div>
                <div className="mt-8 overflow-hidden rounded-lg h-40">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Precision fabric cutting machinery"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgKyJF9Fco1ogmRsbHNTM-Y0tYn78OvjtRVI-zUym3bjIfgLxuAokiJfcWUPRXgl6tSXqXZ02HKqh_kOSn0oThOzMA2wbJGwkgNFyDXAVOqNX2XSjeJbgybzmVEN71RjggJ6PgU96KxZR2sgDM98ygXkIEavShRtxOrvoMMb3j5qMPR4FkWgw_35pR_2c_hBJA3dslkg0Y04WL44V-aV4q8Zvu7WQjGTIVMqZid45VrpY0R6TRZHZTiMQXJ10XEVGplJn06fQTQfY"
                  />
                </div>
              </div>

              {/* Phase 3: Sewing */}
              <div className="md:col-span-2 bg-primary-container text-on-primary-container p-8 rounded-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group shadow-md">
                <div className="space-y-4">
                  <span className="font-mono-data text-xs text-secondary font-bold uppercase tracking-wider">PHASE 03</span>
                  <h3 className="font-headline-md text-xl font-bold text-white">Sewing &amp; Assembly</h3>
                  <p className="font-body-md text-sm text-on-primary-container leading-relaxed">
                    72 industrial machines running synchronized bundling protocols for high-capacity throughput.
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <Factory className="h-16 w-16 text-secondary/30 group-hover:text-secondary transition-colors duration-300" />
                </div>
              </div>

              {/* Phase 4: Wash */}
              <div className="md:col-span-2 bg-surface-container-low border border-outline-variant p-8 rounded-xl flex flex-col justify-between group hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-xs text-secondary font-bold uppercase tracking-wider">PHASE 04</span>
                    <Droplets className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold">Wash &amp; Finish</h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Sustainable laundry systems including Jeanologia lasers and ozone distressing.
                  </p>
                </div>
                <div className="h-16" />
              </div>

              {/* Phase 5: QC */}
              <div className="md:col-span-2 bg-secondary-container text-on-secondary-container p-8 rounded-xl flex flex-col justify-between hover:bg-secondary hover:text-white transition-all duration-300 group shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-xs text-on-secondary-container group-hover:text-white transition-colors font-bold uppercase tracking-wider">PHASE 05</span>
                    <ShieldCheck className="h-8 w-8 text-on-secondary-container group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold">QC &amp; Dispatch</h3>
                  <p className="font-body-md text-sm opacity-90 leading-relaxed">
                    Final 5-point inspection before high-security packing and international shipping.
                  </p>
                </div>
                <div className="h-16" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Forge & Fabric */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low border-y border-outline-variant/60">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="max-w-2xl space-y-4">
                <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-primary">Engineered for Transparency</h2>
                <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
                  We don't just make clothes; we manage industrial data. Our platform provides the visibility you need to scale with confidence.
                </p>
              </div>
              <button className="bg-white border border-outline-variant/80 px-6 py-3 rounded-lg font-label-caps text-xs tracking-wider uppercase font-semibold hover:border-secondary transition-all hover:bg-surface duration-200">
                Download Capability Statement
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 border border-outline-variant/60 rounded-xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                <Eye className="text-secondary mb-6 h-8 w-8" />
                <h4 className="font-headline-sm text-lg font-bold mb-3">Real-time WIP Visibility</h4>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  Track every single garment as it moves through the 13-stage pipeline in real-time.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-8 border border-outline-variant/60 rounded-xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                <CheckSquare className="text-secondary mb-6 h-8 w-8" />
                <h4 className="font-headline-sm text-lg font-bold mb-3">5-Point Checkpoints</h4>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  Stringent quality gates at every critical transformation phase, from cutting to packing.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white p-8 border border-outline-variant/60 rounded-xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                <History className="text-secondary mb-6 h-8 w-8" />
                <h4 className="font-headline-sm text-lg font-bold mb-3">End-to-End Traceability</h4>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  Full audit trail of customer-supplied materials from arrival to finished shipment.
                </p>
              </div>
              
              {/* Card 4 */}
              <div className="bg-white p-8 border border-outline-variant/60 rounded-xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                <Clock className="text-secondary mb-6 h-8 w-8" />
                <h4 className="font-headline-sm text-lg font-bold mb-3">On-Time Tracking</h4>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  Predictive delivery analytics ensure your retail launch dates are always protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none industrial-grid"></div>
          <div className="max-w-3xl mx-auto relative z-10 space-y-8">
            <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
              Ready to streamline your production?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-headline-sm text-base font-semibold shadow-xl hover:bg-black hover:text-white transition-all duration-200"
              >
                Access Client Portal
              </Link>
              <button className="border border-outline text-primary px-8 py-4 rounded-lg font-headline-sm text-base font-semibold hover:border-secondary transition-all hover:bg-surface duration-200">
                Talk to Production Team
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-container text-on-primary-container w-full py-16 px-6 md:px-12 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="max-w-sm space-y-4">
              <span className="font-display-lg text-lg font-bold text-white tracking-wider uppercase">
                Forge &amp; Fabric
              </span>
              <p className="font-body-sm text-sm text-on-primary-container/80 leading-relaxed">
                Industrial garment manufacturing for premium brands. Specializing in conversion models and sustainable finishing.
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors duration-200"
                  aria-label="Share"
                >
                  <Share2 className="h-5 w-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors duration-200"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
              <div className="space-y-4">
                <h5 className="font-label-caps text-xs uppercase tracking-widest text-white font-bold">Factory</h5>
                <ul className="space-y-3 font-body-sm text-sm text-on-primary-container/70">
                  <li><a className="hover:text-white transition-colors" href="#">Our Process</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Sustainability</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Machine List</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Compliance</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-label-caps text-xs uppercase tracking-widest text-white font-bold">Company</h5>
                <ul className="space-y-3 font-body-sm text-sm text-on-primary-container/70">
                  <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Contact</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1 space-y-4">
                <h5 className="font-label-caps text-xs uppercase tracking-widest text-white font-bold">Contact</h5>
                <p className="font-body-sm text-sm text-on-primary-container/80">production@forgefabric.com</p>
                <p className="font-body-sm text-sm text-on-primary-container/80">+1 (555) 902-1342</p>
                <p className="font-body-sm text-sm text-on-primary-container/60 mt-4 leading-relaxed">
                  1200 Industrial Pkwy<br />New York, NY 10001
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8">
            <p className="font-body-sm text-xs text-on-primary-container/60">
              © 2026 Forge &amp; Fabric Industrial. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a className="font-body-sm text-xs text-on-primary-container/70 hover:text-white transition-colors" href="#">
                Sustainability Report
              </a>
              <a className="font-body-sm text-xs text-on-primary-container/70 hover:text-white transition-colors" href="#">
                Compliance
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
