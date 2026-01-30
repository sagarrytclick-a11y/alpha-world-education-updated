import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";
import mongoose from "mongoose";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const college = await College.findById(params.id)
      .populate("country_ref");

    if (!college) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "College fetched successfully",
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch college" },
      { status: 500 }
    );
  }
}




export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const identifier = params.id;

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
      ranking_details,
    } = body;

    /* 🔍 FIND COLLEGE (ID OR SLUG) */
    const college = mongoose.Types.ObjectId.isValid(identifier)
      ? await College.findById(identifier)
      : await College.findOne({ slug: identifier });

    if (!college) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    /* 🌍 COUNTRY */
    let countryObjectId;
    if (country_ref !== undefined) {
      const country = await Country.findOne({ slug: country_ref });
      if (!country) {
        return NextResponse.json(
          { success: false, message: "Country not found" },
          { status: 400 }
        );
      }
      countryObjectId = country._id;
    }

    /* 🔒 SLUG CHECK */
    if (slug && slug !== college.slug) {
      const exists = await College.findOne({
        slug,
        _id: { $ne: college._id },
      });
      if (exists) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    /* 🧠 UPDATE OBJECT */
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (countryObjectId !== undefined)
      updateData.country_ref = countryObjectId;

    if (exams !== undefined) updateData.exams = exams;
    if (fees !== undefined) updateData.fees = fees;
    if (duration !== undefined) updateData.duration = duration;
    if (establishment_year !== undefined)
      updateData.establishment_year = establishment_year;
    if (ranking !== undefined) updateData.ranking = ranking;
    if (ranking_details !== undefined)
      updateData.ranking_details = ranking_details;

    if (banner_url !== undefined) updateData.banner_url = banner_url;
    if (about_content !== undefined)
      updateData.about_content = about_content;
    if (is_active !== undefined) updateData.is_active = is_active;

    if (overview !== undefined) updateData.overview = overview;
    if (key_highlights !== undefined)
      updateData.key_highlights = key_highlights;
    if (why_choose_us !== undefined)
      updateData.why_choose_us = why_choose_us;
    if (fees_structure !== undefined)
      updateData.fees_structure = fees_structure;
    if (campus_highlights !== undefined)
      updateData.campus_highlights = campus_highlights;

    const updatedCollege = await College.findByIdAndUpdate(
      college._id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "College updated successfully",
      data: updatedCollege,
    });
  } catch (error) {
    console.error("Error updating college:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update college" },
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
    const college = await College.findById(id);

    if (!college) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    await College.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting college:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete college",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     const deletedCollege = await College.findByIdAndDelete(params.id);

//     if (!deletedCollege) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "College not found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "College deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting college:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to delete college",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
