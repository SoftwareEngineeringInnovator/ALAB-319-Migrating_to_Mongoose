import mongoose from "mongoose";

// Scores inside the scores array has a type and score value like  { type: "exam", score: 95.2 }
const scoreSchema = new mongoose.Schema(
  {
    type: String,
    score: Number,
  },
  { _id: false }
);

// This schema matches documents from sample_training.grades.
const gradeSchema = new mongoose.Schema(
  {
    learner_id: Number,
    class_id: Number,
    scores: [scoreSchema],
  },
  {
    collection: "grades",
  }
);

// Model for the grades collection.
const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;