import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";

export async function GET() {
  try {
    await connectDB();
    const countries = await Country.find({ is_active: true })
      .sort({ name: 1 });
    
    return NextResponse.json({
      success: true,
      message: "Countries fetched successfully",
      data: countries,
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch countries",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
