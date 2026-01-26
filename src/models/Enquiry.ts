import mongoose, { Schema, Types } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    related_college_id: { type: Types.ObjectId, ref: "College" },
    related_exam_id: { type: Types.ObjectId, ref: "Exam" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
