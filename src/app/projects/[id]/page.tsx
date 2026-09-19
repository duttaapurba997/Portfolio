import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { ProjectDetail } from "@/themes/project-detail";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Story not found — Apurba Dutta" };
  return {
    title: `${project.title} — Apurba Dutta`,
    description: project.blurb,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectDetail project={project} projects={projects} />;
}