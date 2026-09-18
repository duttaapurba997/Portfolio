import type { Metadata } from "next";
import { ThemeB } from "@/themes/theme-b";

export const metadata: Metadata = {
  title: "Apurba Dutta — Dark Gallery",
};

export default function DarkPage() {
  return <ThemeB />;
}