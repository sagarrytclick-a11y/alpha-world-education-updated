import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

/* ===================== GET SINGLE EXAM ===================== */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const exam = await Exam.findById(params.id);

    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
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
      { success: false, message: "Failed to fetch exam" },
      { status: 500 }
    );
  }
}

/* ===================== UPDATE EXAM ===================== */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const exam = await Exam.findById(params.id);
    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    /* 🔒 Slug uniqueness */
    if (slug && slug !== exam.slug) {
      const exists = await Exam.findOne({
        slug,
        _id: { $ne: params.id },
      });
      if (exists) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    /* 🧠 SAFE UPDATE OBJECT */
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (short_name !== undefined) updateData.short_name = short_name;
    if (exam_type !== undefined) updateData.exam_type = exam_type;
    if (conducting_body !== undefined)
      updateData.conducting_body = conducting_body;
    if (exam_mode !== undefined) updateData.exam_mode = exam_mode;
    if (frequency !== undefined) updateData.frequency = frequency;
    if (description !== undefined) updateData.description = description;

    /* 🔥 CMS FIELDS */
    if (overview !== undefined) updateData.overview = overview;
    if (highlights !== undefined) updateData.highlights = highlights;
    if (eligibility !== undefined) updateData.eligibility = eligibility;
    if (exam_pattern !== undefined)
      updateData.exam_pattern = exam_pattern;
    if (result_stats !== undefined)
      updateData.result_stats = result_stats;
    if (exam_dates !== undefined)
      updateData.exam_dates = exam_dates;
    if (content !== undefined) updateData.content = content;

    if (applicable_countries !== undefined)
      updateData.applicable_countries = applicable_countries;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (display_order !== undefined)
      updateData.display_order = display_order;

    const updatedExam = await Exam.findByIdAndUpdate(
      params.id,
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
      { success: false, message: "Failed to update exam" },
      { status: 500 }
    );
  }
}

/* ===================== DELETE EXAM ===================== */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const exam = await Exam.findByIdAndDelete(params.id);

    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exam:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete exam" },
      { status: 500 }
    );
  }
}
