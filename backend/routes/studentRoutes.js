const express = require("express");
const { getQuestions, submitAnswers } = require("../controllers/studentController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all questions for students
router.get("/questions", verifyToken, getQuestions);

// Submit answers for grading
router.post("/submit", verifyToken, submitAnswers);

module.exports = router;
