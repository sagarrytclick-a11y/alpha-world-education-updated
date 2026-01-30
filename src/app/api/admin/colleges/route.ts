import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";
import { handleApiError, validateRequiredFields, createSuccessResponse, ValidationError } from "@/lib/validation";

export async function GET() {
  try {
    console.log('🚀 [API] GET /api/admin/colleges - Request received');
    
    console.log('🔗 [API] Connecting to database...');
    await connectDB();
    console.log('✅ [API] Database connected successfully');
    
    console.log('📋 [API] Fetching all colleges...');
    const colleges = await College.find({}).populate('country_ref').sort({ createdAt: -1 });
    console.log('✅ [API] Colleges fetched:', colleges.length, 'colleges found');

    return NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges,
    });
  } catch (error) {
    console.error("💥 [API] Error fetching colleges:", error);
    console.error("💥 [API] Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack available'
    });
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      slug,
      country_ref, 
      exams,
      fees,
      duration,
      establishment_year,
      ranking,
      banner_url,
      about_content,
      is_active,

    
      overview,
      key_highlights,
      why_choose_us,
      fees_structure,
      campus_highlights,
    } = body;

    // ✅ Required validation
    validateRequiredFields(
      { name, slug, country_ref },
      ["name", "slug", "country_ref"]
    );

    // 🌍 Find country ObjectId
    const country = await Country.findOne({ slug: country_ref });
    if (!country) {
      throw new ValidationError("Country not found", { country_ref });
    }

    // 🔒 Unique slug check
    const existingCollege = await College.findOne({ slug });
    if (existingCollege) {
      throw new ValidationError("College with this slug already exists", {
        slug,
      });
    }

    // 🏗️ Create college (ALIGNED WITH MODEL)
    const college = new College({
      name,
      slug,
      country_ref: country._id,

      exams: exams || [],
      fees,
      duration,
      establishment_year,
      ranking,
      banner_url,
      about_content,

      // CMS
      overview: overview || {
        title: name,
        content: about_content || "",
        university_details: country.name,
      },
      key_highlights,
      why_choose_us,
      fees_structure,
      campus_highlights,

      is_active: is_active ?? true,
    });

    const savedCollege = await college.save();

    return createSuccessResponse(
      savedCollege,
      "College created successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}

