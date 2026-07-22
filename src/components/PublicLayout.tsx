import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Globe, Search, BookOpen, Bookmark, ShoppingBag, User, Phone, Menu, X, ChevronDown } from "lucide-react";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-neutral-900 font-sans overflow-x-hidden min-h-screen">
      {/* 1. Dark Top Bar */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2 px-4 md:px-12 flex justify-between items-center border-b border-neutral-800 z-50 relative">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-3 py-1 rounded-full text-neutral-200 transition-colors">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-medium">Global HQ</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
          
          <div className="relative hidden sm:block w-64 md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for materials, POs, tech packs..."
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded-full pl-8 pr-4 py-1 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-600 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 text-neutral-400">
          <Link to="/contact" className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Resources</span>
          </Link>
          <button className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Lists</span>
          </button>
          <Link to="/orders" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart / Orders</span>
          </Link>
          <Link to="/login" className="flex items-center justify-center bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-1.5 rounded-full text-neutral-200 transition-colors">
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Main White Navigation Header */}
      <nav
        className={`w-full bg-white border-b border-neutral-200/80 sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "shadow-md py-3" : "py-4"
        }`}
      >
        <div className="flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-700 hover:text-black"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link to="/" className="flex items-center gap-3">
              <img src="/favicon.png" alt="Forge & Fabric Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-contain" />
              <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-neutral-950">
                FORGE<span className="text-amber-600 font-serif italic font-normal">&amp;</span>FABRIC
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-neutral-800">
            <div className="group relative flex items-center gap-1 cursor-pointer hover:text-amber-700 transition-colors">
              <span>Dyeable</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
            </div>
            <div className="group relative flex items-center gap-1 cursor-pointer hover:text-amber-700 transition-colors">
              <span>Dyed &amp; Finished</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
            </div>
            <div className="group relative flex items-center gap-1 cursor-pointer hover:text-amber-700 transition-colors">
              <span>Made-to-Order</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
            </div>
            <div className="group relative flex items-center gap-1 cursor-pointer hover:text-amber-700 transition-colors">
              <span>13-Stage Tracking</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-2 bg-neutral-950 text-white hover:bg-amber-700 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow"
            >
              <span>Contact</span>
              <Phone className="w-3.5 h-3.5" />
            </Link>
            
            <Link
              to="/dashboard"
              className="bg-amber-600 text-white hover:bg-neutral-950 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 p-6 space-y-4 shadow-xl">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-neutral-950 text-white py-3 rounded-full text-sm font-bold uppercase tracking-wider"
            >
              Client Portal Dashboard
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Forge & Fabric Logo" className="h-8 w-8 rounded object-contain" />
            <span className="text-white font-bold text-sm tracking-wide">FORGE &amp; FABRIC</span>
          </div>
          <p>© {new Date().getFullYear()} Forge &amp; Fabric Industrial Garment Conversion. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
