"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LOOKS = [
  { href: "/", label: "Story" },
  { href: "/dark", label: "Dark" },
  { href: "/concept", label: "Concept" },
  { href: "/design-system", label: "System" },
];

export function LookNav() {
  const pathname = usePathname();
  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] flex justify-center px-4">
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 shadow-lg shadow-black/5 backdrop-blur-md">
        <span className="pl-2 pr-1">Looks:</span>
        {LOOKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-2.5 py-1.5 transition-colors",
                active
                  ? "bg-neutral-900 text-white"
                  : "hover:bg-neutral-100 hover:text-neutral-800"
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}