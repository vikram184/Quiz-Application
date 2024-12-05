import React, { useState, useEffect } from "react";
import API from "../services/api";

const StudentQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await API.get("http://localhost:5000/api/student/questions");
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("http://localhost:5000/api/student/submit", { answers: Object.entries(answers).map(([id, answer]) => ({ questionId: id, answer })) });
    alert("Quiz submitted successfully!");
  };

  return (
    <div>
      <h2>Student Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentQuiz;
