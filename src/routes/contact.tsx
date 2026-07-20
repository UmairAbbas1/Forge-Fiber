import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/PublicLayout";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <PublicLayout>
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h1 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary mb-4">Get in Touch</h1>
              <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
                Whether you're looking to scale your production or need a reliable conversion partner, our production team is ready to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider">Phone</p>
                  <a href="tel:03269428312" className="font-body-lg text-lg text-primary hover:text-secondary transition-colors">03269428312</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:faizijaz914@gmail.com" className="font-body-lg text-lg text-primary hover:text-secondary transition-colors">faizijaz914@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider">Office</p>
                  <p className="font-body-lg text-lg text-primary">1200 Industrial Pkwy<br/>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-outline-variant/60 shadow-lg">
            <h3 className="font-display text-2xl font-bold text-primary mb-6">Send us a message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="font-label-caps text-xs font-bold text-on-surface">Company Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:border-primary transition-colors" placeholder="Your Brand" />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-xs font-bold text-on-surface">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:border-primary transition-colors" placeholder="name@company.com" />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-xs font-bold text-on-surface">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your production needs..."></textarea>
              </div>
              <button type="button" className="w-full bg-primary text-white py-4 rounded-lg font-headline-sm font-bold hover:bg-black transition-colors duration-200 mt-2">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
