import { connectDB } from "@/lib/db";
import College from "@/models/College";

export async function getCollegeBySlug(slug: string) {
  try {
    await connectDB();

    const college = await College.findOne({ slug, is_active: true })
      .populate("country_ref")
      .lean();

    if (!college) return null;

    return {
      ...college,
      _id: college._id.toString(),

      createdAt: college.createdAt?.toISOString?.(),
      updatedAt: college.updatedAt?.toISOString?.(),

      country_ref: college.country_ref
        ? {
            ...college.country_ref,
            _id: college.country_ref._id.toString(),
            createdAt: college.country_ref.createdAt?.toISOString?.(),
            updatedAt: college.country_ref.updatedAt?.toISOString?.(),
          }
        : null,
    };
  } catch (error) {
    console.error("Error fetching college by slug:", error);
    return null;
  }
}
