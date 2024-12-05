const express = require("express");
const { 
  createQuestion, 
  getQuestions, 
  updateQuestion, 
  deleteQuestion, 
  getStudentReports 
} = require("../controllers/adminController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new question
router.post("/questions", verifyToken, isAdmin, createQuestion);

// Get all questions
router.get("/questions", verifyToken, isAdmin, getQuestions);

// Update a question
router.put("/questions/:id", verifyToken, isAdmin, updateQuestion);

// Delete a question
router.delete("/questions/:id", verifyToken, isAdmin, deleteQuestion);

// Get student reports
router.get("/reports", verifyToken, isAdmin, getStudentReports);

module.exports = router;
