const Question = require("../models/Question");
const Submission = require("../models/Submission");

const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      createdBy: req.user.id,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctAnswer } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, options, correctAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found!" });
    }

    res.status(200).json({ message: "Question updated successfully!", updatedQuestion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found!" });
    }

    res.status(200).json({ message: "Question deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentReports = async (req, res) => {
  try {
    const reports = await Submission.find().populate("studentId", "name email");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createQuestion, getQuestions, updateQuestion, deleteQuestion, getStudentReports };
