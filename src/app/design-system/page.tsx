import type { Metadata } from "next";
import { DesignSystemDocs } from "@/themes/design-system";

export const metadata: Metadata = {
  title: "Design System — Apurba Dutta",
  description:
    "The design system behind Apurba Dutta's portfolio — color, typography, materials, motion and components.",
};

export default function DesignSystemPage() {
  return <DesignSystemDocs />;
}