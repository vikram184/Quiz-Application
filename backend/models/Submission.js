const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [{ questionId: String, answer: String }],
  score: { type: Number, required: true },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
