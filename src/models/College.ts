import mongoose from "mongoose";
import { generateSlug } from "@/lib/slug";

const CollegeSchema = new mongoose.Schema(
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
    country_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    exams: [{
      type: String,
    }],
    fees: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    establishment_year: {
      type: String,
    },
    ranking: {
      type: String,
    },
    banner_url: {
      type: String,
    },
    about_content: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.College ||
  mongoose.model("College", CollegeSchema);
