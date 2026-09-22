"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GradientTextProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
};

export default function GradientText({
  children,
  className = "",
  colors = ["#6366F1", "#06d4bf", "#06B6D4"],
  animationSpeed = 3,
  showBorder = false,
}: GradientTextProps) {
  // Close the loop with the first color so the animation has no visible seam.
  const stops = [...colors, colors[0]].join(", ");
  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${stops})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span className={cn("gradient-text", showBorder && "gradient-text-bordered", className)}>
      {showBorder && <span aria-hidden className="gradient-text-overlay" style={gradientStyle} />}
      <span className="gradient-text-content" style={gradientStyle}>
        {children}
      </span>
    </span>
  );
}
