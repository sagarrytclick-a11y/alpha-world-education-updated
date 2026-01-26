import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const exam = await Exam.findById(id);

    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Exam fetched successfully",
      data: exam,
    });
  } catch (error) {
    console.error("Error fetching exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const exam = await Exam.findById(id);
    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    if (slug && slug !== exam.slug) {
      const existingExam = await Exam.findOne({ slug, _id: { $ne: id } });
      if (existingExam) {
        return NextResponse.json(
          {
            success: false,
            message: "Exam with this slug already exists",
          },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (short_name !== undefined) updateData.short_name = short_name;
    if (exam_type !== undefined) updateData.exam_type = exam_type;
    if (conducting_body !== undefined) updateData.conducting_body = conducting_body;
    if (exam_mode !== undefined) updateData.exam_mode = exam_mode;
    if (frequency !== undefined) updateData.frequency = frequency;
    if (description !== undefined) updateData.description = description;
    if (applicable_countries !== undefined) updateData.applicable_countries = applicable_countries;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (display_order !== undefined) updateData.display_order = display_order;

    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Exam updated successfully",
      data: updatedExam,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    await Exam.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
