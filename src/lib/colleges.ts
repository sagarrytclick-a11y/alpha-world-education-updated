import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function getCollegeBySlug(slug: string) {
  try {
    await connectDB();
    
    const college = await College.findOne({ slug, is_active: true })
      .populate('country_ref')
      .lean();

    return college;
  } catch (error) {
    console.error("Error fetching college by slug:", error);
    return null;
  }
}
