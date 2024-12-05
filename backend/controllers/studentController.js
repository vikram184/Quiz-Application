const Question = require("../models/Question");
const Submission = require("../models/Submission");

const getQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
  
      // Check the user's role
      if (req.user.role === "student") {
        // Hide correct answers for students
        const filteredQuestions = questions.map((question) => ({
          _id: question._id,
          question: question.question,
          options: question.options,
        }));
        return res.status(200).json(filteredQuestions);
      }
  
      // Return full data for admins
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
const submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body;
    const studentId = req.user.id;

    let score = 0;
    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        score++;
      }
    }

    const newSubmission = new Submission({
      studentId,
      answers,
      score,
    });

    await newSubmission.save();
    res.status(201).json({ message: "Answers submitted successfully!", score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getQuestions, submitAnswers };
