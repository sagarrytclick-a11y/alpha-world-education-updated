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
      applicable_countries, 
      is_active, 
      display_order 
    } = body;

    if (!name || !slug || !short_name || !exam_type || !conducting_body || !exam_mode || !frequency || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, slug, short_name, exam_type, conducting_body, exam_mode, frequency, description",
        },
        { status: 400 }
      );
    }

    const existingExam = await Exam.findOne({ slug });
    if (existingExam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam with this slug already exists",
        },
        { status: 409 }
      );
    }

    const exam = new Exam({
      name,
      slug,
      short_name,
      exam_type,
      conducting_body,
      exam_mode,
      frequency,
      description,
      applicable_countries: applicable_countries || [],
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order || 0,
    });

    await exam.save();

    return NextResponse.json({
      success: true,
      message: "Exam created successfully",
      data: exam,
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
