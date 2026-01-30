import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    short_name: {
      type: String,
      required: true,
    },

    exam_type: {
      type: String,
      enum: ["National", "State", "University", "International"],
      required: true,
    },

    conducting_body: {
      type: String,
      required: true,
    },

    exam_mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: true,
    },

    frequency: {
      type: String,
      enum: ["Once a year", "Twice a year", "Quarterly", "Monthly"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    /* ================= CMS SECTIONS ================= */

    overview: {
      title: String,
      content: String,
    },

    highlights: [
      {
        title: String,
        description: String,
      },
    ],

    eligibility: {
      type: String,
    },

    exam_pattern: [
      {
        section: String,
        questions: Number,
        marks: Number,
      },
    ],

    result_stats: {
      appeared: Number,
      qualified: Number,
      pass_percentage: String,
    },

    exam_dates: [
      {
        event: String,
        date: String,
      },
    ],

    content: {
      type: String, // rich HTML / TipTap / Markdown
    },

    /* ================= META ================= */

    applicable_countries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
      },
    ],

    is_active: {
      type: Boolean,
      default: true,
    },

    display_order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Exam ||
  mongoose.model("Exam", ExamSchema);
