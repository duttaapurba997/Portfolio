import type { Metadata } from "next";
import { ThemeStory } from "@/themes/theme-story";

export const metadata: Metadata = {
  title: "Apurba Dutta — Stories Hit Harder",
};

export default function Home() {
  return <ThemeStory />;
}