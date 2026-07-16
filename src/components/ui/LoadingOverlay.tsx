import React from "react";
import { Workflow, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  message?: string;
  description?: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function LoadingOverlay({
  message = "Syncing Pipeline Data...",
  description = "Connecting to database and updating production metrics.",
  className,
  icon: Icon = Workflow,
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 rounded-xl bg-background/50 backdrop-blur-[2px] transition-all duration-300",
        className
      )}
    >
      {/* Top Edge Sleek Shimmer Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-1 w-full overflow-hidden bg-primary/10 rounded-t-xl">
        <div 
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/80 to-transparent animate-[shimmer_2s_infinite]"
          style={{
            animationTimingFunction: "ease-in-out",
          }}
        />
      </div>

      {/* Spinner & Logo Container */}
      <div className="relative flex items-center justify-center">
        {/* Glowing ripple background */}
        <div className="absolute h-20 w-20 rounded-full bg-primary/5 animate-ping opacity-75 duration-1000" />
        
        {/* Outer fast spinning border */}
        <div className="h-16 w-16 rounded-full border-2 border-primary/10 border-t-primary animate-spin" />
        
        {/* Inner reverse slower spinning border */}
        <div className="absolute h-12 w-12 rounded-full border-2 border-transparent border-b-secondary/60 animate-[spin_1.5s_infinite_reverse]" />

        {/* Center Logo/Icon Mark */}
        <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm border border-border">
          <Icon className="h-4.5 w-4.5 text-primary animate-pulse" />
        </div>
      </div>

      {/* Text Details */}
      <div className="text-center max-w-sm px-4 space-y-1.5 z-10">
        <h3 className="font-display font-bold text-sm tracking-wide uppercase text-primary animate-pulse">
          {message}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Keyframes injection helper */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}
