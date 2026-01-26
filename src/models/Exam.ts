import mongoose from "mongoose";
import { generateSlug } from "@/lib/slug";

const ExamSchema = new mongoose.Schema(
  {
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
      required: true,
      enum: ["National", "State", "University", "International"],
    },
    conducting_body: {
      type: String,
      required: true,
    },
    exam_mode: {
      type: String,
      required: true,
      enum: ["Online", "Offline", "Hybrid"],
    },
    frequency: {
      type: String,
      required: true,
      enum: ["Once a year", "Twice a year", "Quarterly", "Monthly"],
    },
    description: {
      type: String,
      required: true,
    },
    applicable_countries: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    }],
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

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
