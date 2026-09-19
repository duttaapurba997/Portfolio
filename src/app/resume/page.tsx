import type { Metadata } from "next";
import { ResumeDoc } from "@/themes/resume-doc";

export const metadata: Metadata = {
  title: "Resume — Apurba Dutta",
  description: "Download the resume of Apurba Dutta — Senior Graphic Designer, Swiggy.",
};

export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ download?: string }>;
}) {
  const { download } = await searchParams;
  return <ResumeDoc autoPrint={download === "1"} />;
}