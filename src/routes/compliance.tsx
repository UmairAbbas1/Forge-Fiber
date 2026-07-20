import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/PublicLayout";
import { ShieldCheck, Target, Search, BarChart } from "lucide-react";

export const Route = createFileRoute("/compliance")({
  component: CompliancePage,
});

function CompliancePage() {
  return (
    <PublicLayout>
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary">Quality &amp; Compliance</h1>
            <p className="font-body-lg text-lg text-on-surface-variant">
              Running underneath our thirteen stages is a series of five quality checkpoints. These are not separate departments; they are gates that connect specific inputs to specific outputs to catch defects when they are cheapest to fix.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl border border-outline-variant/60 shadow-sm">
            <h2 className="font-display text-3xl font-bold text-primary mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-secondary" />
              AQL Sampling Methodology
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p>
                Our checkpoints use a method called <strong>AQL – Acceptable Quality Limit</strong>. Rather than inspecting every single garment in a large batch (which is extremely slow and costly), AQL is a statistical sampling method.
              </p>
              <p>
                For example, an <strong>AQL of 2.5</strong> means that no more than 2.5% of inspected units may have a defect for the batch to pass. If the number of defects exceeds the threshold, the entire batch is rejected or reworked.
              </p>
              <p>
                Defects are classified into three severities:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 font-medium text-primary">
                <li><strong>Critical:</strong> Unacceptable at any level (AQL effectively 0).</li>
                <li><strong>Major:</strong> Significant flaws impacting usability.</li>
                <li><strong>Minor:</strong> Aesthetic flaws that do not affect function.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="font-display text-3xl font-bold text-center text-primary">The Five Quality Gates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline-sm font-bold">1. Material Check</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-surface rounded text-secondary uppercase">Stage 3</span>
                </div>
                <p className="text-sm text-on-surface-variant">Catching a bad fabric roll before anything is cut.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline-sm font-bold">2. First Cut Approval</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-surface rounded text-secondary uppercase">Stage 6</span>
                </div>
                <p className="text-sm text-on-surface-variant">Confirming cut panels match specification before labor is spent sewing them.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline-sm font-bold">3. Inline Sewing QC</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-surface rounded text-secondary uppercase">Stage 8</span>
                </div>
                <p className="text-sm text-on-surface-variant">Caught during the process, not just at the end, so problems are cheap to fix.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm lg:col-start-1 lg:col-span-1 lg:translate-x-1/2">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline-sm font-bold">4. Wash/Finish Approval</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-surface rounded text-secondary uppercase">Stage 11</span>
                </div>
                <p className="text-sm text-on-surface-variant">The last point to catch a defect before packing labor is spent on it.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm lg:col-start-2 lg:col-span-1 lg:translate-x-1/2">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline-sm font-bold">5. Final AQL / Packing Audit</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-surface rounded text-secondary uppercase">Stage 13</span>
                </div>
                <p className="text-sm text-on-surface-variant">Packed cartons undergo a final audit before dispatch to the customer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
