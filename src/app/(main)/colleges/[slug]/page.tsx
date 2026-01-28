export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollegeBySlug } from "@/lib/colleges";
import CollegeDetailPage from "./CollegeDetailPage";

interface CollegePageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: CollegePageProps
): Promise<Metadata> {
  const college = await getCollegeBySlug(params.slug);

  if (!college) {
    return {
      title: "College Not Found - AlphaWorld Education",
    };
  }

  return {
    title: `${college.name} - AlphaWorld Education`,
    description:
      college.about_content?.slice(0, 160) ||
      "Learn more about this college",
  };
}

export default async function CollegePage({ params }: CollegePageProps) {
  const college = await getCollegeBySlug(params.slug);

  if (!college) notFound();

  return <CollegeDetailPage college={college} />;
}
