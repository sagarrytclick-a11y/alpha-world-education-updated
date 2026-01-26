import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('country');
    
    const query: Record<string, unknown> = { is_active: true };
    if (countryId) {
      query.country_ref = countryId;
    }
    
    const colleges = await College.find(query)
      .populate('country_ref', 'name slug flag')
      .sort({ ranking: 1, name: 1 })
      .limit(20);
    
    return NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges,
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
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
