import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";
import Country from "@/models/Country";

export async function GET() {
  try {
    await connectDB();
    const exams = await Exam.find({ is_active: true })
      .sort({ display_order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch exams",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
