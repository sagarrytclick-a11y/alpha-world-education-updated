import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

export async function GET() {
  try {
    await connectDB();
    const exams = await Exam.find({}).sort({ display_order: 1, name: 1 });
    
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



export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      name,
      slug,
      short_name,
      exam_type,
      conducting_body,
      exam_mode,
      frequency,
      description,

      overview,
      highlights,
      eligibility,
      exam_pattern,
      result_stats,
      exam_dates,

      content, 

      applicable_countries,
      is_active,
      display_order,
    } = body;

    if (!name || !slug || !short_name || !description) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const existingExam = await Exam.findOne({ slug });
    if (existingExam) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    const exam = await Exam.create({
      name,
      slug,
      short_name,
      exam_type,
      conducting_body,
      exam_mode,
      frequency,
      description,

      overview,
      highlights,
      eligibility,
      exam_pattern,
      result_stats,
      exam_dates,

      content, 

      applicable_countries: applicable_countries || [],
      is_active: is_active ?? true,
      display_order: display_order || 0,
    });

    return NextResponse.json({
      success: true,
      message: "Exam created successfully",
      data: exam,
    });
  } catch (error) {
    console.error("Create exam error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create exam" },
      { status: 500 }
    );
  }
}
