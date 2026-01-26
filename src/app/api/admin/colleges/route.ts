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
    console.log('🚀 [API] POST /api/admin/colleges - Request received');
    
    console.log('🔗 [API] Connecting to database...');
    await connectDB();
    console.log('✅ [API] Database connected successfully');
    
    console.log('📥 [API] Parsing request body...');
    const body = await request.json();
    console.log('📦 [API] Request body:', body);
    
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
      is_active 
    } = body;

    console.log('🔍 [API] Extracted fields:', {
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
      is_active
    });

    // Validation using utility
    console.log('✅ [API] Starting validation...');
    validateRequiredFields(body, ['name', 'slug', 'country_ref', 'fees', 'duration', 'about_content']);
    console.log('✅ [API] Validation passed');

    // Find country by slug to get ObjectId
    console.log('🔍 [API] Finding country with slug:', country_ref);
    const country = await Country.findOne({ slug: country_ref });
    if (!country) {
      console.log('❌ [API] Country not found with slug:', country_ref);
      
      // Get available countries for helpful error message
      const availableCountries = await Country.find({}).select('slug name flag');
      const countryList = availableCountries.map(c => `- ${c.slug} (${c.flag} ${c.name})`).join('\n');
      
      throw new ValidationError(
        "Country not found",
        {
          invalidCountry: country_ref,
          availableCountries: availableCountries,
          message: `Country with slug '${country_ref}' not found. Available countries:\n${countryList}`
        }
      );
    }
    console.log('✅ [API] Country found:', country.name);

    // Check if college with same slug already exists
    console.log('🔍 [API] Checking for existing college with slug:', slug);
    const existingCollege = await College.findOne({ slug });
    if (existingCollege) {
      console.log('❌ [API] College with slug already exists:', existingCollege.name);
      throw new ValidationError(
        "College with this slug already exists",
        { existingSlug: slug, existingCollege: existingCollege.name }
      );
    }
    console.log('✅ [API] No existing college found with slug');

    console.log('🏗️ [API] Creating new college document...');
    const college = new College({
      name,
      slug,
      country_ref: country._id, // Use the ObjectId from the found country
      exams: exams || [],
      fees: Number(fees),
      duration,
      establishment_year,
      ranking,
      banner_url: banner_url || "",
      about_content,
      is_active: is_active !== undefined ? is_active : true,
    });

    console.log('💾 [API] Saving college to database...');
    const savedCollege = await college.save();
    console.log('✅ [API] College saved successfully:', savedCollege);

    return createSuccessResponse(savedCollege, "College created successfully");
    
  } catch (error) {
    return handleApiError(error);
  }
}
