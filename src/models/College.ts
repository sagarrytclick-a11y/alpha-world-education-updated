import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    /* ===== BASIC ===== */
    name: {
      type: String,
      trim: true,
    },

    college_name: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    /* ===== RELATIONS ===== */
    country_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },

    /* ===== OLD LIST PAGE FIELDS ===== */
    exams: [String],

    fees: Number,

    duration: String,

    establishment_year: String,

    ranking: String,

    banner_url: String,

    about_content: String,

    is_active: {
      type: Boolean,
      default: true,
    },

    /* ===== NEW CMS FIELDS ===== */

    overview: {
      title: String,
      content: String,
      university_details: String,
    },

    key_highlights: {
      title: String,
      items: [
        {
          label: String,
          value: String,
        },
      ],
    },

    why_choose_us: {
      title: String,
      description: String,
      features: [
        {
          title: String,
          description: String,
        },
      ],
    },

    ranking_details: {
      country_rank: String,
      world_rank: String,
    },

    fees_structure: {
      title: String,
      university_fees: [
        {
          course: String,
          duration: String,
          annual_fees_in_inr: String,
        },
      ],
    },

    campus_highlights: {
      title: String,
      facilities: [String],
      student_life: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.College ||
  mongoose.model("College", CollegeSchema);
